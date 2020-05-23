import axios from "axios";

const BASE_API_URL: string = "http://floating-brook-69790.herokuapp.com/";

export const getMeasurements = () => {
    const url = BASE_API_URL + "/measurement";
    return axios.get(url);
};