import axios, { AxiosPromise } from "axios";
import { DeveloperDTO, PagedDeveloper } from "../type";

type pageRequest= {
  page: number;
  pageSize: number
}

export const findAllPaged = (search: string, pagination: pageRequest): AxiosPromise<PagedDeveloper> =>
  axios.get(`/developers/paged?${search}`, {
    params: {
      ...pagination
    },
  });
