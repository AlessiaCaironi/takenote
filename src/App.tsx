import { useEffect, useState } from 'react'
import type { Schema } from '../amplify/data/resource'
import { generateClient } from 'aws-amplify/data'

import Header from './components/Header/Header'
import Dashboard from './components/Dashboard/Dashboard'
import FloatingButton from './components/FloatingButton/FloatingButton'
import TodoModal from './components/TodoModal/TodoModal'

const client = generateClient<Schema>()

const App = () => {
  const [todos, setTodos] = useState<Array<Schema['Todo']['type']>>([])
  const [showNewTodoModal, setShowNewTodoModal] = useState(false)

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    })
  }, [])

  return (
    <>
      <Header />
      <Dashboard todos={todos} />
      <FloatingButton onClick={() => setShowNewTodoModal(true)} />
      {showNewTodoModal && (
        <TodoModal onClose={() => setShowNewTodoModal(false)} action="create" />
      )}
    </>
  )
}

export default App
