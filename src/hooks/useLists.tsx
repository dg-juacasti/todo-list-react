import { ITodoResponse } from "../models";
import axios from "axios";
import { useState } from "react";
import { AUTHOR_ID, BASE_URL } from "../constants/app";

export const useList = () => {
  const [todos, setTodos] = useState<ITodoResponse[]>([]);

  const refetch = () => {
    axios.get(`${BASE_URL}?id_author=${AUTHOR_ID}`).then((res) => {
      console.log(res);

      const data = res.data;
      setTodos(
        (data as any).data.map(
          (todo: ITodoResponse): ITodoResponse => ({
            id: todo.id,
            status: todo.status,
            description: todo.description,
            finish_at: new Date(todo.finish_at).toISOString().slice(0, 10),
          })
        )
      );
    });
  };

  const sendToDo = async (data: ITodoResponse) => {
    await axios.post(`${BASE_URL}?id_author=${AUTHOR_ID}`, data);
  };

  const deleteToDo = async (taskid: number) => {
    await axios.delete(`${BASE_URL}${taskid}`).then(() => refetch());
  };

  const editToDo = async (taskid: number, newData: ITodoResponse) => {
    await axios.put(`${BASE_URL}${taskid}`, newData).then(() => refetch());
  };

  return { todos, refetch, sendToDo, deleteToDo, editToDo };
};
