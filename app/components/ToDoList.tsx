"use client";
import {
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";

import Grid from "@mui/material/Grid2";
import Todo from "./todo";
import { useState, useMemo } from "react";
import DeleteDilaog from "./DeleteDilaog";
import { useToast } from "@/app/Contexts/ToastContext";
import { useTodo } from "../Contexts/TodoContext";
import UpdateDialog from "./UpdateDialog";

export default function TodoList() {
  const [titleInput, setTitleInput] = useState("");
  const [typeOfTodos, setTypeOfTodos] = useState("all");
  const { showHideToast } = useToast();
  const { todos, dispatch } = useTodo();

  // Add New Todo
  function handleAddClick() {
    if (titleInput) {
      dispatch({ type: "addNewTodo", payLoad: { titleInput } });
      setTitleInput("");
      showHideToast("The task has been added successfully.");
    }
  }

  // Show Todos
  const completedTodos = useMemo(() => {
    return todos.filter((todo) => todo.isCompleted);
  }, [todos]);

  const unCompletedTodos = useMemo(() => {
    return todos.filter((todo) => !todo.isCompleted);
  }, [todos]);

  const todosToBeRendered =
    typeOfTodos === "completed"
      ? completedTodos
      : typeOfTodos === "uncompleted"
      ? unCompletedTodos
      : todos;

  return (
    <>
      <DeleteDilaog />
      <UpdateDialog />
      <Container maxWidth="sm">
        <Card
          sx={{
            wordBreak: "break-word",
            maxHeight: "80vh",
            overflowY: "scroll",
          }}
        >
          <CardContent>
            <Typography gutterBottom variant="h2" sx={{ textAlign: "center" }}>
              To Do List
            </Typography>
            <Divider sx={{ mt: "-36px" }} />
            <ToggleButtonGroup
              sx={{
                mt: "30px",
                mx: "auto",
                width: "fit-content",
                display: "block",
              }}
              color="secondary"
              value={typeOfTodos}
              exclusive
              onChange={(event, newAlignment) => {
                if (newAlignment !== null) {
                  setTypeOfTodos(newAlignment);
                }
              }}
            >
              <ToggleButton value="all">all</ToggleButton>
              <ToggleButton value="completed">completed</ToggleButton>
              <ToggleButton value="uncompleted">uncompleted</ToggleButton>
            </ToggleButtonGroup>

            {/* Start Show Todos List */}
            {todosToBeRendered.map((todo) => (
              <Todo key={todo.id} todo={todo} />
            ))}
            {/* End Show Todos List */}
          </CardContent>
          <Grid
            container
            spacing={1}
            sx={{ my: "20px" }}
            padding={1}
            alignItems={"center"}
          >
            <Grid size={3}>
              <Button
                onClick={handleAddClick}
                variant="contained"
                fullWidth
                size="medium"
                sx={{ bgcolor: "#f44336", color: "white", height: "52px" }}
              >
                Add
              </Button>
            </Grid>
            <Grid size={9}>
              <TextField
                value={titleInput}
                onChange={(event) => setTitleInput(event.target.value)}
                id="outlined-basic"
                label="Task Title"
                variant="outlined"
                fullWidth
              />
            </Grid>
          </Grid>
        </Card>
      </Container>
    </>
  );
}
