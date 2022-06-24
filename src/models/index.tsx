export interface ITodoResponse {
  description: string
  finish_at: string
  id?: number
  id_author?: number
  status: number
}

export interface AppState {
  todos: ITodoResponse[];
  todosSearch: ITodoResponse[];
  todosNoCompleted: ITodoResponse[];
	selectedTodo: ITodoResponse | null;
}
