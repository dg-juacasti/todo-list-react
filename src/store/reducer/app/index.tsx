import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppState, ITodoResponse } from '../../../models'

const initialState: AppState = {
  todos: [],
  todosSearch: [],
  todosNoCompleted: [],
  selectedTodo: null
}

export const appSlice = createSlice({
	name: 'appStore',
	initialState,
	reducers: {
		setTodos: (state, action: PayloadAction<ITodoResponse[]>) => {
			state.todos = action.payload
		},
		setSelectedTodo: (state, action: PayloadAction<ITodoResponse>) => {
			state.selectedTodo = action.payload
		},
        setDeleteTodo: (state, action: PayloadAction<ITodoResponse>) => {
			state.todos = state.todos.filter( todo => todo.id !== action.payload.id )		
        },
		setTodosByDescription: ( state, action: PayloadAction<string> ) => {
			state.todosSearch = state.todos.filter( todo => todo.description.includes( action.payload ) )
		},
		setTodosNoCompleted: ( state  ) => {
			state.todosNoCompleted = state.todos.filter( todo => todo.status === 0 )
		}
	},
})

export const { setTodos, setSelectedTodo, setDeleteTodo, setTodosByDescription, setTodosNoCompleted } = appSlice.actions


export default appSlice.reducer