import { render, screen, act, fireEvent, waitFor } from "@testing-library/react"
import App from "../App"
import axios from "axios";
import { Input, InputProps } from "../components/atoms/input";
import { createTodo } from "../hooks/createTodo";
import { editTodo } from '../hooks/editTodo';
import { deleteTodoApi } from "../hooks/deleteTodo";
jest.mock('axios');
const mockHistory = jest.fn();

/**
 * Mock navigations
 */
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistory,
  }),
  useLocation: () => ({
    pathname: "/create",
    param: ''
  })
}));


describe('TodoList App tests', () => {
  /**
   * Test that the form shows all items todo
   */
  it('Should render a list with several todos', async () => {
    jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve(
      {
        data: {
          data: [
            {
              description: 'Test',
              finish_at: new Date().toString(),
              id: 1,
              id_author: 47,
              status: 0
            },
            {
              description: 'Test 3',
              finish_at: new Date().toString(),
              id: 2,
              id_author: 47,
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

  /**
   * Test that create a item list
   */
  it('Should create a new todo', async () => {
    const mockData = {
      description: 'Test',
      finish_at: new Date().toString(),
      id: 1,
      id_author: 47,
      status: 0
    }
    const mockResponse = { "success": true, "type": "task_created", "data": { "id": 645, "description": "Test", "status": 0, "id_author": 47, "finish_at": "2022-07-02T00:00:00.000Z", "created_at": "2022-06-24T18:06:51.000Z" } }
    const mockAxios = axios as jest.Mocked<typeof axios>;
    await act(async () => {
      const { refetch } = createTodo(mockData)
      mockAxios.post.mockReturnValueOnce(Promise.resolve(mockResponse))
      await refetch();
    })
    expect(mockAxios.post).toHaveBeenCalled();
  })

  /**
  * Test that the form shows the request messages when the form does not have the description and the date entered
 */
  it('Should validate the todo form, description and date required', async () => {
    const props: InputProps = {
      initialValue: 'Init',
      placeholder: 'Desc',
      type: 'text',
      onChange: jest.fn(),
      required: true
    }
    render(<Input {...props} />)
    const inputEle = screen.getByTestId('inputtest')
    await waitFor(() => {
      // eslint-disable-next-line testing-library/no-wait-for-side-effects
      fireEvent.blur(inputEle, { target: { value: '' } })
    })
    expect(screen.getByTestId('errorlabel')).toBeVisible()

  })

  /**
  * Test that update a item list
  */
  it('Should update a todo, description and date', async () => {
    const mockData = {
      description: 'Test',
      finish_at: new Date().toString(),
      id: 1,
      id_author: 47,
      status: 0
    }
    const mockResponse = { "success": true, "type": "task_edited", "data": { "id": 645, "description": "Test", "status": 0, "id_author": 47, "finish_at": "2022-07-02T00:00:00.000Z", "created_at": "2022-06-24T18:06:51.000Z" } }
    const mockAxios = axios as jest.Mocked<typeof axios>;
    await act(async () => {
      const { refetch } = editTodo(mockData)
      mockAxios.put.mockReturnValueOnce(Promise.resolve(mockResponse))
      await refetch();
    })
    expect(mockAxios.put).toHaveBeenCalled();
  })

  /**
    * Test that update a item list
    */
  it('Should delete a todo', async () => {
    const mockResponse = { "success": true, "type": "task_edited", "data": { "id": 645, "description": "Test", "status": 0, "id_author": 47, "finish_at": "2022-07-02T00:00:00.000Z", "created_at": "2022-06-24T18:06:51.000Z" } }
    const mockAxios = axios as jest.Mocked<typeof axios>;
    await act(async () => {
      const { refetch } = deleteTodoApi(1)
      mockAxios.delete.mockReturnValueOnce(Promise.resolve(mockResponse))
      await refetch();
    })
    expect(mockAxios.delete).toHaveBeenCalled();
  })


  it('Should update the todo status ', async () => {

  })

  it('Should show an message when  the todo list is empty  ', async () => {

  })

  /**
  * 
  * Probar que la barra de estado cambia cuando se completa una tarea  
  * se puede probar por el cambio en texto o por porcentaje de completitud
 */
  it('Should the progress bar change its label text or percentage when a todo is completed ', async () => {

  })

  /**
   * 
   * Probar el filtro de las tareas por descripcion
  */
  it('Should filter the todo list by description', async () => {

  })

  /**
   * 
   * Probar el filtro de tareas que falta por completar y que una vez esten filtradas a dar click nuevamente 
   * sobre el boton del filtro se muestren todos la lista nuevamente 
  */
  it('Should filter the todo list by completed status and toggle functionality button', async () => {

  })

})