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
import Alert from "@mui/material/Alert";
import AddIcon from "@mui/icons-material/Add";
import { Box } from "@mui/system";
import { supabase } from "../hooks/supabase";


const CreationMenu = ({handleClose, getUserData}) => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    async function signUpNewUser(event) {
        event.preventDefault();
    
        const { data: createdUser, error: signUpError } = await supabase.auth.signUp({
            email: email,
            password: password,
        });
    
        if (signUpError) {
        console.error('Error signing up:', signUpError);
        return;
        }
    
        if (createdUser) {
        console.log('successfully registered', createdUser);
        const { data: userData, error: insertError } = await supabase
            .from('users')
            .insert(
            { 
                email: email,
                name: name,
                role: 'USER'
            }
            );

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
            required
            margin="dense"
            id="name"
            label="User's Name"
            fullWidth
            variant="outlined"
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            required
            margin="dense"
            id="email"
            label="User's Email"
            fullWidth
            variant="outlined"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="password"
            label="Password"
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
          onClick={signUpNewUser}
        >
          Register
        </Button>
      </DialogActions>
    </>
  );
};

export const UserCreation = ({getUserData}) => {

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
    <Button
    variant="contained"
    startIcon={<AddIcon />}
    sx={{ borderRadius: "10px", padding: '10px', background: "var(--green)"}}
    onClick={handleClickOpen}
    >
    New User
    </Button>
    <DialogContainer fullWidth open={open} onClose={handleClose}>
    <CreationMenu
        handleClose={handleClose}
        getUserData={getUserData}
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