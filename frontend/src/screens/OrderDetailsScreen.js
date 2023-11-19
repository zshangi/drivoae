import React, { useEffect, useState } from 'react'
import { Form , Container,Col,Row,ListGroup} from 'react-bootstrap'
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux'
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from "@stripe/stripe-js/pure";
import CheckoutForm from "../components/CheckoutForm";
import { getOrderDetails } from '../actions/orderActions'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { makeStyles } from '@material-ui/core/styles';
import { Helmet } from 'react-helmet';

function OrderDetailsScreen({ history,match }) {
  const stripePromise = loadStripe('pk_live_51N3E1bFw6Mk3kjuwRQTOKcmqhFZiCuNEPDkhgD1Lrs5kRzYeT1IZdJrOLeHKiLyB8rDsO1wfqJ63RKEVXuamjGaT003j68Mi0I');
  const orderId = match.params.id
  const dispatch = useDispatch()
  const orderDetails = useSelector(state => state.orderDetails)
  const { order, error, loading } = orderDetails
  console.log(order)
  if (!loading && !error) {
    order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)
  }
    const [show, setShow] = useState(true);
    
    const theme = createTheme();

    const useStyles = makeStyles({
      drawerPaper: {
        borderRadius: '20px 20px 0 0',
      },
    });




  
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const [validatename, setValidatename] = useState(userInfo.name)
  useEffect(() => {
    
    dispatch(getOrderDetails(orderId))

}, [ dispatch,validatename])

const handelCancel= async(totalPrice)  => {
  // const order_id_tamara=orderfilter.paytamara.order_id_tamara
  // console.log(order_id_tamara)
  await sendcanceltotamara(totalPrice)


}

const handelRefund= async(totalPrice)  => {
  // const order_id_tamara=orderfilter.paytamara.order_id_tamara
  // console.log(order_id_tamara)
  await sendrefundtotamara(totalPrice)


}

const sendcanceltotamara = async (totalPrice) => {
  const data={
      "total_amount": {
      "amount": totalPrice,
      "currency": "AED"
      }

      }

    const method="POST"
    const orderid= "30b71a1a-c2c7-405b-bdd7-36081f645d58"
    return axios({
      url: `https://api-sandbox.tamara.co/orders/${orderid}/cancel`,
      method,
      data,
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhY2NvdW50SWQiOiJhMGMwYjAwMy03NWY2LTQ3ZjEtOTQ5ZC1mYTkwNzkwMTliMjAiLCJ0eXBlIjoibWVyY2hhbnQiLCJzYWx0IjoiOWM3NWQ0ZGY0MGRkZTc2N2E3ODhlZDRlNTY5NzdlN2MiLCJyb2xlcyI6WyJST0xFX01FUkNIQU5UIl0sImlhdCI6MTY5MzQ2MjE2NiwiaXNzIjoiVGFtYXJhIn0.OpSRcgDVK4M4mgL7Mg4F_PPTm0m6TZPm7-BHvyO9U4v_NT2gLkD7PfFNwcGygOPYaaoB18p1HIfxJEjyi7099AxYtGOucmbwKoXAvtjpaMtgAKZVZN4GrkoX3mfVRzjtzCmjNQULWi5yoQs6wmz_REKM_P7AycPUwsve-WRwVaVnUSgWrNI-xsDkWj1bj3KQky11TMryi3z6ZEiXefkaXaucPFhgwlRqUtYqkNNYRet8PTdWC0S1In1gZg8bdkJZa7uhirOkwARga_Zp1n1OcZQyfEbEPlzIe4X-oTnzW7yH4EDtozl6d3lgZW8_iiTcbdDDESCLe2VJO-MwwRIFYw'
    }
    })
}

