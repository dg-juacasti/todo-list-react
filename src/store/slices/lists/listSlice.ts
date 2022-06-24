import { createSlice } from "@reduxjs/toolkit";

export const listSlice = createSlice({
  name: "list",
  initialState: {
    list: [],
    loading: false,
  },
  reducers: {
    setList: (state, action) => {
      state.loading = false;
      state.list = action.payload;
    },
    filteredComplete: (state) => {
 
      state.list = state.list.filter((p: any) =>
        p.description.toLowerCase().includes('0')
      );
    },
    filteredList: (state, action) => {
      console.log(state.list);
      state.list = state.list.filter((p: any) =>
        p.description.toLowerCase().includes(action.payload)
      );
    },
  },
});

export const { setList, filteredList, filteredComplete } = listSlice.actions;
