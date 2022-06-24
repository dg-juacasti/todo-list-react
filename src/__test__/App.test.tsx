import { render, screen, act, fireEvent } from "@testing-library/react";
import axios from "axios";
import { MemoryRouter, Route, Router, useHistory } from "react-router-dom";
import App from "../App";
import { Todo } from "../components/molecules/todo";
import TodoForm from "../components/organism/todo-form";
import TodoList from "../components/organism/todo-list";

const setupAxios = () => {
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
};

describe("TodoList App tests", () => {
  it("Should render a list with several todos", async () => {
    setupAxios();
    render(<App />);
    screen.getByText("Todo List");
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });
    screen.getByText("Test");
    screen.getByText("Test 3");
  });

  xit("Should create a new todo", async () => {
    render(
      <MemoryRouter initialEntries={["/create"]}>
        <TodoForm />
      </MemoryRouter>
    );
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "0001" },
    });
    fireEvent.change(screen.getByPlaceholderText("Fecha limite"), {
      target: { value: "2022-06-24" },
    });
    fireEvent.click(screen.getByRole("button"));
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });
    screen.getByText("Creado correctamente");
  });

  /**
   *
   * Probar que el formulario muestre los mensajes de requerimiento cuando
   * el formulario no tenga la descripción y la fecha ingresada
   */
  it("Should validate the todo form, description and date required", async () => {
    render(
      <MemoryRouter>
        <TodoForm />
      </MemoryRouter>
    );
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "0001" },
    });
    fireEvent.click(screen.getByRole("button"));
    screen.getByText("Todos los campos son obligatorios");
  });

  it("Should update a todo, description and date", async () => {
    render(
      <MemoryRouter initialEntries={[`edit/41`]}>
        <Route path={"edit/:id"}>
          <TodoForm />
        </Route>
      </MemoryRouter>
    );
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "0002311" + Math.random() },
    });
    fireEvent.change(screen.getByPlaceholderText("Fecha limite"), {
      target: { value: "2022-06-24" },
    });
    fireEvent.click(screen.getByText("Agregar"));
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1500));
    });
    screen.getByText("Actualizado correctamente");
  });

  it("Should delete a todo", async () => {
    const deleteTodoMock = jest.fn();
    render(
      <Todo
        todo={{
          description: "Test",
          finish_at: new Date().toString(),
          id: 1,
          id_author: 1,
          status: 0,
        }}
        isEven={false}
        deleteTodo={deleteTodoMock}
      />
    );
    fireEvent.click(screen.getByTestId("deleteTodo"));
    expect(deleteTodoMock).toBeCalled();
  });

  /**
   *
   * Probar que el formulario muestre los mensajes de requerimiento cuando
   * el formulario no tenga la descripción y la fecha ingresada
   */
  it("Should update the todo status ", async () => {
    const checkTodoMock = jest.fn();
    render(
      <Todo
        todo={{
          description: "Test",
          finish_at: new Date().toString(),
          id: 1,
          id_author: 1,
          status: 0,
        }}
        isEven={false}
        toggleComplete={checkTodoMock}
      />
    );
    fireEvent.click(screen.getByRole("checkbox"));
    expect(checkTodoMock).toBeCalled();
  });

  it("Should show an message when  the todo list is empty  ", async () => {
    jest.spyOn(axios, "get").mockImplementation(() =>
      Promise.resolve({
        data: {
          data: [],
        },
      })
    );
    render(<App></App>);
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });
    screen.getByText("No hay Todos");
  });

  /**
   *
   * Probar que la barra de estado cambia cuando se completa una tarea
   * se puede probar por el cambio en texto o por porcentaje de completitud
   */
  it("Should the progress bar change its label text or percentage when a todo is completed ", async () => {
    render(
      <TodoList
        setList={() => {}}
        todoList={[
          {
            description: "Test",
            finish_at: "2022-06-24",
            id: 1,
            id_author: 14,
            status: 0,
          },
          {
            description: "Test",
            finish_at: "2022-06-24",
            id: 1,
            id_author: 14,
            status: 1,
          },
        ]}
      />
    );

    screen.getByText("Progreso: 50%");
  });

  /**
   *
   * Probar el filtro de las tareas por descripcion
   */
  it("Should filter the todo list by description", async () => {
    render(
      <TodoList
        setList={() => {}}
        todoList={[
          {
            description: "Test",
            finish_at: "2022-06-24",
            id: 1,
            id_author: 14,
            status: 0,
          },
          {
            description: "Test 06",
            finish_at: "2022-06-24",
            id: 1,
            id_author: 14,
            status: 1,
          },
        ]}
      />
    );

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "06" },
    });

    expect(screen.getAllByAltText("2022-06-24")).toHaveLength(1);
  });

  /**
   *
   * Probar el filtro de tareas que falta por completar y que una vez esten filtradas a dar click nuevamente
   * sobre el boton del filtro se muestren todos la lista nuevamente
   */
  it("Should filter the todo list by completed status and toggle functionality button", async () => {
    render(
      <TodoList
        setList={() => {}}
        todoList={[
          {
            description: "Test",
            finish_at: "2022-06-24",
            id: 1,
            id_author: 14,
            status: 0,
          },
          {
            description: "Test 06",
            finish_at: "2022-06-24",
            id: 1,
            id_author: 14,
            status: 1,
          },
        ]}
      />
    );

    fireEvent.click(screen.getByLabelText("Filtrar completados"));

    expect(screen.getAllByAltText("2022-06-24")).toHaveLength(1);
  });
});
