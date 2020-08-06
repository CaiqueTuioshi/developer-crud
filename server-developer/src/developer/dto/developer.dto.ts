export class DeveloperDTO {
  name: string;
  gender: string;
  age: number;
  hobby: string;
  birthdate: Date;
}

export class PagedDeveloperDTO {
  content: DeveloperDTO[];
  totalElements: number;
  totalPages: number;
}

export class DeleteResultDTO {
  ok?: number;
  n?: number;
}
