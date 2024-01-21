import axios from ".";


export const loginApi = async (data) => {
    const response = await axios.post("/api/auth/login", data);
    return response.data;
}

export const registerApi = async (data) => {
    const response = await axios.post("/api/auth/register", data);
    return response.data;
}


export const verifyTokenApi = async (token) => {
    const response = await axios.post("/api/auth/verifytoken", { accessToken:token });
    return response.data;
}