import type ToDoType from "../../types/Todo.type"
import { getRequestJSON, postRequest } from "../../utils"
import { API_URL } from "../../constants"

/* const getTodosAPI =  () => {
    const todos = localStorage.getItem("todos");
    if(todos){
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return JSON.parse(todos)
    }else{
        return []
    }
}
 */

const getTodosAPI = async () => await getRequestJSON(`${API_URL}/todo/GetTodos`)

const addTodosAPI = async (todo: ToDoType) =>
  await postRequest(`${API_URL}/todo/AddTodo`, todo)

const editTodosAPI = async (todo: ToDoType) => await postRequest(`${API_URL}/todo/UpdateTodo`, todo)

const deleteTodosAPI = async (id: number) =>
  await postRequest(`${API_URL}/todo/DeleteTodo/${id}`,{})

/* const addTodosAPI = async (todo: ToDoType) : Promise<ResponseType> => {
    const todos = localStorage.getItem("todos");
    if(todos){
  
        const parsedTodos = JSON.parse(todos);
        localStorage.setItem("todos", JSON.stringify([...parsedTodos, todo]))
    }else{
        localStorage.setItem("todos", JSON.stringify([todo]))
    }

    const response: ResponseType = {
        status: "success",
        message: "Todo added successfully",
        payload: todo,
      }
      return response

} */

/* const editTodosAPI = async (todo: ToDoType): Promise<ResponseType> => {
  const todos = localStorage.getItem("todos")
  if (todos) {
    const parsedTodos = JSON.parse(todos)
    const updatedTodos = parsedTodos.map((t: ToDoType) =>
      t.id === todo.id ? todo : t,
    )

    localStorage.setItem("todos", JSON.stringify(updatedTodos))
  }

  const response: ResponseType = {
    status: "success",
    message: "Todo Edited successfully",
    payload: todo,
  }
  return response
} */

/* const deleteTodosAPI = async (id: string): Promise<ResponseType> => {
  const todos = localStorage.getItem("todos")
  if (todos) {
    // const parseTodos = JSON.parse(todos)
    // const updatedTodos = parseTodos.filter((todo: ToDoType) => todo.id !== id)
    // localStorage.setItem("todos", JSON.stringify(updatedTodos))
  }

  const response: ResponseType = {
    status: "success",
    message: "Todo Deleted successfully",
    payload: id,
  }

  return response
} */

export { getTodosAPI, addTodosAPI, editTodosAPI, deleteTodosAPI }
