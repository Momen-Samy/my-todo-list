"use client";
import TodoList from "./components/ToDoList";
import { todosContext } from "@/app/Contexts/todoContext";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const initialTodos = [
  {
    id: uuidv4(),
    title: "Learning prog",
    description: "Front End React",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "Learning prog",
    description: "Front End React",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "Learning prog",
    description: "Front End React",
    isCompleted: false,
  },
];

export default function Home() {
  const [todos, setTodos] = useState(initialTodos);

  return (
    <todosContext.Provider value={{ todos, setTodos }}>
      <div className={`Main-Box `}>
        <TodoList />
      </div>
    </todosContext.Provider>
  );
}
