import { configureStore } from "@reduxjs/toolkit";
import { formSlice } from "./slices/form";
import { listSlice } from "./slices/lists";



export const store = configureStore({
  reducer: {
    list: listSlice.reducer,
    form: formSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
