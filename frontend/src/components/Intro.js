import * as React from 'react';
import { Row, Col, Container, Card, Image, Form } from 'react-bootstrap'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';


export default function Intro() {



  return (
    <>

        <Row className='py-5 m-3 justify'>
        <Col sm={12} md={12} lg={12} xl={12}>
        <Box sx={{ textAlign: 'center', alignitems: 'center' }}>
      <h2>DRIVE WITH CONFIDENCE</h2>
      </Box>  <Box sx={{textAlign:'justify'}}>
Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eir
mod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua
. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
 no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
  consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et 
  dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo 
  duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
   Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing 
        
  </Box>
        
            </Col>

            </Row>
         
            <Row className='py-3'>
    <Col sm={12} md={12} lg={12} xl={12}>
    <Box sx={{ textAlign: 'center', alignitems: 'center' }}>
    <Button variant="contained" >Enter OUr shop</Button>
      </Box>
      </Col>
      </Row>
            </>

  );
}