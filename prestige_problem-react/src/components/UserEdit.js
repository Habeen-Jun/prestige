import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";

import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
} from "@mui/material";
import { Box } from "@mui/system";
import { supabase } from "../hooks/supabase";


const EditMenu = ({handleClose, getUserData, user}) => {
    const [email, setEmail] = useState(user.email);
    const [name, setName] = useState(user.name);
    const [password, setPassword] = useState("");

    async function updateUser(event) {
        event.preventDefault();
    
        const { data: updatedUser, error: updatedError } = await supabase.updateUserById(
            user.uid,
            {  
                email: email,
                password: password
            }
        )
    
        if (updatedError) {
        console.error('Error updating:', updatedError);
        return;
        }
    
        if (updatedUser) {
        console.log('successfully updated', updatedUser);
        const { error: insertError } = await supabase
            .from('users')
            .update(
            { 
                email: email,
                name: name,
            }
            )
            .eq('id', user.id);

        if (insertError) {
            console.error('Error inserting user data:', insertError);
        } else {
            setEmail("")
            setPassword("")
            setName("")
            handleClose()
            getUserData()
        }
        }
    }

  return (
    <>
      <DialogTitle>Create User</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: 'column', mb: "0.6rem" }}>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="User's Name"
            fullWidth
            variant="outlined"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <TextField
            margin="dense"
            id="email"
            label="User's Email"
            fullWidth
            variant="outlined"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <TextField
            autoFocus
            margin="dense"
            id="password"
            label="New Password"
            type="password"
            fullWidth
            variant="outlined"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button sx={{ borderRadius: "10px", mr: 2, color: 'var(--green)' }} onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          sx={{ borderRadius: "10px", background: "var(--green)" }}
          disableElevation
          onClick={updateUser}
        >
          Save
        </Button>
      </DialogActions>
    </>
  );
};

export const UserEdit = ({getUserData, handleClose, open, user}) => {

  return (
    <>
    <DialogContainer fullWidth open={open} onClose={handleClose}>
    <EditMenu
        handleClose={handleClose}
        getUserData={getUserData}
        user={user}
    />
    </DialogContainer>
    </>
  );
};

const DialogContainer = styled(Dialog)({
  ".MuiDialog-paper": {
      maxHeight: '35rem',
      borderRadius: '15px'
  },
});