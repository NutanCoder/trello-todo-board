export interface Todo {
  id: string | number;
  todo: string;
  completed: boolean;
  userId?: number;
}
