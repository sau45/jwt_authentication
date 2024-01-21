import express from 'express';
const router = express.Router();
import Contact from '../Models/Contact.model.js';
import { contactSchema } from '../Helpers/validation_schema.js';


// Endpoint to send a message and save it to the database
router.post('/sendmessage', async (req, res, next) => {
    try {
        const result = await contactSchema.validateAsync(req.body);
        const newContact = new Contact({
            name:result.name,
            email:result.email,
            message:result.message
        });
        await newContact.save();

        res.send({status:true,message:"Message sent successfully!"});
    } catch (error) {
        if(error.isJoi){
            error.status = 422;
        }
        next(error);
    }
});

export default router;