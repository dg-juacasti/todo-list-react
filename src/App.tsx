import Typography from "./components/atoms/typography";
import { COLORS } from "./shared/theme/colors";
import TodoForm from "./components/organism/todo-form";
import TodoList from "./components/organism/todo-list";
import { ITodoResponse } from "./models";
import { useEffect, useState } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import { useList } from "./hooks/useLists";
import './App.css'

const App = () => {

  const { todos: todosList, refetch } = useList()

  const [todos, setTodos] = useState<ITodoResponse[]>([])
  const history = useHistory()

  useEffect(() => {
    setTodos(todosList)
  }, [todosList])

  useEffect(() => {
    refetch()
    // eslint-disable-next-line
  }, [])

  const goToCreate = () => {
    history.push('/create')
  }

  return (
    <div className="app-container">
      <Typography align='center' fontSize='40' color={COLORS.textColor} lineHeight='48' className='title'>
        Todo List
      </Typography>
      <Router>
        <Switch>
          <Route exact path="/">
            <TodoList todoList={[...todos]} setTodos={setTodos} ></TodoList>
          </Route>
          <Route path="/create">
            <TodoForm setTodos={setTodos} ></TodoForm>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
