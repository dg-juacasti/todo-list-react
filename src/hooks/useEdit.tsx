import { ITodoResponse } from "../models"
import axios from 'axios'
import { BASE_URL, AUTHOR_ID } from "../constants/app"

export const useEdit = () => {
  const edit = (todo: ITodoResponse) => {

    const body = {
      description: todo.description,
      finish_at: todo.finish_at,
      id_author: AUTHOR_ID
    }
    return axios.put(`${BASE_URL}${todo.id}`, {...todo, ...body})
  }

  return { edit }
}