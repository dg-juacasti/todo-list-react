import axios from 'axios'
import { AUTHOR_ID, BASE_URL } from "../constants/app"

export const useDelete = () => {

  const refetch = (id: number) => 
    (axios.delete(`${BASE_URL}${id}?${AUTHOR_ID}`))
  
  return { refetch }
}