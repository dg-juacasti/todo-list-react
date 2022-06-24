import { FC } from 'react'
import { useHistory } from 'react-router-dom'
import { ITodoResponse } from '../../../models'
import { Button } from '../../atoms/button'
import { Todo } from '../../molecules/todo'
import './index.css'
import {Input} from "../../atoms/input";
import {useList} from "../../../hooks/useLists";
export interface TodoListProps {
    todoList: ITodoResponse[]
    onSearch?(value: string): void
    onUpdate?(): void
}

const TodoList: FC<TodoListProps> = ({ todoList, onSearch, onUpdate }) => {

  const history = useHistory()
    const { remove } = useList()

  const goToCreate = () => {
    history.push('/create')
  }

  const deleteTodo = (todo: ITodoResponse) => {
    if (!todo.id) {
        return;
    }
    remove(todo.id).then(() => {
        if (typeof onUpdate === 'function') {
            console.log('update1')
            onUpdate();
        }
    });
}



  return (
    <>
      <div className='my-8 flex'>
          <Input placeholder="Buscar tarea" width="100%" onChange={onSearch}/>
        <Button onClick={goToCreate} className="ml-1" ><i className="fa-solid fa-plus"></i></Button>
      </div>
      <div>
          {!todoList.length && <div className="note">
              <i className="fas fa-info-circle"></i>
            <h3>No tienes tareas registradas</h3>
          </div>}
        {todoList.map((todo, index) =>
          <Todo key={index} isEven={index % 2 === 0} todo={todo} deleteTodo={deleteTodo} />
        )}
      </div>
    </>
  )
}

export default TodoList
