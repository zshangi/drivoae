import React, { useState, useEffect } from 'react'

import Paper from '@mui/material/Paper';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { NavLink } from 'react-router-dom'
import { userLogoutAction } from '../actions/userActions'
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineLogout,AiOutlineHome } from 'react-icons/ai'
import { BiHelpCircle,BiBasket } from 'react-icons/bi'
import { BsChatDots,BsThreeDots } from 'react-icons/bs'
import { CgProfile } from 'react-icons/cg'
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Divider from '@mui/material/Divider';
import {FaChevronRight,FaViadeo} from "react-icons/fa";
import { GiHomeGarage,GiShoppingBag,GiBugleCall } from "react-icons/gi";
import { makeStyles } from '@material-ui/core/styles';
import {AiOutlineClose} from "react-icons/ai";
import MenuList from '@mui/material/MenuList';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import { RxAvatar } from "react-icons/rx";
import { FaMapMarkerAlt ,FaCar,FaCalendarCheck} from "react-icons/fa";
import { GiHamburgerMenu } from 'react-icons/gi';
import Box from '@mui/material/Box';

const useStyles = makeStyles({
  drawerPaper: {
    borderRadius: '20px 20px 0 0',
  },
});

export default function StickyFooter() {
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


  const HomeHandler = () => {
    history.push('/');

  };
  const CartHandler = () => {
    history.push('/cart');

  };
  const ChatHandler = () => {
    window.open('https://api.whatsapp.com/send?phone=971505039598&text=Hello%20Drivo.ae&source=&data=&app_absent=', '_blank');

  };
  const [value, setValue] = React.useState(0);

  return (
    <>
    

      <Paper className='show_footer' sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 ,backgroundColor:'#fff',alignItems:'center',textAlign:'center',spacing : 10,boxShadow:5,height:60}} elevation={3}>
      <BottomNavigation   value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }} showLabels   sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 ,backgroundColor:'#fff',alignItems:'center',textAlign:'center',spacing : 10,boxShadow:5,color:'#fff' ,height:60}}>
      
      <BottomNavigationAction sx={{color:'#1CB0CD'}}  onClick={HomeHandler} label="Home" icon={<AiOutlineHome size={25}/>}/>


      <BottomNavigationAction sx={{color:'#1CB0CD'}}
        onClick={CartHandler} label="Cart"  icon={<BiBasket size={25}/>}/>

      <BottomNavigationAction sx={{color: '#1CB0CD'}}  label="Chat"  onClick={ChatHandler}  icon={<BsChatDots size={25}/>}/>
      
      <BottomNavigationAction onClick={toggleDrawer(true)} sx={{color:'#1CB0CD'}}   label="more"  icon={<BsThreeDots size={25} color={'#1CB0CD'}/>}/>
  
      </BottomNavigation>
    </Paper>


   


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
    </>
  );
}