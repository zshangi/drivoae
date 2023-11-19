import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Table, Container } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useSelector, useDispatch } from 'react-redux'
import { getUserDetailsAction, updateUserProfileAction, userLogoutAction } from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import { getMyOrderList } from '../actions/orderActions'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import { Helmet } from 'react-helmet';

function ProfileScreen({ history }) {
    const dispatch = useDispatch()

    // local states
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    const [successUpdate, setSuccessUpdate] = useState('')
    const [lastname, setLastname] = useState('')

    // handle getUserDetails
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin


    const userDetails = useSelector(state => state.userDetails)
    const { user, error: errorUserDetails, loading: loadingUserDetails } = userDetails


    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success, error: errorUpdateProfile, loading: loadingUpdateProfile } = userUpdateProfile


    // handle getMyOrderList
    const orderListMy = useSelector(state => state.orderListMy)
    const { orders, error: errorOrders, loading: loadingOrders } = orderListMy


    // handle loading and error
    let loading = false
    let error = ''

    if (loadingUserDetails || loadingUpdateProfile) {
        loading = true
    }

    if (errorUserDetails) {
        error = errorUserDetails
    } else if (errorUpdateProfile) {
        error = errorUpdateProfile
    }

    const TE = "Token is invalid or expired"



    useEffect(() => {
 
        if (!userInfo) {
            history.push('/login')
        } else {
            if (!user || !user.name || success) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                dispatch(getUserDetailsAction('profile'))
            } else {
                setEmail(user.email)
                setName(user.name)
                setLastname(user.lastName)
            }
        }
    }, [history, userInfo, dispatch, errorUserDetails, errorUpdateProfile])

    const submitprofileHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Passwords do not match !')
        } else {
            dispatch(updateUserProfileAction({
                'id': userInfo._id,
                'name': name,
                'lastname': lastname,
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
        <Container>
            <Helmet>
        <meta charSet="utf-8" />
        <title>Drivo profile</title>
        <meta name="description" content="my profile" />
      </Helmet>
      <h1>my profile</h1>
            <Row>
                <Col>
                    {
                        loading ? <Loader />
                            : error ? <Message variant='danger' text={error} />
                                : message ? <Message variant='danger' text={message} />
                                    : successUpdate ? <Message variant='success' text={successUpdate} />
                                        : <></>
                    }
                    <Box sx={{
                        height: 500, alignItems: 'left',
                        textAlign: 'left', borderRadius: 3, p: 2
                    }} >
                        <Form onSubmit={submitprofileHandler}>
                        <TextField
                                id="input-with-icon-textfield"
                                label="UserName(mobile)"
                                width="70"
                                value={userInfo.username}
                                disable
                                onChange={(e) => setName(e.target.value)} 
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircle   color="info" />
                                        </InputAdornment>
                                    ),
                                }}
                                variant="standard"
                            /><br/><br/>
                            <TextField
                                id="input-with-icon-textfield"
                                label="First Name"
                                width="70"
                                value={userInfo.name}
                                onChange={(e) => setName(e.target.value)} 
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircle   color="info" />
                                        </InputAdornment>
                                    ),
                                }}
                                variant="standard"
                            />
                            <br/><br/>
                            <TextField
                                id="input-with-icon-textfield"
                                label="Last Name"
                                width="70"
                                value={userInfo.lastName}
                                onChange={(e) => setLastname(e.target.value)} 
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircle  color="info" />
                                        </InputAdornment>
                                    ),
                                }}
                                variant="standard"
                            />
                             <br/><br/>
                            <TextField
                                id="input-with-icon-textfield"
                                label="Email"
                                fullwidth="true"
                                value={userInfo.email}
                                type={"email"}
                                onChange={(e) => setEmail(e.target.value)} 
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <EmailIcon  color="info" />
                                        </InputAdornment>
                                    ),
                                }}
                                variant="standard"
                            />

                            <br/><br/>
                            <TextField
                                id="input-with-icon-textfield"
                                label="Password"
                                fullwidth="true"
                                type='password'
                                onChange={(e) => setPassword(e.target.value)} 
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockIcon  color="info" />
                                        </InputAdornment>
                                    ),
                                }}
                                variant="standard"
                            />
                             <br/><br/>


                             <TextField
                                id="input-with-icon-textfield"
                                label="Confirm Password"
                                fullwidth="true"
                                type='password'
                                onChange={(e) => setConfirmPassword(e.target.value)} 
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockIcon  color="info" />
                                        </InputAdornment>
                                    ),
                                }}
                                variant="standard"
                            />
                             <br/><br/>


                  
                            <Box sx={{
                                alignItems: 'center',
                                textAlign: 'center',
                                marginTop:2
                            }} >
                                <Button
                                    type="submit"
                                    variant="contained"
                                    disabled={loading === true}
                                    style={{ borderRadius: 25,  backgroundColor: '#61dafb'}}
                                >
                                    update
                                </Button>
                            </Box>
                        </Form>

                    </Box>
                </Col>

            </Row></Container>
    )
}

export default ProfileScreen