import { useEffect, useState } from 'react'
import type { Schema } from '../amplify/data/resource'
import { getTodos } from './utils/utils.todo'

import Header from './components/Header/Header'
import Dashboard from './components/Dashboard/Dashboard'
import FloatingButton from './components/FloatingButton/FloatingButton'
import TodoModal from './components/TodoModal/TodoModal'

const App = () => {
  const [todos, setTodos] = useState<Array<Schema['Todo']['type']>>([])
  const [showNewTodoModal, setShowNewTodoModal] = useState(false)

  const fetchTodos = async () => {
    console.log('fetching todos')
    try {
      const todoList = await getTodos()
      setTodos(todoList)
    } catch (error) {
      console.error('Error fetching todos:', error)
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [showNewTodoModal])

  return (
    <>
      <Header />
      <Dashboard todos={todos} refreshTodos={() => fetchTodos()} />
      <FloatingButton onClick={() => setShowNewTodoModal(true)} />
      {showNewTodoModal && (
        <TodoModal
          onClose={() => {
            setShowNewTodoModal(false)
          }}
          action="create"
        />
      )}
    </>
  )
}

export default App
