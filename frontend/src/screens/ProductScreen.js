import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Form, Container } from 'react-bootstrap'
import Rating from '../components/Rating'
import { fetchProductDetails } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { addToCart } from '../actions/cartActions'
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Card from 'react-bootstrap/Card';
import Box from '@mui/material/Box';
import { FaMapMarkerAlt, FaCar, FaCalendarCheck } from "react-icons/fa";
import Divider from '@mui/material/Divider';
import { BiArrowBack } from "react-icons/bi";
import {Link, useLocation} from "react-router-dom";
import { Helmet } from 'react-helmet';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { BsThermometerHigh,BsTools,BsBootstrapReboot} from "react-icons/bs";
import PuchaseInclude from '../components/PurchaseInclude'

function ProductScreen({ match, history }) {
    let location = useLocation();
    console.log(location);
    const [qty, setQty] = useState(1)
    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const { error, loading, product } = productDetails
    console.log(product)


    useEffect(() => {
      dispatch(fetchProductDetails(match.params.id))
  }, [dispatch, match])

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }


    return (
        <>

      {/*SEO PART////////////////////////////////////////////////////////////////////////// */}
      <h1 hidden>Drivo Product Page</h1>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Drivo Product Page</title>
        <meta name="description" content="Datails Of Products" />
      </Helmet>

          {loading?
          <Loader/>
        :
        <Container  style={{
          height: "95vh", alignItems: 'left',
          textAlign: 'left', borderRadius: 3,
        }} > 

          <Box sx={{ textAlign: 'center' }}>
          </Box>


          <Row className='border-bottom'>

            <Col xs={12} sm={12} md={12} lg={12} xl={12} style={{ textAlign: 'center' }}>
              <img className='img-tire' src={product.imageurl} alt={product.brandorigin.brand.title}  />
            </Col>
            <Col xs={12} sm={12} md={12} lg={12} xl={12} style={{ textAlign: 'left' }}>
            {product.name}
              
              <br/>
            </Col>
            <Col className='py-2' xs={12} sm={12} md={12} lg={12} xl={12}  style={{justifyContent:'center',textAlign:'left', alignItems: "left",}}>

            <Card style={{borderRadius:10,backgroundColor:'#EBECF0',padding:10,margin:0}}>
       
            <Row>

            <Col  xs={6} sm={6} md={6} lg={6} xl={6}  style={{ textAlign: 'left' }}>
            <span className='textnormal'>Tire Size:</span><br/>
            <span className='pbold'>{product.tyre.name}</span>
              </Col>
           
            <Col  xs={6} sm={6} md={6} lg={6} xl={6}  style={{ textAlign: 'right' }}>
            <span className='textnormal'>{product.brandorigin.origin.title}</span><br/>
            <span className='textnormal'>{product.productionYear}</span>
              </Col>
              </Row>
              </Card>

              </Col>
            <Col className='py-2' xs={6} sm={6} md={6} lg={6} xl={6}  style={{justifyContent:'center',textAlign:'left', alignItems: "left",}}>
            <Card style={{borderRadius:10,borderColor:'#61dafb',backgroundColor:'#61dafb10',padding:10,margin:0}}>
            <span className='littlenormal'>Recieve AED100 off when buying 4tires.</span>
              </Card>

            </Col>
            <Col className='py-3' style={{justifyContent:'center',textAlign:'center', alignItems: "center",}} xs={6} sm={6} md={6} lg={6} xl={6}>
            
            <span className='pbold'> AED{product.price}</span>  <br/>
            <span className='littlenormal'>Best Price Guarantee</span>
            </Col>
            <Col className='py-2' xs={12} sm={12} md={12} lg={12} xl={12}  style={{justifyContent:'center',textAlign:'left', alignItems: "left",}}>
       
       <Row>

       <Col  xs={12} sm={12} md={12} lg={12} xl={12}  style={{ textAlign: 'left' }}>

       <tamara-widget type="tamara-summary" amount={product.price} inline-type='2'></tamara-widget>
         </Col>
         </Row>
              </Col>
            <Col  xs={12} sm={12} md={12} lg={12} xl={12} >
            <span className='pbold'>Every Purchase Includes:</span>
              <PuchaseInclude/>
            </Col>
            

          </Row>
              <Row className='border-bottom'>

              <Col    xs={12} sm={12} md={12} lg={12} xl={12}>

              <span className='pbold'>Description</span>
              <br/>
              <span className='textnormal'>{product.description}</span>
              </Col>
              </Row>
     
          <br/>
          <br/> <br/>
          <br/> <br/>
          <br/>
        </Container>
          }        
           
          <Box sx={{
            position: 'fixed', backgroundColor: '#fff', boxshadow: 2,
            bottom: 0,
            right: 0,
            left: 0,
            height: 60,
            boxShadow:5,
            textAlign: 'center',
            zIndex:99999,
            margin:'auto'
          }}
          style={{margin:'auto'}}>
            <Row  style={{margin:'auto'}}>
              <Col className='p-1' xs={12} sm={12} md={12} lg={12} xl={12}>
              <FormControl   >
              <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={qty} onChange={(e) => setQty(e.target.value)}
          autoWidth
          style={{borderRadius: '40px', height:40, marginTop:3}}
        >
                  {product.countInStock<9?
                    [...Array(product.countInStock).keys()].map((x) => (
                      <MenuItem  key={x + 1} value={x + 1}    >
                        {x + 1} tires
                      </MenuItem >
                    ))
                    :
                    [...Array(8).keys()].map((x) => (
                      <MenuItem  key={x + 1} value={x + 1}    >
                        {x + 1} tires
                      </MenuItem >
                    ))
                  }
                  </Select>
                </FormControl  >

                <Button variant="contained" 
                  onClick={addToCartHandler}
                  type="button"
                  className="p-2 m-1 btn-block"
                  disabled={product.countInStock === 0} style={{ borderRadius: 25 }}>
                  <span className="textnormalwhite">Add to  cart.  {product.price * qty} AED</span>
                </Button></Col>
            </Row>

          </Box>
          
        </>
    )
}

export default ProductScreen
