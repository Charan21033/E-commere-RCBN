import  axios  from "axios"

export const API_BSE_URL="https://rcbn-ecommerce.onrender.com"
const jwt =localStorage.getItem("jwt")


 export const api=axios.create({
    baseURL:API_BSE_URL,
    headers:{
        "Authorization": `Bearer ${jwt}`,
        "Content-Type" :"application/json"
    }
})