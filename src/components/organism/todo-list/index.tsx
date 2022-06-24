import axios from 'axios'
import { FC, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { AUTHOR_ID, BASE_URL } from '../../../constants/app'
import { ITodoResponse } from '../../../models'
import { Button } from '../../atoms/button'
import { Todo } from '../../molecules/todo'
import './index.css'
export interface TodoListProps {
  todoList: ITodoResponse[];
  setList : any
}

const TodoList: FC<TodoListProps> = ({ todoList, setList= ()=>{}}) => {
  
  const history = useHistory()
  const [progress, setProgress] = useState(0)
  useEffect(()=> {
    const completeTodos = todoList.filter(todo => todo.status===1)
    setProgress( Math.round(100*completeTodos.length/todoList.length))
  },[todoList])
  const goToCreate = () => {
    history.push('/create')
  }
  const deleteTodo = async (todo:ITodoResponse) => {
    await axios.delete(
      `${BASE_URL}${todo.id}`,
    );
  }
  const checkTodo = async (todo:ITodoResponse) => {
    await axios.put(
      `${BASE_URL}${todo.id}`,
      { ...todo, id_author: AUTHOR_ID, status:todo.status===1?0:1 },
      { headers: { "Content-type": "application/json; charset=UTF-8" } }
    );
    const newList = todoList.map( e => e.id===todo.id?{...todo,status:todo.status===1?0:1}:e)
    setList(newList)
  }
  return (
    <>
      <div className='my-8'>
        <Button onClick={goToCreate} ><i className="fa-solid fa-plus"></i></Button>
        <span>
          Progreso: {progress}%
        </span>
      </div>
      <div>
        {todoList.map((todo, index) =>
          <Todo key={index} isEven={index % 2 === 0} todo={todo} deleteTodo={deleteTodo} toggleComplete={checkTodo}/>
        )}
        {todoList.length===0 && 'No hay Todos'}
      </div>
    </>
  )
}

export default TodoList