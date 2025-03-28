import "./IconsStyle.css";
import { Card, CardContent, IconButton, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import CheckIcon from "@mui/icons-material/Check";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useTodo, useDialog, TodoType } from "../Contexts/TodoContext";
import { useToast } from "../Contexts/ToastContext";

type TodoProps = {
  todo: TodoType;
};

export default function Todo({ todo }: TodoProps) {
  const { showHideToast } = useToast();
  const { dispatch } = useTodo();
  const { dispatchProcessType } = useDialog();

  function updateTodoState() {
    dispatch({ type: "updateTodoState", payLoad: { id: todo.id } });
    showHideToast("Modified successfully");
  }

  function openDeleteDialog() {
    dispatchProcessType({
      type: "openDeleteDialog",
      payLoad: { id: todo.id },
    });
  }

  function openUpdateDialog() {
    dispatchProcessType({
      type: "openUpdateDialog",
      payLoad: {
        id: todo.id,
        titleField: todo.title,
        descriptionField: todo.description,
      },
    });
  }

  return (
    <>
      <Card
        sx={{
          minWidth: 200,
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
          <Grid
            container
            sx={{ display: "flex", justifyContent: "space-between" }}
            className="container-of-card-at-Mobile"
          >
            <Grid
              size={8}
              display="flex"
              alignItems={"flex-start"}
              flexDirection="column"
            >
              <Typography variant="h5">{todo.title}</Typography>
              <Typography variant="h5">{todo.description}</Typography>
            </Grid>
            <Grid
              size={4}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
              className="buttons-in-card"
            >
              <IconButton
                onClick={updateTodoState}
                sx={{
                  color: todo.isCompleted ? "white" : "#8bc34a",
                  bgcolor: todo.isCompleted ? "#8bc34a" : "white",
                  border: `3px solid #8bc34a`,
                }}
                className="IconButton"
              >
                <CheckIcon />
              </IconButton>
              <IconButton
                onClick={() => openUpdateDialog()}
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
                onClick={() => openDeleteDialog()}
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
