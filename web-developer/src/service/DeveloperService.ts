import axios, { AxiosPromise } from "axios";
import { DeveloperDTO, PagedDeveloper } from "../type";

type pageRequest = {
  page: number;
  pageSize: number;
};

export const findAllPaged = (
  search: string,
  pagination: pageRequest
): AxiosPromise<PagedDeveloper> =>
  axios.get(`/developers/paged?${search}`, {
    params: {
      ...pagination,
    },
  });

export const findById = (id: string): AxiosPromise<DeveloperDTO> =>
  axios.get(`/developers/${id}`);

export const saveOrUpdate = (developer: DeveloperDTO): AxiosPromise<void> =>
  developer._id
    ? axios.put("/developers", developer)
    : axios.post("/developers/", developer);

export const remove = (id: string): AxiosPromise<void> =>
  axios.delete(`/developers/${id}`);
