import { FC, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { ITodoResponse } from '../../../models'
import { Button } from '../../atoms/button'
import { Input } from '../../atoms/input'
import { CardComplete } from '../../molecules/card-completed'
import { Todo } from '../../molecules/todo'
import './index.css'
export interface TodoListProps {
  todoList: ITodoResponse[]
}

const TodoList: FC<TodoListProps> = ({ todoList }) => {

  console.log(todoList)

  useEffect(() => {
    const numberElementsCompleted = todoList.filter(value => value.status !== 0)
    setNumberElementsCompleted(numberElementsCompleted.length)
  }, [])
  

  const history = useHistory()

  const [search, setSearch] = useState('')
  const [searchTodoList, setSearchTodoList] = useState<ITodoResponse[]>([])
  const [numberElementsCompleted, setNumberElementsCompleted] = useState(0)

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
      <div>
        <CardComplete numberElements={todoList.length} numberElementsCompleted={numberElementsCompleted} />
      </div>
    </>
  )
}

export default TodoList