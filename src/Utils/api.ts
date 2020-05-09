import axios from "axios";

const BASE_API_URL: string = "http://localhost:5000";

export const getMeasurements = () => {
    const url = BASE_API_URL + "/measurement";
    return axios.get(url);
};