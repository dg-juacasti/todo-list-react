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

  it("Create a todo", () => {
    axios.post = jest.fn().mockImplementation(() => Promise.resolve({ data: todo }));
    store.dispatch({ type: "todo/create", payload: { todo } });

    const state = store.getState();
    expect(state.todos).toEqual({ todos: [{ todo }] });
  });
});
