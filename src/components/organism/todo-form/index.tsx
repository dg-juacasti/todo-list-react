import { FC, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ITodoResponse } from '../../../models'
import { savelist } from '../../../services/listService'
import { RootState } from '../../../store'
import { resetAll } from '../../../store/slices/form'

import { Button } from '../../atoms/button'
import { Input } from '../../atoms/input'
import Typography from '../../atoms/typography'
import './index.scss'

const TodoForm: FC = () => {
  const dispatch = useDispatch();
  const [todo, setTodo] = useState<ITodoResponse>({ description: '', finish_at: '', status: 0 })
  const { formlist } = useSelector((state: RootState) => state.form);
  const save = async () => {
    try {
      const formLists = {
        id: formlist.id,
        description: formlist.description,
        status: formlist.status,
        id_author: formlist.id_author,
        finish_at: formlist.finish_at
      };
      await savelist(formLists);
      dispatch(resetAll())
    } catch (error) { }

  };



  return <div className='todo-form'>
    <div className='todo-form-imput-container'>
      <Typography>
        Descripción
      </Typography>
      <Input placeholder='Descripción' initialValue={formlist.description}   property={'descripción'} />

    </div>
    <div className='todo-form-imput-container'>
      <Typography>
        Fecha limite
      </Typography>
      <Input placeholder='Fecha limite' type='date' initialValue={formlist.finish_at} property={'finish_at'} />
    </div>
    <div className='todo-form-button-container'>
      <Button onClick={save}> Agregar </Button>
    </div>
  </div>
}

export default TodoForm