import express from "express";
import morgan from "morgan";
import cors from "cors";
import createError from "http-errors";
import AuthRoute from './Routes/Auth.route.js';
import ContactRoute from './Routes/Contact.route.js';
import './Helpers/init_mongodb.js';
import { verifyAccessToken } from "./Helpers/jwt_helper.js";


const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async(req, res, next) => {
    console.log(req.payload);
    res.send('Hello World');
});

app.use('/api/auth', AuthRoute);
app.use('/api/contact', ContactRoute);

app.use(async (req,res,next)=>{
    next(createError.NotFound());
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.send({
        error : {
            status : error.status || 500,
            message : error.message || "Internal Server Error"
        }
    })
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});