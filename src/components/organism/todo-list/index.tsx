import { FC, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDelete } from '../../../hooks/useDelete';
import { useList } from "../../../hooks/useLists";
import { useCompletedTodo } from '../../../hooks/useCompletedTodo';
import { ITodoResponse } from '../../../models';
import { Button } from '../../atoms/button'
import Typography from '../../atoms/typography'
import { Todo } from '../../molecules/todo'
import './index.css'


const TodoList: FC<any> = ({ updateTodo }) => {

  const history = useHistory()

  const { todos, setTodos, refetch } = useList()
  const { refetch: onDelete } = useDelete()
  const { refetch: onCompleted } = useCompletedTodo()

  useEffect(() => {
    refetch()
    // eslint-disable-next-line
  }, [])

  const goToCreate = () => {
    history.push('/create')
  }

  const deleteTodo = async(todo: ITodoResponse) => {
    await onDelete(todo.id || -2)
    setTodos(current => {
      const data = current.filter(currentTodo => currentTodo.id !== todo.id)
      return data
    })
  }

  const toggleComplete = async(todo: ITodoResponse, status: boolean) => {
    await onCompleted(todo, status)
    await refetch()
  }

  const onUpdate = async (todo: ITodoResponse) => {
    await updateTodo(todo)
    history.push('/update')
  }

  return (
    <>
      <div className='my-8'>
        <Button onClick={goToCreate} ><i className="fa-solid fa-plus"></i></Button>
      </div>
      <div>
        {
          todos.length === 0 ?
            <Typography fontSize='32' color='skyblue' align='center'>No tienes tareas registradas</Typography>
          :
          todos.map((todo, index) =>
            <Todo key={index} isEven={index % 2 === 0} todo={todo} updateTodo={onUpdate} deleteTodo={deleteTodo} toggleComplete={toggleComplete}/>
          )
        }
      </div>
    </>
  )
}

export default TodoList