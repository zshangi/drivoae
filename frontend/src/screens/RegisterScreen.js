import React, {  useState } from "react";
import axios from "axios";
import Crypto from 'crypto-js';
import { notification } from "antd";
import { Link } from 'react-router-dom'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Otp from '../components/Otp';
import { updateUserProfileAction } from '../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import { Form,  Col,Row,ListGroup} from 'react-bootstrap'
import { Helmet } from 'react-helmet';

function isNumeric(n) {
  return !isNaN(parseInt(n)) && isFinite(n);
}
function RegisterScreen({ history }) {
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [successUpdate, setSuccessUpdate] = useState('')

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const submitprofileHandler = (e) => {
      e.preventDefault()
      if (password !== confirmPassword) {
          setMessage('Passwords do not match !')
      } else {
          dispatch(updateUserProfileAction({
              'id': userInfo._id,
              'name': name,
              'lastname':lastname,
              'email': email,
              'password': password
          }))
          setMessage('')
          setPassword('')
          setConfirmPassword('')
          setSuccessUpdate('Profile successfully updated !')
     

      }
  }
  return (
    <Container component="main" maxWidth="xs">
                    <Helmet>
        <meta charSet="utf-8" />
        <title>Drivo Register</title>
        <meta name="description" content="Register" />
      </Helmet>
        <Box sx={{height:500,alignItems: 'left',
              textAlign:'left',  borderRadius: 3,p:2
            }} >
                <h1>Please Compelete your profile</h1>
              <Form onSubmit={submitprofileHandler}>
              <Row > 
          <Col className='my-1'  xs={12} sm={12} md={12} lg={12} xl={12}>   
                  <TextField
                      type='text'
                      placeholder='Enter first Name'
                      onChange={(e) => setName(e.target.value)}  variant="outlined" 
                  />                </Col> 

                                  <Col className='my-1'  xs={12} sm={12} md={12} lg={12} xl={12}>   

                  <TextField
                      type='text'
                      placeholder='Enter LastName'
                      onChange={(e) => setLastname(e.target.value)}  variant="outlined" 
                  />                </Col> 

                                  <Col className='my-1'  xs={12} sm={12} md={12} lg={12} xl={12}>   

                  <TextField
                      type='email'
                      placeholder='Enter Email'
                      onChange={(e) => setEmail(e.target.value)}  variant="outlined" 
                  />                </Col> 

          <Col className='my-1'  xs={12} sm={12} md={12} lg={12} xl={12}>   

                  <TextField
                      type='password'
                      placeholder='Enter Password'
                      onChange={(e) => setPassword(e.target.value)}  variant="outlined" 
                  />                </Col> 

                                  <Col className='my-1'  xs={12} sm={12} md={12} lg={12} xl={12}>   

                  <TextField
                      type='password'
                      placeholder='Enter Confirm Password'
                      onChange={(e) => setConfirmPassword(e.target.value)}   variant="outlined" 
                  />                </Col> 
              
              <Col className='my-1'  xs={12} sm={12} md={12} lg={12} xl={12}>   

              <Button
              type="submit"
                                variant="contained"
              >
                  Next
              </Button>
              </Col> </Row>
          </Form>
    
              </Box>
    </Container>
  );
};

export default RegisterScreen;
