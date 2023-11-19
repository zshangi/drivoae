import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { saveVehicleUser, fetchVehicleUser, updateVehicleuserMain, delVehicleuser } from '../actions/userActions'
import { fetchMakes, fetchModels, fetchTrims } from '../actions/vehicleActions'
import { Row, Col } from 'react-bootstrap'
import Box from '@mui/material/Box';
import HomeCarousel from '../components/HomeCarousel'
import BrandLogo from '../components/BrandLogo'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Link } from 'react-router-dom';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import {  FaChevronDown, FaChevronRight } from "react-icons/fa";
import { BsPlusCircle } from "react-icons/bs";
import { GiCarWheel, GiCarBattery } from "react-icons/gi";
import { RiOilFill } from "react-icons/ri";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import Loader from '../components/Loader'
import Message from '../components/Message'
import { makeStyles } from '@material-ui/core/styles';
import HowItWorks from '../components/HowItWorks';
import Post from '../components/Post';
import { TbBatteryAutomotive } from "react-icons/tb";
import Divider from '@mui/material/Divider';
import { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Helmet } from 'react-helmet';
import Card from 'react-bootstrap/Card';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#61dafb20' : '#61dafb20',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary,
  height: 150
}));
const filterOptions = createFilterOptions({
  matchFrom: 'start',
  stringify: option => option.make,
});
const useStyles = makeStyles({
  drawerPaper: {
    borderRadius: '20px 20px 0 0',
  },
});

///////////////////////////////////////////////////////////////////////

const theme = createTheme();

