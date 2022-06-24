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

const TodoList: FC<TodoListProps> = ({ todoList:firstList, setList= ()=>{}}) => {
  const handleSearch = (e:React.ChangeEvent<HTMLInputElement>) => {
    const newlist = firstList.filter(element => element.description.includes(e.target.value ||''))
    setTodoList(newlist)
  }
  const handleFilter = () => {
    if(!filter){
      const newlist = firstList.filter(element => element.status===1)
      setFilter(!filter)
      return setTodoList(newlist)}
      setFilter(!filter)

    setTodoList(firstList)
  }
  const history = useHistory()
  const [filter, setFilter] = useState (false)
  const [progress, setProgress] = useState(0)
  const [todoList, setTodoList] = useState(firstList)
  useEffect(()=> {
    const completeTodos = todoList.filter(todo => todo.status===1)
    setProgress( Math.round(100*completeTodos.length/todoList.length))
  },[todoList])
  useEffect(()=> {
    setTodoList(firstList)
  },[firstList])
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
    setTodoList(newList)
  }
  return (
    <>
      <div className='my-8'>
        <Button onClick={goToCreate} ><i className="fa-solid fa-plus"></i></Button>
        <span>
          Progreso: {progress}%
        </span>
        <input type="text" onChange={e => handleSearch(e)}/>
        <label htmlFor="filter">Filtrar completados</label>
        <input type="checkbox" name="filter" id="filter" onChange={() => handleFilter()}/>
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