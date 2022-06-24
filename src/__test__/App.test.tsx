import { render, screen, act, fireEvent, getByText } from "@testing-library/react"
import App from "../App"
import axios from "axios";
import { MemoryRouter } from "react-router-dom";
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
    screen.getByText('Test')
    screen.getByText('Test 3')
  })

  it('Should create a new todo', async () => {
    jest.spyOn(axios, 'post').mockImplementation(() => Promise.resolve(
      {
        data: {
          success: true,
          data: {
            id: 30
          }
        }
      }
    ))
    render(<TodoForm />)
    const boton = screen.getByText('Agregar') as HTMLButtonElement
    fireEvent.click(boton)
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
    })
    // screen.getByText('Tarea creada')

  })

   /**
   * 
   * Probar que el formulario muestre los mensajes de requerimiento cuando 
   * el formulario no tenga la descripción y la fecha ingresada 
  */
  it('Should validate the todo form, description and date required', async () => {
    render(
      <TodoForm></TodoForm>
    );
    screen.getByText('Descripción es requerida');
    screen.getByText('Fecha límite es requerida');
  })

  it('Should update a todo, description and date', async () => {
    
  })


  it('Should delete a todo', async () => {
    
  })

   /**
   * 
   * Probar que el formulario muestre los mensajes de requerimiento cuando 
   * el formulario no tenga la descripción y la fecha ingresada 
  */
  it('Should update the todo status', async () => {
  })

  it('Should show an message when the todo list is empty', async () => {
    jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve(
      {
        data: {
          data: []
        }
      }));
    render(<App />)
    screen.getByText('Todo List')
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
    })
    screen.getByText('No tienes tareas registradas')
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
              description: 'Test 3',
              finish_at: new Date().toString(),
              id: 2,
              id_author: 1,
              status: 0
            },
            {
              description: 'Prueba filtrado',
              finish_at: new Date().toString(),
              id: 2,
              id_author: 1,
              status: 0
            }
          ]
        }
      }));
    render(<App />)
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
    })
    const input = screen.getByPlaceholderText('Buscar tarea') as HTMLInputElement
    fireEvent.change(input, {target: {value: 'Prueba'}})
    expect(input.value).toBe('Prueba')
    screen.getByText('Prueba filtrado')
    expect(screen.queryByText('Test 3')).not.toBeInTheDocument()
  })

  /**
   * 
   * Probar el filtro de tareas que falta por completar y que una vez esten filtradas a dar click nuevamente 
   * sobre el boton del filtro se muestren todos la lista nuevamente 
  */
  it('Should filter the todo list by completed status and toggle functionality button', async () => {
    jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve(
      {
        data: {
          data: [
            {
              description: 'Test 3',
              finish_at: new Date().toString(),
              id: 2,
              id_author: 1,
              status: 0
            },
            {
              description: 'Prueba filtrado',
              finish_at: new Date().toString(),
              id: 2,
              id_author: 1,
              status: 1
            }
          ]
        }
      }));
    render(<App />)
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
    })
    screen.getByText('Prueba filtrado')
    const boton = screen.getByText('Mostrar no completados') as HTMLButtonElement
    fireEvent.click(boton);
    expect(screen.queryByText('Mostrar no completados')).not.toBeInTheDocument()
    expect(boton.textContent).toBe('Mostrar todos')
    expect(screen.queryByText('Prueba filtrado')).not.toBeInTheDocument()
  })

})