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
import { createOrder,CreatePayTamara } from '../actions/orderActions'
import Divider from '@mui/material/Divider';
import Alert from '@mui/material/Alert';

function PaymentScreen({ history,match }) {
  const [showload, setShowload] = React.useState(false);

  const stripePromise = loadStripe('pk_live_51N3E1bFw6Mk3kjuwRQTOKcmqhFZiCuNEPDkhgD1Lrs5kRzYeT1IZdJrOLeHKiLyB8rDsO1wfqJ63RKEVXuamjGaT003j68Mi0I');
  const orderId = match.params.id
  const dispatch = useDispatch()
  const orderDetails = useSelector(state => state.orderDetails)
  const { order, error, loading } = orderDetails
  console.log(order)
  const [tamaraid, setTamaraid] = useState('1')
  let orderItemtotamara=[]
  let orderidtamara=''
  if (!loading && !error) {
    order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)
    orderidtamara= order.PayTamara.order_id_tamara
    orderItemtotamara = order.orderItems.map(item => ({
      reference_id: item._id,
      type: "Tire",
      name: item.tyreproduct.name,
      sku: item.tyreproduct.ItCode,
      image_url: "https://www.example.com/product.jpg",
      item_url: `https://drivo.ae/#/product/${item._id}`,
      quantity: item.qty,
      unit_price: {
        amount: item.price,
        currency: "AED"
      },
      discount_amount: {
        amount: "0",
        currency: "AED"
      },
      tax_amount: {
        amount: "0",
        currency: "AED"
      },
      total_amount: {
        amount: item.price,
        currency: "AED"
      }

  }));
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
    const orderid= orderidtamara
    return axios({
      url: `https://api-sandbox.tamara.co/orders/${orderidtamara}/cancel`,
      method,
      data,
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhY2NvdW50SWQiOiJhMGMwYjAwMy03NWY2LTQ3ZjEtOTQ5ZC1mYTkwNzkwMTliMjAiLCJ0eXBlIjoibWVyY2hhbnQiLCJzYWx0IjoiOWM3NWQ0ZGY0MGRkZTc2N2E3ODhlZDRlNTY5NzdlN2MiLCJyb2xlcyI6WyJST0xFX01FUkNIQU5UIl0sImlhdCI6MTY5MzQ2MjE2NiwiaXNzIjoiVGFtYXJhIn0.OpSRcgDVK4M4mgL7Mg4F_PPTm0m6TZPm7-BHvyO9U4v_NT2gLkD7PfFNwcGygOPYaaoB18p1HIfxJEjyi7099AxYtGOucmbwKoXAvtjpaMtgAKZVZN4GrkoX3mfVRzjtzCmjNQULWi5yoQs6wmz_REKM_P7AycPUwsve-WRwVaVnUSgWrNI-xsDkWj1bj3KQky11TMryi3z6ZEiXefkaXaucPFhgwlRqUtYqkNNYRet8PTdWC0S1In1gZg8bdkJZa7uhirOkwARga_Zp1n1OcZQyfEbEPlzIe4X-oTnzW7yH4EDtozl6d3lgZW8_iiTcbdDDESCLe2VJO-MwwRIFYw'
    }
    })
    .then(response => {
      console.log(response.data);
      if (response.data['has_available_payment_options']==true){
        let data={
          "order_reference_id": order._id,
          "order_number": order._id,
          "total_amount": {
            "amount": order.totalPrice,
            "currency": "AED"
          },
          "description": `Order by ${order.user.lastName} at ${order.createdAt}`,
          "country_code": "AE",
          "payment_type": "PAY_BY_INSTALMENTS",
          "instalments": null,
          "locale": "en_US",
          "items": orderItemtotamara,
          "consumer": {
            "first_name":order.user.name,
            "last_name": order.user.lastName,
            "phone_number": `+971${order.user.username}`,
            "email": order.user.email
          },
          "shipping_address": {
            "first_name":order.user.name,
            "last_name": order.user.lastName,
            "line1": order.shippingAddress.address,
            "line2": "string",
            "region": "UAE",
            "postal_code": "00000",
            "city": "Dubai",
            "country_code": "AE",
            "phone_number": `+971${order.user.username}`,
          },
          "discount": {
            "name": "wellcome",
            "amount": {
              "amount": order.discount,
              "currency": "AED"
            }
          },
          "tax_amount": {
            "amount": order.taxPrice,
            "currency": "AED"
          },
          "shipping_amount": {
            "amount": order.shippingPrice,
            "currency": "AED"
          },
          "merchant_url": {
            "success": "https://drivo.ae/#/tamarasuccess",
            "failure": "https://drivo.ae/#/tamarafail",
            "cancel": "https://drivo.ae/#/tamaracancel",
            "notification": "https://drivo.ae/api/v1/orders/webhook/"
          },
          
          
        }
        return axios({
          url: `https://api-sandbox.tamara.co:443/checkout`,
          method,
          data,
  
          headers: {
            'Content-type': 'application/json',
            Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhY2NvdW50SWQiOiJhMGMwYjAwMy03NWY2LTQ3ZjEtOTQ5ZC1mYTkwNzkwMTliMjAiLCJ0eXBlIjoibWVyY2hhbnQiLCJzYWx0IjoiOWM3NWQ0ZGY0MGRkZTc2N2E3ODhlZDRlNTY5NzdlN2MiLCJyb2xlcyI6WyJST0xFX01FUkNIQU5UIl0sImlhdCI6MTY5MzQ2MjE2NiwiaXNzIjoiVGFtYXJhIn0.OpSRcgDVK4M4mgL7Mg4F_PPTm0m6TZPm7-BHvyO9U4v_NT2gLkD7PfFNwcGygOPYaaoB18p1HIfxJEjyi7099AxYtGOucmbwKoXAvtjpaMtgAKZVZN4GrkoX3mfVRzjtzCmjNQULWi5yoQs6wmz_REKM_P7AycPUwsve-WRwVaVnUSgWrNI-xsDkWj1bj3KQky11TMryi3z6ZEiXefkaXaucPFhgwlRqUtYqkNNYRet8PTdWC0S1In1gZg8bdkJZa7uhirOkwARga_Zp1n1OcZQyfEbEPlzIe4X-oTnzW7yH4EDtozl6d3lgZW8_iiTcbdDDESCLe2VJO-MwwRIFYw'
        }
        })
        .then(response => {
          console.log(response.data)
  
  
  
  
           })
      }
      
  
       })
}

