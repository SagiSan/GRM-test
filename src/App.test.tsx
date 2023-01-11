import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("initial renders", () => {
  test("renders header", () => {
    render(<App />);
    const header = screen.getByText(/GRM Test/i);
    expect(header).toBeInTheDocument();
  });
  test("renders table", () => {
    render(<App />);
    const table = screen.getByTestId("table");
    const tableBody = screen.getByTestId("table-body");
    expect(table).toBeInTheDocument();
    expect(tableBody.children.length).toBe(6);
  });
  test("renders start button", () => {
    render(<App />);
    const start = screen.getByText("Start");
    expect(start).toBeInTheDocument();
  });
  test("form is hidden initially", () => {
    render(<App />);
    const form = screen.queryByTestId("form");
    expect(form).not.toBeInTheDocument();
  });
});

describe("compare functionality", () => {
  test("form visible on start click", () => {
    render(<App />);
    userEvent.click(screen.getByText("Start"));
    const form = screen.queryByTestId("form");
    const formSubmit = screen.getByTestId("form-submit");
    expect(form).toBeInTheDocument();
    expect(formSubmit).toBeDisabled();
  });
  test("submit values", () => {
    render(<App />);
    userEvent.click(screen.getByText("Start"));
    const tableBody = screen.getByTestId("table-body");
    const input1 = screen.getByTestId("input1");
    const input2 = screen.getByTestId("input2");
    const formSubmit = screen.getByTestId("form-submit");
    userEvent.type(input1, "2");
    userEvent.type(input2, "1");
    expect(input1).toHaveValue(2);
    expect(input2).toHaveValue(1);
    userEvent.click(formSubmit);
    const scoreCell = tableBody.children[0].children[2];
    expect(scoreCell).toHaveTextContent("1");
  });
});
