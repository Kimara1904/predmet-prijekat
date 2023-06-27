import { useContext, useState } from 'react'

import { AppBar, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { AccountCircle } from '@mui/icons-material'

import AppRouter from './routing/AppRouter'
import { isUserLoggedIn } from './helpers/AuthHelper'
import DashContext from './store/dashboard-context'

const AppContent = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const contentContext = useContext(DashContext)

  const navigation = useNavigate()

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const handleClickIcon = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleProfileClick = () => {
    navigation('/user_info')
    handleCloseMenu()
  }

  const handleDashboardClick = () => {
    navigation('/')
    handleCloseMenu()
  }

  const handleLogoutClick = () => {
    sessionStorage.clear()
    contentContext.setContent('')
    handleCloseMenu()
  }

  return (
    <>
      {isUserLoggedIn() && (
        <AppBar position='fixed' style={{ backgroundColor: 'var(--blue_color)' }}>
          <Toolbar>
            <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
              Web Shop
            </Typography>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleClickIcon}
              color='inherit'
            >
              <AccountCircle />
            </IconButton>
            <Menu
              sx={{ mt: '45px' }}
              id='MenuAppBar'
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
            >
              <MenuItem onClick={handleProfileClick}>
                <Typography textAlign='center'>Profile</Typography>
              </MenuItem>
              <MenuItem onClick={handleDashboardClick}>
                <Typography textAlign='center'>Dashboard</Typography>
              </MenuItem>
              <MenuItem onClick={handleLogoutClick}>
                <Typography textAlign='center'>Logout</Typography>
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      )}
      <AppRouter />
    </>
  )
}

export default AppContent
