import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import { useToast } from "@/Contexts/ToastContext";
import { useDialog, useTodo } from "@/Contexts/TodoContext";

export default function DeleteDilaog() {
  const { processType, dispatchProcessType } = useDialog();
  const { showHideToast } = useToast();
  const { dispatch } = useTodo();

  function handleDeleteClose() {
    dispatchProcessType({ type: "closeDeleteDialog" });
  }

  function handleDeleteConfirm() {
    console.log(processType.id);
    if (processType.id) {
      dispatch({
        type: "deleteTodo",
        payLoad: { id: processType.id },
      });
      showHideToast("The task has been deleted successfully.");
      dispatchProcessType({ type: "closeDeleteDialog" });
    }
  }

  return (
    <Dialog
      open={processType.deleteDilaogOpen}
      onClose={handleDeleteClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{ textTransform: "capitalize" }}
    >
      <DialogTitle id="alert-dialog-title">
        {"Are you sure you want to delete the task"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          you cannot undo the delete process
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDeleteClose}>close</Button>
        <Button
          onClick={() => handleDeleteConfirm()}
          autoFocus
          sx={{ color: "red" }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
