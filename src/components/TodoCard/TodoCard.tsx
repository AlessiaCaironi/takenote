import { Delete, Edit } from '@mui/icons-material'
import { Schema } from '../../../amplify/data/resource'
import { Card, CardMedia, IconButton, Stack, Typography } from '@mui/material'
import { deleteTodo } from '../../utils'
import TodoModal from '../TodoModal/TodoModal'
import { useState } from 'react'

interface TodoCardProps {
  todo: Schema['Todo']['type']
}

const TodoCard = ({ todo }: TodoCardProps) => {
  const [showEditTodoModal, setShowEditTodoModal] = useState(false)

  return (
    <>
      <Card
        variant="outlined"
        sx={{
          p: 2,
          width: { xs: '100%', sm: 'auto' },
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
          gap: 2,
        }}
      >
        <CardMedia
          component="img"
          width="100"
          height="100"
          src="../../images/image.png"
          sx={{ width: { xs: '100%', sm: 100 } }}
        />
        <Stack direction="column" alignItems="left" spacing={1} useFlexGap>
          <div>
            <Typography color="text.primary" fontWeight="semiBold">
              {todo.title}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              fontWeight="medium"
              textAlign="center"
              sx={{ width: '100%' }}
            >
              {todo.content}
            </Typography>
          </div>
          <Stack direction="row" alignItems="end" spacing={1} useFlexGap>
            <IconButton size="small" onClick={() => deleteTodo(todo.id)}>
              <Delete />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => {
                setShowEditTodoModal(true)
              }}
            >
              <Edit />
            </IconButton>
          </Stack>
        </Stack>
        {showEditTodoModal && (
          <TodoModal
            onClose={() => setShowEditTodoModal(false)}
            action="update"
            todo={todo}
          />
        )}
      </Card>
    </>
  )
}

export default TodoCard
