import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import type { AppDispatch } from '../store/store'
import { addTodo } from '../store/todoSlice'
import { todoService } from '../services/todoService'

function CreateTodo() {
  const [todoText, setTodoText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (todoText.trim()) {
      try {
        setIsLoading(true)
        setError('')
        const newTodo = await todoService.createTodo({
          todo: todoText.trim(),
          completed: false,
          userId: 1 // dummy user id
        })
        dispatch(addTodo(newTodo))
        setTodoText('')
        navigate('/')
      } catch (err) {
        setError('Failed to create todo. Please try again.')
        console.error('Error creating todo:', err)
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="container mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Create New Todo</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}
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
                {isLoading ? 'Creating...' : 'Create Todo'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateTodo 