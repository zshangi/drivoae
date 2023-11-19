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
        <title>Waranty</title>
        <meta name="description" content="Waranty" />
      </Helmet>
      <h1>TIRE LIMITED WARRANTY POLICY
</h1>

      <Box
        sx={{
          marginTop: 3,
          alignItems: 'center',
          textAlign: 'center'
        }}
      >

      </Box>
   <h2><GiCarWheel color={'#61dafb'}/> Warranty Period and Coverage
</h2>
<p>The manufacturer provides a Limited Warranty for a duration ranging from 6 to 12 months, depending on the manufacturer's specific policy. This warranty covers manufacturing defects as determined by the manufacturer's authorized agents or representatives.
</p>
   <h2>Claim Procedure</h2>
   <ul>
   <li>Submission for Inspection: The tire must be submitted for inspection along with valid proof of purchase.
   </li><li>Inspection by Authorized Personnel: The tire will undergo an inspection conducted by the manufacturer's authorized personnel.
	</li><li>Inspection Duration: The complete inspection process may take between 2 to 3 weeks.
	</li><li>Final Report: The findings of the manufacturer's authorized personnel will be considered final.
	</li><li>Temporary Replacement: Customers may need to purchase a new tire while the claim tire is under inspection.
	</li><li>Refund: If the claim is accepted under the warranty, the customer will be refunded the claim amount.
	</li><li>Wear Rate Compensation: The compensation for the claim tire will be based on its wear rate.
  </li></ul>
  <h2>Exclusions</h2>
  <h3>The Tire Limited Warranty does not cover:</h3>
  <ul>
    <li>Damage from road hazards, including but not limited to cuts, snags, bruises, impact breaks, bulges, punctures, stone drills, chips, fire, theft, or collision.</li>
    <li>Conditions resulting from improper tire or vehicle maintenance, including irregular or excessive tread wear due to incorrect inflation, overloading, vehicle misalignment, failure to rotate tires, or poor mechanical condition of brakes, shocks, and wheels.</li>
    <li>Complaints of excessive noise from the tire-wheel assembly.</li>
    <li>Any tire that has been operated with low inflation pressure or while flat.</li> 
    <li>Tires showing uneven wear or a difference of 2MM between major tread grooves or between front and rear sets.
</li>
    <li>Damage due to abuse, sudden braking, vandalism, tire spinning, racing, or other competitive activities.
</li> 
    <li>Damage or deterioration from the use of oil-based chemicals, water-based sealers, balancing substances, or flammable gases.
</li>
    <li>Tires with the DOT identification number removed or rendered illegible.
</li>
<li>Improper application, including incorrect size and load rating for the vehicle, improper mounting, balancing, or repair.
</li>
<li>Damage from incorrect mounting or dismounting, incorrect wheel size, water or other substances trapped inside the tire during mounting, or failure to keep the tires balanced.
</li>
<li>Damage resulting from improper repair materials or procedures.
</li>
  </ul>

<p>By making a purchase on Drivo.ae, you agree to this Tire Limited Warranty Policy.
</p>





   
   
   
   
   
     </Container>

  );
}


