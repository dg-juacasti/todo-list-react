import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import Typography from './components/atoms/typography'
import TodoForm from './components/organism/todo-form'
import TodoList from './components/organism/todo-list'
import { useList } from './hooks/useLists'
import { ITodoResponse } from './models'
import { COLORS } from './shared/theme/colors'

const App = () => {
  const { todos: todosList, refetch, loadingTodos } = useList()

  const [todos, setTodos] = useState<ITodoResponse[]>([])
  const [selectedTodo, setSelectedTodo] = useState<ITodoResponse>()

  useEffect(() => {
    setTodos(todosList)
  }, [todosList, loadingTodos])

  useEffect(() => {
    const execute = async () => {
      await refetch()
    }
    execute()
  }, [])

  const addTodo = (newTodo: ITodoResponse) => {
    const auxTodos = [...todos]
    auxTodos.push({
      id: newTodo.id,
      status: newTodo.status,
      description: newTodo.description,
      finish_at: new Date(newTodo.finish_at).toISOString().slice(0, 10),
    })
    setTodos(auxTodos)
  }

  return (
    <div className="app-container">
      <Typography
        align="center"
        fontSize="40"
        color={COLORS.textColor}
        lineHeight="48"
        className="title"
      >
        Todo List
      </Typography>
      <Router>
        <Switch>
          <Route exact path="/">
            <TodoList
              todoList={todos}
              onSelect={(todo: ITodoResponse) => setSelectedTodo(todo)}
            ></TodoList>
          </Route>
          <Route path="/create">
            <TodoForm onCreate={(todo: ITodoResponse) => addTodo(todo)}></TodoForm>
          </Route>
          <Route path="/edit">
            <TodoForm todoEdit={selectedTodo}></TodoForm>
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
