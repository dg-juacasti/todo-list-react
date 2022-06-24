import { ITodoResponse } from "../models"
import axios from 'axios'
import { BASE_URL, AUTHOR_ID } from "../constants/app"

export const useCreate = () => {

  const create = (todo: ITodoResponse) => {
    const body = {
      description: todo.description,
      status: 0,
      id_author: AUTHOR_ID,
      finish_at: todo.finish_at
    }
    return axios.post(`${BASE_URL}?id_author=${AUTHOR_ID}`, body)
  }

  return { create }
}