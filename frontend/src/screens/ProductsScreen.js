
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Container, Card, Image, Form } from 'react-bootstrap'
import { fetchProducts } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import ProductCard from "../components/ProductCard";
import Button from '@mui/material/Button';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { makeStyles } from '@material-ui/core/styles';
import { BiArrowBack } from "react-icons/bi";
import { fetchTyres } from '../actions/productActions'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios'
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
const drawerBleeding = 256;
const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
}));
const useStyles = makeStyles({
  drawerPaper: {
    borderRadius: '20px 20px 0 0',
  },
});
const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
  borderRadius: 3,
  position: 'absolute',
  top: 2,
  left: 'calc(50% - 15px)',
}));
function ProductsScreen({ history }) {
  const dispatch = useDispatch()
  const listProducts = useSelector(state => state.listProduct)
  const { error, loading, products } = listProducts
  const [searchTxt, setsearchTxt] = useState("")

  const [widthTxt, setwidthTxt] = useState("")

  const [profileTxt, setprofileTxt] = useState("")

  const [diameterTxt, setdiameterTxt] = useState("")

  const [brandTxt, setBrandTxt] = useState("")
  const [yearTxt, setYearTxt] = useState("")

  const [sortprice, setSortprice] = useState(0)
  const [listData, setListData] = useState([])
  const config = {// request setting
    header: {
      'Content-type': 'application/json'
    },
    data: {
      'width': widthTxt,
      'profile': profileTxt,
      'diameter': diameterTxt

    }
  }
  const handlegetProducts = () => {
    axios.post('/api/v1/tyreproducts/tyreproductsbytyre/', config).then(res => {
      console.log(res)
      console.log("test")
      setListData(res['data'])
      console.log(listData[0])
    })
  }
  const handleChange = (event) => {
    setSortprice(event.target.value);
  };
  const [selectedItems, setSelectedItems] = useState([]);

  const addToCompare = (item) => {
    setSelectedItems((selectedItems) => [...selectedItems, item]);
  };
  /////////////////////////////////////////////////////////////////////////
  const listTyres = useSelector(state => state.listTyre)
  const { tyres } = listTyres
  const tyresfilter = tyres?.filter(({ width }, index, a) =>
    a.findIndex(e => width === e.width) === index);

  const preprofilefilterr = tyres?.filter(
    (tyre) => (tyre.width == widthTxt)
  );

  const profilefilterr = preprofilefilterr?.filter(({ profile }, index, a) =>
    a.findIndex(e => profile === e.profile) === index);
  const profilefilter = profilefilterr

  const prediameterfilter = preprofilefilterr?.filter(
    (tyre) => (tyre.width == widthTxt && tyre.profile == profileTxt)
  );
  const diameterfilter = prediameterfilter?.filter(({ diameter }, index, a) =>
    a.findIndex(e => diameter === e.diameter) === index);
  ///////////////////////////////////////////////////////////////

  const [tyreid, setTyreid] = useState("")

  const tyrefilter = tyres?.filter(
    (tyre) => (tyre.width == widthTxt && tyre.profile == profileTxt && tyre.diameter == diameterTxt)
  );
  let tyreproduct = listData
  let tyreproductbrand = []
  let tyreproductyear = []

  if (Array.isArray(listData)) {
    if (brandTxt) {
      tyreproduct = listData?.filter(
        (tyre) => (tyre.brandorigin.brand.title == brandTxt)
      );
    }

    if (yearTxt) {
      tyreproduct = listData?.filter(
        (tyre) => (tyre.productionYear == yearTxt)
      );
    }

    if (sortprice == 0) {
      tyreproduct = tyreproduct.sort((a, b) => (Number(a.price).toFixed(0) > Number(b.price).toFixed(0)) ? 1 : -1);
    }
    if (sortprice == 1) {
      tyreproduct = tyreproduct.sort((a, b) => (Number(a.price).toFixed(0) < Number(b.price).toFixed(0)) ? 1 : -1);
    }



    tyreproductbrand = listData?.filter(({ brandorigin }, index, a) =>
      a.findIndex(e => brandorigin.brand.title === e.brandorigin.brand.title) === index);

    tyreproductyear = listData?.filter(({ productionYear }, index, a) =>
      a.findIndex(e => productionYear === e.productionYear) === index);

  }

  //////////////////////////////////////////////////
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };


  //////////////////////////////////////////////////


  useEffect(() => {

    dispatch(fetchTyres())

    tyrefilter?.map((country) => (
      setTyreid(country._id)
    ))

    if (diameterTxt) {
      axios.post('/api/v1/tyreproducts/tyreproductsbytyre/', config).then(res => {
        console.log(res)
        console.log("test")
        setListData(res['data'])
        console.log(listData[0])
      })
    }


  }, [dispatch, diameterTxt])


  return (
    <Container  >
      {/*SEO PART////////////////////////////////////////////////////////////////////////// */}
      <Helmet>
        <meta charSet="utf-8" />
        <title>Drivo products</title>
        <meta name="description" content="filter our products by size" />
      </Helmet>
      <Row>
        <Col> <Button onClick={() => history.goBack()}><BiArrowBack size={15} /></Button></Col>
        <Col><h1 hidden>Product</h1></Col>
        <Col>
          <Box sx={{ minWidth: 60 }}>
            <FormControl fullwidth="true">
              <InputLabel id="demo-simple-select-label">Price</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sortprice}
                label="price"
                size="small"
                width={100}
                onChange={handleChange}
              >
                <MenuItem value={0}><span className='textnormal' >low To high</span></MenuItem>
                <MenuItem value={1}><span className='textnormal' >high to low</span></MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Col>
      </Row>

      <>
        <div className="cards-container" spacing={1}>
        {tyreproductbrand?.map(product => (
          <Button style={{ borderRadius: 25 }} variant="outlined"  onClick={() => {
            setBrandTxt(product.brandorigin.brand.title);
            setOpen(false)
            dispatch(fetchProducts())

          }}
            sx={{ width: '150px', marginLeft: 1, height: 30, alignItems: 'center', textAlign: 'center' }}>
            <span className='littleblue'>{product.brandorigin.brand.title}</span>
          </Button>
        ))}
      </div>

      <div className="cards-container" spacing={1}>
        {tyreproductyear?.map(product => (
          <Button style={{ borderRadius: 25 }} variant="outlined"  onClick={() => {
            setYearTxt(product.productionYear);
            setOpen(false)
            dispatch(fetchProducts())

          }}
            sx={{ width: '150px', marginLeft: 1, height: 30, alignItems: 'center', textAlign: 'center' }}>
            <span className='littleblue'>{product.productionYear}</span>
          </Button>
        ))}
      </div>
      </>
      <Box
        sx={{
          marginTop: 1,
          alignItems: 'center',
        }}
      >



        {/* ---------------------------------------------------------------------------------------------- */}

        <Row>



          <Col >
            {loading ? <Loader />
              : error ? <Message variant='danger' text={error} />
                : <Row>
                  <>
                    <Col className='py-2' xs={12} sm={12} md={12} lg={12} xl={12} style={{ justifyContent: 'center', textAlign: 'left', alignItems: "left", }}>

                      <Row>



                        <Col xs={12} sm={12} md={12} lg={12} xl={12} style={{ textAlign: 'right' }}>
                          <Row style={{ maxWidth: '520px', margin: 'auto' }} >
                            <Col sx={{ textAlign: 'center', alignItems: 'center' }} xs={12} sm={12} md={12} lg={12} xl={12}>

                            <Card className='my-2'  style={{borderRadius:10,borderColor:'#f7b180',margin:0,height:'58px',padding:5, }}>
                                <Row>
                                  <Col style={{
                                    alignContent: 'center', textAlign: 'center', alignItems: 'center', display: 'inline-flex'
                                  }} xs={8} sm={8} md={8} lg={8} xl={8}>
                                    <span style={{ alignContent: 'center', textAlign: 'center', alignItems: 'center', margin: 0 }} className='fontflexible'>
                                      Split in up to 4 intrest-free payments with

                                    </span>

                                  </Col>

                                  <Col className='py-2' style={{ alignContent: 'center', textAlign: 'center', alignItems: 'center', margin: 0 }} xs={4} sm={4} md={4} lg={4} xl={4}>
                                    <tamara-widget type="tamara-summary" inline-variant='text' ></tamara-widget>

                                  </Col>

                                </Row>

                              </Card>

                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Col>
                    {tyreproduct?.map(product => (
                      <Col key={product._id} xs={12} sm={6} md={6} lg={4} xl={4} xxl={3}>
                               <ProductCard
                          key={product.id}
                          product={product}
                          selected={selectedItems}
                        />

                      </Col>
                    ))}
                     <br/><br/><br/><br/><br/><br/> <br/><br/><br/><br/><br/><br/>
                  </>




                </Row>
            }



          </Col>


        </Row>

        {/* ---------------------------------------------------------------------------------------------- */}

        <StyledBox
            sx={{
                position: 'fixed',
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
                visibility: 'visible',
                right: 0,
                left: 0,
                textAlign: 'center',
                bottom: 60
            }}
        ><Puller />
            <Button onClick={toggleDrawer(true)}>Swipe Up for Searching Tyres</Button>
        </StyledBox>

        <SwipeableDrawer
          anchor="bottom"
          open={open}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
          classes={{ paper: classes.drawerPaper }}

        >
                <StyledBox
          sx={{
            position: 'absolute',
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: 'visible',
            right: 0,
            left: 0,
          }}
        ></StyledBox>
            <Container className='p-5' fluid style={{
              backgroundImage: "url('assets/img/background-23.png')",
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              width: '100vw',
              height: '300px',
              alignContent: 'center',
              alignItems: 'center',
              textAlign: 'center'
            }}
            >


              <br />

              <Row style={{ maxWidth: '500px', margin: 'auto' }}>
                <Col xs={3} sm={3} md={3} lg={3} xl={3}>

                  <Autocomplete
                    id="width-states"
                    onInputChange={(event, newInputValue) => {
                      setwidthTxt(newInputValue);

                    }}
                    style={{ width: 70 }}
                    options={tyresfilter}
                    getOptionLabel={option => option.width}
                    renderInput={params => (
                      <TextField {...params} label="width" variant="standard" type="tel" width={70} />
                    )}
                  />
                </Col>

                <Col xs={1} sm={1} md={1} lg={1} xl={1}>
                  <Box
                    sx={{
                      marginTop: 3,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      fontSize: 15


                    }}>
                    /
                  </Box>
                </Col>
                <Col xs={3} sm={3} md={3} lg={3} xl={3}>
                  <Autocomplete
                    id="profile-states"
                    onInputChange={(event, newInputValue) => {
                      setprofileTxt(newInputValue);

                    }}
                    style={{ width: 70 }}
                    options={profilefilter}
                    getOptionLabel={option => option.profile}
                    renderInput={params => (
                      <TextField {...params} label="profile" variant="standard" type="tel" width={70} />
                    )}
                  />

                </Col>
                <Col xs={1} sm={1} md={1} lg={1} xl={1}>
                  <Box
                    sx={{
                      marginTop: 3,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      fontSize: 15

                    }}>
                    R
                  </Box>
                </Col>
                <Col xs={4} sm={4} md={4} lg={4} xl={4}>

                  <Autocomplete
                    id="diameter-states"
                    onInputChange={(event, newInputDiameter) => {
                      setdiameterTxt(newInputDiameter);
                      setOpen(false);


                    }}
                    options={diameterfilter}
                    style={{ width: 82 }}
                    getOptionLabel={option => option.diameter}
                    renderInput={params => (
                      <TextField {...params} label="diameter" variant="standard" type="tel" width={70} />
                    )}
                  />
                </Col>


              </Row>
                    
              <Box sx={{
                position: 'absolute',
                bottom: 100,
                right: 0,
                left: 0,
                textAlign: 'center'
              }}>

                <Link to="/help" className='linknormalblue'>need any help with your tyre size?</Link>
              </Box>




            </Container>
       
       
        </SwipeableDrawer>







      </Box>
    </Container>
  )
}

export default ProductsScreen

