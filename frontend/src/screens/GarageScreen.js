import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { saveVehicleUser, fetchVehicleUser, updateVehicleuserMain, delVehicleuser } from '../actions/userActions'
import { fetchMakes, fetchModels, fetchTrims } from '../actions/vehicleActions'
import { Row, Col } from 'react-bootstrap'
import Box from '@mui/material/Box';
import HomeCarousel from '../components/HomeCarousel'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Link } from 'react-router-dom';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import { FaMapMarkerAlt, FaCar, FaCalendarCheck, FaChevronDown, FaChevronRight } from "react-icons/fa";
import { GiCarWheel, GiCarBattery, GiMechanicGarage } from "react-icons/gi";
import { RiOilFill, RiCarWashingLine, RiGasStationFill } from "react-icons/ri";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import Loader from '../components/Loader'
import Message from '../components/Message'
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@mui/material/Divider';
import { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { Helmet } from 'react-helmet';

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

export default function GarageScreen({ history }, props) {

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
  const modelfilterr = models.filter((item) =>
    item.make.make.includes(maketxt)
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
      if (!loading) {
        dispatch(fetchVehicleUser(userInfo.id))
      } setShowaddcar(false)
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
    if (!loading) {
      dispatch(fetchVehicleUser(userInfo.id))
    }
    dispatch(fetchMakes())
    dispatch(fetchModels())
    dispatch(fetchTrims())

  }, [dispatch]);


  return (
    <Container fullwidth="true" >

      <Helmet>
        <meta charSet="utf-8" />
        <title>Drivo Garage</title>
        <meta name="description" content="submit your vehicle in our e-garage" />
      </Helmet>

      <h1>My Garage</h1>








      <Row>
        <Col>
      </Col>
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
                    <Row className="p-1" style={{ alignItems: 'center' }}>
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
                        <Button variant='' onClick={() => handletypeservice(item.trim._id)} >{item.trim.model.make.make}| {item.trim.model.model}| {item.trim.trim}
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
                        {item.trim._id == opentypeserviceid ?
                          <FaChevronDown size={10} color={'#666'} />
                          :
                          <FaChevronRight size={10} color={'#666'} />
                        }
                      </Col>

                    </Row>
                    <Divider />
                  </>
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
                  onInputChange={(event, newInputValuee) => {
                    settrimTxt(newInputValuee);
                  }}
                  options={trimfilter}
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



  );
}


