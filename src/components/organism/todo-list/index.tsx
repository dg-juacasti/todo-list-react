import { FC, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useList } from '../../../hooks/useLists'
import { ITodoResponse } from '../../../models'
import { COLORS } from '../../../shared/theme/colors'
import { Button } from '../../atoms/button'
import { Input } from '../../atoms/input'
import Typography from '../../atoms/typography'
import { Todo } from '../../molecules/todo'
import './index.css'
export interface TodoListProps {
  todoList: ITodoResponse[],
  setTodoToUpdate?(): void
}

const TodoList: FC<TodoListProps> = ({ todoList }) => {

  const history = useHistory()
  const {deleteTodo, updateTodo} = useList()
  const [searchText, setSearchText] = useState('')
  const [showOnlyNotCompleted, setShowOnlyNotCompleted] = useState(false)

  const goToCreate = () => {
    history.push('/create')
  }

  const changeCompletedFilter = () => {
    setShowOnlyNotCompleted(!showOnlyNotCompleted);
  }

  const filters = (list:ITodoResponse[]) => {
    let filtered:ITodoResponse[] = list;
    if(searchText !== '') filtered = filtered.filter(todo => todo.description.includes(searchText));
    if(showOnlyNotCompleted) filtered = filtered.filter(todo => todo.status === 0)
    return filtered;
  }

  return (
    <>
      <div className='row my-8'>
        <Input placeholder='Buscar tarea' onChange={setSearchText} />
        <Button onClick={goToCreate} ><i className="fa-solid fa-plus"></i></Button>
      </div>
      <div className='my-8'>
        <Button onClick={changeCompletedFilter} >
          {showOnlyNotCompleted ? 'Mostrar todos' : 'Mostrar no completados'}
        </Button>
      </div>
      <div>
        {filters(todoList).map((todo, index) =>
          <Todo key={index} isEven={index % 2 === 0} todo={todo} deleteTodo={deleteTodo} toggleComplete={updateTodo}/>
        )}
        {filters(todoList).length === 0 && <div className=''>
          <i style={{fontSize:24, color:COLORS.textColor, paddingBottom:12}} className='fa-solid fa-circle-info'></i>
          <Typography fontSize='24' color={COLORS.textColor2}>
            No tienes tareas registradas
          </Typography>
        </div>}
      </div>
    </>
  )
}

export default TodoList