import axios from "axios";
import React, { FC, useState } from "react";
import { useParams } from "react-router-dom";
import { AUTHOR_ID, BASE_URL } from "../../../constants/app";
import { ITodoResponse } from "../../../models";
import { Button } from "../../atoms/button";
import { Input } from "../../atoms/input";
import Typography from "../../atoms/typography";
import "./index.scss";

const TodoForm: FC = () => {
  const params:any = useParams();
  const [todo, setTodo] = useState<ITodoResponse>({
    description: "",
    finish_at: "",
    status: 0,
  });
  const [ok, setOk] = useState("");
  const handleOnChange =
    (property: "description" | "finish_at") => (value: string) => {
      setTodo((current) => ({
        ...current,
        [property]: value,
      }));
    };
  const onSubmit = async () => {
    if (!todo.description || !todo.finish_at) {
      return setOk("Todos los campos son obligatorios");
    }
    try {
      console.log(params)
      if (params.id) {
        await axios.put(
          `${BASE_URL}${params.id}`,
          { ...todo, id_author: AUTHOR_ID },
          { headers: { "Content-type": "application/json; charset=UTF-8" } }
        );
        setOk("Actualizado correctamente");
      } else {
        await axios.post(
          `${BASE_URL}?id_author=${AUTHOR_ID}`,
          { ...todo, id_author: AUTHOR_ID },
          { headers: { "Content-type": "application/json; charset=UTF-8" } }
        );
        setOk("Creado correctamente");
      }
    } catch (e) {
      setOk("Algo ha ido mal");
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
          data-testid="descriptionInput"
        />
      </div>
      <div className="todo-form-imput-container">
        <Typography>Fecha limite</Typography>
        <Input
          placeholder="Fecha limite"
          type="date"
          initialValue={todo.finish_at}
          onChange={handleOnChange("finish_at")}
        />
      </div>
      <div className="todo-form-button-container">
        <Button onClick={onSubmit}> Agregar </Button>
      </div>
      <span >{ok || null}</span>
    </div>
  );
};

export default TodoForm;
