
import { ITodoResponse } from "../models"
import axios from 'axios'
import { useState } from "react"
import { AUTHOR_ID, BASE_URL } from "../constants/app"

export const useList = () => {

  const [todos, setTodos] = useState<ITodoResponse[]>([])

  const refetch = () => {
    axios.get(`${BASE_URL}?id_author=${AUTHOR_ID}`)
      .then(res => {
        const data = res.data
        setTodos((data as any).data.map((todo: ITodoResponse): ITodoResponse => ({
          id: todo.id,
          status: todo.status,
          description: todo.description,
          finish_at: new Date(todo.finish_at).toISOString().slice(0, 10)
        }))
      )})
  }

  const postTodo = async (todo: ITodoResponse) => {
    const response = await axios.post(`${BASE_URL}?id_author=${AUTHOR_ID}`, {...todo, id_author: AUTHOR_ID})
    let returnedTodo : ITodoResponse = {
      id: 0,
      status: 0,
      description: '',
      finish_at: '',
      id_author: 0
    }
    if(response.data.success) {
      returnedTodo = {
        id: response.data.data.id,
        status: response.data.data.status,
        description: response.data.data.description,
        finish_at: response.data.data.finish_at,
        id_author: response.data.data.id_author,
      }
    }
    return returnedTodo
  }

  const updateTodo = (todo: ITodoResponse) => {
    axios.put(`${BASE_URL}${todo.id}`, {...todo, id_author: AUTHOR_ID})
  }

  const deleteTodo = (todo: ITodoResponse) => {
    axios.delete(`${BASE_URL}${todo.id}`)
  }

  return { todos, refetch, postTodo, deleteTodo, updateTodo}
}