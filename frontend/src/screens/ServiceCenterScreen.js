import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Container, Card, Form } from 'react-bootstrap'
import Box from '@mui/material/Box';
import { saveServiceCenter } from '../actions/cartActions'
import { fetchServicecenters } from '../actions/ServiceCenterActions'
import Button from '@mui/material/Button';
import { getDistance, orderByDistance } from 'geolib';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { getUserDetailsAction, updateUserProfileAction, userLogoutAction } from '../actions/userActions'
import FormLabel from '@mui/material/FormLabel';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import { BiArrowBack } from "react-icons/bi";
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Grid from '@mui/material/Grid';
import Message from '../components/Message'
import Loader from '../components/Loader'
import { SiGooglemaps } from "react-icons/si";
import { Helmet } from 'react-helmet';

/////////////////////////////////////////////////////////////////
const BpIcon = styled('span')(({ theme }) => ({
  borderRadius: '50%',
  width: 14,
  height: 14,
  boxShadow:
    theme.palette.mode === 'dark'
      ? '0 0 0 1px rgb(16 22 26 / 40%)'
      : 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
  backgroundColor: theme.palette.mode === 'dark' ? '#394b59' : '#f5f8fa',
  backgroundImage:
    theme.palette.mode === 'dark'
      ? 'linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))'
      : 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
  '.Mui-focusVisible &': {
    outline: '2px auto rgba(19,124,189,.6)',
    outlineOffset: 2,
  },
  'input:hover ~ &': {
    backgroundColor: theme.palette.mode === 'dark' ? '#30404d' : '#ebf1f5',
  },
  'input:disabled ~ &': {
    boxShadow: 'none',
    background:
      theme.palette.mode === 'dark' ? 'rgba(57,75,89,.5)' : 'rgba(206,217,224,.5)',
  },
}));

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: '#137cbd',
  backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
  '&:before': {
    display: 'block',
    width: 14,
    height: 14,
    backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
    content: '""',
  },
  'input:hover ~ &': {
    backgroundColor: '#106ba3',
  },
});

