import axios from ".";


export const sendContactMessage = async (data) => {
    const response = await axios.post("/api/contact/sendmessage", data);
    return response.data;
}