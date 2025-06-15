import { createSlice } from "@reduxjs/toolkit";
import type { Todo } from "../types/todo";

interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}

const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null,
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setTodos: (state, action) => {
      state.todos = action.payload;
    },
    addTodo: (state, action) => {
      state.todos.unshift(action.payload);
      return state;
    },
    updateTodo: (state, action) => {
      const { id, ...updates } = action.payload;
      const todoIndex = state.todos.findIndex(
        (todo) => todo.id.toString() === id.toString()
      );
      if (todoIndex !== -1) {
        state.todos[todoIndex] = {
          ...state.todos[todoIndex],
          ...updates,
        };
      }
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter(
        (todo) => todo.id.toString() !== action.payload.toString()
      );
    },
  },
});

export const {
  setLoading,
  setError,
  setTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} = todoSlice.actions;
export default todoSlice.reducer;
