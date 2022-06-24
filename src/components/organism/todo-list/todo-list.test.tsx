import { render, screen } from "@testing-library/react"
import TodoList from "."

describe('TodoList test', () => {
    it('Render todo texts', async () => {
        render(<TodoList todoList={[{
            description: "Tarea",
            finish_at: "2022-06-24T15:56:29.000Z",
            id: 1,
            id_author: 44,
            status: 0
        }]} />)
        expect(screen.getByText('Tarea')).toBeInTheDocument();
    })
})