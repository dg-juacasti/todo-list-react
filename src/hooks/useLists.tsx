
import { ITodoResponse } from "../models"
import axios from 'axios'
import { useState } from "react"
import { AUTHOR_ID, BASE_URL } from "../constants/app"

export const useList = () => {

    const [todos, setTodos] = useState<ITodoResponse[]>([])
    const [todo, setTodo] = useState<ITodoResponse>();

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

  const find = (id: number): Promise<ITodoResponse> => {
      return new Promise((resolve, reject) => {
          axios.get(`${BASE_URL}?id_author=${AUTHOR_ID}`)
              .then(res => {
                  const {data} = res.data
                  const item = data.filter((aux: any) => aux.id == id);
                  if (!item.length) {
                      return reject();
                  }

                  setTodo(item[0]);
                  console.log({todo});
                  resolve(formatTodo(item[0]));
              }).catch((error) => reject(error))
      })
  }

  const create = (todo: ITodoResponse) => {
      return new Promise((resolve, reject) => {
          axios.post(`${BASE_URL}?id_author=${AUTHOR_ID}`, {...{id_author: AUTHOR_ID}, ...todo})
              .then(res => {
                  setTodo(formatTodo(res.data.data));
              }).catch((error) => reject(error))
      })
  }

  const formatTodo = (todo: {
      id: number;
      description: string;
      status: number;
      id_author: number;
      finish_at: Date;
      created_at: Date;
  }) => {
      return {
          id: todo.id,
          status: todo.status,
          description: todo.description,
          finish_at: new Date(todo.finish_at).toISOString().slice(0, 10)
      }
  }
  return { todos, todo, refetch, find, create }
}
