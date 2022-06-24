import { FC, useState } from 'react'
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

  const history = useHistory()

  const [search, setSearch] = useState('')
  const [searchTodoList, setSearchTodoList] = useState<ITodoResponse[]>([])

  const handleOnChange = (value: string) => {
    setSearch(value)
  }

  const searchTodo = (e: any) => {
    e.preventDefault();
    setSearchTodoList([])
    todoList.find(value => {
      if (value.description === search) {
        setSearchTodoList([value])
      } 
    })
  }

  const goToCreate = () => {
    history.push('/create')
  }

  return (
    <>
      <div className='my-8 search-button'>
        <form onSubmit={searchTodo}>
          <Input placeholder='Buscar tareas' initialValue={search} width='100%' onChange={handleOnChange} />
        </form>
        <Button onClick={goToCreate} ><i className="fa-solid fa-plus"></i></Button>
      </div>
      <div>
        {searchTodoList.length > 0 ?
          searchTodoList.map((todo, index) =>
            <Todo key={index} isEven={index % 2 === 0} todo={todo} />
          ): todoList.map((todo, index) =>
          <Todo key={index} isEven={index % 2 === 0} todo={todo} />
        )}
      </div>
    </>
  )
}

export default TodoList