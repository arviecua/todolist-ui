import ToDoType from "../../types/Todo.type";
import type StatusType from "../../types/Status.type";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getTodosAPI } from "./todo-api";

interface ITodoState {
    todos: Array<ToDoType>
    todoStatus: StatusType,
    todoStatMessage: String
}

const initialState: ITodoState = {
    todos: [],
    todoStatus: "idle",
    todoStatMessage: ""
}

export const getTodosAsync = createAsyncThunk<Array<ToDoType>>(
    "todo/getTodosAsync",
    async () => await getTodosAPI()
);

export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo: (state, { payload }: PayloadAction<ToDoType>) => {
            state.todos.push(payload);
        },
        toggleTodo: (state, { payload }: PayloadAction<number>) => {
            // const todo = state.todos.find(todo => todo.id === payload);
            // if(todo){
            //     todo.isCompleted = !todo.isCompleted;
            // }
            state.todos = state.todos.map(todo => 
                todo.id === payload
                ? {
                    ...todo,
                    isCompleted: !todo.isCompleted
                 }
                 : todo
            );
        },
        editTodo: (state, { payload }: PayloadAction<ToDoType>) => {
            state.todos = state.todos.map(todo => 
                todo.id === payload.id
                ? {
                    ...todo,
                    message: payload.message,
                    isCompleted: payload.isCompleted
                } 
                : todo
            )
        },
        deleteTodo: (state, {payload}: PayloadAction<number>) => {
            state.todos = state.todos.filter(todo => todo.id !== payload);
        }

    },
    extraReducers: builder => {
        builder.addCase(getTodosAsync.fulfilled, (state,action) => {
            state.todoStatus = "idle";
            state.todos = action.payload;
        })
        .addCase(getTodosAsync.pending, (state) => {
            state.todoStatus = "loading";
        
        })
        .addCase(getTodosAsync.rejected, (state) => {
            state.todoStatus = "failed";
            state.todoStatMessage = "Error fetching todos"
        });
    }
});


export const { addTodo, toggleTodo, editTodo, deleteTodo } = todoSlice.actions;