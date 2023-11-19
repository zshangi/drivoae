import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Row, Col, Container } from 'react-bootstrap'
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import {FaChevronRight,FaViadeo} from "react-icons/fa";
import { GiHomeGarage,GiShoppingBag,GiBugleCall } from "react-icons/gi";
import { makeStyles } from '@material-ui/core/styles';
import {AiOutlineClose} from "react-icons/ai";
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import { AiOutlineLogout } from 'react-icons/ai'
import { RxAvatar } from "react-icons/rx";
import { FaMapMarkerAlt ,FaCar,FaCalendarCheck} from "react-icons/fa";
import { Link } from 'react-router-dom'
import { useHistory,NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CgProfile } from 'react-icons/cg';
import { AiOutlineHome } from 'react-icons/ai'
import { BiHelpCircle,BiBasket } from 'react-icons/bi'
import { BsChatDots,BsThreeDots } from 'react-icons/bs'

import { RiLoginCircleFill } from 'react-icons/ri'

import { userLogoutAction } from '../actions/userActions'
const useStyles = makeStyles({
  drawerPaper: {
    borderRadius: '20px 20px 0 0',
  },
});
function Header() {
  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const loginHandler = () => {
    history.push('/registerotpscreen?redirect=');
  }
  ////////////////////////////////////////////////////////////////////////////////////////
  const classes = useStyles();

  ////////////////////////////////////////////////////////////////////////////////////////
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const history = useHistory();
const myHandler = () => {
  setOpen(false)
  history.push('/my');
}
const garageHandler = () => {
  setOpen(false)
  history.push('/garage');
}
const helpHandler = () => {
  setOpen(false)
  history.push('/help');
}
const profileHandler = () => {
  setOpen(false)
  history.push('/profile');
}
const locationHandler = () => {
  setOpen(false)
  history.push('/location');
}
const dealHandler = () => {
  setOpen(false)
  history.push('/deal');
}
const termsHandler = () => {
  setOpen(false)
  history.push('/terms');
}
const faqHandler = () => {
  setOpen(false)
  history.push('/faq');
}
const aboutHandler = () => {
  setOpen(false)
  history.push('/about');
}
const refundHandler = () => {
  setOpen(false)
  history.push('/returnrefund');
}
const warantyHandler = () => {
  setOpen(false)
  history.push('/waranty');
}
const dashboardHandler = () => {
  setOpen(false)
  history.push('/supplier');
}
const logoutHandler = () => {
  dispatch(userLogoutAction())
  setOpen(false)
  window.location.reload();
} 

useEffect(() => {
 
}, [ userInfo])

    return ( 
      <Container fluid>
      <Row  >
      <Col className="p-1">
 
      </Col>
      <Col className="p-1">
    
        <Box sx={{alignItems:'center', textAlign:'center'}}>
          <img src={'/assets/img/icon-10.png'} width={100} height={44} />
        </Box>
       
  
      </Col>
      <Col className="p-1">
      <Box sx={{alignItems:'right', textAlign:'right'}}>
      {!userInfo?
    <Button sx={{color:'#666'}}  startIcon={<RiLoginCircleFill size={20} color={'#666'}/>} onClick={loginHandler} >Login</Button>
    :
    <span className='littlenormalyellow'>Hi! <h3>{userInfo.name}</h3></span>
      }
   </Box>
      </Col>
    </Row>
    <div className='show_header'>
    <nav className="navbar">
      <div className="container">

        <div className='nav-elements'>
          <ul>
            <li>
              <AiOutlineHome size={25} color='#1CB0CD'/> <NavLink to="/">Home</NavLink>
            </li>
            <li>
            <BiBasket size={25} color='#1CB0CD'/><NavLink to="/cart"> Cart</NavLink>
            </li>
            <li>
            <BsChatDots size={25} color='#1CB0CD'/> <NavLink to="/projects">Chat</NavLink>
            </li>
            <li  onClick={toggleDrawer(true)}>
            <BsThreeDots size={25} color={'#1CB0CD'}/> More
            </li>
      
          </ul>
        </div>
      </div>
    </nav>
    </div>
 
    <SwipeableDrawer
           anchor="bottom"
           open={open}
           onClose={toggleDrawer(false)}
           onOpen={toggleDrawer(true)}
           classes={{ paper: classes.drawerPaper }}

         >
            <Box sx={{height:"100%",alignItems: 'left',
                    textAlign:'left',  borderRadius: 3,
                  }} >
                         

             <MenuList>
     

        {userInfo?
          <>
         <MenuItem sx={{borderBottom:1,borderColor:'#61dafb',backgroundColor:'#61dafb50'}} onClick={profileHandler}>
         <ListItemIcon>
           <FaCar color={'#61dafb'}/>
         </ListItemIcon>
         <ListItemText><span className="pbold">Profile</span></ListItemText>
         <Typography variant="body2" color="text.secondary">
           <FaChevronRight color={'#666'}/>
         </Typography>
       </MenuItem>
         
         <MenuItem sx={{borderBottom:1,borderColor:'#61dafb'}} onClick={garageHandler}>
         <ListItemIcon>
          <FaCar color={'#61dafb'}/>
         </ListItemIcon>
         <ListItemText><span className="pbold">My Garage</span></ListItemText>
         <Typography variant="body2" color="text.secondary">
           <FaChevronRight color={'#666'}/>
         </Typography>
       </MenuItem>
       <MenuItem sx={{borderBottom:1,borderColor:'#61dafb'}} onClick={myHandler} >
         <ListItemIcon>
           <GiShoppingBag color={'#61dafb'}/>
         </ListItemIcon>
         <ListItemText>
       <span className="pbold">My Orders</span>

         </ListItemText>
         <Typography variant="body2" color="text.secondary">
         <FaChevronRight color={'#666'}/>
         </Typography>
       </MenuItem>
       <MenuItem sx={{borderBottom:1,borderColor:'#61dafb'}} onClick={locationHandler}>
         <ListItemIcon>
         <FaMapMarkerAlt color={'#61dafb'}/>
         </ListItemIcon>
       <ListItemText><span className="pbold">My Locations</span></ListItemText>
         <Typography variant="body2" color="text.secondary">
         <FaChevronRight color={'#666'}/>
         </Typography>
       </MenuItem>
       <MenuItem  sx={{borderBottom:1,borderColor:'#61dafb'}}  onClick={dealHandler}>
         <ListItemIcon>
         <FaViadeo color={'#61dafb'}/>
         </ListItemIcon>
         <ListItemText> <span className="pbold">My Deals</span></ListItemText>
         <Typography variant="body2" color="text.secondary">
         <FaChevronRight color={'#666'}/>
         </Typography>
       </MenuItem>

       </>
        :
        null
}

          

<MenuItem sx={{borderBottom:1,borderColor:'#61dafb',backgroundColor:'#61dafb50'}}  onClick={helpHandler}>
          <ListItemIcon>
            <FaCalendarCheck color={'#61dafb'}/>
          </ListItemIcon>
          <ListItemText>
            <span className="pbold">Help</span>
          </ListItemText>
          <Typography variant="body2" color="text.secondary">
          <FaChevronRight color={'#666'}/>
          </Typography>
        </MenuItem>


          <MenuItem sx={{borderBottom:1,borderColor:'#61dafb'}} onClick={aboutHandler}>
          <ListItemIcon>
          <FaCalendarCheck color={'#61dafb'}/>
          </ListItemIcon>
          <ListItemText>
            <span className="pbold">About Us</span>
          
            </ListItemText>
          <Typography variant="body2" color="text.secondary">
          <FaChevronRight color={'#666'}/>
          </Typography>
        </MenuItem>
        <MenuItem sx={{borderBottom:1,borderColor:'#61dafb'}} onClick={faqHandler}>
          <ListItemIcon>
          <FaCalendarCheck color={'#61dafb'}/>
          </ListItemIcon>
          <ListItemText>
            <span className="pbold">FAQ</span>
          
            </ListItemText>
          <Typography variant="body2" color="text.secondary">
          <FaChevronRight color={'#666'}/>
          </Typography>
        </MenuItem>
        <MenuItem sx={{borderBottom:1,borderColor:'#61dafb'}} onClick={refundHandler}>
          <ListItemIcon>
            <FaCalendarCheck color={'#61dafb'}/>
          </ListItemIcon>
          <ListItemText>
            <span className="pbold">Return and Refund</span>
          
            </ListItemText>
          <Typography variant="body2" color="text.secondary">
          <FaChevronRight color={'#666'}/>
          </Typography>
        </MenuItem>
        <MenuItem sx={{borderBottom:1,borderColor:'#61dafb'}} onClick={warantyHandler}>
          <ListItemIcon>
            <FaCalendarCheck color={'#61dafb'}/>
          </ListItemIcon>
          <ListItemText>
            <span className="pbold">Waranty</span>
          
            </ListItemText>
          <Typography variant="body2" color="text.secondary">
          <FaChevronRight color={'#666'}/>
          </Typography>
        </MenuItem>


        <MenuItem sx={{borderBottom:1,borderColor:'#61dafb'}} onClick={termsHandler}>
          <ListItemIcon>
            <FaCalendarCheck color={'#61dafb'}/>
          </ListItemIcon>
          <ListItemText><span className="pbold">Terms and Conditions</span></ListItemText>
          <Typography variant="body2" color="text.secondary">
          <FaChevronRight color={'#666'}/>
          </Typography>
        </MenuItem> 
        <MenuItem  sx={{bborderBottom:1,borderColor:'#61dafb'}}>
          <ListItemIcon>
          <FaCalendarCheck color={'#61dafb'}/>
          </ListItemIcon>
          <ListItemText>
            <span className="textnormalbold">Call support : 065537006 </span>
            <br/>
            <span className="textnormalbold">Email support :  support@drivo.ae </span>
            </ListItemText>
          <Typography variant="body2" color="text.secondary">
          <FaChevronRight color={'#666'}/>
          </Typography>
        </MenuItem>





        {userInfo?
            userInfo.groups=="supplier"&&
                    <MenuItem  onClick={dashboardHandler}>
                    <ListItemIcon>
                    <AiOutlineLogout color={'#61dafb'}/>
                    </ListItemIcon>
                    <ListItemText><span className="pbold">Dashboard</span></ListItemText>
                    <Typography variant="body2" color="text.secondary">
                    </Typography>
                  </MenuItem>
                :
                null
            
            }
            {userInfo?
        <MenuItem  sx={{backgroundColor:'#61dafb50'}}  onClick={logoutHandler}>
       
       <ListItemIcon>
       <AiOutlineLogout color={'#61dafb'}/>
       </ListItemIcon>
       <ListItemText><span className="pbold">Sign out</span></ListItemText>
       <Typography variant="body2" color="text.secondary">
       </Typography>
    
     </MenuItem>
     :
     null}
      </MenuList></Box>
               </SwipeableDrawer>
               </Container>
    )
}

export default Header
