import React, { useState, useEffect } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { userLoginAction } from '../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { Helmet } from 'react-helmet';

const theme = createTheme();

function LoginScreen( { location, history }) {
  var redirect = location.search ? location.search.split('=')[1] : '/'
  if (redirect === 'success' || redirect === 'fail') {
      redirect = '/'
  }
  const tokenResult = location.search ? location.search.split('=')[1] : ""
 
  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)
  const { error, userInfo, loading } = userLogin

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [activationMessage, setActivationMessage] = useState('')

  const submitHandler = (e) => {
      e.preventDefault() 
      dispatch(userLoginAction(email, password))
  }

  useEffect(() => {
      if (userInfo) {
        history.push(redirect)
      } else if (!userInfo) {
          switch (tokenResult) {

              case 'success':
                  setActivationMessage('Your account successfully activated. Now you can login')
                  break;

              case 'fail':
                  setActivationMessage('Your activation link isn\'t valid. Please go to register page and try again.')
                  break;

              default:
                  setActivationMessage('')
          }
      }

  }, [history, userInfo, redirect, tokenResult])

const handleRegisterOTPScreen=(e)=>{
  history.push(`/registerotpscreen`)
}
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
      <h1>login<span className='textnormalbold'>(login with your username(mobile number) and password)</span></h1>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Drivo login</title>
        <meta name="description" content="login" />
      </Helmet>
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
     

          {
                loading ? <Loader />
                    : error ? <Message variant='danger' text={error} />
                        : tokenResult === 'success' ? <Message variant='success' text={activationMessage} />
                            : tokenResult === 'fail' ? <Message variant='danger' text={activationMessage} />
                                : <></>
            }
          <Box component="form" onSubmit={submitHandler} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullwidth="true"
              id="email"
              label="Username"
              name="email"
              autoComplete="email"
              type='email'
              placeholder='Enter Email'
              value={email}
              size='small'
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullwidth="true"
              name="password"
              label="Password"
              type="password"
              id="password"
              placeholder='Enter Password'
              size='small'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullwidth="true"
              variant="contained"
              sx={{ mt: 1, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
          
            </Grid>
            <hr/>

          </Box>

            <Link to="/registerotpscreen" variant="body2">
              <Button
              
              fullwidth="true"
              variant="contained" color="success"
              sx={{ mt: 3, mb: 2 }}
            >
              Enter With OTP
            </Button>
            </Link>
        </Box>
      </Container>
    </ThemeProvider>
  );
}


export default LoginScreen