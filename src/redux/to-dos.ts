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
  payload: {
    todo: ITodoResponse;
  };
}
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
          console.log({ res: res.data });
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

const todoReducer = (state: TodoState = initialState, action: CreateAction | GetAction) => {
  switch (action.type) {
    case CREATE:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case GET:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    default:
      return state;
  }
};

export default todoReducer;
