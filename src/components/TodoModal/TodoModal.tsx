import { useState } from 'react'
import { createTodo, updateTodo } from '../../utils/utils.todo'
import { Modal, Box, TextField, Button } from '@mui/material'
import { Schema } from '../../../amplify/data/resource'

interface TodoModalProps {
  onClose: () => void
  action: 'create' | 'update'
  todo?: Schema['Todo']['type']
  refreshTodos?: () => void
}

const TodoModal = ({ onClose, action, todo, refreshTodos }: TodoModalProps) => {
  const [title, setTitle] = useState<string>(
    action === 'update' && todo && todo.title ? todo.title : '',
  )
  const [content, setContent] = useState<string>(
    action === 'update' && todo && todo.content ? todo.content : '',
  )
  const [image, setImage] = useState<File | undefined>()

  const handleSave = async () => {
    if (title && content) {
      try {
        if (action === 'create') {
          await createTodo({ title, content, imageFile: image })
        } else if (action === 'update' && todo) {
          await updateTodo({
            id: todo.id,
            title,
            content,
            imageFile: image,
          }).then(() => {
            refreshTodos && refreshTodos()
          })
        }

        onClose()
      } catch (error) {
        console.error('Error saving todo:', error)
      }
    }
  }

  return (
    <Modal
      open={true}
      onClose={onClose}
      aria-labelledby="new-todo-modal-title"
      aria-describedby="new-todo-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <TextField
          fullWidth
          margin="normal"
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          multiline
          rows={4}
        />
        <Button variant="contained" component="label" sx={{ mt: 2 }}>
          Upload Image
          <input
            hidden
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) {
                setImage(file)
              }
            }}
          />
        </Button>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button onClick={onClose} sx={{ mr: 2 }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              handleSave()
            }}
            disabled={!title || !content}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default TodoModal