const sendrefundtotamara = async (totalPrice) => {
  const orderid= orderidtamara

  const data={
      "total_amount": {
      "amount": totalPrice,
      "currency": "AED"
      },
      "comment": `Refund for the order ${orderidtamara}`
      }

    const method="POST"
    return axios({
      url: `https://api-sandbox.tamara.co/payments/simplified-refund/${orderidtamara}`,
      
      
      method,
      data,
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhY2NvdW50SWQiOiJhMGMwYjAwMy03NWY2LTQ3ZjEtOTQ5ZC1mYTkwNzkwMTliMjAiLCJ0eXBlIjoibWVyY2hhbnQiLCJzYWx0IjoiOWM3NWQ0ZGY0MGRkZTc2N2E3ODhlZDRlNTY5NzdlN2MiLCJyb2xlcyI6WyJST0xFX01FUkNIQU5UIl0sImlhdCI6MTY5MzQ2MjE2NiwiaXNzIjoiVGFtYXJhIn0.OpSRcgDVK4M4mgL7Mg4F_PPTm0m6TZPm7-BHvyO9U4v_NT2gLkD7PfFNwcGygOPYaaoB18p1HIfxJEjyi7099AxYtGOucmbwKoXAvtjpaMtgAKZVZN4GrkoX3mfVRzjtzCmjNQULWi5yoQs6wmz_REKM_P7AycPUwsve-WRwVaVnUSgWrNI-xsDkWj1bj3KQky11TMryi3z6ZEiXefkaXaucPFhgwlRqUtYqkNNYRet8PTdWC0S1In1gZg8bdkJZa7uhirOkwARga_Zp1n1OcZQyfEbEPlzIe4X-oTnzW7yH4EDtozl6d3lgZW8_iiTcbdDDESCLe2VJO-MwwRIFYw'
    }
    })
} 
const [disabled, setDisabled] = useState(false);

