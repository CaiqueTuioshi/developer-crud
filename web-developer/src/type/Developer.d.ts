export interface DeveloperDTO {
  name: string;
  gender: string;
  age: number;
  hobby: string;
  birthdate: Date;
}

export interface PagedDeveloper {
  content: DeveloperDTO[];
  totalElements: number;
  totalPages: number;
}