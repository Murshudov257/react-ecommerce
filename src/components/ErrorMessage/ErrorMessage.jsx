import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import "./ErrorMessage.css";

function ErrorMessage() {
  return (
    <Stack className="error-box" spacing={2}>
      <Alert variant="filled" severity="error">
        Something went wrong...
      </Alert>
    </Stack>
  );
}

export default ErrorMessage;