import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

import { useToast } from "@/Contexts/ToastContext";
import { useDialog, useTodo } from "@/Contexts/TodoContext";
import { useEffect, useState } from "react";

export default function UpdateDialog() {
  const { processType, dispatchProcessType } = useDialog();
  const { showHideToast } = useToast();
  const { dispatch } = useTodo();

  const [updateFields, setUpdateFields] = useState({
    titleField: processType.titleField,
    descriptionField: processType.descriptionField,
  });

  useEffect(() => {
    setUpdateFields({
      titleField: processType.titleField || "",
      descriptionField: processType.descriptionField || "",
    });
  }, [processType]);

  function handleUpdateClose() {
    dispatchProcessType({ type: "closeUpdateDialog" });
  }

  function handleUpdateConfrim() {
    dispatch({
      type: "updateTodo",
      payLoad: {
        id: processType.id,
        titleField: updateFields.titleField,
        descriptionField: updateFields.descriptionField,
      },
    });
    showHideToast("The task has been Modified successfully.");
    dispatchProcessType({ type: "closeUpdateDialog" });
  }
  return (
    <Dialog
      open={processType.updateDilaogOpen}
      onClose={handleUpdateClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{ textTransform: "capitalize" }}
    >
      <DialogTitle id="alert-dialog-title">{"Update The Task "}</DialogTitle>
      <DialogContent>
        <div id="alert-dialog-description">
          <TextField
            value={updateFields.titleField}
            onChange={(event) =>
              setUpdateFields({
                ...updateFields,
                titleField: event?.target.value,
              })
            }
            autoFocus
            required
            margin="dense"
            label="task title"
            fullWidth
            variant="standard"
            sx={{ textTransform: "capitalize" }}
          />
          <TextField
            value={updateFields.descriptionField}
            onChange={(event) =>
              setUpdateFields({
                ...updateFields,
                descriptionField: event?.target.value,
              })
            }
            autoFocus
            required
            margin="dense"
            label="task description"
            fullWidth
            variant="standard"
            sx={{ textTransform: "capitalize" }}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleUpdateClose} sx={{ color: "red" }}>
          close
        </Button>
        <Button onClick={() => handleUpdateConfrim()} autoFocus>
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}
