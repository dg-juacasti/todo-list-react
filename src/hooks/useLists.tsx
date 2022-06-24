
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
                  resolve({
                      description: item[0].description,
                      finish_at: new Date(item[0].finish_at).toISOString().slice(0, 10),
                      id: item[0].id,
                      id_author: item[0].id_author,
                      status: item[0].status,
                  });
              }).catch((error) => reject(error))
      })
  }
  return { todos, todo, refetch, find }
}
