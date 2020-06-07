import { DateFilter } from './../Components/App/Types';
import axios from "axios";

//const BASE_API_URL: string = "https://floating-brook-69790.herokuapp.com";
const BASE_API_URL: string = "http://localhost:5000";

export const getMeasurements = (date: DateFilter) => {
  const url = BASE_API_URL + "/measurement";
  const parseDate = (date: String | undefined) => {
    return !date || date?.length === 0 ? undefined : (new Date(date as string)).getTime()
  }

  return axios.get(url, {
    params: {
      from: parseDate(date.from),
      to: parseDate(date.to)
    }
  });
};
