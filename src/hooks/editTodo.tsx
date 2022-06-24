

import axios from 'axios'
import { AUTHOR_ID, BASE_URL } from "../constants/app"
import { ITodoResponse } from "../models"

/**
 * consume the service edit list
 * @param todoData 
 * @returns 
 */
export const editTodo = (todoData: ITodoResponse) => {
    let refetch: any
    try {
        todoData.id_author = AUTHOR_ID
        refetch = () => {
            axios.put(`${BASE_URL}${todoData.id}`, todoData)
                .then(res => {
                    if (res.data.success) alert('Todo edited')
                })
        }

    } catch (error) {
        console.error(error)
    }
    return { refetch }
}