import {  Container, Row,  Col,Carousel } from 'react-bootstrap'
import React, { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';




function BrandLogo() {
  
  
    return (
     
     
      <div className="cards-container" spacing={1} >

<Button style={{ backgroundColor: '#f1f1f3', borderRadius: 50, color: '#666', minWidth:'150px', height: 43, margin:1 }} >
      <img className='img-brand' src={'assets/img/brandlogos/accelera.svg'} />
       </Button>
       <Button style={{ backgroundColor: '#f1f1f3', borderRadius: 50, color: '#666', minWidth:'150px', height: 43, margin:1 }} >
      <img className='img-brand' src={'assets/img/brandlogos/Atturo.svg'}  />
     </Button>
     <Button style={{ backgroundColor: '#f1f1f3', borderRadius: 50, color: '#666', minWidth:'150px', height: 43, margin:1 }} >
      <img className='img-brand' src={'assets/img/brandlogos/bfgoodrich.svg'}  />
     </Button>
     <Button style={{ backgroundColor: '#f1f1f3', borderRadius: 50, color: '#666', minWidth:'150px', height: 43, margin:1 }} >
      <img className='img-brand' src={'assets/img/brandlogos/Bridgestone.svg'}  />
       </Button>
       <Button style={{ backgroundColor: '#f1f1f3', borderRadius: 50, color: '#666', minWidth:'150px', height: 43, margin:1 }} >
      <img className='img-brand' src={'assets/img/brandlogos/continental.svg'} />
     </Button>

     <Button style={{ backgroundColor: '#f1f1f3', borderRadius: 50, color: '#666', minWidth:'150px', height: 43, margin:1 }} >
      <img className='img-brand' src={'assets/img/brandlogos/cooper.svg'}  />
     </Button>

     <Button style={{ backgroundColor: '#f1f1f3', borderRadius: 50, color: '#666', minWidth:'150px', height: 43, margin:1 }} >
      <img className='img-brand' src={'assets/img/brandlogos/Deestone.svg'} width={'100%'} />
       </Button>

       <Button style={{ backgroundColor: '#f1f1f3', borderRadius: 50, color: '#666', minWidth:'150px', height: 43, margin:1 }} >
      <img className='img-brand' src={'assets/img/brandlogos/Dunlop.svg'} width={'100%'} />
     </Button>

     <Button style={{ backgroundColor: '#f1f1f3', borderRadius: 50, color: '#666', minWidth:'150px', height: 43, margin:1 }} >
      <img className='img-brand' src={'assets/img/brandlogos/Firestone.svg'} width={'100%'} />
     </Button>


     <Button style={{ backgroundColor: '#f1f1f3', borderRadius: 50, color: '#666', minWidth:'150px', height: 43, margin:1 }} >
      <img className='img-brand' src={'assets/img/brandlogos/kumho.svg'} width={'100%'} />
       </Button>

       <Button style={{ backgroundColor: '#f1f1f3', borderRadius: 50, color: '#666', minWidth:'150px', height: 43, margin:1 }} >
      <img className='img-brand' src={'assets/img/brandlogos/Hankook.svg'} width={'100%'} />
     </Button>

     <Button style={{ backgroundColor: '#f1f1f3', borderRadius: 50, color: '#666', minWidth:'150px', height: 43, margin:1 }} >
      <img className='img-brand' src={'assets/img/brandlogos/goodyear.svg'} width={'100%'} />
     </Button>
 
  </div>

    )
}

export default BrandLogo
