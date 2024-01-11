import { Alert, Box, Button, Container, Snackbar, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { supabase } from '../hooks/supabase';


const Login = () => {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    async function signInUser(event) {
        event.preventDefault();
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })
        if (error) {
            console.error('Error signing in:', error);
            setSnackbarMessage('Invlaid password or email. Please try again');
            setSnackbarOpen(true);
        } else if (data) {
            navigate('/adminuser');
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
            onSubmit={signInUser}
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
              Log in to your account
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
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <NavLink
                to="/forgot-password"
                variant="body2"
                className="login-link"
              >
                Forgot password?
              </NavLink>
            </Box> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, background: 'var(--green)'}}
            >
              Sign In
            </Button>
            <NavLink to="/register" variant="body2" className="login-link">
              Don't have an account? Sign Up Here
            </NavLink>
            <Snackbar
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
              open={snackbarOpen}
              autoHideDuration={6000}
              onClose={() => setSnackbarOpen(false)}
            >
              <Alert onClose={() => setSnackbarOpen(false)} severity="error" sx={{ width: '100%' }}>
                {snackbarMessage}
              </Alert>
            </Snackbar>
          </Box>
        </Box>
    </Container>
  )
}


export default Login