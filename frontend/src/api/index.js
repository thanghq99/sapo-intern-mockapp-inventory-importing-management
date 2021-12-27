import axios from 'axios';


const callAPI = axios.create({
    baseURL: 'http://localhost:9191/',
    headers: {
        "Content-type": 'application/json'
    }
})
export default callAPI;