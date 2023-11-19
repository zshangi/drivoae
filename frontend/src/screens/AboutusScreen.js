import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { saveVehicleUser, fetchVehicleUser, updateVehicleuserMain, delVehicleuser } from '../actions/userActions'
import { fetchMakes, fetchModels, fetchTrims } from '../actions/vehicleActions'
import { Row, Col } from 'react-bootstrap'
import Box from '@mui/material/Box';
import HomeCarousel from '../components/HomeCarousel'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Link } from 'react-router-dom';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import { FaMapMarkerAlt, FaCar, FaCalendarCheck, FaChevronDown, FaChevronRight } from "react-icons/fa";
import { GiCarWheel, GiCarBattery, GiMechanicGarage } from "react-icons/gi";
import { RiOilFill, RiCarWashingLine, RiGasStationFill } from "react-icons/ri";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import Loader from '../components/Loader'
import Message from '../components/Message'
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@mui/material/Divider';
import { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { Helmet } from 'react-helmet';



///////////////////////////////////////////////////////////////////////

const theme = createTheme();

export default function HelpScreen({ history }, props) {
  return (
    <Container style={{height:'100vh'}}>

      <Helmet>
        <meta charSet="utf-8" />
        <title>About US</title>
        <meta name="description" content="How can we help you" />
      </Helmet>
      <span style={{textAlign:'center',margin:'aout',display:'fixed'}}><h1 >About Us</h1></span>

      <Box
        sx={{
          marginTop: 3,
          alignItems: 'center',
          textAlign: 'center'
        }}
      >

      </Box>
   <span className='fontflexible'><GiCarWheel color={'#61dafb'}/> Who We Are: Meet Drivo, Your Go-To for Car Care</span>
   <p className='about'> Hello and welcome to Drivo! We're a startup that's all about making car care easy and transparent for everyone. We kicked things off with tires and are quickly branching out to oils, batteries, and more.</p>

<span className='fontflexible'> <GiCarWheel color={'#61dafb'}/> Our Roots: A Commitment to Simplifying Car Care</span>
 <p className='about'>Founded with the aim to simplify the often confusing world of car maintenance, Drivo empowers drivers with the right tools and choices. We connect you to a network of top-notch service centers, making it easy to get what you need, when you need it.
</p>
<span className='fontflexible'>Our Approach: Carefully Chosen Partners for Top Service</span>
 <p className='about'>We're really careful about who we team up with. Every service center in our network has been thoroughly checked to make sure they offer great service. So, you can be confident you're in good hands.
</p>
<span className='fontflexible'> <GiCarWheel color={'#61dafb'}/> Why Drivo is the Right Choice for You</span>
 <p className='about'>Fair Prices, No Surprises
We're all about giving you top brands at great prices. We keep things affordable by selling online, and we pass those savings on to you. Found a better price? Let us know, and we'll match it.
</p>
<span className='fontflexible'><GiCarWheel color={'#61dafb'}/>Quality Service You Can Trust</span>
 <p className='about'>We've got a wide network of service centers across the UAE. Each one has been vetted to make sure they're up to snuff. That means you can trust them to take good care of your car.
</p>
<span className='fontflexible'> <GiCarWheel color={'#61dafb'}/> A Wide Range of Options</span>
 <p className='about'>We offer a big selection of brands and sizes. Whether you're on a budget or looking for something top-of-the-line, we've got you covered.
</p>


<span className='fontflexible'> <GiCarWheel color={'#61dafb'}/> Safety First: Tires You Can Trust</span>
 <p className='about'>Every tire we sell is brand new and comes with a manufacturer's warranty. That means you can hit the road with confidence, knowing you're safe.
</p>
<span className='fontflexible'><GiCarWheel color={'#61dafb'}/> Shop Your Way: Easy and Convenient</span>
 <p className='about'>Our site is open 24/7, so you can shop whenever you like. Just pick your tires, choose where you want them fitted, and you're all set.
</p>
   
   <br/><br/><br/>
   
   
   
     </Container>

  );
}


