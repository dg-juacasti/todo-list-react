import Typography from "./components/atoms/typography";
import { COLORS } from "./shared/theme/colors";
import TodoForm from "./components/organism/todo-form";
import TodoList from "./components/organism/todo-list";
import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { useList } from "./hooks/useLists";
import './App.css'
import { Todo } from "./components/molecules/todo";

const App = () => {

  const { refetch } = useList()

  useEffect(() => {
    refetch()
    // eslint-disable-next-line
  }, [])

  return (
    <div className="app-container">
      <Typography align='center' fontSize='40' color={COLORS.textColor} lineHeight='48' className='title'>
        Todo List
      </Typography>
      <Router>
        <Switch>
          <Route exact path="/">
            <TodoList ></TodoList>
          </Route>
          <Route path="/create">
            <TodoForm ></TodoForm>
          </Route>          
        </Switch>
      </Router>
    </div>
  );
}

export default App;