export default function HomeScreen({ history }, props) {
  //////////////////////////////////////////////////////////////////////////////////////
  const [maketxt, setmakeTxt] = useState("")
  const [model, setmodelTxt] = useState("")
  const [trim, settrimTxt] = useState("")
  const [year, setyearTxt] = useState("")

  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const listVehiclesUser = useSelector(state => state.listVehicleUser)
  const { vehicleuser, error, loading } = listVehiclesUser

  const vehicleuserfilter = vehicleuser.filter(
    (vehilce) => vehilce.main == 1
  );

  const ProductsHandler = () => {
    history.push('/products');
  };
  ////////////////////////////////////////////////////////////////////

  const listMakes = useSelector(state => state.listMake)
  const { makes } = listMakes

  const listModels = useSelector(state => state.listModel)
  const { models } = listModels
  const modelfilterr = models.filter(
    (vehilce) => vehilce.make.make == maketxt
  );


  const modelfilter = modelfilterr.filter(({ model }, index, a) =>
    a.findIndex(e => model === e.model) === index);


  const yearfilter = modelfilterr.filter(
    (item) => item.model === model
  );


  const listTrims = useSelector(state => state.listTrim)
  const { trims } = listTrims
  const trimfilterr = trims.filter(
    (item) => (item.model.model === model && item.model.make.make === maketxt)
  );

  const trimfilter = trimfilterr.filter((item) =>
    item.model.year.includes(year)
  );

  const vehicleCreate = useSelector(state => state.vehicleCreate)
  const { success } = vehicleCreate

  const handleAddCar = () => {
    if (userInfo) {
      dispatch(saveVehicleUser(trim, model, year, maketxt, '0'))
      console.log("add car")
      if (!loading) {
        dispatch(fetchVehicleUser(userInfo.id))
      }
      setShowaddcar(false)
      setmakeTxt('')
      setmodelTxt('')
      setyearTxt('')
      settrimTxt('')

    } else if (!userInfo) {
      history.push('/registerotpscreen?redirect=')

    }
  }
  const handlemain = (id) => {
    dispatch(updateVehicleuserMain(id))
    dispatch(fetchVehicleUser(userInfo.id))
    // setmakeTxt(make)
    setOpen(false)
  }
  const handledel = (id) => {
    dispatch(delVehicleuser(id))
    dispatch(fetchVehicleUser(userInfo.id))
    // setmakeTxt(make)
    setOpen(false)
  }
  ////////////////////////////////////////////////////////////////////////////////////////
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const handlefetchVehicle = (id) => {
    if (!loading) {
      dispatch(fetchVehicleUser(userInfo.id))
    }

    // setmakeTxt(make)
    setOpen(true)
  }
  const [opentypeserviceid, setOpentypeserviceid] = React.useState('');
  const [opentypeservice, setOpentypeservice] = React.useState(false);
  const handletypeservice = (id) => {
    if (opentypeservice) {
      setOpentypeservice(false)
      setOpentypeserviceid('')

    } else {
      setOpentypeservice(true)
      setOpentypeserviceid(id)

    }
  };
  ////////////////////////////////////////////////////////////////////
  const [showaddcar, setShowaddcar] = React.useState(false);
  const handleshowaddcar = () => {
    if (showaddcar) {
      setShowaddcar(false)
    } else {
      setShowaddcar(true)

    }
  }
  ////////////////////////////////////////////////////////////////////

  useEffect(async () => {
    if (userInfo && !loading) {
      dispatch(fetchVehicleUser(userInfo.id))
    }

    dispatch(fetchMakes())
    dispatch(fetchModels())
    dispatch(fetchTrims())


  }, [dispatch]);

  return (

    <Container fluid  >
      {/*SEO PART////////////////////////////////////////////////////////////////////////// */}
      <h1 hidden>Drivo Tire | Battery | Oil</h1>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Find Your Perfect Tires and Book Services at Nearby Centers with Drivo.ae</title>
      </Helmet>


      {/* SPECIAL OFFER////////////////////////////////////////////////////////////////////////////////// */}
      <HomeCarousel />


      {/* ADD CAR////////////////////////////////////////////////////////////////////////////////// */}
      <Row className="my-2">
        <Col sx={{ textAlign: 'center', alignItems: 'center' }} xs={12} sm={12} md={12} lg={12} xl={12}>
          {vehicleuserfilter &&
            <Box
              sx={{
                marginTop: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center'
              }}
            >

              {vehicleuserfilter.length > 0 ?
                <>
                  {vehicleuserfilter.map((country) => (
                    <Button key={country._id} onClick={handlefetchVehicle} sx={{ width: 150, backgroundColor: '#fff', boxShadow: 2, borderRadius: 3, color: '#666' }}>
                      {country.trim.model.make.make} <img src={`/assets/img/make/${country.trim.model.make.slug}.png`} width={27} height={20} />
                    </Button>

                  ))

                  }

                </>
                :
                userInfo ?
                  <>
                    <Button onClick={handlefetchVehicle} sx={{ width: 150, backgroundColor: '#1CB0CD', boxShadow: 2, borderRadius: 3, color: '#fff' }} startIcon={<BsPlusCircle />}>Add a Car</Button>
                  </>
                  :
                  <>
                    <Button onClick={handleAddCar} sx={{ width: 150, backgroundColor: '#1CB0CD', boxShadow: 2, borderRadius: 3, color: '#fff' }} startIcon={<BsPlusCircle />}>Add a Car</Button>
                  </>
              }
            </Box>

          }

        </Col>

      </Row>


      {/* MAIN BUTTON////////////////////////////////////////////////////////////////////////////////// */}
      <Row className="my-4" style={{width:'350px',left:0,right:0,textAlign:'center',margin:'auto'}} >
        <Col xs={4} sm={4} md={4} lg={4} xl={4}>
            <Button sx={{ backgroundColor: '#fff', boxShadow: 3, borderRadius: 50, color: '#666', width: 60, height: 60 }} onClick={ProductsHandler}  ><GiCarWheel size={30}  /></Button>
         </Col>
         <Col xs={4} sm={4} md={4} lg={4} xl={4}>
         <Button sx={{ backgroundColor: '#fff', boxShadow: 1, borderRadius: 50, color: '#666', width: 60, height: 60 }} disabled><RiOilFill size={30} /></Button>
         </Col>
         <Col xs={4} sm={4} md={4} lg={4} xl={4}>
         <Button sx={{ backgroundColor: '#fff', boxShadow: 1, borderRadius: 50, color: '#666', width: 60, height: 60 }} disabled ><TbBatteryAutomotive size={30} /></Button>
         </Col>

         <Col xs={4} sm={4} md={4} lg={4} xl={4} className='my-1'>
         <span className='pbold'>Tire</span>
                  </Col>
                  <Col xs={4} sm={4} md={4} lg={4} xl={4} className='my-1'>
         <span className='pbold'>Engine Oil</span>
                  </Col>
                  <Col xs={4} sm={4} md={4} lg={4} xl={4} className='my-1'>
         <span className='pbold'>Battery</span>
                  </Col>


</Row>
  


      <div className='my-3' style={{ marginTop:13,flex: 1, backgroundColor: "#f1f1f3", height: "1px" }} />
      <Row style={{maxWidth:'450px',margin:'auto'}} >
      <Col sx={{ textAlign: 'center', alignItems: 'center' }} xs={12} sm={12} md={12} lg={12} xl={12}>
  
            <Card className='my-2'  style={{borderRadius:10,borderColor:'#f7b180',margin:0,height:'58px',padding:5, }}>
              <Row>
              <Col   style={{alignContent:'center',textAlign:'center',alignItems: 'center',display: 'inline-flex'
}}  xs={8} sm={8} md={8} lg={8} xl={8}>
              <span  style={{alignContent:'center',textAlign:'center',alignItems: 'center',margin:0}} className='fontflexible'>
                 Split in up to 4 interest-free payments with
                 </span>   

              </Col>

            <Col className='py-2' style={{alignContent:'center',textAlign:'center',alignItems: 'center',margin:0}} xs={4} sm={4} md={4} lg={4} xl={4}>
            <tamara-widget type="tamara-summary" inline-variant='text' ></tamara-widget>

            </Col>

              </Row>

</Card>         

 </Col>
        </Row>
      {/* BRANDS////////////////////////////////////////////////////////////////////////////////// */}
      <div className='my-3' style={{ marginTop:10,flex: 1, backgroundColor: "#f1f1f3", height: "1px" }} />
        <h2 style={{ margin: "0 10px" }}>Brands</h2>
      <BrandLogo/>



      {/* HOW TO BUY////////////////////////////////////////////////////////////////////////////////// */}
        <div  className='my-3' style={{ marginTop:13,flex: 1, backgroundColor: "#f1f1f3", height: "1px" }} />
        <h2 style={{ margin: "0 10px" }}>How To Buy</h2>
      <HowItWorks />



      {/* POSTS////////////////////////////////////////////////////////////////////////////////// */}
      <div className='my-3' style={{ marginTop:13,flex: 1, backgroundColor: "#f1f1f3", height: "1px" }} />
      <h2 style={{ margin: "0 10px" }}> Blog<Link className="linknormalblue" to="/posts">...More</Link></h2>
      <Post />

      <br /><br /><br /> <br /><br /><br />


      
      {/* SwipeableDrawer////////////////////////////////////////////////////////////////////////////////// */}
      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        classes={{ paper: classes.drawerPaper }}
      >
        <Container fullwidth="true" style={{ height: 500 }}>
          <Row>
            <Col>
              <Box
                sx={{
                  marginTop: 3,
                  alignItems: 'left',
                  textAlign: 'left'
                }}
              >
                <h2>My Vehicles</h2>

              </Box></Col>
            <Col>
              <Box
                sx={{
                  marginTop: 2,
                  alignItems: 'right',
                  textAlign: 'right'
                }}
              >
                <Button variant='' sx={{ color: '#1CB0CD', textAlign: 'right' }} onClick={handleshowaddcar}>+add a vehicle</Button>

              </Box></Col>
          </Row>


          <Row className='my-1'>
            <Col sx={{ alignItems: 'left', textAlign: 'left' }}>
              {loading ?
                <Loader />
                : error ? <Message variant='danger' text={error} />
                  : <>
                    {vehicleuser?.map(item => (
                      <>
                        <Row key={item._id} className="p-1" style={{ alignItems: 'center' }}>
                          <Col xs={2} sm={2} md={2} lg={2} xl={2}>
                            {item.main == '1' ?
                              <Button variant='' onClick={() => handlemain(item._id)}><AiFillStar size={15} color={'#e0c56e'} /></Button>
                              :
                              <Button variant='' onClick={() => handlemain(item._id)}><AiOutlineStar size={15} color={'#e0c56e'} /></Button>

                            }
                          </Col>
                          <Col xs={2} sm={2} md={2} lg={2} xl={2} style={{ alignItems: 'right', textAlign: 'right' }}>
                            <img src={`assets/img/make/${item.trim.model.make.slug}.png`} width={30} height={22}></img>
                          </Col>

                          <Col xs={4} sm={4} md={4} lg={4} xl={4} style={{ alignItems: 'left', textAlign: 'left' }}>
                            <Button variant='' onClick={() => handletypeservice(item.trim._id)} >
                              {item.trim.model.make.make}| {item.trim.model.model}| {item.trim.trim}  {item.trim.model.year}

                            </Button>

                          </Col>
                          <Col xs={2} sm={2} md={2} lg={2} xl={2}>
                            <Button
                              onClick={() => handledel(item._id)}
                            >
                              <i className='fas fa-trash'></i>
                            </Button>
                          </Col>
                          <Col xs={2} sm={2} md={2} lg={2} xl={2} style={{ alignItems: 'right', textAlign: 'right' }}>
                            <Button variant='' onClick={() => handletypeservice(item.trim._id)} >

                              {item.trim._id == opentypeserviceid ?
                                <FaChevronDown size={10} color={'#666'} />
                                :
                                <FaChevronRight size={10} color={'#666'} />
                              }                    </Button>

                          </Col>
                        </Row>
                        <Divider /></>

                    ))}</>

              }

            </Col>
          </Row>
          {opentypeservice &&

            <Row className='mx-4 my-2 py-2' style={{ backgroundColor: '#f6fdff' }}>
              <h4>Select Service Type </h4>
              <Col xs={2} sm={2} md={2} lg={2} xl={2} sx={{ alignItems: 'right', textAlign: 'right' }}>
                <GiCarWheel size={20} />
              </Col>
              <Col xs={10} sm={10} md={10} lg={10} xl={10} sx={{ alignItems: 'left', textAlign: 'left' }}>
                <Link className="linknormal" to={`/vehicletyre/${opentypeserviceid}/`} >
                  Tyre Change
                </Link>
                <p>check,change,fit and balance</p>

              </Col>
              <Col xs={2} sm={2} md={2} lg={2} xl={2} sx={{ alignItems: 'right', textAlign: 'right' }}>
                <GiCarBattery size={20} />                  </Col>
              <Col xs={10} sm={10} md={10} lg={10} xl={10} sx={{ alignItems: 'left', textAlign: 'left' }}>
                Battery Service
                <p>Not available</p>
              </Col>
              <Col xs={2} sm={2} md={2} lg={2} xl={2} sx={{ alignItems: 'right', textAlign: 'right' }}>
                <RiOilFill size={20} />                  </Col>
              <Col xs={10} sm={10} md={10} lg={10} xl={10} sx={{ alignItems: 'left', textAlign: 'left' }}>
                Oil Service
                <p>Not available</p>
              </Col>

            </Row>
          }

          {showaddcar &&
            <Box component="form" noValidate sx={{ textAlign: 'center', marginTop: 2 }}>

              <Grid className="m-2" container sx={{ justify: "flex-end", alignItems: "left", textAlign: "left" }} >

                <Grid className='px-1' item xs={12} sm={12}>
                  <Autocomplete
                    id="make-states"
                    onInputChange={(event, newInputValue) => {
                      setmakeTxt(newInputValue);

                    }}
                    options={makes}
                    getOptionLabel={option => option.make}
                    filterOptions={filterOptions}
                    renderInput={params => (
                      <TextField {...params} label="make" variant="standard" fullwidth="true" />
                    )}
                  />

                </Grid>

                {(maketxt) &&
                  <Grid className='px-1' item xs={12} sm={12} justify="flex-end"
                    alignItems="center">
                    <Autocomplete
                      id="model-states"
                      onInputChange={(event, newInputValuee) => {
                        setmodelTxt(newInputValuee);
                      }}
                      options={modelfilter}
                      getOptionLabel={option => option.model}
                      renderInput={params => (
                        <TextField {...params} label="Model" variant="standard" fullwidth="true" />
                      )}
                    />
                  </Grid>
                }
                {(maketxt) && (model) &&
                  <Grid className='px-1' item xs={12} sm={12} sx={{ borderRight: 1, }}>
                    <Autocomplete
                      id="year-states"
                      onInputChange={(event, newInputValuee) => {
                        setyearTxt(newInputValuee);
                      }}
                      options={yearfilter}
                      getOptionLabel={option => option.year}
                      renderInput={params => (
                        <TextField {...params} label="Year" variant="standard" fullwidth="true" />
                      )}
                    />
                  </Grid>
                }
                {(maketxt) && (model) && (year) &&

                  <Grid className='px-1' item xs={12} sm={12}  >
                    <Autocomplete
                      id="trim-states"
                      options={trimfilter}
                      onInputChange={(event, newInputValuee) => {
                        settrimTxt(newInputValuee);
                      }}

                      getOptionLabel={option => option.trim}
                      renderInput={params => (
                        <TextField {...params} label="Trim" variant="standard" fullwidth="true" />

                      )}
                    />

                  </Grid>
                }

              </Grid>


              <Box
                sx={{
                  marginTop: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >

                <Button variant="contained" onClick={handleAddCar} >
                  +add
                </Button>
              </Box>
              {(maketxt) &&

                <Alert style={{ marginTop: 7, marginBottom: 5 }} variant="outlined" severity="success">{maketxt} {model} {year} {trim}</Alert>


              }

            </Box>
          }
        </Container>
      </SwipeableDrawer>
      {/* /////////////////////////////////////////////////////////////////////////////////////////// */}


    </Container>

  );
}


