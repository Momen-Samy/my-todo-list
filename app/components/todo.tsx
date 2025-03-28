import "./IconsStyle.css";
import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import CheckIcon from "@mui/icons-material/Check";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { todosContext } from "@/app/Contexts/todoContext";
import { useContext, useState } from "react";

type TodoProps = {
  todo: {
    id: string;
    title: string;
    description: string;
    isCompleted: boolean;
  };
};

export default function Todo({
  todo: { title, description, id, isCompleted },
}: TodoProps) {
  const { todos, setTodos } = useContext(todosContext);

  function updateTodoState() {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isCompleted = !todo.isCompleted;
      }
      return todo;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }
  //  Start  Delete Section
  const [showDeleteDialog, setshowDeleteDialog] = useState(false);

  function handleDeleteClose() {
    setshowDeleteDialog(false);
  }

  function handleDeleteClick() {
    setshowDeleteDialog(true);
  }

  function handleDeleteConfirm() {
    setshowDeleteDialog(false);
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }
  //  End  Delete Section //
  //  Start  Update Section //
  const [showUpdateDialog, setshowUpdateDialog] = useState(false);
  const [updateTodo, setUpdateTodo] = useState({
    title: title,
    description: description,
  });

  function handleUpdateClose() {
    setshowUpdateDialog(false);
  }
  function handleUpdateClick() {
    setshowUpdateDialog(true);
  }
  function handleUpdateConfrim() {
    setshowUpdateDialog(false);
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          title: updateTodo.title,
          description: updateTodo.description,
        };
      } else {
        return todo;
      }
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }
  // End  Update Section //
  return (
    <>
      {/* Start Delete Dialog */}
      <Dialog
        open={showDeleteDialog}
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
      {/* End Delete Dialog */}
      {/* Start Update Dialog */}
      <Dialog
        open={showUpdateDialog}
        onClose={handleUpdateClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ textTransform: "capitalize" }}
      >
        <DialogTitle id="alert-dialog-title">{"Update The Task "}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <TextField
              value={updateTodo.title}
              onChange={(event) =>
                setUpdateTodo({ ...updateTodo, title: event?.target.value })
              }
              autoFocus
              required
              margin="dense"
              id="name"
              label="task title"
              fullWidth
              variant="standard"
              sx={{ textTransform: "capitalize" }}
            />
            <TextField
              onChange={(event) =>
                setUpdateTodo({
                  ...updateTodo,
                  description: event?.target.value,
                })
              }
              value={updateTodo.description}
              autoFocus
              required
              margin="dense"
              id="name"
              label="task description"
              fullWidth
              variant="standard"
              sx={{ textTransform: "capitalize" }}
            />
          </DialogContentText>
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
      {/* End Update Dialog */}
      <Card
        sx={{
          minWidth: 275,
          bgcolor: "#283593",
          color: "white",
          mt: 5,
          transition: "0.4s",
          "&:hover": {
            paddingY: "15px",
            boxShadow: " 0px 7px 7px rgb(0, 0, 0, 0.4);",
          },
        }}
      >
        <CardContent>
          <Grid container spacing={0}>
            <Grid
              size={8}
              display="flex"
              alignItems={"flex-start"}
              flexDirection="column"
            >
              <Typography variant="h5">{title}</Typography>
              <Typography variant="h5">{description}</Typography>
            </Grid>
            <Grid
              size={4}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              <IconButton
                onClick={updateTodoState}
                aria-label="delete"
                sx={{
                  color: isCompleted ? "white" : "#8bc34a",
                  bgcolor: isCompleted ? "#8bc34a" : "white",
                  border: `3px solid #8bc34a`,
                }}
                className="IconButton"
              >
                <CheckIcon />
              </IconButton>
              <IconButton
                onClick={handleUpdateClick}
                aria-label="delete"
                sx={{
                  color: "#1769aa",
                  bgcolor: "white",
                  border: "3px solid #1769aa",
                }}
                className="IconButton"
              >
                <ModeEditOutlinedIcon />
              </IconButton>
              <IconButton
                onClick={handleDeleteClick}
                aria-label="delete"
                sx={{
                  color: "#b23c17",
                  bgcolor: "white",
                  border: "3px solid #b23c17",
                }}
                className="IconButton"
              >
                <DeleteOutlinedIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
