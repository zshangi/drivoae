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
    <Container>

      <Helmet>
        <meta charSet="utf-8" />
        <title>Drivo Help Page</title>
        <meta name="description" content="How can we help you" />
      </Helmet>
      <h1>Help<span className='textnormalbold'>(check our latest guide)</span></h1>




      <Row>
        <Col>
          When you're shopping for tires, it's important to know your tire size. It's usually displayed on the side of your tire and looks something like "205/55R16". These numbers are key:
        </Col>
      </Row>
      <Box
        sx={{
          marginTop: 3,
          alignItems: 'center',
          textAlign: 'center'
        }}
      >
        <img src="/assets/img/helpsize.jpg" width={'50%'} />

      </Box>
      <Row>
        <Col xs={2} sm={2} md={1} lg={1} xl={1}>
          <img src="/assets/img/width.jpg" style={{ width: '100%', height: undefined, resizeMode: 'contain', aspectRatio: 1 }} />
        </Col>
        <Col xs={10} sm={10} md={11} lg={11} xl={11}>
          Width(205)<br />
          The first number (205) is the tire's width in millimeters. Simply put, it's how wide your tire is from one side to another.
        </Col>
        <Col className='my-2' xs={2} sm={2} md={1} lg={1} xl={1}>
          <img src="/assets/img/profile.jpg" style={{ width: '100%', height: undefined, resizeMode: 'contain', aspectRatio: 1 }} />
        </Col>
        <Col className='my-2' xs={10} sm={10} md={11} lg={11} xl={11}>
          Profile(55)<br />
          The second number (55) is the tire's profile, also known as the aspect ratio. This is the height of the tire sidewall as a percentage of the tire width. In this case, the height of the tire is 55% of its width.
        </Col>
        <Col className='my-2' xs={2} sm={2} md={1} lg={1} xl={1}>
          <img src="/assets/img/diameter.jpg" style={{ width: '100%', height: undefined, resizeMode: 'contain', aspectRatio: 1 }} />
        </Col>
        <Col className='my-2' xs={10} sm={10} md={11} lg={11} xl={11}>
          Rim(16)<br />
          The third number (16) is the rim size or diameter of the wheel the tire fits onto. This is measured in inches.
        </Col>
      </Row>
      So when you see "205/55R16", it means the tire is 205mm wide, has a profile of 55%, and fits on a 16" rim.

      While shopping for tires on our site, make sure to input these numbers in the right order when asked for your tire size.

      If you're unsure, we're here to help! You can take a clear picture of the numbers on the side of your tire and send it to our WhatsApp support. We'll guide you through the process.
    </Container>

  );
}


