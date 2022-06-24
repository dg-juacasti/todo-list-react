import { render, screen } from "@testing-library/react"
import { Todo } from "./todo"

describe('Todo test', () => {
    const todo = {
        description: "Tarea",
        finish_at: "2022-06-24T15:56:29.000Z",
        id: 1,
        id_author: 44,
        status: 0
    }
    it('Render todo texts', async () => {
        render(<Todo key="01" isEven={true} todo={todo}/>)
        expect(screen.getByText('Tarea')).toBeInTheDocument();
        expect(screen.getByText('2022-06-24T15:56:29.000Z')).toBeInTheDocument();
    })
})