import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, waitFor, within } from "@testing-library/react";
import DeveloperForm from "../DeveloperForm";
import { DeveloperService } from "../../../service";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
jest.mock("../../../service");

const developerService = DeveloperService as jest.Mocked<
  typeof DeveloperService
>;

const pagedDevelopers: any = {
  data: {
    _id: "123",
    name: "Lucas Garicoix",
    age: 28,
    gender: "masculino",
    hobby: "futebol",
    birthdate: "1991-08-28",
  },
};

describe("<DeveloperForm />", () => {
  test("deve carregar os campos da listagem", async () => {
    developerService.findById.mockResolvedValue(pagedDevelopers);

    const memoryHistory = createMemoryHistory();
    const route = "/developers/123";
    memoryHistory.push(route);

    const { queryByText, findByText } = render(
      <Router history={memoryHistory}>
        <DeveloperForm />
      </Router>
    );

    expect(await findByText("Nome")).toBeInTheDocument();
    expect(queryByText("Sexo")).toBeInTheDocument();
    expect(queryByText("Idade")).toBeInTheDocument();
    expect(queryByText("Hobby")).toBeInTheDocument();
  });

  test("deve preencher o formulário e salvar corretamente", async () => {
    developerService.findById.mockResolvedValue(pagedDevelopers);
    developerService.saveOrUpdate.mockResolvedValue({ data: {} } as any);

    const memoryHistory = createMemoryHistory();
    const route = "/developers/123";
    memoryHistory.push(route);

    const { findByTestId, getByText } = render(
      <Router history={memoryHistory}>
        <DeveloperForm />
      </Router>
    );

    const nome = (await findByTestId("name-input")).querySelector("input")!;
    fireEvent.change(nome, { target: { value: "Lucas Seiti" } });

    expect(nome).toHaveValue("Lucas Seiti");

    const saveButton = getByText("SALVAR");
    fireEvent.click(saveButton);

    waitFor(() =>
      expect(developerService.saveOrUpdate).toHaveBeenCalledTimes(1)
    );
  });
});
