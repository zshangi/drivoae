import {  Container, Row,  Col,Carousel } from 'react-bootstrap'
import React, { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';



function HomeCarousel() {
  
  
    return (
     
        
      <div className="cards-container">
  
      <Card style={{ borderRadius: 18, boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}>
      <CardMedia
          component="img"
          image={'assets/images/specialoffer/1.svg'}
          alt="green iguana"
        />
             
        <CardContent>
       <Typography gutterBottom variant="h5" component="div">
              <span className='pbold'>1.Find Your Tire</span>
        </Typography>
          <Typography variant="body2" color="text.secondary">
          Browse our tyres by size or add your car for personalized suggestions. Not sure? Send us a tire photo.
          </Typography>
        </CardContent> 
        </Card>

        <Card style={{ borderRadius: 18, boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}>
      <CardMedia
          component="img"
          image={'assets/images/specialoffer/2.svg'}
          alt="green iguana"
        />
        <CardContent> <Typography gutterBottom variant="h5" component="div">
        <span className='pbold'>2.Select Installer</span>
        </Typography>
          <Typography variant="body2" color="text.secondary">
          Choose from 20+ trusted installers nearby or opt for mobile service at your location.
          </Typography>
        </CardContent> 
        </Card>

        <Card style={{ borderRadius: 18, boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}>
      <CardMedia
          component="img"
          image={'assets/images/specialoffer/3.svg'}
          alt="green iguana"
        />
        <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        <span className='pbold'>3.Schedule & Pay</span>        </Typography>
                  <Typography variant="body2" color="text.secondary">
          Transparent pricing. Pick a time, pay online. We'll deliver your tires to the shop.
          </Typography>
        </CardContent> 
        </Card>

        <Card style={{ borderRadius: 18, boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}>
      <CardMedia
          component="img"
          image={'assets/images/specialoffer/4.svg'}
          alt="green iguana"
        />
        <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        <span className='pbold'>4.Drive With confidence</span>      </Typography>

          <Typography variant="body2" color="text.secondary">
          Enjoy complimentary installation, balancing, and nitrogen filling. Drive safe with Drivo.ae!
          </Typography>
        </CardContent> 
        </Card>
 
  </div>

    )
}

export default HomeCarousel