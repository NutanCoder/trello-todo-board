import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import type { AppDispatch, RootState } from '../store/store'
import { updateTodo, setError } from '../store/todoSlice'
import { todoService } from '../services/todoService'

function EditTodo() {
  const { id } = useParams<{ id: string }>()
  const [todoText, setTodoText] = useState('')
  const [completed, setCompleted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const todo = useSelector((state: RootState) => 
    state.todos.todos.find(t => t.id.toString() === id)
  )

  useEffect(() => {
    if (todo) {
      setTodoText(todo.todo)
      setCompleted(todo.completed)
    }
  }, [todo])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (todoText.trim() && id) {
      try {
        setIsLoading(true)
        const updatedTodo = await todoService.updateTodo(id, {
          todo: todoText.trim(),
          completed
        })
        dispatch(updateTodo(updatedTodo))
        navigate('/')
      } catch (err) {
        dispatch(setError(err instanceof Error ? err.message : 'Failed to update todo'))
      } finally {
        setIsLoading(false)
      }
    }
  }

  if (!todo) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="container mx-auto max-w-2xl">
          <div className="text-xl text-red-600">Todo not found</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="container mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Edit Todo</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="todo" className="block text-gray-700 text-sm font-bold mb-2">
                Todo Description
              </label>
              <textarea
                id="todo"
                value={todoText}
                onChange={(e) => setTodoText(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
                placeholder="Enter your todo description..."
                required
                disabled={isLoading}
              />
            </div>
            <div className="mb-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={completed}
                  onChange={(e) => setCompleted(e.target.checked)}
                  className="form-checkbox h-5 w-5 text-blue-500"
                  disabled={isLoading}
                />
                <span className="text-gray-700">Mark as completed</span>
              </label>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? 'Updating...' : 'Update Todo'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditTodo 