import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';
import { styled, } from "@mui/material/styles";
import { Avatar, Chip, Collapse, IconButton, List, ListItemButton, ListItemText } from '@mui/material';
import { UserEdit } from './UserEdit';

export default function BasicTable({ users, getUserData }) {
    const [editOpen, setEditOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const handleMenuClick = (name) => (e) => {
        e.stopPropagation();
        setMenuOpen(menuOpen === name ? null : name);
    };

    const handleEditOpen = () => {
        setEditOpen(true)
    };

    const handleEditClose = () => {
        setEditOpen(false)
    };

    const getChipColor = (role) => {
        switch (role) {
          case 'ADMIN':
            return 'var(--green)';
          case 'USER':
            return 'var(--yellow)';
        }
    };
      
    const UserRoleChip = ({ role }) => {
        const chipColor = getChipColor(role);
        
        return (
            <Chip 
            label={role} 
            sx={{ backgroundColor: chipColor, color: 'white' }} 
            />
        );
    };

  return (
    <>
    <TableContainer >
    <Table>
        <TableHead>
        <TableRow>
            <TableCell align="center">Id</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Role</TableCell>
            <TableCell align="center">Created At</TableCell>
            <TableCell align="center">{""}</TableCell>
        </TableRow>
        </TableHead>
        <TableBody sx={{overflow: 'auto'}}>
            {users.map((user) => (
                <>
                <TableRow key={user.name}>
                    <TableCell align="center">
                        {user.id}
                    </TableCell>
                    <TableCell align="center">
                        {user.name}
                    </TableCell>
                    <TableCell align="center">
                        {user.email}
                    </TableCell>
                    <TableCell align="center">
                        <UserRoleChip role={user.role} />
                    </TableCell>
                    <TableCell align="center">
                        {new Date(user.created_at).toLocaleDateString("en-US", {
                            month: "short", 
                            day: "numeric",
                            year: "numeric" 
                        })}
                    </TableCell>
                    <TableCell align="center">
                        <IconButton onClick={handleMenuClick(user.name)}>
                            <MoreVertIcon />
                        </IconButton>
                        <Collapse in={menuOpen === user.name}
                        sx={{
                        zIndex: '1000', 
                        position: 'fixed',
                        bgcolor: 'white',
                        boxShadow: '0px 3px 13px rgba(0, 0, 0, 0.3)',
                        borderRadius: '10px'
                        }}>
                        <List component="div" disablePadding>
                            <ListItemButton 
                            sx={{ pl: 4 }}
                            >
                                <ListItemText primary={"Delete User"} />
                            </ListItemButton>
                            <ListItemButton 
                            sx={{ pl: 4 }}
                            onClick={handleEditOpen}
                            >
                                <ListItemText primary={"Edit User"} />
                            </ListItemButton>
                        </List>
                        </Collapse>
                    </TableCell>
                </TableRow>
                <UserEdit getUserData={getUserData} handleClose={handleEditClose} open={editOpen} user={user}/>
                </>
            ))}
        </TableBody>
    </Table>
    </TableContainer>
    
    </>
    
  );
}

const StyledAvatar = styled(Avatar)({
    height: "2.5rem",
    width: "2.5rem",
    marginRight: '1rem',
    ".MuiAvatar-img": {
      objectFit: "contain",
      borderRadius: "2rem",
    },
});
