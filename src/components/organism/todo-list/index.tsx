import { FC, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useList } from '../../../hooks/useLists'
import { ITodoResponse } from '../../../models'
import { Button } from '../../atoms/button'
import { Input } from '../../atoms/input'
import { Todo } from '../../molecules/todo'
import { BASE_URL } from '../../../constants/app' 
import Typography from '../../atoms/typography' 
import { COLORS } from '../../../shared/theme/colors' 
import './index.css'
export interface TodoListProps {
  todoList: ITodoResponse[],
  setTodos:any,
  // goToCreate: any
}

const TodoList: FC<TodoListProps> = ({ todoList, setTodos }) => {

  const[todoSearch, setTodoSearch]=useState('')    
  const[deleted, setdeleted]=useState(false)
  const history = useHistory()
  const { todos: todosListI, refetch } = useList()

  const goToCreateI = () => {
    history.push('/create')
  }

  const handleSearch =(value:string)=>{
    setTodoSearch(value)
  }

  useEffect(() => {
    refetch()
    }, [])

    useEffect(() => {
      refetch()
      }, [deleted])

  useEffect(() => {
    //  refetch()
    setTodos(todosListI)
    console.log(todosListI)
  }, [todosListI])

  
  const searchTodo = (e:any)=>{
    e.preventDefault();
    let newList :ITodoResponse[]=[]
    // console.log(todosListI)
    if (todoSearch.length > 0) {
      todosListI.map((todo, index) =>{
       if (todo.description.match(todoSearch)){
         newList.push({
          description: todo.description,
          finish_at: todo.finish_at,
          id: todo.id,
          id_author: todo.id_author,
          status: todo.status
         })
       }
      })
      setTodos(newList)
    } 
    else
      {  setTodos(todosListI) }
  }

  const deleteTodoCurrent= (todo:ITodoResponse ) =>{
    console.log("eliminando:", `${BASE_URL}/${todo.id}`)
    fetch(
      `${BASE_URL}${todo.id}`,
      {
        method: "DELETE"
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((resultadoDelete) => {
        alert("Eliminado");
        setdeleted(!deleted)
        // setTodos(todosListI)
        
      })
      .catch((error) => {
        console.log("Hubo un error" + error);
      });
  }


  return (
    <>
      <div className='my-8'>
      <form className='form_input' onSubmit={(e) => searchTodo(e)}>
        <Input
         width='95%'
         placeholder='Buscar tarea'
         onChange={(event)=>handleSearch(event)}
         />
        </form> 
        <Button  id="newButton" onClick={goToCreateI} ><i className="fa-solid fa-plus "></i></Button>
      </div>
      {
        (todoList.length===0)?
       (
        <>
          <Typography align='center' fontSize='20' color={COLORS.textColor} lineHeight='48' className='title'>
            No tiene tareas registradas
          </Typography>
        </>
       ):      
       (
        <div>
          {todoList.map((todo, index) =>
            <Todo deleteTodo={()=>deleteTodoCurrent(todo)} key={index} isEven={index % 2 === 0} todo={todo} />
          )}
        </div>
      )
     }
    </>
  )
}

export default TodoList