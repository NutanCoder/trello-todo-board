import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setError, setTodos } from '../store/todoSlice'
import type { RootState, AppDispatch } from '../store/store'
import TodoColumn from '../components/todo/TodoColumn'
import TodoCard from '../components/todo/TodoCard'
import { todoService } from '../services/todoService'
import { Link } from 'react-router-dom'

function Home() {
  const dispatch = useDispatch<AppDispatch>()
  const { todos, loading, error } = useSelector((state: RootState) => state.todos)

  useEffect(() => {
    console.log('Home component mounted')
    console.log('todos', todos)
    //let's log the todos
    console.log('todos length', todos.length)
    const loadTodos = async () => {
      if(todos.length > 0) return;
      try {
        dispatch(setLoading(true))
        const fetchedTodos = await todoService.getAllTodos()
        dispatch(setTodos(fetchedTodos))
      } catch (err) {
        dispatch(setError(err instanceof Error ? err.message : 'Failed to fetch todos'))
      } finally {
        dispatch(setLoading(false))
      }
    }

    loadTodos()
  }, [dispatch])

  const pendingTodos = todos.filter(todo => !todo.completed)
  const completedTodos = todos.filter(todo => todo.completed)

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-xl text-red-600">Error: {error}</div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Trello Style Todo</h1>
        <Link
          to="/create"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
        >
          Create New Todo
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <TodoColumn title={`Pending (${pendingTodos.length})`} isCompleted={false}>
          {pendingTodos.map(todo => (
            <TodoCard
              key={todo.id}
              id={todo.id}
              todo={todo.todo}
              completed={todo.completed}
            />
          ))}
        </TodoColumn>
        <TodoColumn title={`Completed (${completedTodos.length})`} isCompleted={true}>
          {completedTodos.map(todo => (
            <TodoCard
              key={todo.id}
              id={todo.id}
              todo={todo.todo}
              completed={todo.completed}
            />
          ))}
        </TodoColumn>
      </div>
    </div>
  )
}

export default Home 