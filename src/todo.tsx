import React from "react";
import { EventEmitterRC } from "./events/EventEmitterRC";
import { useEventEmitter } from "./events/useEventEmitter";
import { TodoForm } from "./todo-form";
import { TodoList } from "./todo-list";

export const Todo = () => {
  const { emitter } = useEventEmitter();

  return (
    <EventEmitterRC value={emitter}>
      <TodoForm />
      <TodoList />
    </EventEmitterRC>
  );
};
