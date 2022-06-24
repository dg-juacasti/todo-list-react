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

interface GetAction extends Action<typeof GET> {
  payload: ITodoResponse[];
}
interface CreateAction extends Action<typeof CREATE> {
  payload: ITodoResponse;
}

interface UpdateAction extends Action<typeof UPDATE> {
  payload: ITodoResponse;
}

interface DeleteAction extends Action<typeof DELETE> {
  payload: ITodoResponse["id"];
}

interface FailureAction extends Action<typeof FAILURE> {}

export const GetAction =
  (): ThunkAction<void, RootState, unknown, GetAction | FailureAction> =>
  async (dispatch, getState) => {
    try {
      return axios.get(`https://bp-todolist.herokuapp.com/?id_author=48`).then(res => {
        dispatch({ type: GET, payload: res.data });
      });
    } catch (error) {
      dispatch({ type: FAILURE });
    }
  };

export const getAllTodos =
  (todosList: ITodoResponse[]): ThunkAction<void, RootState, unknown, GetAction> =>
  dispatch => {
    dispatch({ type: GET, payload: todosList });
  };

export const createAction =
  (todo: ITodoResponse): ThunkAction<void, RootState, unknown, CreateAction | FailureAction> =>
  async (dispatch, getState) => {
    try {
      return axios
        .post(`https://bp-todolist.herokuapp.com/?id_author=48`, JSON.stringify(todo), {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(res => {
          dispatch({ type: CREATE, payload: res.data });
        });
    } catch (error) {
      dispatch({ type: FAILURE });
    }
  };

export const DeleteAction =
  (id: ITodoResponse["id"]): ThunkAction<void, RootState, unknown, DeleteAction | FailureAction> =>
  async (dispatch, getState) => {
    try {
      return axios.delete(`https://bp-todolist.herokuapp.com/${id}`).then(res => {
        dispatch({ type: DELETE, payload: id });
      });
    } catch (error) {
      dispatch({ type: FAILURE });
    }
  };

export const UpdateAction =
  (todo: ITodoResponse): ThunkAction<void, RootState, unknown, UpdateAction | FailureAction> =>
  async (dispatch, getState) => {
    try {
      return axios.delete(`https://bp-todolist.herokuapp.com/${todo.id}`).then(res => {
        dispatch({ type: UPDATE, payload: todo });
      });
    } catch (error) {
      dispatch({ type: FAILURE });
    }
  };

interface TodoState {
  todos: ITodoResponse[];
}

const initialState: TodoState = {
  todos: [],
};

const todoReducer = (
  state: TodoState = initialState,
  action: CreateAction | GetAction | DeleteAction | UpdateAction
) => {
  switch (action.type) {
    case CREATE:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case GET:
      return {
        ...state,
        todos: action.payload,
      };
    case DELETE: {
      const newTodos = state.todos.filter(todo => todo.id == action.payload);
      return {
        ...state,
        todos: [...newTodos],
      };
    }
    case UPDATE: {
      const newTodos = state.todos.map(todo =>
        todo.id == action.payload.id
          ? {
              description: action.payload.description,
              finish_at: action.payload.finish_at,
              id: action.payload.id,
              status: action.payload.status,
            }
          : todo
      );
      return {
        ...state,
        todos: [...newTodos],
      };
    }

    default:
      return state;
  }
};

export default todoReducer;
