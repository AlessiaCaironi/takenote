import { AppBar, Toolbar, Typography, IconButton } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'

import { useAuthenticator } from '@aws-amplify/ui-react'

const Header = () => {
  const { signOut } = useAuthenticator()

  return (
    <AppBar position="static" className="AppBar">
      <Toolbar>
        <Typography
          variant="h5"
          component="div"
          sx={{
            flexGrow: 1,
            fontWeight: 'bold',
            fontFamily: "'Poppins', sans-serif",
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
            letterSpacing: '0.1em',
          }}
        >
          Take Note
        </Typography>

        <IconButton onClick={signOut} color="inherit">
          <LogoutIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default Header
