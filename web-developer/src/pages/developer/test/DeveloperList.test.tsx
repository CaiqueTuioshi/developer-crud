import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, waitFor, within } from "@testing-library/react";
import DeveloperList from "../DeveloperList";
import { DeveloperService } from "../../../service";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
jest.mock("../../../service");

const developerService = DeveloperService as jest.Mocked<
  typeof DeveloperService
>;

const pagedDevelopers: any = {
  data: {
    content: [
      {
        _id: "123",
        name: "Lucas Garicoix",
        age: 28,
        gender: "masculino",
        hobby: "futebol",
        birthdate: "1991-08-28",
      },
    ],
    totalElements: 1,
  },
};

describe("<DeveloperList />", () => {
  test("deve carregar os campos da listagem", async () => {
    developerService.findAllPaged.mockResolvedValue(pagedDevelopers);

    const { queryByText, findByText, getByText } = render(<DeveloperList />);

    expect(await findByText("Nome")).toBeInTheDocument();
    expect(queryByText("Sexo")).toBeInTheDocument();
    expect(queryByText("Idade")).toBeInTheDocument();
    expect(queryByText("Hobby")).toBeInTheDocument();
    expect(queryByText("Data de nascimento")).toBeInTheDocument();

    const table = getByText("Lucas Garicoix").closest("tr");
    const row = within(table!);

    expect(row.queryByText("Lucas Garicoix")).toBeInTheDocument();
    expect(row.queryByText("28")).toBeInTheDocument();
    expect(row.queryByText("masculino")).toBeInTheDocument();
    expect(row.queryByText("futebol")).toBeInTheDocument();
    expect(row.queryByText("1991-08-28")).toBeInTheDocument();
  });

  test("deve clicar no botão editar e redirecionar para a página do formulário", async () => {
    developerService.findAllPaged.mockResolvedValue(pagedDevelopers);

    const memoryHistory = createMemoryHistory();
    const route = "/developers/123";
    memoryHistory.push(route);

    const { findByTestId, getByTestId } = render(
      <Router history={memoryHistory}>
        <DeveloperList />
      </Router>
    );

    const editbutton = await findByTestId("editbutton-table");

    fireEvent.click(editbutton);

    waitFor(() => expect(getByTestId("location-display")).toHaveTextContent(route))
  });


  test("deve clicar no botão novo e redirecionar para a página do formulário", async () => {
    developerService.findAllPaged.mockResolvedValue(pagedDevelopers);

    const memoryHistory = createMemoryHistory();
    const route = "/developers/new";
    memoryHistory.push(route);

    const { findByTestId, getByTestId } = render(
      <Router history={memoryHistory}>
        <DeveloperList />
      </Router>
    );

    const editbutton = await findByTestId("floating-action-button");

    fireEvent.click(editbutton);

    waitFor(() => expect(getByTestId("location-display")).toHaveTextContent(route))
  });


  test("deve clicar no botão excluir e executar corretamente", async () => {
    developerService.findAllPaged.mockResolvedValue(pagedDevelopers);
    developerService.remove.mockResolvedValue({data: {}} as any);

    const memoryHistory = createMemoryHistory();
    const route = "/developers/new";
    memoryHistory.push(route);

    const { findByTestId } = render(
      <Router history={memoryHistory}>
        <DeveloperList />
      </Router>
    );

    const editbutton = await findByTestId("removebutton-table");

    fireEvent.click(editbutton);

    waitFor(() => expect(developerService.remove).toHaveBeenCalledTimes(1))
  });
});
