import { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { filteredComplete } from '../../../store/slices/lists'
import { RootState } from '../../../store/store'
import { Button } from '../../atoms/button'
import { Input } from '../../atoms/input'
import { Todo } from '../../molecules/todo'
import './index.css'


const TodoList: FC = () => {
  const { list } = useSelector((state: RootState) => state.list);
  const history = useHistory()
  const dispatch = useDispatch();
  const goToCreate = () => {
    history.push('/create')
  }
  const filter = () => {
    dispatch(filteredComplete());
 };

  return (
    <>
      <div className='my-8 header'>
        <Input placeholder={'Buscar tarea'} width={'95%'}  values={'filter'}/>
        <Button onClick={goToCreate} ><i className="fa-solid fa-plus"></i></Button>
      </div>
      <div>
        {list.map((todo, index) =>
          <Todo key={index} isEven={index % 2 === 0} todo={todo} />
        )}
        <div className='buttons'>
          <div className='buttons__porcent'>0 de 3 tareas</div>
          <Button children={'Mostrar no completadas'} onClick={filter}/>
        </div>

      </div>
    </>
  )
}

export default TodoList