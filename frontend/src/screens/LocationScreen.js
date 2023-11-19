import React, { useState, useEffect, useRef } from 'react'
import { Form, Container } from 'react-bootstrap'
import Header from '../components/Header'
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingAddress } from '../actions/cartActions'
import { Row, Col, Card } from 'react-bootstrap'
import { fetchUserAddresses, saveAdressAction ,delAddressuser} from '../actions/userActions'
import Box from '@mui/material/Box';
import Geocode from "react-geocode";
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import GoogleMapReact from 'google-map-react';
import { SiGooglemaps } from "react-icons/si";
import { grey } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { Global } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import { FaMapMarkerAlt, FaCar, FaCalendarCheck, FaChevronDown, FaChevronRight, FaPlus } from "react-icons/fa";
import { makeStyles } from '@material-ui/core/styles';
import {BiArrowBack} from "react-icons/bi";
import { Link } from 'react-router-dom';
import Loader from '../components/Loader'
import Message from '../components/Message'
import { Helmet } from 'react-helmet';

/////////////////////////////////////////////////////////////////
const BpIcon = styled('span')(({ theme }) => ({
    borderRadius: '50%',
    width: 16,
    height: 16,
    marginTop:5,
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
      width: 16,
      height: 16,
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
//////////////////////////////////////////////////////////////////
const AnyReactComponent = ({ text }) => <div ><h3>{text}</h3></div>;
///////////////////////////////////////////////////
const useStyles = makeStyles({
    drawerPaper: {
        borderRadius: '20px 20px 0 0',
    },
});
const StyledBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
}));
const Puller = styled(Box)(({ theme }) => ({
    width: 30,
    height: 6,
    backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
    borderRadius: 3,
    position: 'absolute',
    top: 1,
    left: 'calc(50% - 15px)',
}));
///////////////////////////////////////////////////

