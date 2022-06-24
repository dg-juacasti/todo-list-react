import {
  combineReducers,
  legacy_createStore as createStore,
  applyMiddleware,
  AnyAction,
} from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { ThunkDispatch } from "redux-thunk";
import thunk from "redux-thunk";
import todoReducer from "./to-dos";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const rootReducer = combineReducers({
  todos: todoReducer,
});

// export type RootState = ReturnType<typeof rootReducer>;

// const store = createStore(rootReducer, applyMiddleware(thunk)); old way to do it
const store = configureStore({ reducer: rootReducer, middleware: [thunk] });

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch | ThunkDispatch<RootState, unknown, AnyAction>;
export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;

// Use throughout your app instead of plain `useDispatch` and `useSelector`

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
