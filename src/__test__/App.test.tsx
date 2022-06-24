import { render, screen, act, fireEvent } from "@testing-library/react";
import App from "../App";
import axios from "axios";
import { Provider } from "react-redux";
import * as context from "../store";
import TodoForm from "../components/organism/todo-form";
import { Todo } from "../components/molecules/todo";
import { ITodoResponse } from "../models";

describe("TodoList App tests", () => {
  const mockTodo: ITodoResponse = {
    description: "Todo",
    finish_at: "12/15/99",
    status: 0,
  };

  it("Should render a list with several todos", async () => {
    jest.spyOn(axios, "get").mockImplementation(() =>
      Promise.resolve({
        data: {
          data: [
            {
              description: "Test",
              finish_at: new Date().toString(),
              id: 1,
              id_author: 1,
              status: 0,
            },
            {
              description: "Test 3",
              finish_at: new Date().toString(),
              id: 2,
              id_author: 1,
              status: 0,
            },
          ],
        },
      })
    );
    render(
      <Provider store={context.store}>
        <App />
      </Provider>
    );
    screen.getByText("Todo List");
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });
    const test1 = screen.getByText("Test");
    const test2 = screen.getByText("Test 3");
    // console.log(test1);

    const numTodos = screen.getAllByTestId("toggleComplete").length;

    expect(numTodos).toBe(2);

    expect(test1).toHaveTextContent("Test");

    expect(test2).toHaveTextContent("Test 3");
  });

  it("Should create a new todo", async () => {
    const mockedAdd = jest.fn();
    render(
      <Provider store={context.store}>
        <TodoForm create={mockedAdd} />
      </Provider>
    );

    const inputDescription = screen.getByPlaceholderText("Descripción");

    const inputLimitDate = screen.getByPlaceholderText("Fecha limite");

    fireEvent.change(inputDescription, {
      target: { value: "Todo description" },
    });

    fireEvent.change(inputLimitDate, { target: { value: "Limit Date" } });

    const btnAdd = screen.getByText("Agregar");

    fireEvent.click(btnAdd);

    expect(mockedAdd).toHaveBeenCalled();
  });

  /**
   *
   * Probar que el formulario muestre los mensajes de requerimiento cuando
   * el formulario no tenga la descripción y la fecha ingresada
   */
  it("Should validate the todo form, description and date required", async () => {
    const mockedAdd = jest.fn();
    render(
      <Provider store={context.store}>
        <TodoForm create={mockedAdd} />
      </Provider>
    );

    const inputField = screen.getByPlaceholderText("Descripción");

    fireEvent.change(inputField, { target: { value: "" } });
    const vacio = screen.getByTestId("vacio");

    expect(vacio).toHaveTextContent("no vacio");
  });

  it("Should update a todo, description and date", async () => {
    const mockedEdit = jest.fn();
    render(
      <Provider store={context.store}>
        <TodoForm edit={mockedEdit} />
      </Provider>
    );

    const inputDescription = screen.getByPlaceholderText("Descripción");

    const inputLimitDate = screen.getByPlaceholderText("Fecha limite");

    fireEvent.change(inputDescription, {
      target: { value: "Todo description" },
    });

    fireEvent.change(inputLimitDate, { target: { value: "Limit Date" } });

    const btnEdit = screen.getByText("Editar");

    fireEvent.click(btnEdit);

    expect(mockedEdit).toHaveBeenCalled();
  });

  it("Should delete a todo", async () => {
    const mockedDelete = jest.fn();
    render(
      <Provider store={context.store}>
        <Todo todo={mockTodo} isEven={true} deleteTodo={mockedDelete} />
      </Provider>
    );

    const deleteBtn = screen.getByTestId("remove");
    fireEvent.click(deleteBtn);

    expect(mockedDelete).toHaveBeenCalled();
  });

  /**
   *
   * Probar que el formulario muestre los mensajes de requerimiento cuando
   * el formulario no tenga la descripción y la fecha ingresada
   */
  it("Should update the todo status ", async () => {
    const mockedCheck = jest.fn();
    render(
      <Provider store={context.store}>
        <Todo todo={mockTodo} isEven={true} toggleComplete={mockedCheck} />
      </Provider>
    );
    const checkbox = screen.getByTestId("toggleComplete");
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it("Should show an message when  the todo list is empty  ", async () => {});

  /**
   *
   * Probar que la barra de estado cambia cuando se completa una tarea
   * se puede probar por el cambio en texto o por porcentaje de completitud
   */
  it("Should the progress bar change its label text or percentage when a todo is completed ", async () => {});

  /**
   *
   * Probar el filtro de las tareas por descripcion
   */
  it("Should filter the todo list by description", async () => {});

  /**
   *
   * Probar el filtro de tareas que falta por completar y que una vez esten filtradas a dar click nuevamente
   * sobre el boton del filtro se muestren todos la lista nuevamente
   */
  it("Should filter the todo list by completed status and toggle functionality button", async () => {});
});
