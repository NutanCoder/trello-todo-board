import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import type { AppDispatch } from '../../store/store'
import { deleteTodo } from '../../store/todoSlice'
import { todoService } from '../../services/todoService'

interface TodoCardProps {
  id: string | number
  todo: string
  completed: boolean
}

const TodoCard = ({ id, todo, completed }: TodoCardProps) => {
  const [showConfirm, setShowConfirm] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [error])

  const handleDelete = async () => {
    try {
      setIsDeleting(true)
      setError(null)
      await todoService.deleteTodo(id)
      dispatch(deleteTodo(id))
      setShowConfirm(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete todo')
    } finally {
      setShowConfirm(false)
      setIsDeleting(false)
    }
  }

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({ id, completed }))
    e.currentTarget.classList.add('opacity-50')
  }

  const handleDragEnd = (e: React.DragEvent) => {
    e.currentTarget.classList.remove('opacity-50')
  }

  return (
    <div 
      className="relative bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 min-h-[160px] flex flex-col cursor-move"
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <p className={`text-gray-800 text-lg mb-6 flex-grow ${completed ? 'line-through text-gray-500' : ''}`}>
        {todo}
      </p>
      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}
      <div className="flex space-x-3 mt-auto">
        <Link
          to={`/edit/${id}`}
          className="flex-1 text-center py-2.5 px-4 bg-blue-200 text-blue-700 rounded-md hover:bg-blue-300 transition-colors duration-200 font-medium"
        >
          Edit
        </Link>
        <button
          onClick={() => setShowConfirm(true)}
          className="flex-1 py-2.5 px-4 bg-red-200 text-red-700 rounded-md hover:bg-red-300 transition-colors duration-200 font-medium"
        >
          Delete
        </button>
      </div>
      {showConfirm && (
        <div className="absolute inset-0 bg-white/95 backdrop-blur-sm rounded-lg flex flex-col items-center justify-center p-6">
          <p className="text-gray-700 mb-6 font-medium text-lg">Are you sure you want to delete this todo?</p>
          <div className="flex space-x-4">
            <button
              onClick={handleDelete}
              className="px-8 py-2.5 bg-red-200 text-red-700 rounded-md hover:bg-red-300 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Yes, Delete'}
            </button>
            <button
              onClick={() => setShowConfirm(false)}
              className="px-8 py-2.5 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-200 font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default TodoCard 