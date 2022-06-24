import { FC, useState, useEffect } from "react";
import { AppState, ITodoResponse } from "../../../models";
import { Button } from "../../atoms/button";
import { Input } from "../../atoms/input";
import Typography from "../../atoms/typography";
import "./index.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useHistory } from "react-router-dom";

interface ITodoForm {
  create?: (todo: ITodoResponse) => void;
  edit?: (todo: ITodoResponse) => void;
}

const TodoForm: FC<ITodoForm> = ({ create, edit }) => {
  // const { create } = useCreate()

  // const { edit } = useEdit()

  const history = useHistory();

  const { selectedTodo } = useSelector<RootState, AppState>(
    (state) => state.app
  );

  const [todo, setTodo] = useState<ITodoResponse>({
    description: "",
    finish_at: "",
    status: 0,
  });

  useEffect(() => {
    if ( create ) {
      setTodo({
        description: "",
        finish_at: "",
        status: 0,
      })
    } else if (selectedTodo) {
      setTodo(selectedTodo);
    }
  }, []);

  const handleOnChange =
    (property: "description" | "finish_at") => (value: string) => {
      setTodo((current) => ({
        ...current,
        [property]: value,
      }));
    };

  return (
    <div className="todo-form">
      <div data-testid="itemName" className="todo-form-imput-container">
        <Typography>Descripción</Typography>
        {(!todo.description || todo.description === "") && (
          <div className="color" data-testid="vacio">Descripcion es requerido</div>
        )}
        <Input
          placeholder="Descripción"
          initialValue={todo.description}
          onChange={handleOnChange("description")}
        />
      </div>
      <div className="todo-form-imput-container">
        <Typography>Fecha limite</Typography>
        {(!todo.finish_at || todo.finish_at === "") && (
          <div className="color" data-testid="vacio">Fecha es requerido</div>
        )}
        <Input
          placeholder="Fecha limite"
          type="date"
          initialValue={todo.finish_at}
          onChange={handleOnChange("finish_at")}
        />
      </div>
      <div className="todo-form-button-container">
        <Button variant="secondary" onClick={() => history.goBack()}>
          Volver
        </Button>
        <Button
          onClick={() => {
            (create &&
              todo.description &&
              todo.description !== "" &&
              create(todo)) ||
              (edit &&
                todo.description &&
                todo.description !== "" &&
                edit(todo));
          }}
        >
          {" "}
          {create ? "Agregar" : "Editar"}
        </Button>
      </div>
    </div>
  );
};

export default TodoForm;
