import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import { Container, Stack, Typography } from "@mui/material";
import ChecklistIcon from "@mui/icons-material/Checklist";
import "./App.css";




export const App: React.FC = () => {

  return (
    <Container
      maxWidth="sm"
      sx={{
        paddingTop: 4,
        height: "100vh",
        paddingBottom: 6,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent={"left"}
        paddingLeft={3}
        marginBottom={2}
      >
        <Typography variant="h5" fontWeight="bold">
          To-Do List
        </Typography>
        <ChecklistIcon />
      </Stack>

      <TodoInput/>

      <TodoList />
    </Container>
  );
}

