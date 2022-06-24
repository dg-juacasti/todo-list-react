import axios from "axios";
import store from "./store";

import { ITodoResponse } from "../models";

describe("Store", () => {
  const todo: ITodoResponse = {
    description: "string",
    finish_at: "string",
    id: 1,
    id_author: 48,
    status: 0,
  };
  const todos: ITodoResponse[] = [
    {
      description: "tarea 1",
      finish_at: "2022-06-17",
      id: 155,
      id_author: 48,
      status: 0,
    },
    {
      description: "tarea 2",
      finish_at: "2022-06-18",
      id: 156,
      id_author: 48,
      status: 1,
    },
  ];

  it("Create a todo", () => {
    axios.post = jest.fn().mockImplementation(() => Promise.resolve({ data: todo }));
    store.dispatch({ type: "todo/create", payload: todo });

    const state = store.getState();
    expect(state.todos).toEqual({ todos: [{ ...todo }] });
  });
});
