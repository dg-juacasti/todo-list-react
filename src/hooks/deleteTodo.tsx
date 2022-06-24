
import axios from 'axios'
import { BASE_URL } from "../constants/app"

/**
 * consume the service delete list
 * @param taskId 
 * @returns 
 */
export const deleteTodoApi = (taskId: number | undefined) => {
    let refetch: any
    try {
        refetch = () => {
            axios.delete(`${BASE_URL}${taskId}`)
                .then(res => {
                    if (res.data.success) alert('Todo deleted')
                })
        }
    } catch (error) {
        console.error(error)
    }
    return { refetch }

}