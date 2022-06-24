import axios from 'axios'
import { AUTHOR_ID, BASE_URL } from "../constants/app"
import { ITodoResponse } from '../models'

export const useCompletedTodo = () => {

  const refetch = (payload: ITodoResponse, status: boolean) => 
    (axios.put(`${BASE_URL}${payload.id}?id_author=${AUTHOR_ID}`, {...payload, status: status ? 1 : 0 , id_author: AUTHOR_ID}))
  
  return { refetch }
}