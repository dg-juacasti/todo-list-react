import Typography from "./components/atoms/typography";
import { COLORS } from "./shared/theme/colors";
import TodoForm from "./components/organism/todo-form";
import TodoList from "./components/organism/todo-list";
import { AppState, ITodoResponse } from "./models";
import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { useList } from "./hooks/useLists";
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { setTodos, setTodosNoCompleted } from "./store/reducer/app";
import { RootState } from "./store";
import { useCreate } from "./hooks/useCreate";
import { useEdit } from "./hooks/useEdit";

const App = () => {

  const dispatch = useDispatch()

  const { todos: todosList, refetch } = useList()

  const { create } = useCreate()
  const { edit } = useEdit()

  const { todos: todosState } = useSelector<RootState, AppState>((state) => state.app)

  const createTodo = (todo: ITodoResponse) => {
    create(todo)
  }

  const editTodo= (todo: ITodoResponse) => {
    edit(todo)
  }

  const searchNoCompleted = () => {
    dispatch(setTodosNoCompleted())
    console.log('entraaa');
  }


  useEffect(() => {
    dispatch(setTodos(todosList))
  }, [todosList])

  useEffect(() => {
    refetch()
  }, [])

  return (
    <div className="app-container">
      <Typography align='center' fontSize='40' color={COLORS.textColor} lineHeight='48' className='title'>
        Todo List
      </Typography>
      <Router>
        <Switch>
          <Route exact path="/">
            <TodoList searchNoCompleted={searchNoCompleted} todoList={[...todosState]}></TodoList>
          </Route>
          <Route path="/create">
            <TodoForm create={createTodo}></TodoForm>
          </Route>
          <Route path="/edit">
            <TodoForm edit={editTodo}></TodoForm>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
