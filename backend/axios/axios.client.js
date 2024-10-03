const axios = require('axios');

const get = async(url)=>{
    const response = await axios.get(url,{
        headers:{
            Accept:'application/json',
            "Accept-Encoding":"identity"
        },
        maxContentLength:Infinity,
        maxBodyLength:Infinity,
    });
    return response.data;
};
export default {get};