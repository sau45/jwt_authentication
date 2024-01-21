import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    message:{
        type: String,
        required: true
    }
});


const Contact = mongoose.model('contact', ContactSchema);
export default Contact;
