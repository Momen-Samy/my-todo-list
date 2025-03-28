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
import { v4 as uuidv4 } from "uuid";
import Grid from "@mui/material/Grid2";
import Todo from "./todo";
import { todosContext } from "@/app/Contexts/todoContext";
import { useState, useContext, useEffect } from "react";

export default function TodoList() {
  const [titleInput, setTitleInput] = useState("");
  const { todos, setTodos } = useContext(todosContext);
  const [typeOfTodos, setTypeOfTodos] = useState("all");

  useEffect(() => {
    const storageTodosData = JSON.parse(localStorage.getItem("todos") || "[]");
    setTodos(storageTodosData);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleAddClick() {
    const newTodo = {
      id: uuidv4(),
      title: titleInput,
      description: "",
      isCompleted: false,
    };
    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
    setTitleInput("");
  }

  const completedTask = todos.filter((todo) => todo.isCompleted);
  const unCompletedTask = todos.filter((todo) => !todo.isCompleted);
  let todosToBeRendered = todos;
  if (typeOfTodos === "completed") {
    todosToBeRendered = completedTask;
  } else if (typeOfTodos === "uncompleted") {
    todosToBeRendered = unCompletedTask;
  }

  return (
    <Container maxWidth="sm">
      <Card
        sx={{
          minWidth: "500px",
          wordBreak: "break-word",
          maxHeight: "80vh",
          overflowY: "scroll",
        }}
      >
        <CardContent>
          <Typography gutterBottom variant="h2">
            To Do List
          </Typography>
          <Divider sx={{ mt: "-36px" }} />
          <ToggleButtonGroup
            sx={{ mt: "30px" }}
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
  );
}
