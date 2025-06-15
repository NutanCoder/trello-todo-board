import type { Todo } from "../types/todo";
import { api } from "../utils/api";

async function getAllTodos(): Promise<Todo[]> {
  const { data } = await api.get("/todos");
  return data.todos;
}

async function createTodo(
  todo: Omit<Todo, "id"> & { userId: number }
): Promise<Todo> {
  const { data } = await api.post("/todos/add", todo);
  return data;
}

async function updateTodo(
  id: string | number,
  updates: Partial<Todo>
): Promise<Todo> {
  const { data } = await api.put(`/todos/${id}`, updates);
  return data;
}

async function deleteTodo(id: string | number): Promise<void> {
  await api.delete(`/todos/${id}`);
}

export const todoService = {
  // Fetch all todos
  getAllTodos,

  // Create a new todo
  createTodo,

  // Update an existing todo
  updateTodo,

  // Delete a todo
  deleteTodo,
};
