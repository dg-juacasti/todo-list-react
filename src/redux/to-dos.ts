import { Action } from "redux";
import { RootState } from "./store";
import { ITodoResponse } from "../models/index";
import { ThunkAction } from "redux-thunk";
import axios from "axios";

const GET = "todo/get";
const CREATE = "todo/create";
const UPDATE = "todo/update";
const DELETE = "todo/delete";
const FAILURE = "todo/failure";

interface CreateAction extends Action<typeof CREATE> {
  payload: {
    todo: ITodoResponse;
  };
}

interface UpdateAction extends Action<typeof UPDATE> {
  payload: {
    todo: ITodoResponse;
  };
}

interface DeleteAction extends Action<typeof DELETE> {
  payload: {
    todo: ITodoResponse;
  };
}

interface FailureAction extends Action<typeof FAILURE> {}

export const createAction =
  (todo: ITodoResponse): ThunkAction<void, RootState, unknown, CreateAction | FailureAction> =>
  async (dispatch, getState) => {
    try {
      const response = axios
        .post(`https://bp-todolist.herokuapp.com/?id_author=1`, JSON.stringify(todo), {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(res => {
          dispatch({ type: CREATE, payload: res.data });
        });
    } catch (error) {}
  };

interface TodoState {
  todos: ITodoResponse[];
}

const initialState: TodoState = {
  todos: [],
};

const todoReducer = (state: TodoState = initialState, action: CreateAction) => {
  switch (action.type) {
    case CREATE:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    default:
      return state;
  }
};

export default todoReducer;