function LocationScreen({ history }, props) {

    const [value, setValue] = React.useState('1');
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const ListAddresses = useSelector(state => state.ListAddress)
    const { addresses, error, loading } = ListAddresses
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart
    ////////////////////////////////////////////////////
    Geocode.setApiKey("AIzaSyBF_krXv6HVEMrGpHMcCHGwwHYPMcgFmLs");
    ///////////////////////////////////////////////////


    const classes = useStyles();
    const [openlocation, setopenlocation] = React.useState(true);


    const toggleDrawerLocation = (newOpen) => () => {
        setopenlocation(newOpen);
    };

    ///////////////////////////////////////////////////


    const [lat, setLat] = useState("")
    const [long, setLong] = useState("")
    const [address, setAddress] = useState("")
    const [details, setDetails] = useState("")
    const [title, setTitle] = useState("")


    const [currentPosition, setCurrentPosition] = useState({});

    const success = position => {
        const currentPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        }
        setCurrentPosition(currentPosition);
    };
    const [opensnack, setopenlocationsnack] = React.useState(true);


    const handledel = (id) => {
        dispatch(delAddressuser(id))
        dispatch(fetchUserAddresses(userInfo.id))
        // setmakeTxt(make)
      }  


    const submitHandler = (e) => {

        e.preventDefault()
        const userid = userInfo.id
        dispatch(saveAdressAction({ address, lat, long, details, title, userid }))
        setopenlocation(true)
        dispatch(fetchUserAddresses(userInfo.id))

    }
    useEffect(() => {

        navigator.geolocation.getCurrentPosition(success)
    }, [dispatch])
    
    useEffect(() => {
        if(!loading) {
            dispatch(fetchUserAddresses(userInfo.id))

        }
    }, [dispatch]);

    const handleRadioChange = (event) => {
        setValue(event.target.value);

    };
    const renderMarkers = (map, maps) => {
        let marker = new maps.Marker({
            position: { lat: lat, lng: long },
            map,
            title: 'Hello World!'
        });
        return marker;
    };


    return (

        <>
    {/*SEO PART////////////////////////////////////////////////////////////////////////// */}
    <h1>my loaction<span className='textnormalbold'>(add or delete your location)</span></h1>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Drivo my Location </title>
        <meta name="description" content="my Locations" />
      </Helmet>
          
            <Form onSubmit={submitHandler}>
                <div style={{ height: '300px', width: '100%' }}>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: "AIzaSyBF_krXv6HVEMrGpHMcCHGwwHYPMcgFmLs" }}
                        defaultCenter={{ lat: 25.2048, lng: 55.2708 }}
                        defaultZoom={13}
                        yesIWantToUseGoogleMapApiInternals
                        onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
                        onClick={(e) => {
                            console.log("latitude = ", e.lat)
                            console.log("longtitude = ", e.lng)
                            setLat(e.lat)
                            setLong(e.lng)
                            Geocode.fromLatLng(lat, long).then(
                                (response) => {
                                    const addressgoogle = response.results[0].formatted_address;
                                    setAddress(addressgoogle)
                                },
                                (error) => {
                                    console.error(error);
                                }

                            );
                        }}
                    >
                        <AnyReactComponent
                            lat={lat}
                            lng={long}
                            text={<SiGooglemaps size={30} color={'#888'} />}

                        ></AnyReactComponent>


                    </GoogleMapReact>
                </div>


                <Form.Group controlId='address' className=' border-bottom'>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Pin Your Location On The Map'
                        value={address ? address : ""}
                        onChange={(e) => setAddress(e.target.value)}
                        disabled variant="standard" style={{ backgroundColor: '#fff', fontSize: '9px', borderBottom: 1, }}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='details' className=' border-bottom'>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter Address Details, For Example: P.O.BOX'
                        value={details ? details : ""}
                        onChange={(e) => setDetails(e.target.value)} style={{ backgroundColor: '#fff', fontSize: '9px', borderBottom: 1, }}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='title' className=' border-bottom'>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter Address Title, like "Home" or "Work"'
                        value={title ? title : ""}
                        onChange={(e) => setTitle(e.target.value)} style={{ backgroundColor: '#fff', fontSize: '9px', borderBottom: 1, }}
                    ></Form.Control>
                </Form.Group>
                <Box
                    sx={{
                        alignItems: 'center',
                        textAlign: 'center',
                        marginTop: 1
                    }}
                >
                    <Button
                        type='submit' variant='contained'
                        className='col-4 my-1 ' style={{borderRadius:25}}>Save Location</Button>
                </Box>

            </Form>

            <StyledBox
                sx={{
                    position: 'absolute',
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8,
                    visibility: 'visible',
                    right: 0,
                    left: 0,
                    textAlign: 'center',
                    bottom: 65
                }}
            ><Puller />
                <Button onClick={toggleDrawerLocation(true)}>Swipe Up for submitted location</Button>
            </StyledBox>
            <br />

            {/* \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ */}


            <SwipeableDrawer
                anchor="bottom"
                open={openlocation}
                onClose={toggleDrawerLocation(false)}
                onOpen={toggleDrawerLocation(true)}
                classes={{ paper: classes.drawerPaper }}

            >
                <Container fullwidth="true" style={{ height: 400 }}>

                    <Row>
                    <Col className='my-3' xs={5}>
                            
                                                                <span className='pbold'>My Locations</span>


                            </Col>
                            <Col className='my-2' style={{textAlign:'right'}} xs={7}>
                         
                                <Button onClick={toggleDrawerLocation(false)} ><FaPlus size={10}/> Add a new location <FaChevronDown /></Button>

                            </Col> <hr/>
                    </Row>
                   
                    <Row>
                        <Col >
                        {addresses ?  <Row>
                                                <Col >
                        {loading ? <Loader />
                         : error ? <Message variant='danger' text={error} />
                         :      <>
                                    {addresses?.map(address => (
                                           <Row>
                                            <Col  xs={4}>{address.title}</Col>
                                            <Col xs={6}>{address.address}</Col>
                                            <Col xs={2}> 
                                             <Button
                                            onClick={() => handledel(address._id)}
                                            >
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                        </Col>
                                           </Row>
                                    ))
                                    }</>
                                }

                                                    
                            </Col></Row>
                            :
                            <Alert severity="info" sx={{ width: '100%' }}>
                                You have no saved location
                            </Alert>
                        }
                        </Col>
                    </Row>
                </Container>
            </SwipeableDrawer>


        </>
    )
}

export default LocationScreen