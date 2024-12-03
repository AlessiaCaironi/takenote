import { Delete, Edit } from '@mui/icons-material'
import { Schema } from '../../../amplify/data/resource'
import { Card, CardMedia, IconButton, Stack, Typography } from '@mui/material'
import { deleteTodo } from '../../utils'

interface TodoCardProps {
  todo: Schema['Todo']['type']
}

const TodoCard = ({ todo }: TodoCardProps) => {
  return (
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
            Todo
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
          <IconButton size="small">
            <Edit />
          </IconButton>
        </Stack>
      </Stack>
    </Card>
  )
}

export default TodoCard
