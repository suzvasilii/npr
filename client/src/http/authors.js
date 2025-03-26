import axios from "axios";

export async function httpGetAuthors(limit, offset){
    const {data} = await axios.get(`http://localhost:5000/api/authors/get-authors?limit=${limit}&offset=${offset}`);
    return data;
}