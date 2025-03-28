"use client";
import TodoList from "./components/ToDoList";
import { TodoProvider } from "./Contexts/TodoContext";
import { ToastProvider } from "./Contexts/ToastContext";

export default function Home() {
  return (
    <TodoProvider>
      <ToastProvider>
        <TodoList />
      </ToastProvider>
    </TodoProvider>
  );
}
