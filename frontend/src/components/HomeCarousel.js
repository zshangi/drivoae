import {  Container, Row,  Col,Card } from 'react-bootstrap'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';




function HomeCarousel() {
  
  
    return (
     
        


<Carousel>
      <Carousel.Item>
      <Card  style={{ borderRadius: 18,boxShadow:10}} >

      <img src={'assets/images/specialoffer/2.png'} width={'100%'} />
  
        </Card>
      </Carousel.Item>
      <Carousel.Item>
      <Card  style={{ borderRadius: 18,boxShadow:10}} >

      <img src={'assets/images/specialoffer/4.png'} width={'100%'} />
  </Card>
      </Carousel.Item>

      <Carousel.Item>
      <Card  style={{ borderRadius: 18,boxShadow:10}} >

      <img src={'assets/images/specialoffer/9.png'} width={'100%'} />
  </Card>
      </Carousel.Item>

    </Carousel>

    )
}

export default HomeCarousel
