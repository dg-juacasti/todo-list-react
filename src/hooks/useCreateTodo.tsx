
import { ITodoResponse } from "../models"
import axios from 'axios'
import { useState } from "react"
import { AUTHOR_ID, BASE_URL } from "../constants/app"

export const useCreateTodo = () => {

  const [newResponse, setNewResponse] = useState()

  const refetchCreateTodo = (body: ITodoResponse ) => {
    axios.post(`${BASE_URL}?id_author=${AUTHOR_ID}`, body)
      .then((res: any) => 
        setNewResponse(res)
      )
  }
  return { newResponse, refetchCreateTodo }
}