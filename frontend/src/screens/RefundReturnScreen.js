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
        <title> RETURN & REFUND POLICY</title>
        <meta name="description" content=" RETURN & REFUND POLICY" />
      </Helmet>
      <h1> RETURN & REFUND POLICY</h1>

     
<h2>Cancellation and Return</h2>
<p>Customers have the right to cancel their Contract and return the purchased Goods for a full refund or credit, under the following conditions:
</p>
<ul>
<li>	The Goods have not been used, mounted on a rim, or driven on.</li>
<li>	The Goods are returned with all original packaging materials intact.</li>
<li>	The Goods are in the same pristine condition as when received by the installer or customer.</li>
</ul>
<h2>Early Cancellation</h2>
<p>If the cancellation occurs before the Goods have left our warehouse, the customer will not incur any charges.
</p><h2>Return Costs</h2>
<p>Customers are responsible for all costs associated with returning the Goods. Drivo.ae reserves the right to charge the customer for any direct costs related to the return. For an accurate estimate of return costs, customers can contact our customer service center, as costs may vary based on tire specifications and location.
</p><h2>Special Cases</h2>
<p>Goods purchased during special promotions, rare sizes, specialized tires, or race/track tires are not eligible for return or refund.
</p>
<h2>Refund Method</h2>
<p>All refunds will be processed through the original mode of payment used during the purchase.</p>
<h2>Contact Information</h2>
<p>For any queries or to initiate a return, please contact our customer service center.</p>
<p>By making a purchase on Drivo.ae, you agree to this Return & Refund Policy.</p>


<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
     </Container>

  );
}


