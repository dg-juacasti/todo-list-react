import { ITodoResponse } from "../models"
import axios from 'axios'
import { AUTHOR_ID, BASE_URL } from "../constants/app"

export const useUpdateTodo = () => {

  const refetch = (payload: ITodoResponse) => 
    (axios.put(`${BASE_URL}${payload.id}?id_author=${AUTHOR_ID}`, {...payload, id_author: AUTHOR_ID}))
  
  return { refetch }
}