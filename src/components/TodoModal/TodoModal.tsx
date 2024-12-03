import { createTodo, updateTodo } from '../../utils'
import { Modal, Box, TextField, Button } from '@mui/material'
import { useState } from 'react'
import { Schema } from '../../../amplify/data/resource'

interface TodoModalProps {
  onClose: () => void
  action: 'create' | 'update'
  todo?: Schema['Todo']['type']
}

const TodoModal = ({ onClose, action, todo }: TodoModalProps) => {
  const [title, setTitle] = useState(
    action === 'update' && todo ? todo.title : '',
  )
  const [content, setContent] = useState(
    action === 'update' && todo ? todo.content : '',
  )

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
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button onClick={onClose} sx={{ mr: 2 }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              if (title && content) {
                if (action === 'create') {
                  createTodo({ title, content })
                } else {
                  todo && updateTodo({ id: todo.id, title, content })
                }
              }
              onClose()
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
