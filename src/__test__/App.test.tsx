import {
  act,
  fireEvent,
  render,
  screen
  } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import axios from 'axios'
import App from '../App'
import TodoForm from '../components/organism/todo-form'

describe('TodoList App tests', () => {
  it('Should render a list with several todos', async () => {
    jest.spyOn(axios, 'get').mockImplementation(() =>
      Promise.resolve({
        data: {
          data: [
            {
              description: 'Test',
              finish_at: new Date().toString(),
              id: 1,
              id_author: 1,
              status: 0,
            },
            {
              description: 'Test 3',
              finish_at: new Date().toString(),
              id: 2,
              id_author: 1,
              status: 0,
            },
          ],
        },
      })
    )
    render(<App />)
    screen.getByText('Todo List')
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
    })
    screen.getByText('Test')
    screen.getByText('Test 3')
  })

  it('Should create a new todo', async () => {
    const spy = jest.spyOn(axios, 'post').mockImplementation(() =>
      Promise.resolve({
        data: {
          data: [
            {
              description: 'Test',
              finish_at: new Date().toString(),
              id: 1,
              id_author: 1,
              status: 0,
            },
            {
              description: 'Test 3',
              finish_at: new Date().toString(),
              id: 2,
              id_author: 1,
              status: 0,
            },
          ],
        },
      })
    )
    render(<TodoForm />)
    const description = screen.getByRole('textbox')
    const date = screen.getByPlaceholderText(/fecha limite/i)
    const button = screen.getByRole('button', { name: 'Agregar' })
    userEvent.type(description, 'Ejemplo 1')
    userEvent.click(date)
  })

  /**
   *
   * Probar que el formulario muestre los mensajes de requerimiento cuando
   * el formulario no tenga la descripción y la fecha ingresada
   */
  it('Should validate the todo form, description and date required', async () => {
    render(<TodoForm />)
    const description = screen.getByRole('textbox')
    const button = screen.getByRole('button', { name: 'Agregar' })
    userEvent.click(button)
    expect(screen.getByText('Descripción es requerida.')).toBeVisible()
    userEvent.type(description, 'Ejemplo 1')
    userEvent.click(button)
    expect(screen.getByText('Fecha es requerida.')).toBeVisible()
  })

  it('Should update a todo, description and date', async () => {
    const todoEdit = {
      description: 'Ejemplo 1',
      finish_at: '24/06/2023',
      status: 0,
    }
    render(<TodoForm todoEdit={todoEdit} />)
    const description = screen.getByRole('textbox')
    const date = screen.getByPlaceholderText(/fecha limite/i)

    expect(description).toHaveValue('Ejemplo 1')
    userEvent.type(description, '234')
    expect(description).toHaveValue('Ejemplo 1234')
  })

  it('Should delete a todo', async () => {
    jest.spyOn(axios, 'get').mockImplementation(() =>
      Promise.resolve({
        data: {
          data: [
            {
              description: 'Test',
              finish_at: new Date().toString(),
              id: 1,
              id_author: 1,
              status: 0,
            },
          ],
        },
      })
    )
    render(<App />)
    screen.getByText('Todo List')
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
    })
    expect(screen.getByText('Test')).toBeVisible()
    userEvent.click(screen.getByTestId('deleteButton-datatestid'))
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
    })
    // expect(screen.queryByText('Test')).toBeNull()
  })

  /**
   *
   * Probar que el formulario muestre los mensajes de requerimiento cuando
   * el formulario no tenga la descripción y la fecha ingresada
   */
  it('Should update the todo status ', async () => {})

  it('Should show an message when  the todo list is empty  ', async () => {
    jest.spyOn(axios, 'get').mockImplementation(() =>
      Promise.resolve({
        data: {
          data: [],
        },
      })
    )
    render(<App />)
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
    })
    expect(screen.getByText('No tienes tareas asignadas'))
  })

  /**
   *
   * Probar que la barra de estado cambia cuando se completa una tarea
   * se puede probar por el cambio en texto o por porcentaje de completitud
   */
  it('Should the progress bar change its label text or percentage when a todo is completed ', async () => {
    const spy = jest.spyOn(axios, 'get').mockImplementation(() =>
      Promise.resolve({
        data: {
          data: [
            {
              description: 'Test',
              finish_at: new Date().toString(),
              id: 1,
              id_author: 1,
              status: 0,
            },
            {
              description: 'Test 3',
              finish_at: new Date().toString(),
              id: 2,
              id_author: 1,
              status: 0,
            },
          ],
        },
      })
    )
    render(<App />)
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
    })
    expect(screen.getByText('0 de 2 tarea(s) completada(s)'))
    const check1 = screen.getAllByRole('checkbox')[0]
    const check2 = screen.getAllByRole('checkbox')[1]
    userEvent.click(check1)
    expect(screen.getByText('1 de 2 tarea(s) completada(s)'))
    userEvent.click(check2)
    expect(screen.getByText('2 de 2 tarea(s) completada(s)'))
  })

  /**
   *
   * Probar el filtro de las tareas por descripcion
   */
  it('Should filter the todo list by description', async () => {
    const spy = jest.spyOn(axios, 'get').mockImplementation(() =>
      Promise.resolve({
        data: {
          data: [
            {
              description: 'Test 1',
              finish_at: new Date().toString(),
              id: 1,
              id_author: 1,
              status: 0,
            },
            {
              description: 'Test 2',
              finish_at: new Date().toString(),
              id: 2,
              id_author: 1,
              status: 0,
            },
          ],
        },
      })
    )
    render(<App />)
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
    })
    expect(screen.getByText('Test 1')).toBeVisible()
    expect(screen.getByText('Test 2')).toBeVisible()

    const input = screen.getByRole('textbox')
    userEvent.type(input, 'Test')
    expect(screen.getByText('Test 1')).toBeVisible()
    expect(screen.getByText('Test 2')).toBeVisible()
    userEvent.type(input, ' 1')
    expect(screen.getByText('Test 1')).toBeVisible()
    expect(screen.queryByText('Test 2')).toBeNull()
  })

  /**
   *
   * Probar el filtro de tareas que falta por completar y que una vez esten filtradas a dar click nuevamente
   * sobre el boton del filtro se muestren todos la lista nuevamente
   */
  it('Should filter the todo list by completed status and toggle functionality button', async () => {
    const spy = jest.spyOn(axios, 'get').mockImplementation(() =>
      Promise.resolve({
        data: {
          data: [
            {
              description: 'Test',
              finish_at: new Date().toString(),
              id: 1,
              id_author: 1,
              status: 0,
            },
            {
              description: 'Test 3',
              finish_at: new Date().toString(),
              id: 2,
              id_author: 1,
              status: 0,
            },
          ],
        },
      })
    )
    render(<App />)
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
    })
    expect(screen.getByText('Test')).toBeVisible()
    expect(screen.getByText('Test 3')).toBeVisible()
    const check1 = screen.getAllByRole('checkbox')[0]
    const showAll = screen.getByText('Mostrar todos')
    const showNotCompleted = screen.getByText('Mostrar no completados')

    userEvent.click(check1)
    userEvent.click(showNotCompleted)
    expect(screen.queryByText('Test')).toBeNull()
    expect(screen.getByText('Test 3')).toBeVisible()
    userEvent.click(showAll)
    expect(screen.getByText('Test')).toBeVisible()
    expect(screen.getByText('Test 3')).toBeVisible()
  })
})
