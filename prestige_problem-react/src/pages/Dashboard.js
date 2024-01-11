import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminUser from './AdminUser'
import { Box } from '@mui/material'
import SideNavBar from '../components/SideNavBar'

const Dashboard = () => {
  return (
    <>
      <SideNavBar />
      <Box
        sx={{
          width: "100%",
          backgroundColor: "#fcfeff",
          py: "2rem",
          px: '2rem',
          overflowX: 'hidden'
        }}
      >
        <Routes>
          <Route path='/adminuser' element={<AdminUser />}/>
        </Routes>
      </Box>
    </>
  )
}

export default Dashboard