// Inspired by blueprintjs
function BpRadio(props) {
  return (
    <Radio
      disableRipple
      color="default"
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      {...props}
    />
  );
}
///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
function ServiceScreen({ match, history }) {
  const [serviceid, setserviceid] = useState('')
  const dispatch = useDispatch()

  const listServicecenters = useSelector(state => state.listServicecenter)
  const { error, loading, servicecenters } = listServicecenters

  const localfilter = servicecenters.filter(
    (service) => (service.tyreServiceCenter == serviceid)
  );


  const cart = useSelector(state => state.cart)
  let localfiltersort = orderByDistance({ latitude: cart.shippingAddress.lat, longitude: cart.shippingAddress.long }, localfilter);

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveServiceCenter({ serviceid, servicecenter, servicecenterid, dateservice, timeservice,timetable }))
    if (validatename){
    history.push('/order')
    }else{
      setOpenprofile(true)
    }
  }
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const [validatename, setValidatename] = useState(userInfo.name)
  //////////////////////////////////////////////////////////////////////////////////
  const useStyles = makeStyles({
    drawerPaper: {
      borderRadius: '20px 20px 0 0',
    },
  });
  const classes = useStyles();

  const [openprofile, setOpenprofile] = React.useState(false);
  const toggleDrawerprofile = (newOpen) => () => {
    setOpenprofile(newOpen);
  };
  const [name, setName] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [successUpdate, setSuccessUpdate] = useState('')
  const submitprofileHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match !')
    } else {
      setValidatename(name)
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
      setOpenprofile(false)


    }
  }
  useEffect(() => {
    if (!validatename) {
      setOpenprofile(true)
    }

  }, [validatename])
  ///////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {

    setserviceid(match.params.id)

    dispatch(fetchServicecenters())
  }, [dispatch, match])



  //////////////////////////////////////////////////////////////////////////////////////
  const [value, setValue] = React.useState('1');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [servicecenter, setServicecenter] = useState('')
  const [dateservice, setDateservice] = useState('')
  const [timeservice, setTimeservice] = useState('')
  const [timetable, setTimetable] = useState('')

  const [servicecenterid, setServicecenterid] = useState('')



  const handleRadioChange = (event) => {
    setValue(event.target.value);

  };




  return (
    <>
      <Button onClick={() => history.goBack()}><BiArrowBack size={15} /></Button>
      <Container  style={{height:'100%'}} fluid>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Drivo's Service centers</title>
        <meta name="description" content="See Our perfect service center" />
      </Helmet>
      <h1>Drivo's Service centers</h1>

        <Row className="my-2">

          <Col style={{ textAlign: 'center', alignItems: 'center' }} xs={12} sm={12} md={6} lg={6} xl={6}>

            <img src="/assets/img/service.svg" width={'50%'} />
          </Col>
          <Col sx={{ textAlign: 'left', alignItems: 'left' }} xs={12} sm={12} md={6} lg={6} xl={6}>
            <form onSubmit={submitHandler} >




              <Grid container spacing={2}>
              <FormControl>
                            <RadioGroup
                              row
                              aria-labelledby="demo-row-radio-buttons-group-label"
                              name="row-radio-buttons-group"
                            >
                {localfiltersort.map((row) => (

                  <Grid item sx={{ boxShadow: 2, borderRadius: 5, margin: 1 }} xs={12}>


                    <Box sx={{ paddingLeft: 3 }} >
                      <span className=' pbold'>{row.name},</span><br />
                      <span className=' textnormal'><SiGooglemaps size={20} color='red' /> :{row.address}</span>
                      <br />
                      {serviceid == 1 || serviceid == 2 ?
                        <span className='textblue'>Distance To Your Location:
                          {(getDistance(
                            { latitude: cart.shippingAddress.lat, longitude: cart.shippingAddress.long },
                            { latitude: row.latitude, longitude: row.longitude }
                          ) / 1000).toFixed(1)} Km</span>
                        :
                        null
                      }
                    </Box>

                    <Box sx={{
                      alignItems: 'left',
                      textAlign: 'left', borderRadius: 3,
                    }} >

                      <Table size="small" aria-label="purchases">
                        <TableBody>
                     
                              {row.servicecenterItems.map((item, index) => (
                             
                                <TableRow>
                                  <TableCell> <span className="textnormal">{item.datetable}</span></TableCell>
                                  <TableCell>
                                    {item.part_AM ? (
                                      <FormControlLabel value={`9AM-12PM ${item._id}`} onChange={(e) => { setServicecenter(row.name); setServicecenterid(row._id); setDateservice(item._id); setTimeservice("9AM-12PM"); setTimetable(item.datetable) }} control={<BpRadio />} label={<span className="textnormal">9AM-12PM</span>} />

                                    ) :
                                      (
                                        <FormControlLabel disabled value={`9AM-12PM ${item._id}`} control={<BpRadio />} label={<span className="textnormal">9AM-12PM</span>} />
                                      )
                                    }
                                    {item.part_PM ? (
                                      <FormControlLabel value={`3PM-6PM ${item._id}`} control={<BpRadio />} label={<span className="textnormal">3PM-6PM</span>} onChange={(e) => { setServicecenter(row.name); setServicecenterid(row._id); setDateservice(item._id); setTimeservice("3PM-6PM"); setTimetable(item.datetable) }} />
                                    ) :
                                      (
                                        <FormControlLabel disabled value={`3PM-6PM ${item._id}`} control={<BpRadio />} label={<span className="textnormal">3PM-6PM</span>} />
                                      )
                                    }
                                  </TableCell>


                                </TableRow>
                              
                              ))}
                      
                        </TableBody>
                      </Table>
                    </Box>

                    

                  </Grid>
             
                ))}
                  </RadioGroup>
                    </FormControl> </Grid>



              <Box sx={{
                position: 'fixed',
                bottom: 80,
                right: 0,
                left: 0,
                textAlign: 'center'
              }}>
                <Button type="submit" variant="contained"style={{ borderRadius: 25,  backgroundColor: '#1CB0CD',color:'#fff'}} disabled={!servicecenterid}>Next</Button></Box>
            </form>
          </Col>
        </Row>
        <br/>
      </Container>
      <br/> <br/> <br/> <br/> <br/> <br/>






      <SwipeableDrawer
        anchor="bottom"
        open={openprofile}
        onClose={toggleDrawerprofile(false)}
        onOpen={toggleDrawerprofile(true)}
        classes={{ paper: classes.drawerPaper }}

      >
        <Container component="main" maxWidth="xs">

          <Box sx={{
            height: 500, alignItems: 'left',
            textAlign: 'left', borderRadius: 3, p: 2
          }} >
            {
              loading ? <Loader />
                : error ? <Message variant='danger' text={error} />
                  : message ? <Message variant='danger' text={message} />
                    : successUpdate ? <Message variant='success' text={successUpdate} />
                      : <></>
            }
            <p>Please Compelete your profile</p>
            <Form onSubmit={submitprofileHandler}>
              <Row >
                <Col className='my-1' xs={12} sm={12} md={12} lg={12} xl={12}>


                  <TextField
                    id="input-with-icon-textfield"
                    label="First Name"
                    onChange={(e) => setName(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle color="info" />
                        </InputAdornment>
                      ),
                    }}
                    variant="standard"
                  />


                </Col>

                <Col className='my-1' xs={12} sm={12} md={12} lg={12} xl={12}>

                  <TextField
                    id="input-with-icon-textfield"
                    label="Last Name"
                    onChange={(e) => setLastname(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle color="info" />
                        </InputAdornment>
                      ),
                    }}
                    variant="standard"
                  />




                </Col>

                <Col className='my-1' xs={12} sm={12} md={12} lg={12} xl={12}>

                  <TextField
                    id="input-with-icon-textfield"
                    label="Email"
                    type={"email"}
                    onChange={(e) => setEmail(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon color="info" />
                        </InputAdornment>
                      ),
                    }}
                    variant="standard"
                  />       
                         </Col>

                <Col className='my-1' xs={12} sm={12} md={12} lg={12} xl={12}>

                  <TextField
                    id="input-with-icon-textfield"
                    label="Password"
                    type='password'
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon color="info" />
                        </InputAdornment>
                      ),
                    }}
                    variant="standard"
                  />      
                           </Col>

                <Col className='my-1' xs={12} sm={12} md={12} lg={12} xl={12}>
                  <TextField
                    id="input-with-icon-textfield"
                    label="Confirm Password"
                    type='password'
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon color="info" />
                        </InputAdornment>
                      ),
                    }}
                    variant="standard"
                  />
                </Col>

                <Col className='my-1' xs={12} sm={12} md={12} lg={12} xl={12}>

                  <Button
                    type="submit"
                    variant="contained"
                    style={{ borderRadius: 25,  backgroundColor: '#1CB0CD',color:'#fff'}}
                  >
                    Next
                  </Button>
                </Col> </Row>
            </Form>

          </Box>
        </Container>
      </SwipeableDrawer>


    </>

  )
}

export default ServiceScreen
