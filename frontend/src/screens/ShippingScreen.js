import React, { useState, useEffect, useRef } from 'react'
import { Form, Container } from 'react-bootstrap'
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingAddress } from '../actions/cartActions'
import { Row, Col, Card } from 'react-bootstrap'
import { fetchUserAddresses, saveAdressAction } from '../actions/userActions'
import Box from '@mui/material/Box';
import Geocode from "react-geocode";
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Alert from '@mui/material/Alert';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import GoogleMapReact from 'google-map-react';
import { SiGooglemaps } from "react-icons/si";
import { grey } from '@mui/material/colors';
import { styled } from '@mui/material/styles';

import Divider from '@mui/material/Divider';
import { FaMapMarkerAlt, FaCar, FaCalendarCheck, FaChevronDown, FaChevronRight, FaPlus } from "react-icons/fa";
import { makeStyles } from '@material-ui/core/styles';
import {BiArrowBack} from "react-icons/bi";
import { Link } from 'react-router-dom';
import { TextField } from '@mui/material';
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
    height: 7,
    backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
    borderRadius: 3,
    position: 'absolute',
    top: 1,
    left: 'calc(50% - 15px)',
}));
///////////////////////////////////////////////////

function ShippingScreen({ history }, props) {

    const [value, setValue] = React.useState('1');
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const ListAddresses = useSelector(state => state.ListAddress)
    const { addresses, error, loading, } = ListAddresses
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart
    ////////////////////////////////////////////////////
    Geocode.setApiKey("AIzaSyBF_krXv6HVEMrGpHMcCHGwwHYPMcgFmLs");
    ///////////////////////////////////////////////////


    const classes = useStyles();
    const [openlocation, setopenlocation] = React.useState(false);
    const [message, setMessage] = React.useState('');


    const toggleDrawerLocation = (newOpen) => () => {
        setopenlocation(newOpen);
    };

    ///////////////////////////////////////////////////


    const [lat, setLat] = useState("")
    const [long, setLong] = useState("")
    const [address, setAddress] = useState("")
    const [details, setDetails] = useState("")
    const [title, setTitle] = useState("")


    const [currentLocation, setCurrentLocation] = useState({ lat: 25.2048, lng: 55.2708  });

    const [opensnack, setopenlocationsnack] = React.useState(true);



    const handlesnackClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setopenlocationsnack(false);
    };
    const submitaddress = (e) => {
        e.preventDefault()
        if (lat) {
            dispatch(saveShippingAddress({ address, lat, long, details, title }))
            history.push('/service')
        } else {
            setopenlocationsnack(true);
        }

    }

    const submitHandler = (e) => {

        e.preventDefault()
        const userid = userInfo.id
        dispatch(saveAdressAction({ address, lat, long, details, title, userid }))
        dispatch(saveShippingAddress({ address, lat, long, details, title }))
        if (lat){
            history.push('/service')
        }else{
            setMessage('Pin your Location On the map')

        }

    }
    useEffect(() => {
        if (userInfo) {
            dispatch(fetchUserAddresses(userInfo.id))
        }
    
        navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              setCurrentLocation({ lat: latitude, lng: longitude });
            },
            (error) => {
              console.error('Error getting location:', error);
            }
          );
            }, [dispatch])

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
    const Marker = ({ text }) => <div>{text}</div>;


    return (
<>
        <Container>
        <Helmet>
        <meta charSet="utf-8" />
        <title>Drivo's shipping address </title>
        <meta name="description" content="shipping address" />
      </Helmet>
      <h1>shipping address</h1>
      
        <div style={{ height: '300px', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyBF_krXv6HVEMrGpHMcCHGwwHYPMcgFmLs" }}
                    defaultCenter={{ lat: 25.2048, lng: 55.2708 }}
                    center={currentLocation}
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
                  <Marker lat={currentLocation.lat} lng={currentLocation.lng} text={<SiGooglemaps size={30} color={'#FF0000'} />} />

                    <AnyReactComponent
                        lat={lat}
                        lng={long}
                        text={<SiGooglemaps size={30} color={'#888'} />}

                    ></AnyReactComponent>


                </GoogleMapReact>
        </div>
        <Form onSubmit={submitHandler}>
            {message?
            <p>{message}</p>  
            :   null 
            }
            <Row > 
                <Col className='my-1'  xs={12} sm={12} md={12} lg={12} xl={12}>   
                <TextField
                    required
                    type='text'
                    placeholder='Pin Your Location On The Map'
                    value={address ? address : ""}
                   style={{width:'100%'}}
                   size="small"
                    onChange={(e) => setAddress(e.target.value)} 
                     variant="outlined"   />
                </Col> 
                <Col className='my-1' xs={12} sm={12} md={12} lg={12} xl={12}>   
    
                <TextField
                    required
                    type='text'
                    style={{width:'100%'}}
                    size="small"
                    placeholder='Enter Address Details, For Example: P.O.BOX'
                    value={details ? details : ""}
                    onChange={(e) => setDetails(e.target.value)} variant="outlined" 
                />
                </Col>
                <Col className='my-1' xs={12} sm={12} md={12} lg={12} xl={12}>   
                <TextField
                    required
                    type='text'
                    style={{width:'100%'}}
                    size="small"
                    placeholder='Enter Title, like "Home" or "Work"'
                    value={title ? title : ""}
                    onChange={(e) => setTitle(e.target.value)} variant="outlined" 
                />
                </Col>
            <Box
                sx={{
                    alignItems: 'center',
                    textAlign: 'center',
                    marginTop: 1
                }}
            >
                <Button
                    type='submit' variant='contained'
                    style={{ borderRadius: 25,  backgroundColor: '#1CB0CD'}}
                    >Save & Continue</Button>
            </Box>
            </Row>  
        </Form>
        <br/>  <br/>  <br/>  <br/><br/>  
  </Container>
  <StyledBox
            sx={{
                position: 'fixed',
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
                visibility: 'visible',
                right: 0,
                left: 0,
                textAlign: 'center',
                bottom: 60
            }}
        ><Puller />
            <Button onClick={toggleDrawerLocation(true)}>Swipe Up for submitted location</Button>
        </StyledBox>

            {/* \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ */}


            <SwipeableDrawer
                anchor="bottom"
                open={openlocation}
                onClose={toggleDrawerLocation(false)}
                onOpen={toggleDrawerLocation(true)}
                classes={{ paper: classes.drawerPaper }}

            >
                <Container fullwidth="true" style={{ height: 300 }}>

                    <Row>
                        <Col className='my-3' xs={5}>
                           
                                <span className='pbold'>My Locations</span>

                           </Col>
                        <Col className='my-2' style={{textAlign:'right'}} xs={7}>
                       
                                <Button onClick={toggleDrawerLocation(false)} ><FaPlus  />Add a new location  <FaChevronDown /></Button>

                            </Col>
                    </Row>
                    <Row>
                        <Col >
                        {addresses ?

                            <form onSubmit={submitaddress}  >

                                <FormControl error={error} variant="standard">
                                    <RadioGroup
                                        aria-labelledby="demo-error-radios"
                                        name="quiz"
                                        value={value}
                                        onChange={handleRadioChange}
                                    >
                                        {addresses?.map(address => (
                                                                            <>

                                            <Row>
                                                <Col >
                                                    <FormControlLabel onChange={(e) => { setAddress(address.address); setLat(address.lat); setLong(address.long); setDetails(address.details) }} value={address.title}
                                                      control={<BpRadio />} label={<span className='textblue'>{address.title}</span>}  />
                                                    <br/><span className='p-4 textnormal'>{address.address.substring(0, 40)}....</span>
                                                </Col>
                                               
                                            </Row>
                                             <Divider style={{width:'320px'}} />
                                             </>



                                        ))}
                                    </RadioGroup>
                                </FormControl>
                                <Box sx={{ alignItems: 'right', textAlign: 'right', width: '100%',marginTop:2 }} >
                                    <Button type="submit" variant="contained"                     style={{ borderRadius: 25,  backgroundColor: '#1CB0CD'}}
 >Next</Button>
                                </Box>
                            </form>
                            
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

export default ShippingScreen