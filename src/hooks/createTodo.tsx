
import { ITodoResponse } from "../models"
import axios from 'axios'
import { AUTHOR_ID, BASE_URL } from "../constants/app"

/**
 * consume the service create item list
 * @param todoData 
 * @returns 
 */
export const createTodo = (todoData: ITodoResponse) => {
    let refetch: any
    try {
        todoData.id_author = AUTHOR_ID
        refetch = () => {
            axios.post(`${BASE_URL}?id_author=${AUTHOR_ID}`, todoData)
                .then(res => {
                    if (res.data.success) alert('Todo created')
                })
        }
       
    } catch (error) {
        console.error(error)
    }
    return { refetch }
}