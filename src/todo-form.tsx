import { FormEvent, useState } from "react";
import { useEventEmitter } from "./events/useEventEmitter";

export const TodoForm = () => {
  const { emit } = useEventEmitter();

  const [title, setTitle] = useState("");

  function handleAddTodo(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    emit("add", {
      title
    });
    setTitle("");
  }

  return (
    <form onSubmit={handleAddTodo}>
      <div>
        <label htmlFor={"title"}>标题：</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          id={"title"}
        />
        <button type={"submit"}>添加</button>
      </div>
    </form>
  );
};
