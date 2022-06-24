import axios from 'axios'
import { BASE_URL } from "../constants/app"
import { ITodoResponse } from '../models'

export const useRemove = () => {

  const remove = (todo: ITodoResponse) => {

    return axios.delete(`${BASE_URL}${todo.id}`)
  }

  return { remove }
}