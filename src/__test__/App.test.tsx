import {render, screen, act, fireEvent} from "@testing-library/react"
import App from "../App"
import axios from "axios";
import TodoForm from "../components/organism/todo-form";
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history'
import TodoList from "../components/organism/todo-list";
import userEvent from "@testing-library/user-event";
jest.mock('axios')
const mockAxios = axios as jest.Mocked<typeof axios>

describe('TodoList App tests', () => {
  const history = createMemoryHistory();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should render a list with several todos', async () => {
    jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve(
      {
        data: {
          data: [
            {
              description: 'Test',
              finish_at: new Date().toString(),
              id: 1,
              id_author: 1,
              status: 0
            },
            {
              description: 'Test 3',
              finish_at: new Date().toString(),
              id: 2,
              id_author: 1,
              status: 0
            }
          ]
        }
      }));
    render(<App />)
    screen.getByText('Todo List')
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
    })
    screen.getByText('Test')
    screen.getByText('Test 3')
  })

  it('Should create a new todo', async () => {
    jest.spyOn(axios, 'post').mockImplementation(() => Promise.resolve(
        {
          data: {
            "success": true,
            "type": "task_created",
            "data": {
              "id": 545,
              "description": "fdgdfg",
              "status": 0,
              "id_author": 39,
              "finish_at": "2022-06-25T00:00:00.000Z",
              "created_at": "2022-06-24T17:16:41.000Z"
            }
          }
        }));

    render(<Router history={history}>
      <TodoForm/>
    </Router>)

    await act(async () => {
      const descriptionInput = screen.getByTestId('input-description');
      const dateInput = screen.getByTestId('input-date');

      fireEvent.change(descriptionInput, {target: {value: 'Estudiar'}})
      fireEvent.change(dateInput, {target: {value: '10/06/2022'}})

      const btnCreate = screen.getByText('Agregar');
      await userEvent.click(btnCreate)
    })
  })

   /**
   * 
   * Probar que el formulario muestre los mensajes de requerimiento cuando 
   * el formulario no tenga la descripción y la fecha ingresada 
  */
  it('Should validate the todo form, description and date required', async () => {
    render(<Router history={history}>
      <TodoForm/>
    </Router>)
    const btnCreate = screen.getByText('Agregar');
    fireEvent.click(btnCreate);
    expect(screen.getByText('Descripción es requerida')).toBeInTheDocument();
    expect(screen.getByText('La fecha limite es requerida')).toBeInTheDocument();

  })

  it.skip('Should update a todo, description and date', async () => {
    jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve(
        {
          data: {
            "success": true,
            "type": "task_rows",
            "data": [
              {
                "id": 182,
                "description": "SDAD2",
                "status": 0,
                "id_author": 39,
                "finish_at": "2022-06-26T00:00:00.000Z",
                "created_at": "2022-06-24T15:47:52.000Z"
              },
              {
                "id": 545,
                "description": "fdgdfg",
                "status": 0,
                "id_author": 39,
                "finish_at": "2022-06-25T00:00:00.000Z",
                "created_at": "2022-06-24T17:16:41.000Z"
              }
            ]
          }
        }));

    render(<Router history={history}>
      <TodoForm/>
    </Router>)

    await act(async () => {
      const descriptionInput = screen.getByTestId('input-description');
      const dateInput = screen.getByTestId('input-date');

      fireEvent.change(descriptionInput, {target: {value: 'Estudiar'}})
      fireEvent.change(dateInput, {target: {value: '10/06/2022'}})

      const btnCreate = screen.getByText('Actualizar');
      await userEvent.click(btnCreate)
    })
  })


  it.skip('Should delete a todo', async () => {
    jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve(
        {
          data: {
            data: [
              {
                description: 'Dormir temprano',
                finish_at: new Date().toString(),
                id: 1,
                id_author: 1,
                status: 0
              },
              {
                description: 'Programar super app del banco',
                finish_at: new Date().toString(),
                id: 2,
                id_author: 1,
                status: 0
              }
            ]
          }
        }));
    jest.spyOn(axios, 'delete').mockImplementation(() => Promise.resolve(
        {
          data: {
            success: true,
            type: "task_removed",
            data: []
          }
        }));

    render(<App />)
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
    })

    const trashIcon = screen.getByTestId(`test-trash-2`);
    fireEvent.click(trashIcon)

    expect(screen.getByText('Dormir temprano')).toBeInTheDocument();
    expect(screen.queryByText('Programar super app del banco')).not.toBeInTheDocument();
  })

   /**
   * 
   * Probar que el formulario muestre los mensajes de requerimiento cuando 
   * el formulario no tenga la descripción y la fecha ingresada 
  */
  it('Should update the todo status', async () => {
    
  })

  it('Should show an message when the todo list is empty', async () => {
    render(<Router history={history}>
      <TodoList todoList={[]}/>
    </Router>)
    expect(screen.getByText('No tienes tareas registradas')).toBeInTheDocument();
  })

   /**
   * 
   * Probar que la barra de estado cambia cuando se completa una tarea  
   * se puede probar por el cambio en texto o por porcentaje de completitud
  */
  it('Should the progress bar change its label text or percentage when a todo is completed', async () => {
    
  })

  /**
   * 
   * Probar el filtro de las tareas por descripcion
  */
  it('Should filter the todo list by description', async () => {
    jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve(
        {
          data: {
            data: [
              {
                description: 'Dormir temprano',
                finish_at: new Date().toString(),
                id: 1,
                id_author: 1,
                status: 0
              },
              {
                description: 'Programar super app del banco',
                finish_at: new Date().toString(),
                id: 2,
                id_author: 1,
                status: 0
              }
            ]
          }
        }));
    render(<App />)
    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, {target: {value: 'Dormir'}})

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
    })

    expect(screen.getByText('Dormir temprano')).toBeInTheDocument();
    expect(screen.queryByText('Programar super app del banco')).not.toBeInTheDocument();
  })

  /**
   * 
   * Probar el filtro de tareas que falta por completar y que una vez esten filtradas a dar click nuevamente 
   * sobre el boton del filtro se muestren todos la lista nuevamente 
  */
  it('Should filter the todo list by completed status and toggle functionality button', async () => {
    
  })

})
