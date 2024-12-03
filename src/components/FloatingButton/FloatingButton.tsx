import { Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

interface FloatingButtonProps {
  onClick: () => void
}

const FloatingButton = ({ onClick }: FloatingButtonProps) => {
  return (
    <Fab
      color="primary"
      aria-label="add"
      sx={{
        position: 'fixed',
        bottom: 16,
        right: 16,
      }}
      onClick={onClick}
    >
      <AddIcon />
    </Fab>
  )
}

export default FloatingButton
