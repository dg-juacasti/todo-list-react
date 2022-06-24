import { render, screen, act, fireEvent } from "@testing-library/react"
import userEvent from '@testing-library/user-event';
import App from "../App"
import axios from "axios";

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
    expect(screen.getByText('Todo List')).toBeVisible()
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
    })
    expect(screen.getByText('Test')).toBeVisible()
    expect(screen.getByText('Test 3')).toBeVisible()
  })

  it('Should create a new todo', async () => {
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
    jest.spyOn(axios, 'post').mockImplementation(() => Promise.resolve(
      {
        data: {
          description: 'Test 4',
          finish_at: new Date().toString(),
          id: 1,
          id_author: 1,
          status: 0
        }
      }));
    render(<App />)
    expect(screen.getByText('Todo List')).toBeVisible()
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
    })
    fireEvent.click(screen.getByRole('button'))
    expect(screen.getByText('Descripción')).toBeVisible()
    expect(screen.getByText('Fecha limite')).toBeVisible()
    userEvent.type(screen.getByPlaceholderText('Descripción'), 'Test 4')
    userEvent.type(screen.getByPlaceholderText('Fecha limite'), '2021-12-04')
    const button = screen.getByText('Agregar')
    expect(button).toBeEnabled()
    await fireEvent.click(button)
  })

  /**
  * 
  * Probar que el formulario muestre los mensajes de requerimiento cuando 
  * el formulario no tenga la descripción y la fecha ingresada 
 */
  it('Should validate the todo form, description and date required', async () => {
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
    expect(screen.getByText('Todo List')).toBeVisible()
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
    })
    fireEvent.click(screen.getByRole('button'))
    const button = screen.getByText('Agregar')
    expect(button).toBeDisabled()
    expect(screen.getByText('El campo descripcion es requerido')).toBeInTheDocument()
    expect(screen.getByText('El campo fecha es requerido')).toBeInTheDocument()
    userEvent.type(screen.getByPlaceholderText('Descripción'), 'Test 4')
    expect(screen.queryByText('El campo descripcion es requerido')).not.toBeInTheDocument()
    expect(screen.getByText('El campo fecha es requerido')).toBeInTheDocument()
    userEvent.type(screen.getByPlaceholderText('Fecha limite'), '2021-12-04')
    expect(screen.queryByText('El campo descripcion es requerido')).not.toBeInTheDocument()
    expect(screen.queryByText('El campo fecha es requerido')).not.toBeInTheDocument()
    expect(button).toBeEnabled()
    fireEvent.click(screen.getByText('Volver'))
  })

  it('Should update a todo, description and date', async () => {
  })


  it('Should delete a todo', async () => {
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
    jest.spyOn(axios, 'delete').mockImplementation(() => Promise.resolve(
      {
        data: {}
      }));
    const { container } = render(<App />)
    expect(screen.getByText('Todo List')).toBeVisible()
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
    })
    const deleteButtons = container.getElementsByClassName('icon-button fa-solid fa-trash-can')
    await fireEvent.click(deleteButtons[0])
    expect(screen.queryByText('Test')).not.toBeInTheDocument()
  })

  /**
  * 
  * Probar que el formulario muestre los mensajes de requerimiento cuando 
  * el formulario no tenga la descripción y la fecha ingresada 
 */
  it('Should update the todo status', async () => {
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
    jest.spyOn(axios, 'put').mockImplementation(() => Promise.resolve(
      {
        data: {
          description: 'Test 3',
          finish_at: new Date().toString(),
          id: 1,
          id_author: 1,
          status: 1
        }
      }));
    jest.spyOn(axios, 'get').mockImplementationOnce(() => Promise.resolve(
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
              status: 1
            }
          ]
        }
      }));
    render(<App />)
    expect(screen.getByText('Todo List')).toBeVisible()
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
    })
    const checkboxs = screen.getAllByRole('checkbox')
    fireEvent.click(checkboxs[0])
    await expect(screen.getByText('Test 3')).toHaveStyle('text-decoration: line-through')
  })

  it('Should show an message when  the todo list is empty', async () => {
    jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve(
      {
        data: {
          data: []
        }
      }));
    render(<App />)
    expect(screen.getByText('Todo List')).toBeVisible()
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
    })
    expect(screen.getByText('No tienes tareas registradas')).toBeVisible()
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