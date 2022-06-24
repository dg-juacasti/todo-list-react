import axios from 'axios'
import { FC, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Styles from './index.styles'
import { BASE_URL } from '../../../constants/app'
import { useList } from '../../../hooks/useLists'
import { ITodoResponse } from '../../../models'
import { Button } from '../../atoms/button'
import { Input } from '../../atoms/input'
import Typography from '../../atoms/typography'
import { Todo } from '../../molecules/todo'

export interface TodoListProps {
  todoList: ITodoResponse[]
  onSelect?: (arg: ITodoResponse) => void
}

const TodoList: FC<TodoListProps> = ({ todoList, onSelect = undefined }) => {
  const history = useHistory()

  const { refetch } = useList()

  const [inputData, setInputData] = useState('')
  const [filteredList, setFilteredList] = useState(todoList)
  const [countCompleted, setCountCompleted] = useState(0)

  useEffect(() => {
    const execute = async () => {
      await refetch()
    }
    execute()
  }, [])

  useEffect(() => {
    handleFilterDescription()
  }, [inputData, todoList])

  const goToCreate = () => {
    history.push('/create')
  }

  const handleFilterUncompleted = () => {
    let filter: ITodoResponse[] = []
    todoList.forEach((todo) => {
      if (todo.status === 0) filter.push(todo)
    })
    setFilteredList(filter)
  }

  const handleFilterDescription = () => {
    let filter: ITodoResponse[] = []
    if (!inputData) {
      setFilteredList(todoList)
      return
    }
    todoList.forEach((todo) => {
      if (todo.description.includes(inputData)) filter.push(todo)
    })
    setFilteredList(filter)
  }

  const toggleCompleteTask = (index: number) => {
    let newList = [...todoList]
    newList[index].status = newList[index].status === 1 ? 0 : 1
    setFilteredList(newList)
    handleCountCompleted()
  }

  const handleCountCompleted = () => {
    let count = 0
    todoList.forEach((todo) => {
      if (todo.status === 1) count += 1
    })
    setCountCompleted(count)
  }

  const handleShowAll = () => {
    setFilteredList(todoList)
  }

  const handleEditTask = (task: ITodoResponse) => {
    if (typeof onSelect === 'function') {
      onSelect(task)
      history.push('/edit')
    }
  }

  const handleDeleteTask = async (task: ITodoResponse, index: number) => {
    try {
      let newList = [...filteredList]
      newList.splice(index, 1)
      setFilteredList(newList)
      await axios.delete(BASE_URL + task.id)
      await refetch()
    } catch (e) {}
  }

  return (
    <Styles>
      <div className="todoList__bar">
        <div className="todoList__bar__button">
          <Input initialValue={inputData} onChange={setInputData} />
        </div>
        <Button onClick={goToCreate}>
          <i className="fa-solid fa-plus"></i>
        </Button>
      </div>
      {todoList.length === 0 && (
        <div className="todoList__empty">
          <i className="fa-solid fa-info"></i>
          <Typography fontSize="24">No tienes tareas asignadas</Typography>
        </div>
      )}
      {todoList.length > 0 && (
        <>
          <div className="todoList__list">
            {filteredList.map((todo, index) => (
              <Todo
                key={index}
                isEven={index % 2 === 0}
                todo={todo}
                editTodo={() => handleEditTask(todo)}
                deleteTodo={() => handleDeleteTask(todo, index)}
                toggleComplete={() => toggleCompleteTask(index)}
              />
            ))}
          </div>
          <div className="todoList__progress">
            <p className="todoList__progress__count">
              {countCompleted} de {todoList.length} tarea(s) completada(s)
              <span className="todoList__progress__count--progress" />
            </p>
            <div className="todoList__buttons">
              <div className="todoList__buttons__button">
                <Button onClick={handleFilterUncompleted}>
                  <p style={{ margin: 0, marginRight: '0.4rem' }}>Mostrar no completados</p>
                  <i className="fa-solid fa-plus"></i>
                </Button>
              </div>
              <div className="todoList__buttons__button">
                <Button onClick={handleShowAll}>
                  <p style={{ margin: 0, marginRight: '0.4rem' }}>Mostrar todos</p>
                  <i className="fa-solid fa-plus"></i>
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </Styles>
  )
}

export default TodoList
