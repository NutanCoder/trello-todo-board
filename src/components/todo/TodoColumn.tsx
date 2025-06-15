import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store/store";
import { updateTodo } from "../../store/todoSlice";
import { useState, type ReactNode } from "react";
import React from "react";

interface TodoColumnProps {
  title: string;
  children: ReactNode;
  isCompleted: boolean;
}

const TodoColumn = ({ title, children, isCompleted }: TodoColumnProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [dropIndex, setDropIndex] = useState<number | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.add("bg-gray-50");

    const rect = e.currentTarget.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const children =
      e.currentTarget.querySelector(".todo-list")?.children || [];
    let index = 0;

    for (let i = 0; i < children.length; i++) {
      const child = children[i] as HTMLElement;
      const childRect = child.getBoundingClientRect();
      const childTop = childRect.top - rect.top;

      if (y < childTop + childRect.height / 2) {
        break;
      }
      index++;
    }

    setDropIndex(index);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.currentTarget.classList.remove("bg-gray-50");
    setDropIndex(null);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.remove("bg-gray-50");
    setDropIndex(null);

    try {
      const data = JSON.parse(e.dataTransfer.getData("text/plain"));
      if (data.completed !== isCompleted) {
        dispatch(updateTodo({ id: data.id, completed: isCompleted }));
      }
    } catch (error) {
      console.error("Error processing drop:", error);
    }
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md p-4 transition-colors duration-200"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <h2 className="text-xl font-semibold text-gray-700 mb-4">{title}</h2>
      <div className="space-y-3 todo-list">
        {React.Children.map(children, (child, index) => (
          <>
            {dropIndex === index && (
              <div className="h-[160px] bg-gradient-to-r from-blue-400 via-blue-500 to-blue-400 rounded-sm my-2 animate-pulse shadow-sm" />
            )}
            {child}
          </>
        ))}
        {dropIndex === React.Children.count(children) && (
          <div className="h-1.5 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-400 rounded-full my-2 animate-pulse shadow-sm" />
        )}
      </div>
    </div>
  );
};

export default TodoColumn;
