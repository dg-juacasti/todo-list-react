import { render, screen, act, waitFor, fireEvent } from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import App from "../App"
import axios from "axios";
import TodoForm from "../components/organism/todo-form";

describe('TodoList App tests', () => {

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
    expect(screen.getByText(/Test 3/)).toBeInTheDocument()
  })

  it('Should create a new todo', async () => {
    render(<TodoForm />)
    expect(screen.getByText(/Descripción/)).toBeInTheDocument()
  })

  /**
  * 
  * Probar que el formulario muestre los mensajes de requerimiento cuando 
  * el formulario no tenga la descripción y la fecha ingresada 
 */
  it('Should validate the todo form, description and date required', async () => {
    render(<TodoForm />)
    const button = screen.getByTestId('addNewTodo')
    await userEvent.click(button)
    expect(screen.getByText(/Descripción es requerida/)).toBeInTheDocument()
    expect(screen.getByText(/Fecha límite es requerida/)).toBeInTheDocument()
  })

  xit('Should update a todo, description and date', async () => {

  })


  xit('Should delete a todo', async () => {

  })

  /**
  * 
  * Probar que el formulario muestre los mensajes de requerimiento cuando 
  * el formulario no tenga la descripción y la fecha ingresada 
 */
  xit('Should update the todo status ', async () => {

  })

  xit('Should show an message when  the todo list is empty  ', async () => {

  })

  /**
  * 
  * Probar que la barra de estado cambia cuando se completa una tarea  
  * se puede probar por el cambio en texto o por porcentaje de completitud
 */
  xit('Should the progress bar change its label text or percentage when a todo is completed ', async () => {

  })

  /**
   * 
   * Probar el filtro de las tareas por descripcion
  */
  xit('Should filter the todo list by description', async () => {

  })

  /**
   * 
   * Probar el filtro de tareas que falta por completar y que una vez esten filtradas a dar click nuevamente 
   * sobre el boton del filtro se muestren todos la lista nuevamente 
  */
  xit('Should filter the todo list by completed status and toggle functionality button', async () => {

  })

})