import { createContext } from "react";

type Todo = {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
};

type TodoContextType = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

export const todosContext = createContext<TodoContextType>({
  todos: [],
  setTodos: () => {},
});
