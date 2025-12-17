import { Stack, Box, Snackbar } from "@mui/material";
import Todos from "./Todos";
import { useAppSelector , useAppDispatch} from "../app/hooks";
import { useEffect } from "react";
import { getTodosAsync } from "../features/todo/todo-slice";
import Loader from "./Loader";
import { useState } from "react";





const TodoList: React.FC = () => {

  const {todos, todoStatMessage, todoStatus} = useAppSelector((state) => state.todo );
  const dispatch = useAppDispatch();  

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: ''
  });
  
  const showSnackbar = (message: string) => {
    setSnackbar({ open: true, message });
  };
  

  useEffect(() => {
    dispatch(getTodosAsync())
  }, [dispatch])

  if(todoStatus === "loading"){
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <Loader />
      
      </Box>
      )
  }

  return (
    <>
   
    <Stack
      spacing={1}
      sx={{
        padding: 2,
        flexGrow: 1,
        overflow: "scroll",
        scrollbarWidth: "none",
      }}
    >

      {todos.map((todo)=>{
        return (
          <Todos 
          key={todo.id} 
          id={todo.id}
          todoMessage={todo.message}
          isCompleted={todo.isCompleted} 
          showSnackbar={showSnackbar}
          />
        )
      })}

    </Stack>
    <Snackbar 
      message={snackbar.message}
      autoHideDuration={2000}
      open={snackbar.open}
      onClose={() => {setSnackbar({ ...snackbar, open: false })}}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    />
    </>

    
  );
};

export default TodoList;
