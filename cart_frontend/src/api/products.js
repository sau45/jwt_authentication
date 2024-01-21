import axios from ".";


export const getProductsApi = async () => {
    const response = await axios.get("https://fakestoreapi.com/products");
    console.log(response.data)
    return response.data;
}