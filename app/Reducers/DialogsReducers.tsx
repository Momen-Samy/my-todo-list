import { Alert, Action } from "../Contexts/TodoContext";

export function DialogsReducers(
  currentState: Alert,
  { type, payLoad }: Action
) {
  switch (type) {
    case "closeDeleteDialog": {
      return {
        ...currentState,
        deleteDilaogOpen: false,
      };
    }

    case "openDeleteDialog": {
      return {
        ...currentState,
        deleteDilaogOpen: true,
        id: payLoad?.id,
      };
    }

    case "closeUpdateDialog": {
      return {
        ...currentState,
        updateDilaogOpen: false,
      };
    }

    case "openUpdateDialog": {
      return {
        ...currentState,
        updateDilaogOpen: true,
        id: payLoad?.id,
        titleField: payLoad?.titleField,
        descriptionField: payLoad?.descriptionField,
      };
    }

    default:
      return currentState;
  }
}
