import axios from 'axios';
const url = "http://localhost:5000/api/";

export const readTodos=()=>axios.get("http://localhost:5000/api/gets/");
export const createTodos=newTodo=>axios.post(url,newTodo);
export const updateTodo=(id,updatedTodo) =>axios.patch(`${url}/${id}`,updatedTodo);
export const deleteTodo=(id) =>axios.delete(`${url}/${id}`);

// 1. git init

// 2. git add .

// 3. git status

// 4. git commit -m 'your message'

// 5. git remote add origin 'your_url_name' 

// 6. git push -u origin master //then login w/ your creds