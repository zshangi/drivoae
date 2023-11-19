import React, { useState, useEffect } from 'react'
import Card from '@mui/material/Card';
import { BsThermometerHigh,BsTools,BsBootstrapReboot,BsSafe} from "react-icons/bs";



function HomeCarousel() {
  
  
    return (
     
        
      <div className="cards-containerinclude">
  
      <Card  className="cardinclude"  style={{ borderRadius: 15,backgroundColor:'#EBECF0',padding:6,margin:3}}>
      <BsThermometerHigh/><br/>
      <span className='textnormalbold'> Nitrogen </span>
      
      <span className='textnormalbold'> Filling</span>
      </Card>

      <Card  className="cardinclude"  style={{ borderRadius: 15,backgroundColor:'#EBECF0',padding:6,margin:3}}>
      <BsTools/><br/>
      <span className='textnormalbold'> Fitting and </span>
      
      <span className='textnormalbold'>Balancing</span>
      </Card>

      <Card  className="cardinclude"  style={{ borderRadius: 15,backgroundColor:'#EBECF0',padding:6,margin:3}}>
      <BsBootstrapReboot/><br/>
      <span className='textnormalbold'> Free rotation</span>
      
      <span className='littleblue'> after 10,000KM</span>
      </Card>

      <Card  className="cardinclude"  style={{ borderRadius: 15,backgroundColor:'#EBECF0',padding:6,margin:3}}>
      <BsSafe/><br/>
      <span className='textnormalbold'> Warranty</span>
      <br/>
      <span className='littleblue'>1-Year</span>
      </Card>


 
  </div>

    )
}

export default HomeCarousel