const sendrefundtotamara = async (totalPrice) => {
  const orderid= "08c4d3e2-5ab7-4c7f-a15e-0b5af659c41a"
  const data={
      "total_amount": {
      "amount": totalPrice,
      "currency": "AED"
      },
      "comment": `Refund for the order ${orderid}`
      }

    const method="POST"
    return axios({
      url: `https://api-sandbox.tamara.co/payments/simplified-refund/${orderid}`,
      
      
      method,
      data,
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhY2NvdW50SWQiOiJhMGMwYjAwMy03NWY2LTQ3ZjEtOTQ5ZC1mYTkwNzkwMTliMjAiLCJ0eXBlIjoibWVyY2hhbnQiLCJzYWx0IjoiOWM3NWQ0ZGY0MGRkZTc2N2E3ODhlZDRlNTY5NzdlN2MiLCJyb2xlcyI6WyJST0xFX01FUkNIQU5UIl0sImlhdCI6MTY5MzQ2MjE2NiwiaXNzIjoiVGFtYXJhIn0.OpSRcgDVK4M4mgL7Mg4F_PPTm0m6TZPm7-BHvyO9U4v_NT2gLkD7PfFNwcGygOPYaaoB18p1HIfxJEjyi7099AxYtGOucmbwKoXAvtjpaMtgAKZVZN4GrkoX3mfVRzjtzCmjNQULWi5yoQs6wmz_REKM_P7AycPUwsve-WRwVaVnUSgWrNI-xsDkWj1bj3KQky11TMryi3z6ZEiXefkaXaucPFhgwlRqUtYqkNNYRet8PTdWC0S1In1gZg8bdkJZa7uhirOkwARga_Zp1n1OcZQyfEbEPlzIe4X-oTnzW7yH4EDtozl6d3lgZW8_iiTcbdDDESCLe2VJO-MwwRIFYw'
    }
    })
}

    return (
    <Container fluid>

    {/*SEO PART////////////////////////////////////////////////////////////////////////// */}
    <Helmet>
        <meta charSet="utf-8" />
        <title>Drivo Payment</title>
        <meta name="description" content="Pay your order" />
      </Helmet>
      <h1>pay your order</h1>



{loading ? <Loader />
              : error ? <Message variant='danger' text={error} />
                :
                <Row className="my-2">

                <Col sx={{ textAlign: 'center', alignItems: 'center' }} xs={12} sm={12} md={6} lg={6} xl={6}>

                <Row className='p-2 my-1' style={{alignItems:'left',textAlign:'left'}}>
      
      <Col md={12}>
      <p>
            <span className="textblue">Name: </span>
            <span className="textnormal">{order.user.name} {order.user.lastName}</span>
            </p>
            <p>
            <span className="textblue">Location: </span>
            <span className="textnormal">{order.shippingAddress.address} </span>
            </p>
            <p>
            <span className="textblue">Requested Service: </span>
              {order.service==1?
               <span className="textnormal">local service center</span>
               :
               order.service==2?
               <span className="textnormal">van service </span>
               :
               <span className="textnormal">ship to an address</span>
              } 
              <br/>
              <span className="textnormal">{order.servicecenter.name}, </span>
               <span className="textblue">Date: </span>
               <span className="textnormal">{order.timetable.datetable} </span>
               <span className="textblue">Time: </span>
               <span className="textnormal">{order.timeservice} </span>
            </p>
        </Col >
        <hr/>
        <Col md={12}>
            {
              order.orderItems.length === 0
                ? <Message variant='info' text='Your order is empty !' />
                : <>
                     {order.orderItems.map((item, index) => (
                           <Row key={order}>
                            <Col xs={4} sm={4} md={4} lg={4} xl={4}className='my-auto'>
                                  <p> {item.tyreproduct.brandorigin.brand.title} {item.tyreproduct.brandpattern.pattern} </p>
                            </Col>
                              <Col xs={8} sm={8} md={8} lg={8} xl={8} className='my-auto' style={{
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
          }}>AED {order.itemsPrice}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Service Fee: </Col>
                <Col style={{
            alignItems: 'right',
            textAlign: 'right'
          }}>AED {order.shippingPrice}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>VAT: </Col>
                <Col style={{
            alignItems: 'right',
            textAlign: 'right'
          }}>AED {order.taxPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Discount: </Col>
                <Col style={{
            alignItems: 'right',
            textAlign: 'right'
          }}>AED {order.discount}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col> <span className="textnormal">Total:</span> </Col>
                <Col style={{
            alignItems: 'right',
            textAlign: 'right'
          }}><span className="textnormal">AED {order.totalPrice}</span></Col>
              </Row>
            </ListGroup.Item>

      
        
          </ListGroup>

    

      </Col>
      
    </Row>

                
</Col>

<Col sx={{ textAlign: 'center', alignItems: 'center' }}  xs={12} sm={12} md={6} lg={6} xl={6}>
{order.paymentMethod=='tamara' &&  order.isPaid && !order.isDelivered ?
       <Button onClick={() => handelCancel(order.totalPrice)} variant="contained">Cancel</Button>
  
  :
  null}
  {order.paymentMethod=='tamara' &&  order.isPaid && order.isDelivered ?
       <Button onClick={() => handelRefund(order.totalPrice)} variant="contained">Refund</Button>
  
  :
  null}

  {!order.isPaid ?
      <Card> 

                  <Elements stripe={stripePromise}>
              <CheckoutForm order={order}  />
            </Elements>  
            

        </Card>
:null
      }
</Col>
</Row>
}


      
   {/* /////////////////////////////////////////////////////////////////////////////////////////  */}
 



<br/><br/><br/><br/>
<br/><br/>
<br/><br/>


        </Container>

    )
}
 
export default OrderDetailsScreen