import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  Dispatch,
} from "react";

import { TodosReducer } from "@/app/Reducers/TodosReducer";
import { DialogsReducers } from "@/app/Reducers/DialogsReducers";

export type TodoType = {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
};

export type Action = {
  type: string;
  payLoad?: {
    titleInput?: string;
    id?: string;
    titleField?: string;
    descriptionField?: string;
  };
};

export type Alert = {
  deleteDilaogOpen: boolean;
  id?: string;
  titleField?: string;
  descriptionField?: string;
  updateDilaogOpen: boolean;
};

const initialValue = {
  deleteDilaogOpen: false,
  id: "",
  titleField: "",
  descriptionField: "",
  updateDilaogOpen: false,
};

type TodoContextType = {
  todos: TodoType[];
  dispatch: Dispatch<Action>;
};

type DialogContextType = {
  processType: Alert;
  dispatchProcessType: React.Dispatch<Action>;
};

const todosContext = createContext<TodoContextType>({
  todos: [],
  dispatch: () => {},
});

const dialogContext = createContext<DialogContextType>({
  processType: initialValue,
  dispatchProcessType: () => {},
});

export const useTodo = () => {
  return useContext(todosContext);
};

export const useDialog = () => {
  return useContext(dialogContext);
};

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, dispatch] = useReducer(TodosReducer, []);
  const [processType, dispatchProcessType] = useReducer(
    DialogsReducers,
    initialValue
  );

  useEffect(() => {
    dispatch({ type: "getDataFromStorage" });
  }, []);

  return (
    <todosContext.Provider value={{ todos, dispatch }}>
      <dialogContext.Provider value={{ processType, dispatchProcessType }}>
        {children}
      </dialogContext.Provider>
    </todosContext.Provider>
  );
};
