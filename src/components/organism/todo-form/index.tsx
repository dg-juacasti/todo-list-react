import { FC, useState } from "react";
import { useList } from "../../../hooks/useLists";
import { ITodoResponse } from "../../../models";
import { COLORS } from "../../../shared/theme/colors";
import { Button } from "../../atoms/button";
import { Input } from "../../atoms/input";
import Typography from "../../atoms/typography";
import "./index.scss";

const TodoForm: FC = () => {
  const { sendToDo, editToDo } = useList();

  const queryParams = new URLSearchParams(window.location.search);
  const description = queryParams.get("desc");
  const date = queryParams.get("date");
  const taskId = queryParams.get("id");
  console.log(description, taskId, date);

  const [validate, setValidate] = useState(false);
  const [todo, setTodo] = useState<ITodoResponse>({
    description: "",
    finish_at: "",
    status: 0,
    id_author: 51,
  });
  const handleOnChange =
    (property: "description" | "finish_at") => (value: string) => {
      setTodo((current) => ({
        ...current,
        [property]: value,
      }));
    };

  const handleSend = async () => {
    if (todo.description.length !== 0 && todo.finish_at.length !== 0) {
      await sendToDo(todo);
      window.location.href = "/";
    } else {
      setValidate(true);
    }
  };
  const handleupdate = async () => {
    if (todo.description.length !== 0 && todo.finish_at.length !== 0) {
      await editToDo(parseInt(taskId!), todo);
      window.location.href = "/";
    } else {
      setValidate(true);
    }
  };

  return (
    <div className="todo-form">
      <div className="todo-form-imput-container">
        <Typography>Descripción</Typography>
        <Input
          placeholder="Descripción"
          initialValue={todo.description}
          onChange={handleOnChange("description")}
        />
        {validate && todo.description.length === 0 && (
          <Typography color={COLORS.error} fontSize="12">
            Descripción es requerida
          </Typography>
        )}
      </div>
      <div className="todo-form-imput-container">
        <Typography>Fecha limite</Typography>
        <Input
          placeholder="Fecha limite"
          type="date"
          initialValue={todo.finish_at}
          onChange={handleOnChange("finish_at")}
        />
        {validate && todo.finish_at.length === 0 && (
          <Typography color={COLORS.error} fontSize="12">
            Fecha límite es requerida
          </Typography>
        )}
      </div>
      <div className="todo-form-button-container">
        {description === null && date === null ? (
          <Button onClick={handleSend}> Agregar </Button>
        ) : (
          <Button onClick={handleupdate}> Actializar </Button>
        )}
      </div>
    </div>
  );
};

export default TodoForm;
