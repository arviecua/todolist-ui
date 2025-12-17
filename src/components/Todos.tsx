// import React from 'react'

import { Checkbox, IconButton, Snackbar, Stack, TextField, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from '@mui/icons-material/Save';
import { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { toggleTodo, editTodo, deleteTodo } from "../features/todo/todo-slice";
import { editTodosAPI, deleteTodosAPI } from "../features/todo/todo-api";


interface TodosProps {
  id: number,
  todoMessage: string,
  isCompleted: boolean,
  showSnackbar: (message: string) => void;
}


const Todos: React.FC<TodosProps> = (props) => {

  const dispatch = useAppDispatch();
  const {id, todoMessage, isCompleted, showSnackbar} = props;
  // const [isCompleted, setIsCompleted] = useState(false);
  const [newMessage, setNewMessage] = useState<string>(todoMessage);
  const [isEditing, setIsEditing] = useState(false);
  // const [snackbar, setSnackbar] = useState({
  //   open: false,
  //   message: ''
  // });



  const handleChangeNewMessage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewMessage(event.target.value);
};

  const handleToggleTodo = async () => {
    try{

    
      const updatedTodo = {
        id,
        message: newMessage,
        isCompleted: !isCompleted
      }

      const response = await editTodosAPI(updatedTodo);
      if(response.status === 'success'){
        dispatch(toggleTodo(id));
      }else{
        alert(response.message)
      }


    }catch(error: any){
      alert(error.message)
    }
    // setIsCompleted(!isCompleted);
  };

  const handleEditClick = () =>{
    setIsEditing(true);
  }

  const handleSaveClick =  async () => {
    try{

      if(todoMessage === newMessage ){
        setIsEditing(false);
        return;
      }

      const updatedTodo = {
        id,
        message: newMessage,
        isCompleted: isCompleted
      }
      const response = await editTodosAPI(updatedTodo);
      if(response.status === 'success'){
        dispatch(editTodo(updatedTodo));
        setIsEditing(false)
        showSnackbar("To Do Edited Successfully");
      }else{
        alert(response.message)
      }
     

    }catch(error: any){
      alert(error.message)
    }

    
  }

  const handleDeleteTodo = async () => {
   try{

    const response = await deleteTodosAPI(id);
    if(response.status === 'success'){
      
      showSnackbar("To Do Deleted Successfully");
      dispatch(deleteTodo(id));
      
    }else{
      alert(response.message)
    }
    
   }catch(error: any){
    alert(error.message)
   }
  }



  return (
    <>
      <Stack
        direction={{ xs: "row" }}
        alignItems="center"
        justifyContent="space-between"
        spacing={1}
      >
        <Stack
          direction={{ xs: "row" }}
          alignItems="center"
          spacing={1}
          sx={{ flexGrow: 1 }}
        >
          <Checkbox
            size="small"
            color="secondary"
            checked={isCompleted}
            onClick={() => { void handleToggleTodo();}}
            // onClick={() => { dispatch(toggleTodo(id))}}
          />
          {isEditing ? 
          
            <TextField
              variant="outlined"
              color="secondary"
              size="small"
              value={newMessage}
              onChange={handleChangeNewMessage}
              onKeyDown={(event: React.KeyboardEvent<HTMLDivElement>) => {
                if(event.key === 'Enter'){
                  void handleSaveClick();
                }
              }}
              fullWidth
              autoFocus
            />   
          :<Typography
            variant="body1"
            sx={{
              textDecoration: isCompleted ? "line-through" : "none",
              textAlign: "left",
              wordBreak: "break-word",
              overflowWrap: "break-word",
              whiteSpace: "normal",
            }}
          >
            {todoMessage}
          </Typography>}
        </Stack>


        <IconButton onClick={isEditing ? handleSaveClick : handleEditClick} >
          {isEditing ? <SaveIcon/>  : <EditIcon />}
        </IconButton>

        <IconButton onClick={() => {void handleDeleteTodo(); }}>
          <CloseIcon />
        </IconButton>
      </Stack>
      {/* <Snackbar 
        message={snackbar.message}
        autoHideDuration={2000}
        open={snackbar.open}
        onClose={() => {
            setSnackbar({...snackbar, open: false});
        }}
        anchorOrigin={{
          vertical: 'bottom'
          ,horizontal: 'center'
        }}
      /> */}
      
    </>
  )
}

export default Todos
