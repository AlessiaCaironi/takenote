import { Delete, Edit } from '@mui/icons-material'
import { Schema } from '../../../amplify/data/resource'
import { Card, CardMedia, IconButton, Stack, Typography } from '@mui/material'
import TodoModal from '../TodoModal/TodoModal'
import { useState, useEffect } from 'react'

import { deleteTodo } from '../../utils/utils.todo'
import { getImageUrl } from '../../utils/utils.image'

interface TodoCardProps {
  todo: Schema['Todo']['type']
  refreshTodos: () => void
}

const TodoCard = ({ todo, refreshTodos }: TodoCardProps) => {
  const [showEditTodoModal, setShowEditTodoModal] = useState(false)
  const [imageSrc, setImageSrc] = useState<string>('')

  const handleDelete = async () => {
    try {
      await deleteTodo(todo).then(() => {
        refreshTodos && refreshTodos()
      })
    } catch (error) {
      console.error('Error deleting todo:', error)
    }
  }

  useEffect(() => {
    const loadImage = async () => {
      if (todo.image) {
        try {
          const url = await getImageUrl(todo.image)
          setImageSrc(url)
        } catch (error) {
          console.error('Error loading image:', error)
          setImageSrc(
            'https://coffective.com/wp-content/uploads/2018/06/default-featured-image.png.jpg',
          )
        }
      } else {
        setImageSrc(
          'https://coffective.com/wp-content/uploads/2018/06/default-featured-image.png.jpg',
        )
      }
    }
    loadImage()
  }, [todo.image])

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
          src={imageSrc}
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
            <IconButton size="small" onClick={() => handleDelete()}>
              <Delete />
            </IconButton>
            <IconButton size="small" onClick={() => setShowEditTodoModal(true)}>
              <Edit />
            </IconButton>
          </Stack>
        </Stack>
      </Card>
      {showEditTodoModal && (
        <TodoModal
          onClose={() => setShowEditTodoModal(false)}
          refreshTodos={refreshTodos}
          action="update"
          todo={todo}
        />
      )}
    </>
  )
}

export default TodoCard
