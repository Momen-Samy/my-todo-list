import { v4 as uuidv4 } from "uuid";
import { TodoType, Action } from "../Contexts/TodoContext";

export function TodosReducer(
  currentTodos: TodoType[],
  { type, payLoad }: Action
) {
  switch (type) {
    case "getDataFromStorage": {
      const storageTodosData = JSON.parse(
        localStorage.getItem("todos") || "[]"
      );
      return storageTodosData;
    }

    case "addNewTodo": {
      const newTodo = {
        id: uuidv4(),
        title: payLoad?.titleInput,
        description: "",
        isCompleted: false,
      };
      const updatedTodo = [...currentTodos, newTodo];
      localStorage.setItem("todos", JSON.stringify(updatedTodo));
      return updatedTodo;
    }

    case "updateTodoState": {
      const updatedTodos = currentTodos.map((todo) => {
        if (todo.id === payLoad?.id) {
          return { ...todo, isCompleted: !todo.isCompleted };
        }
        return todo;
      });
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }

    case "deleteTodo": {
      const updatedTodos = currentTodos.filter(
        (todo) => todo.id !== payLoad?.id
      );
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }

    case "updateTodo": {
      const updatedTodos = currentTodos.map((todo) => {
        if (todo.id === payLoad?.id) {
          return {
            ...todo,
            title: payLoad?.titleField,
            description: payLoad?.descriptionField,
          };
        } else {
          return todo;
        }
      });
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }

    default:
      return currentTodos;
  }
}
