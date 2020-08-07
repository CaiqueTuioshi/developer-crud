export interface DeveloperDTO {
  _id?: string;
  name: string;
  gender: string;
  age: number;
  hobby: string;
  birthdate: string;
}

export interface PagedDeveloper {
  content: DeveloperDTO[];
  totalElements: number;
  totalPages: number;
}