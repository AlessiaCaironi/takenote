import { createTodo } from '../../utils'
import { Modal, Box, TextField, Button } from '@mui/material'
import { useState } from 'react'

interface NewTodoModalProps {
  onClose: () => void
}

const NewTodoModal = ({ onClose }: NewTodoModalProps) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

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
              createTodo({ title, content })
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

export default NewTodoModal
