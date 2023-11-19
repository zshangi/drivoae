import React, { useEffect } from 'react'
import { addToCart, removeFromCart } from '../actions/cartActions'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Card, Container } from 'react-bootstrap'
import {BsFillTrashFill } from "react-icons/bs";
import Message from '../components/Message'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { BiArrowBack } from "react-icons/bi";
import { Helmet } from 'react-helmet';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
function CartScreen({ match, location, history }) {
    const productId = match.params.id
    const qty = location.search ? Number(location.search.split("=")[1]) : 1
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty))
        }

    }, [dispatch, productId, qty])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        history.push('/registerotpscreen?redirect=shipping')
    }


    return (

        <Container>


            {/*SEO PART////////////////////////////////////////////////////////////////////////// */}
            <Helmet>
                <meta charSet="utf-8" />
                <title>Drivo Cart Page</title>
                <meta name="description" content="Cart" />
            </Helmet>
            <Button onClick={() => history.goBack()}><BiArrowBack size={15} /></Button>
            <h1>checkout</h1>

            <Row className='p-1 my-1'>
                <Col md={8} >
                    {cartItems.length === 0 ? (
                        <Message variant='info' text='Your cart is empty!' />
                    ) : (
                        <>
                            {cartItems.map(item => (
                                <Card key={item.product} style={{ borderRadius: 25, padding: 10 }} className='shadow'>
                                    <Row>


                                        <Col xs={2} sm={2} md={2} lg={2} xl={2} className='justifyContent' style={{ textAlign: 'center', alignItems: 'center' }}>
                                            <img src={item.image.trim()} alt={item.name} width={'100%'} />
                                        </Col>
                                        <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                                            <span className='textnormalbold'>  {item.brand}<br /></span>
                                            <span className='littlenormal'>

                                                {item.pattern}<br />
                                                {item.size}-{item.year}
                                            </span>
                                        </Col>


                                        <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                                            <span className='textnormalbold'>{item.qty * item.price}AED</span>
                                            <br />
                                            <span className='littlenormal'> {(item.price)}AED/Tire</span>

                                        </Col>
                                        <Col xs={6} sm={6} md={6} lg={6} xl={6}>

                                        <FormControl   >
                                        <Select
                                                    labelId="demo-simple-select-autowidth-label"
                                                    id="demo-simple-select-autowidth"
                                                    value={item.qty}
                                                    onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}

                                                    autoWidth
                                                    style={{ borderRadius: '40px', height: 30, marginTop: 3 }}
                                                >
                    {item.countInStock==1?
                      <MenuItem key="1" value="1"   >
                      1 tire
                    </MenuItem >
                    :
                    item.countInStock < 9 ?
                    item.countInStock % 2 == 0 ?
                      [...Array(item.countInStock/2).keys()].map((x) => (
                        <MenuItem key={x+x + 2} value={x+x + 2}    >
                          {x+x + 2} tires
                        </MenuItem >
                      ))
                      :
                      [...Array(item.countInStock).keys()].map((x) => (
                        <MenuItem key={x+1} value={x + 1}    >
                          {x+1} tires
                        </MenuItem >
                      ))
                        :

                        item.countInStock % 2==0? 
                      [...Array(4).keys()].map((x) => (
                        <MenuItem key={x+x + 2} value={x+x + 2}    >
                          {x+x+ 2} tires
                        </MenuItem >
                      ))
                     :
                     [...Array(4).keys()].map((x) => (
                      <MenuItem key={x+1} value={x + 1}    >
                        {x+1} tires
                      </MenuItem >
                    ))
                    }
                  </Select>
                </FormControl  >

                                    
                                        </Col>


                                        <Col xs={6} sm={6} md={6} lg={6} xl={6} style={{ textAlign: 'right' }}>
                                            <Button
                                                onClick={() => removeFromCartHandler(item.product)}
                                            >
                                                <BsFillTrashFill color={'#000'}/>
                                            </Button>
                                        </Col>
                                    </Row>
                                </Card>
                            ))}
                        </>)}
                </Col>
                <hr />
                <Col xs={6} sm={6} md={6} lg={6} xl={6}> <span className='textblue'>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</span>  </Col>
                <Col xs={4} sm={4} md={4} lg={4} xl={4}>

                    <p>{cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}AED</p>
                </Col>
                <Col xs={2} sm={2} md={2} lg={2} xl={2}>  </Col>


            </Row>
            <Box sx={{
                position: 'absolute',
                bottom: 80,
                right: 0,
                left: 0,
                textAlign: 'center'
            }}>

                <Button
                    variant="contained"
                    style={{ borderRadius: 25,  backgroundColor: '#1CB0CD'}}
                    disabled={cartItems.length === 0}
                    onClick={checkoutHandler}
                    >
                    Proceed To Checkout
                </Button>

            </Box>
        </Container>


    )
}

export default CartScreen
