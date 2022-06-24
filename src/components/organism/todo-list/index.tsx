import { FC, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { ITodoResponse } from '../../../models'
import { Button } from '../../atoms/button'
import { Input } from '../../atoms/input'
import { Todo } from '../../molecules/todo'
import './index.css'
export interface TodoListProps {
  todoList: ITodoResponse[]
}

const TodoList: FC<TodoListProps> = ({ todoList }) => {

  const [valSearch, setValSearch] = useState('')
  const history = useHistory()

  /**
   * Go to create page
   */
  const goToCreate = () => {
    history.push('/create')
  }

  /**
   * Assign value to search
   * @param event 
   */
  const handleOnChange = (event: any) => {
    const val = event.target.value
    setValSearch(val)
  }



  return (
    <>
    <div className='flex-search'>
    <input placeholder='Buscar Tarea' className='input' value={valSearch} onChange={handleOnChange} />
      <div className='my-8'>
        <Button onClick={goToCreate} ><i className="fa-solid fa-plus"></i></Button>
      </div>
    </div>
    
      <div>
        {todoList.filter((val) => {
          return valSearch === "" ? val : val.description.toLowerCase().includes(valSearch.toLowerCase())? val : ""
        }).map((todo, index) =>
          <Todo key={index} isEven={index % 2 === 0} todo={todo} />
        )}
      </div>
    </>
  )
}

export default TodoList