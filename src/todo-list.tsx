import { useEffect, useState } from "react";
import { useEventEmitter } from "./events/useEventEmitter";

export const TodoList = () => {
  const [list, setList] = useState<string[]>([]);
  const { useListener } = useEventEmitter();

  useListener(
    "add",
    (todo: string) => {
      setList([...list, todo]);
    },
    [list]
  );

  const em = { useListener };

  useEffect(() => {
    console.log("em: ", em);
  }, [em]);

  return (
    <ul>
      {list.map((todo, i) => (
        <li key={i}>{todo.title}</li>
      ))}
    </ul>
  );
};
