import * as React from 'react';
import { Row, Col, Container, Card, Image, Form } from 'react-bootstrap'
import Box from '@mui/material/Box';

export default function VerticalLinearStepper() {



  return (
    <Row>
    <Row className='py-5'>
    <Col sm={12} md={12} lg={12} xl={12}>
    <Box sx={{ textAlign: 'center', alignitems: 'center' }}>
      <h2>SERVICES</h2>
      </Box>
      </Col>
      </Row>
        <Row>
        <Col className="justify" sm={12} md={3} lg={3} xl={3}>
        <Box sx={{ textAlign: 'center', alignitems: 'center' }}>
     <img src={'assets/img/icon/Icons.svg'}></img>
     <h4>Tyre Service</h4></Box>
       <Box sx={{textAlign:'justify'}}> For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`,</Box>
        
            </Col>
            <Col sm={12} md={3} lg={3} xl={3} >
            <Box sx={{ textAlign: 'center', alignitems: 'center' }}>
    <img src={'assets/img/icon/Icons.svg'}></img>
    <h4>Fleet Service</h4>
    </Box>  <Box sx={{textAlign:'justify'}}>
            For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`,
        </Box>
            </Col>
            <Col sm={12} md={3} lg={3} xl={3} >
            <Box sx={{ textAlign: 'center', alignitems: 'center' }}>
            <img src={'assets/img/icon/lift.svg'}></img>
    <h4>Oil change</h4>
    </Box>  <Box sx={{textAlign:'justify'}}>
            For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`,
       </Box>
            </Col>
            <Col sm={12} md={3} lg={3} xl={3} >
            <Box sx={{ textAlign: 'center', alignitems: 'center' }}>
    <img src={'assets/img/icon/Page-1.svg'}></img>
    <h4>diagnostics</h4>
    </Box>  <Box sx={{textAlign:'justify'}}>
            For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`,
        </Box>
            </Col>
            </Row>
           
</Row>


  );
}