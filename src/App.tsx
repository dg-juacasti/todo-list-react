import Typography from "./components/atoms/typography";
import { COLORS } from "./shared/theme/colors";
import TodoForm from "./components/organism/todo-form";
import TodoList from "./components/organism/todo-list";
import { ITodoResponse } from "./models";
import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route, useHistory,
} from "react-router-dom";
import { useList } from "./hooks/useLists";
import './App.css'

const App = () => {

  const { todos: todosList, refetch } = useList()

  const [todos, setTodos] = useState<ITodoResponse[]>([])

  useEffect(() => {
    setTodos(todosList)
  }, [todosList])

  useEffect(() => {
    refetch()
    // eslint-disable-next-line
  }, [])

  const search = (value: string) => {
    const list = todosList.filter((item: ITodoResponse) => item.description.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) > -1);
    setTodos(list);
  }

  const create = (todo: ITodoResponse) => {
    console.log('create todo', todo);
  }

  return (
    <div className="app-container">
      <Typography align='center' fontSize='40' color={COLORS.textColor} lineHeight='48' className='title'>
        Todo List
      </Typography>
      <Router>
        <Switch>
          <Route exact path="/">
            <TodoList todoList={[...todos]} onSearch={search}></TodoList>
          </Route>
          <Route path="/create">
            <TodoForm onCreate={create}></TodoForm>
          </Route>
          <Route path="/update/:id">
            <TodoForm onCreate={create}></TodoForm>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
