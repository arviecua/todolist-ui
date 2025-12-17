// import React from 'react'

import { useState } from "react"
import { Stack, Button, TextField, Container, Snackbar } from "@mui/material"
import { useAppDispatch } from "../app/hooks"
import { addTodo } from "../features/todo/todo-slice.ts" // Import the addTodo action
import { addTodosAPI } from "../features/todo/todo-api.ts"
import type ResponseType from "../types/Response.type.ts"
import ToDoType from "../types/Todo.type.ts"

const TodoInput: React.FC = () => {
  const dispatch = useAppDispatch()

  const [inputMessage, setInputMessage] = useState<string>("")
  const [open, setOpen] = useState(false)

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(event.target.value)
    // console.log(inputMessage);
  }

  const handleSubmit = async () => {
    if (inputMessage === "") {
      return
    }
    setOpen(true)
    try {
      const newTodo: ToDoType = {
        id: 0,
        message: inputMessage,
        isCompleted: false,
      }

      const AddTodoRes: ResponseType = await addTodosAPI(newTodo)
      if (AddTodoRes.status === "success") {
        dispatch(addTodo(AddTodoRes.payload as ToDoType))
        setInputMessage("")
      } else {
        alert(AddTodoRes.message)
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      alert(error.message)
    }
  }

  return (
    <Container>
      <Stack spacing={2} direction={{ xs: "column", sm: "row" }}>
        <TextField
          required
          placeholder="Add a todo message"
          id="todo-message"
          label="Todo Message"
          variant="outlined"
          color="secondary"
          sx={{ flexGrow: 1 }}
          size="small"
          value={inputMessage}
          onChange={handleOnChange}
          onKeyDown={event => {
            if (event.key === "Enter") {
              void handleSubmit()
            }

            if (event.key === "Escape") {
              setInputMessage("")
            }
          }}
        />

        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            void handleSubmit()
          }}
        >
          Add Todo
        </Button>
      </Stack>
      <Snackbar
        message="To Do Message Added"
        autoHideDuration={2000}
        open={open}
        onClose={() => {
          setOpen(false)
        }}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </Container>
  )
}

export default TodoInput
