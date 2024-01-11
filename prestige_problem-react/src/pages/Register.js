import { Alert, Box, Button, Container, Snackbar, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { createClient } from "@supabase/supabase-js";

const URL = process.env.REACT_APP_SUPABASE_URL;
const KEY = process.env.REACT_APP_SUPABASE_KEY;
const supabase = createClient(URL, KEY);

const Register = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  async function signUpNewUser(event) {
    event.preventDefault();
  
    const { data: user, error: signUpError } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        emailRedirectTo: 'http://localhost:3000/dashboard/adminuser/'
      }
    });
  
    if (signUpError) {
      console.error('Error signing up:', signUpError);
      return;
    }
  
    if (user) {
      console.log('successfully registered', user);
      const { data: userData, error: insertError } = await supabase
        .from('users')
        .insert(
          { 
            email: email,
            name: name,
            role: 'ADMIN',
            uid: user.user.id
          }
        );

      if (insertError) {
        console.error('Error inserting user data:', insertError);
      } else {
        setSnackbarMessage('You have signed up successfully!');
        setSnackbarOpen(true);
        setEmail("")
        setPassword("")
        setName("")
      }
    }
  }
  
  
  return (
    <Container component="main" maxWidth="sm">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 3,
            height: "100%",
          }}
        >
          <Box
            component="form"
            onSubmit={signUpNewUser}
            noValidate
            sx={{
              bgcolor: "white",
              padding: {
                xs: "2rem",
                md: "3rem",
              },
              borderRadius: "10px",
              boxShadow: "0px 3px 13px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Typography component="h3" variant="h7">
              Create an Account
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoFocus
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, background: 'var(--green)'}}
            >
              Register
            </Button>
            <NavLink to="/" variant="body2" className="login-link">
              Already have an account? Sign In
            </NavLink>
            <Snackbar
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
              open={snackbarOpen}
              autoHideDuration={6000}
              onClose={() => setSnackbarOpen(false)}
            >
              <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
                {snackbarMessage}
              </Alert>
            </Snackbar>
          </Box>
        </Box>
    </Container>
  )
}

export default Register