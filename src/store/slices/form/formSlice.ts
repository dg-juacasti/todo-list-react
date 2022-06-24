import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const formSlice = createSlice({
  name: "form",
  initialState: {
    formlist: {
      id:"",
      description: "",
      status: 0,
      id_author: "52",
      finish_at: "",
    },
  },
  reducers: {
    setform: (state,action: PayloadAction<any>) => {
    
      if (action.payload.name === "descripción") {
        state.formlist.description = action.payload.value
      } else if (action.payload.name === "status") {
        state.formlist.status = action.payload.value
      } else {
        state.formlist.finish_at = action.payload.value
      }
    },
    resetAll: (state) => {
      state.formlist.id= ''
      state.formlist.description = ''
      state.formlist.status = 52
      state.formlist.finish_at = ''
    },
    setAll: (state,action: PayloadAction<any>) => {

      state.formlist.id= action.payload.id
      state.formlist.description = action.payload.description
      state.formlist.status = action.payload.status
      state.formlist.finish_at = action.payload.finish_at
    }
  },
  
  
});

export const { setform,setAll,resetAll } = formSlice.actions;
