import { ITodoResponse } from "../models"
import axios from 'axios'
import { AUTHOR_ID, BASE_URL } from "../constants/app"

export const useCreateTodo = () => {

  const refetch = (payload: ITodoResponse) => 
    (axios.post(`${BASE_URL}?id_author=${AUTHOR_ID}`, {...payload, id_author: AUTHOR_ID}))
  
  return { refetch }
}