import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Container } from 'react-bootstrap'
import Box from '@mui/material/Box';
import { saveServiceCenter } from '../actions/cartActions'
import { fetchVehicleTyres } from '../actions/vehicleActions'
import Button from '@mui/material/Button';
import { savePaymentMethod } from '../actions/cartActions'
import { Link } from 'react-router-dom';
import Loader from '../components/Loader'
import Message from '../components/Message'
import Card from 'react-bootstrap/Card';
import { GiCarWheel, GiCarBattery, GiMechanicGarage } from "react-icons/gi";
import Typography from '@mui/material/Typography';
import {FaChevronRight,FaViadeo} from "react-icons/fa";
import {BiArrowBack} from "react-icons/bi";
import Alert from '@mui/material/Alert';
import { Helmet } from 'react-helmet';

function VehicleTyre({ match, history }) {
  const modificationId = match.params.id

  const dispatch = useDispatch()
  const listVehicleTyres = useSelector(state => state.listVehicleTyre)
  const { error, loading, vehicletyres } = listVehicleTyres
  const vehicletyresfilter = vehicletyres.filter(
    (vehilce) => vehilce.tyre.flag == 1
  );
  useEffect(() => {
    dispatch(fetchVehicleTyres(match.params.id))
  }, [dispatch])

  ////////////////////////////////////////////////////////////////////////////////////////


  const submitHandler = (e) => {
    e.preventDefault()


    history.push('/placeorder')
  }


  return (

    <Container fluid>
     <Helmet>
        <meta charSet="utf-8" />
        <title>Drivo Tires'S vehicle </title>
        <meta name="description" content="size filtered by vehicle" />
      </Helmet>
      <h1>choose the best size for your vehicle</h1>

      {loading ? <Loader />
        : error ? <Message variant='danger' text={error} />
          : vehicletyresfilter.length > 0? 
            <Row >
            {vehicletyresfilter.map(vehicletyre => (
                                <Col  xs={12} sm={6} md={3} lg={3} xl={3}>
                                  <Card>
              <Link  className="linknormal" to={{pathname:`/productvehicle/${vehicletyre.tyre._id}/${vehicletyre.tyre.url}`,
                                                id:vehicletyre.tyre._id}} >

                <Row className='p-3'>
                  <Col xs={6} style={{ alignItems: 'left', textAlign: 'left' }}>
                    <GiCarWheel /> {vehicletyre.tyreName}   
                  </Col>
                  <Col  style={{ alignItems: 'left', textAlign: 'left' }}>
                   {vehicletyre.wheels==1?
                   <p>(Front)</p>
                   :
                   <p>(Rear)</p>
                   }
                  </Col>
                  <Col style={{ alignItems: 'right', textAlign: 'right' }}>
                  <Typography variant="body2" color="text.secondary">
            <FaChevronRight color={'#666'}/>
          </Typography>    
                  </Col>

                </Row>


              </Link></Card>
</Col>
            ))}
            </Row>
            :
            <Alert severity="success">Unfortunately, there is currently no tire suitable for your vehicle's tire size.</Alert>

          
      }
      </Container>



  )
}

export default VehicleTyre
