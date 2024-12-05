import type { Schema } from '../../../amplify/data/resource'
import TodoCard from '../TodoCard/TodoCard'
import { Grid2 } from '@mui/material'

interface DashboardProps {
  todos: Array<Schema['Todo']['type']>
  refreshTodos: () => void
}

const Dashboard = ({ todos, refreshTodos }: DashboardProps) => {
  return (
    <>
      <Grid2
        container
        spacing={2}
        sx={{
          padding: 2,
        }}
      >
        {todos.map((todo) => (
          <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={todo.id}>
            <TodoCard key={todo.id} todo={todo} refreshTodos={refreshTodos} />
          </Grid2>
        ))}
      </Grid2>
    </>
  )
}

export default Dashboard
