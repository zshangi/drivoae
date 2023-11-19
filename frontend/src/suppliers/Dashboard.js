import React, { useState, useEffect } from 'react'
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { Row, Col, Table } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { LinkContainer } from 'react-router-bootstrap'
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems, secondaryListItems } from './listItems';
import Chart from './Chart';
import Deposits from './Deposits';
import Orders from './Orders';
import { userLogoutAction } from '../actions/userActions'
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../actions/orderActions'



const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Dashboard({history}) {

  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  let supplierorder=[]
  const listOrders = useSelector(state => state.listOrder)
  const { error, loading, orders } = listOrders
  if(Array.isArray(orders)){
    supplierorder = orders?.filter(
   (order) => (order.servicecenter.user.id == userInfo.id && order.isPaid)
 );
  }
  const today = new Date().toISOString().slice(0, 10);
  const filteredOrders = supplierorder.filter(order => order.timetable.datetable === today);
 
  useEffect(() => {
    dispatch(fetchOrders())
}, [dispatch])

  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const logoutHandler = () => {
    dispatch(userLogoutAction())
    history.push('/login')
    
  }  
  useEffect(() => {
    if (!userInfo) {
      history.push("/login")
    }
  }, [userInfo]);

  return (
    <ThemeProvider theme={defaultTheme}>

      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard <Button  onClick={logoutHandler}><span className="pbold">Sign out</span></Button>
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >{userInfo&&
          <span className='pbold'>Hi, {userInfo.name} {userInfo.lastName} </span>
          }
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>

           
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <Row>
        

        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
            <h2>Job Order : {today}</h2>
            <hr/>
            {
                loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant='danger' text={error} />
                ) : orders && orders.length === 0 ? (
                    <Message variant='warning' text='There is no any order !' />
                ) : (
                    <Table striped responsive className='table-sm text-center'>
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>date</th>
                                <th>Customer</th>
                                <th>Service</th>
                                <th>Service Date</th>
                                <th>Service Time</th>
                                <th>Sale Amount</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                filteredOrders.map(order => (
                                    <tr
                                        key={order._id}
                                       
                                    >
                                        <td>#{order._id}</td>
                                        <td>{order.createdAt.substring(0, 10)}</td>
                                        <td>{order.user.name} {order.user.lastName}</td>
                                        <td>
                                        {order.service==1?
                                        <span className="textnormal">local service center</span>
                                        :
                                        order.service==2?
                                        <span className="textnormal">van service </span>
                                        :
                                        <span className="textnormal">ship to an address</span>
                                        }
                                        </td>
                                        <td>{order.timetable.datetable}</td>
                                        <td>{order.timeservice}</td>
                               
                                        <td>$ {order.totalPrice}</td>

                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                )
            }
        </Col>
    </Row>












                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}