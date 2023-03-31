import axios from "axios";

export default axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {},
    params: {
        api_key: "7736ed9f5427a468429b0f9cc1d80060"
    }
});
