import { DateFilter } from './../Components/App/Types';
import axios, { AxiosResponse } from "axios";

const BASE_API_URL: string = "https://floating-brook-69790.herokuapp.com";

export const getMeasurements = (date: DateFilter): Promise<AxiosResponse> => {
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