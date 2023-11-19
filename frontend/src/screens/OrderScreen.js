import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getOrderDetails } from '../actions/orderActions'
import { Row, Col, Image, ListGroup, Card, Container, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { goPayGate } from '../actions/orderActions'
import axiosInstance from '../utils/axiosInstance'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Header from '../components/Header'
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from "@stripe/stripe-js/pure";
import CheckoutForm from "../components/CheckoutForm";
import { makeStyles } from '@material-ui/core/styles';
import { ORDER_CREATE_RESET } from '../constants/orderConstants'
import { createOrder,CreatePayTamara } from '../actions/orderActions'
import { getUserDetailsAction, updateUserProfileAction, userLogoutAction } from '../actions/userActions'
import { TextField } from '@mui/material';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import Divider from '@mui/material/Divider';

const useStyles = makeStyles({
  drawerPaper: {
    borderRadius: '20px 20px 0 0',
  },
});
function OrderScreen({ history }) {
  const dispatch = useDispatch()

  const orderCreate = useSelector(state => state.orderCreate)
  const { success, order, error, loading } = orderCreate
  const cart = useSelector(state => state.cart)
  const [discount, setDiscount] = useState(0)
  const [paymenttype, setPaymenttype] = useState('')

  cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)
  cart.shippingPrice = (cart.serviceCenter.serviceid != 2 ? 0 : 150).toFixed(2)
  cart.intialtotalPrice= (Number(cart.itemsPrice) + Number(cart.shippingPrice)-discount).toFixed(2)
  cart.taxPrice = Number((0) * Number(cart.intialtotalPrice)).toFixed(2)
  cart.totalPrice=(Number(cart.taxPrice) + Number(cart.intialtotalPrice)).toFixed(2)
  console.log(cart.totalPrice)
  const useStyles = makeStyles({
    drawerPaper: {
      borderRadius: '20px 20px 0 0',
    },
  });
  let orderitem=[]
  useEffect(() => {
    if (success) {

      history.push(`/payment/${order._id}`)
      dispatch({ type: ORDER_CREATE_RESET })

    }

    if (error){
      console.log(error)
    }

    if (cart.cartItems.reduce((acc, item) => acc + item.qty,0)>3){
      setDiscount(100)
    }

  }, [success])


  const placeOrder = () => {
    dispatch(createOrder({
      orderItems: cart.cartItems,
      shippingAddress: cart.shippingAddress,
      service: cart.serviceMethod,
      serviceCenter: cart.serviceCenter,
      paymentMethod: '',
      itemsPrice: cart.itemsPrice,
      shippingPrice: cart.shippingPrice,
      taxPrice: cart.taxPrice,
      discount:discount,
      totalPrice: cart.totalPrice,
    }))
  }

  
  ////////////////////////////////////////////////////////////////////////////////////////
  return (
    <Container fluid>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Drivo Order</title>
        <meta name="description" content="Order" />
      </Helmet>
      <h1>my order</h1>
      <Row className='p-2 my-1 border' style={{ alignItems: 'left', textAlign: 'left',border:'1px'}}>

        <Col md={12}>

          <p>
            <span className="textblue">Location: </span>
            <span className="textnormal">{cart.shippingAddress.address} </span>
          </p>
          <p>
            <span className="textblue">Requested Service: </span>
                  {cart.serviceCenter.serviceid==1?
               <span className="textnormal">local service center</span>
               :
               cart.serviceCenter.serviceid==2?
               <span className="textnormal">van service </span>
               :
               <span className="textnormal">ship to an address</span>
              } 
          </p>
          <p>
            <span className="textblue">Service: </span>
            <span className="textnormal">{cart.serviceCenter.servicecenter} </span>
            </p><p>
            <span className="textblue">Date: </span>
            <span className="textnormal">{cart.serviceCenter.timetable} </span>
            <span className="textblue">Time: </span>
            <span className="textnormal">{cart.serviceCenter.timeservice} </span>
          </p>
        </Col >
        <hr/>
        <Col md={12}>
          {
            cart.cartItems.length === 0
              ? <Message variant='info' text='Your order is empty !' />
              : <>
                {cart.cartItems.map((item, index) => (
                  <Row key={cart.cartItems}>
                    <Col xs={12} sm={12} md={4} lg={4} xl={4} className='my-auto'>
                      <p> <Link to={`/product/${item.product}`}>{item.name} </Link></p>
                    </Col>
                    <Col xs={12} sm={12} md={8} lg={8} xl={8} className='my-auto' style={{
                      alignItems: 'right',
                      textAlign: 'right'
                    }}>
                      <p>  {item.qty} X {item.price} = AED {(item.price * item.qty).toFixed(2)}</p>
                    
                    </Col>
                  </Row>
                ))}
              </>}
        </Col>
        <hr/>
        <Col md={12}>

          <ListGroup variant='flush'>


            <ListGroup.Item>
              <Row>
                <Col>Items: </Col>
                <Col style={{
                  alignItems: 'right',
                  textAlign: 'right'
                }}>AED {cart.itemsPrice}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Service Fee: </Col>
                <Col style={{
                  alignItems: 'right',
                  textAlign: 'right'
                }}>AED {cart.shippingPrice}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>VAT: </Col>
                <Col style={{
                  alignItems: 'right',
                  textAlign: 'right'
                }}>AED {cart.taxPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Discount: </Col>
                <Col style={{
                  alignItems: 'right',
                  textAlign: 'right'
                }}>
                AED{discount}
                
                </Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col> <span className="textnormal">Total:</span> </Col>
                <Col style={{
                  alignItems: 'right',
                  textAlign: 'right'
                }}><span className="textnormal">AED{cart.totalPrice}</span></Col>
              </Row>
            </ListGroup.Item>

            {
                        loading ? <Loader />
                        :
            <ListGroup.Item
              style={{
                alignItems: 'center',
                textAlign: 'center'
              }}
            >
              <Button
                type='button'
                variant="contained"
                onClick={placeOrder}
                style={{ borderRadius: 25,  backgroundColor: '#1CB0CD',color:'#fff'}}
              >Checkout</Button>
              
            </ListGroup.Item>
}
          </ListGroup>



        </Col>

      </Row>

      {/* /////////////////////////////////////////////////////////////////////////////////////////  */}

      <br/><br/><br/><br/>



    </Container>

  )
}
export default OrderScreen
