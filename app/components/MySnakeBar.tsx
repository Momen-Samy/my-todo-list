import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Alert } from "@mui/material";

type SnakeProp = {
  open: boolean;
  message: string;
};
export default function MySnakeBar({ open, message }: SnakeProp) {
  const action = (
    <>
      <Button color="secondary" size="small">
        UNDO
      </Button>
      <IconButton size="small" aria-label="close" color="inherit">
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        message="Note archived"
        action={action}
      >
        <Alert
          severity="success"
          variant="filled"
          sx={{ width: "100%", textTransform: "capitalize" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
