import { AxiosResponse } from "axios";
import instance from "./axios";
import { PublicHolidays } from "../types";

interface Api {
  publicHolidays: (
    year: number,
    code: string
  ) => Promise<AxiosResponse<PublicHolidays[]>>;
  isTodayPublicHolidays: (
    code: string
  ) => Promise<AxiosResponse<PublicHolidays>>;
  nextPublicHolidays: (
    code: string
  ) => Promise<AxiosResponse<PublicHolidays[]>>;
}

export const api: Api = {
  publicHolidays: (year, code) =>
    instance.get(`/PublicHolidays/${year}/${code}`),
  isTodayPublicHolidays: (code) =>
    instance.get(`/IsTodayPublicHoliday/${code}`),
  nextPublicHolidays: (code) => instance.get(`/NextPublicHolidays/${code}`),
};
