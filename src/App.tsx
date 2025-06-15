import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import MainLayout from './components/layout/MainLayout'
import HomeLayout from './components/layout/HomeLayout'
import Loading from './components/common/Loading'
import Home from './pages/Home'

// Lazy load components
const DevelopersNote = lazy(() => import('./pages/DevelopersNote'))
const CreateTodo = lazy(() => import('./pages/CreateTodo'))
const EditTodo = lazy(() => import('./pages/EditTodo'))

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/" element={<MainLayout />}>
          <Route path="developers-note" element={
            <Suspense fallback={<Loading fullScreen />}>
              <DevelopersNote />
            </Suspense>
          } />
          <Route path="create" element={
            <Suspense fallback={<Loading fullScreen />}>
              <CreateTodo />
            </Suspense>
          } />
          <Route path="edit/:id" element={
            <Suspense fallback={<Loading fullScreen />}>
              <EditTodo />
            </Suspense>
          } />
        </Route>
      </Routes>
    </Router>
  )
}

export default App 