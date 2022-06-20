import axios from 'axios';
const url = "http://localhost:5000/api/";

export const readTodos=()=>axios.get("http://localhost:5000/api/get/");
export const createTodos=newTodo=>axios.post(url,newTodo);
export const updateTodo=(id,updatedTodo) =>axios.patch(`${url}/${id}`,updatedTodo);
export const deleteTodo=(id) =>axios.delete(`${url}/${id}`);
