import { Provider } from "react-redux";
import * as context from "../../store";
import { render, screen } from "@testing-library/react";
import { Todo } from "../../components/molecules/todo";
import { ITodoResponse } from "../../models";

describe("<Todo/>", () => {
  const mockTodo: ITodoResponse = {
    description: "Todo",
    finish_at: "12/15/99",
    status: 0,
  };

  it("should render a todo object", () => {
    render(
      <Provider store={context.store}>
        <Todo todo={mockTodo} isEven={true} />
      </Provider>
    );
    const itemName = screen.getByTestId("itemName");

    expect(itemName).toHaveTextContent(mockTodo.description);
  });
});
