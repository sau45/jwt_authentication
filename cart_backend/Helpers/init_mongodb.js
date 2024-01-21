import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.MONGO_DB_URI,{
    dbName:process.env.DB_NAME,
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
    .then(()=>{
        console.log('Connected to MongoDB');
    })
    .catch(err=>{
        console.log('Error: ', err);
    })

mongoose.connection.on('connected',()=>{
    console.log('Mongoose connected to db');
})

mongoose.connection.on('error',(err)=>{
    console.log(err.message);
})

mongoose.connection.on('disconnected', ()=>{
    console.log('Mongoose connection is disconnected.');
})

process.on('SIGINT',async()=>{
    await mongoose.connection.close();
    process.exit(0);
})