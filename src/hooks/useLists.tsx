import axios from 'axios'
import { useState } from 'react'
import { AUTHOR_ID, BASE_URL } from '../constants/app'
import { ITodoResponse } from '../models'

export const useList = () => {
  const [todos, setTodos] = useState<ITodoResponse[]>([])
  const [errorTodos, setErrorTodos] = useState(false)
  const [loadingTodos, setLoadingTodos] = useState(false)

  const refetch = async () => {
    setErrorTodos(false)
    setLoadingTodos(true)
    try {
      const res = await axios.get(`${BASE_URL}?id_author=${AUTHOR_ID}`)
      const data = res.data
      setTodos(
        (data as any).data.map(
          (todo: ITodoResponse): ITodoResponse => ({
            id: todo.id,
            status: todo.status,
            description: todo.description,
            finish_at: new Date(todo.finish_at).toISOString().slice(0, 10),
          })
        )
      )
      setLoadingTodos(false)
    } catch (e) {
      setErrorTodos(true)
      setLoadingTodos(false)
    }
  }
  return { todos, errorTodos, loadingTodos, refetch }
}
