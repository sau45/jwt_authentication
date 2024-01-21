import express from "express";
import createError from "http-errors";
import User from "../Models/User.model.js";
import { authSchema,registerSchema } from "../Helpers/validation_schema.js";
import { signAccessToken, signRefreshToken,verifyRefreshToken,verifyAccessToken, isTokenValid } from "../Helpers/jwt_helper.js";
const router = express.Router();


router.post('/register',async(req,res,next)=>{
    try {
        const result = await registerSchema.validateAsync(req.body);

        const doesExist = await User.findOne({email:result.email});
        if(doesExist) throw createError.Conflict(`${result.email} is already been registered`);

        const user = new User(result);
        const savedUser = await user.save();
        const accessToken = await signAccessToken(savedUser.id);
        const refreshToken = await signRefreshToken(savedUser.id);

        res.send({status:true,accessToken,refreshToken});

    } catch (error) {
        if(error.isJoi){
            error.status = 422;
        }
        next(error);
    }
});

router.post('/login',async(req,res,next)=>{
    try {
        const result = await authSchema.validateAsync(req.body);
        const user = await User.findOne({email:result.email});
        
        if(!user) throw createError.NotFound('User not registered');

        const isMatch = await user.isPasswordValid(result.password);
        if(!isMatch) throw createError.Unauthorized('Email or password is incorrect');

        const accessToken = await signAccessToken(user.id);
        const refreshToken = await signRefreshToken(user.id);

        res.send({status:true,accessToken,refreshToken});
        
    } catch (error) { 
        if(error.isJoi){
            return next(createError.BadRequest("Invalid email or password"));
        }
        next(error);
    }
});


router.post('/verifytoken',async(req,res,next)=>{
    try {
        const {accessToken} = req.body;
        if(!accessToken) throw createError.BadRequest();
        await isTokenValid(accessToken);
        res.send({status:true,message:'Token is valid'});
    } catch (error) {
        next(error);
    }
});


router.post('/refresh-token',async(req,res,next)=>{
    try {
        const {refreshToken} = req.body;
        if(!refreshToken) throw createError.BadRequest();
        const userId = await verifyRefreshToken(refreshToken);

        const accessToken = await signAccessToken(userId);
        const refToken = await signRefreshToken(userId);

        res.send({accessToken: accessToken,refreshToken: refToken});

    } catch (error) {
        next(error);
    }
});

router.delete('/logout',async(req,res,next)=>{
    try {
        const {refreshToken} = req.body;
        if(!refreshToken) throw createError.BadRequest();
        const userId = await verifyRefreshToken(refreshToken);
        // TODO: delete refresh token from database
        res.sendStatus(204); 
    } catch (error) {
        next(error);
    }
});


export default router;