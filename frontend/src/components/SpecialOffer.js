import * as React from 'react';
import { Row, Col, Container, Card, Image, Form } from 'react-bootstrap'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';


export default function SpecialOffer() {



  return (

        <Row className='py-3'>
        <Col className='p-3' sm={12} md={6} lg={6} xl={6}>
        <Card className="bg-light text-white">
      <Card.Img src={'assets/images/specialoffer/shop_1.png'} />
      <Card.ImgOverlay>
        <Card.Text className='cardtitle'> 
         Do you own a car shop? Let’s share the adventure!
        <br/>
        <Button variant="contained" color="success">MOre Information</Button>
        </Card.Text>
      </Card.ImgOverlay>
    </Card>
        
            </Col>
            <Col className='p-3' sm={12} md={6} lg={6} xl={6} >
            <Card className="bg-light text-white">
      <Card.Img src={'assets/images/specialoffer/winter.png'} />
      <Card.ImgOverlay>
        <Card.Title >
            </Card.Title>

        <Card.Text className='cardtitle'> 
         Do you own a car shop? Let’s share the adventure!
        <br/>
        <Button variant="contained" color="success">MOre Information</Button>
        </Card.Text>
      </Card.ImgOverlay>
    </Card>
            </Col>

            </Row>
         



  );
}