const tamaraHandler = () =>{
  setShowload(true);

  const data={
    "country": "AE",
    "order_value": {
    "amount": order.totalPrice,
    "currency": "AED"
    },
    "phone_number": `+971${order.user.username}`,
    "is_vip": true
    }

  const method="POST"
  return axios({
    url: `https://api.tamara.co/checkout/payment-options-pre-check`,
    method,
    data,
    headers: {
      'Content-type': 'application/json',
      //Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhY2NvdW50SWQiOiJhMGMwYjAwMy03NWY2LTQ3ZjEtOTQ5ZC1mYTkwNzkwMTliMjAiLCJ0eXBlIjoibWVyY2hhbnQiLCJzYWx0IjoiOWM3NWQ0ZGY0MGRkZTc2N2E3ODhlZDRlNTY5NzdlN2MiLCJyb2xlcyI6WyJST0xFX01FUkNIQU5UIl0sImlhdCI6MTY5MzQ2MjE2NiwiaXNzIjoiVGFtYXJhIn0.OpSRcgDVK4M4mgL7Mg4F_PPTm0m6TZPm7-BHvyO9U4v_NT2gLkD7PfFNwcGygOPYaaoB18p1HIfxJEjyi7099AxYtGOucmbwKoXAvtjpaMtgAKZVZN4GrkoX3mfVRzjtzCmjNQULWi5yoQs6wmz_REKM_P7AycPUwsve-WRwVaVnUSgWrNI-xsDkWj1bj3KQky11TMryi3z6ZEiXefkaXaucPFhgwlRqUtYqkNNYRet8PTdWC0S1In1gZg8bdkJZa7uhirOkwARga_Zp1n1OcZQyfEbEPlzIe4X-oTnzW7yH4EDtozl6d3lgZW8_iiTcbdDDESCLe2VJO-MwwRIFYw'
      Authorization:'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhY2NvdW50SWQiOiIzNzI1YTJmMC0wZmQ1LTRlNGEtYmQ5Mi04OGEwMTkyNmRmNjIiLCJ0eXBlIjoibWVyY2hhbnQiLCJzYWx0IjoiNWEwNmU2YWU5ODUzYjZmOWQwNGIxZjM5ZTc2NGUxZjkiLCJyb2xlcyI6WyJST0xFX01FUkNIQU5UIl0sImlhdCI6MTY5NDA5MjUwNiwiaXNzIjoiVGFtYXJhIFBQIn0.vh9C2U5ILW_h9m0kIjHNUdEvrd5gGuKaPmiskT8LrOQRc5EILCnwOxPHT4nePKysCYvoAr_9hM5kT9mkOZjEE2NgmgkLwahh1G3ZYIn6r_9LfeAPMDDvQjtikj4tVr8hqaMFhIaoAU0v4i2bH5S08_QqxqvW4xkwa5veAOYCDPO5_FJRvGycYvdBXP-YtmpW1q9hzTL3eLJFqMmBQiOzh-mCI5cN7dUTWF_L3_NL2PJ4NQCiOCuup1j-0tVo0ssQYLQjNZXQZ3NFVhi3DW8N-rPI8obEDpQP53ecURi6ex5QSSEhqTLYoMFBwD6jCaTy2EEn-gtN9l84xFRTkynOdg'
    }
  })
  .then(response => {
    console.log(response.data);
    if (response.data['has_available_payment_options']==true){
      let data={
        "order_reference_id": order._id,
        "order_number": order._id,
        "total_amount": {
          "amount": order.totalPrice,
          "currency": "AED"
        },
        "description": "string",
        "country_code": "AE",
        "payment_type": "PAY_BY_INSTALMENTS",
        "instalments": null,
        "locale": "en_US",
        "items": orderItemtotamara,
        "consumer": {
          "first_name":order.user.name,
          "last_name": order.user.lastName,
          "phone_number": `+971${order.user.username}`,
          "email": order.user.email
        },
        "shipping_address": {
          "first_name":order.user.name,
          "last_name": order.user.lastName,
          "line1": order.shippingAddress.address,
          "line2": "string",
          "region": "UAE",
          "postal_code": "00000",
          "city": "Dubai",
          "country_code": "AE",
          "phone_number": `+971${order.user.username}`,
        },
        "discount": {
          "name": "wellcome",
          "amount": {
            "amount": order.discount,
            "currency": "AED"
          }
        },
        "tax_amount": {
          "amount": order.taxPrice,
          "currency": "AED"
        },
        "shipping_amount": {
          "amount": order.shippingPrice,
          "currency": "AED"
        },
        "merchant_url": {
          "success": "https://drivo.ae/#/tamarasuccess",
          "failure": "https://drivo.ae/#/tamarafail",
          "cancel": "https://drivo.ae/#/tamaracancel",
          "notification": "https://drivo.ae/api/v1/orders/webhook/"
        },
        
        
      }
      return axios({
        url: `https://api.tamara.co:443/checkout`,
        method,
        data,

        headers: {
          'Content-type': 'application/json',
          //Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhY2NvdW50SWQiOiJhMGMwYjAwMy03NWY2LTQ3ZjEtOTQ5ZC1mYTkwNzkwMTliMjAiLCJ0eXBlIjoibWVyY2hhbnQiLCJzYWx0IjoiOWM3NWQ0ZGY0MGRkZTc2N2E3ODhlZDRlNTY5NzdlN2MiLCJyb2xlcyI6WyJST0xFX01FUkNIQU5UIl0sImlhdCI6MTY5MzQ2MjE2NiwiaXNzIjoiVGFtYXJhIn0.OpSRcgDVK4M4mgL7Mg4F_PPTm0m6TZPm7-BHvyO9U4v_NT2gLkD7PfFNwcGygOPYaaoB18p1HIfxJEjyi7099AxYtGOucmbwKoXAvtjpaMtgAKZVZN4GrkoX3mfVRzjtzCmjNQULWi5yoQs6wmz_REKM_P7AycPUwsve-WRwVaVnUSgWrNI-xsDkWj1bj3KQky11TMryi3z6ZEiXefkaXaucPFhgwlRqUtYqkNNYRet8PTdWC0S1In1gZg8bdkJZa7uhirOkwARga_Zp1n1OcZQyfEbEPlzIe4X-oTnzW7yH4EDtozl6d3lgZW8_iiTcbdDDESCLe2VJO-MwwRIFYw'
          Authorization:'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhY2NvdW50SWQiOiIzNzI1YTJmMC0wZmQ1LTRlNGEtYmQ5Mi04OGEwMTkyNmRmNjIiLCJ0eXBlIjoibWVyY2hhbnQiLCJzYWx0IjoiNWEwNmU2YWU5ODUzYjZmOWQwNGIxZjM5ZTc2NGUxZjkiLCJyb2xlcyI6WyJST0xFX01FUkNIQU5UIl0sImlhdCI6MTY5NDA5MjUwNiwiaXNzIjoiVGFtYXJhIFBQIn0.vh9C2U5ILW_h9m0kIjHNUdEvrd5gGuKaPmiskT8LrOQRc5EILCnwOxPHT4nePKysCYvoAr_9hM5kT9mkOZjEE2NgmgkLwahh1G3ZYIn6r_9LfeAPMDDvQjtikj4tVr8hqaMFhIaoAU0v4i2bH5S08_QqxqvW4xkwa5veAOYCDPO5_FJRvGycYvdBXP-YtmpW1q9hzTL3eLJFqMmBQiOzh-mCI5cN7dUTWF_L3_NL2PJ4NQCiOCuup1j-0tVo0ssQYLQjNZXQZ3NFVhi3DW8N-rPI8obEDpQP53ecURi6ex5QSSEhqTLYoMFBwD6jCaTy2EEn-gtN9l84xFRTkynOdg'

        }
      })
      .then(response => {
        console.log(response.data)
        console.log(response.data['checkout_url'])
        const order_id=order._id
        const order_id_tamara=response.data['order_id']
        const checkout_id=response.data['checkout_id']
        const status=response.data['status']
        console.log('add pay tamata')
        dispatch(CreatePayTamara({ order_id,order_id_tamara,checkout_id,status }))

        window.open(response.data['checkout_url'],"_self");



         })
    }else{
      console.log('fail')
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
      <h1>Pay Your Order</h1>



{loading ? <Loader />
              : error ? <Message variant='danger' text={error} />
                :
                <Row className="my-2">

                <Col sx={{ textAlign: 'center', alignItems: 'center' }} xs={12} sm={12} md={6} lg={6} xl={6}>
<Card>
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
      
    </Row></Card>

                
</Col>

<Col sx={{ textAlign: 'center', alignItems: 'center' }}  xs={12} sm={12} md={6} lg={6} xl={6}>
{order.isPaid?
<>
 <p>
 <span className="textblue">Payment type: </span>
 <span className="textnormal">{order.paymentMethod} </span>
 </p>
  <p>
  <span className="textblue">Payment Date: </span>
  <span className="textnormal">  {order.paidAt.substring(0, 10)} </span>
  </p>
  </>
 : 
 null
}
{order.isDelivered?
<>

  <p>
  <span className="textblue">Delived Date: </span>
  <span className="textnormal">  {order.deliveredAt.substring(0, 10)} </span>
  </p>
  </>
 : 
 null
}
{order.paymentMethod=='tamara' &&  order.isPaid && !order.isDelivered && order.PayTamara.status=='order_authorised' ?
<>
        <p>You can send your cancel request Before shippling</p>
       <Button onClick={() => handelCancel(order.totalPrice)} variant="contained">Cancel</Button>
  </>
  :
  null}

{order.paymentMethod=='tamara' &&  order.isPaid && !order.isDelivered && order.PayTamara.status=='order_canceled' ?
<>
<Alert severity="warning">You have canceled your order at  {order.PayTamara.lastUpdate}</Alert>
       
  </>
  :
  null}

  {order.paymentMethod=='tamara' &&  order.isPaid && order.isDelivered ?
  <>
  <p>You can send your Refund request Before Installation</p>
       <Button onClick={() => handelRefund(order.totalPrice)} variant="contained">Refund</Button>
  </>
  :
  null}

{/* ************************************************* */}
  {!order.isPaid ?
  <>
  <br/>
      <Card> 

                  <Elements stripe={stripePromise}>
              <CheckoutForm order={order}  />
            </Elements>  
            

        </Card>
        <br/>

        <Divider>OR</Divider>
        <Box sx={{
          
              textAlign: 'center'
            }}>
       {showload?
       <>
       <Loader />

</>
:
<>
<Card>
<span className='pbold'>or split in up to 4 interest-free payments with</span><Button sx={{width:'150px'}} onClick={tamaraHandler} > <img
src={'assets/img/tamara.jpg'} 
alt=""
id="secret_folder"
disabled
width="100%"
/></Button>
</Card>
</>
                  }


              </Box>

</>
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
 
export default PaymentScreen