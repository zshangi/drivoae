import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js";
import React, {useState} from "react";
import ApiService from "./StripeApi";
import { Row, Col, Image, ListGroup, Card,Container } from 'react-bootstrap'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import Loader from '../components/Loader'
import Message from '../components/Message'
import axios from "axios";
import Crypto from 'crypto-js';
const CheckoutForm = ({order}) => {
        const history  = useHistory()

        const [error, setError] = useState(null);
        const [email, setEmail] = useState(order.user.email);
        const amount = Number(100*(order.totalPrice)).toFixed();
        const [showload, setShowload] = React.useState(false);
        const stripe = useStripe();
        const elements = useElements();
        //sms
        const method = 'POST'
        const host = 'api.smsglobal.com';
        const uri = '/v2/sms/'
        const apiKey = '860db0d738c671e86288054899661566';
        const secretKey = '83001818d560f2611ffa558f0937d3d2';
      
        const getAuthorizationHeader = () => {
          const ts = Math.floor((new Date().getTime()) / 1000);
          const nonce = Math.floor(Math.random() * 1e16);
      
          const signature = [ts, nonce, method, uri, host, 443];
          const macString = `${signature.join(`\n`)}\n\n`;
          const macHash = Crypto.HmacSHA256(macString, secretKey);
          const macBase64 = Crypto.enc.Base64.stringify(macHash);
      
          return `MAC id="${apiKey}", ts="${ts}", nonce="${nonce}", mac="${macBase64}"`;
        };
        const sendSMS = async (orderid,number) => {
            const authorizationHeader = getAuthorizationHeader();
            const headers = ""
            const data = { message: ` Thank you for choosing Drivo.ae.Your order has been placed and is being processed. Order No: ${orderid}. Safe travels!`, origin: 'Drivo.ae', destination: `+971${number}` }
            // console.log(new Date())
            return axios({
              url: `https://${host}${uri}`,
              method,
              data,
              headers: {
        
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: authorizationHeader,
                ...headers
              }
            })
              .then(res => {
                console.log(res)
        
                return res.data;
            }).catch(error => {
                console.log(error)
            })
          }

        // Handle real-time validation errors from the card Element.
        const handleChange = (event) => {
            if (event.error) {
                setError(event.error.message);
            } else {
                setError(null);
            }
        }

        // Handle form submission.
        const handleSubmit = async (event) => {
                event.preventDefault();
                setShowload(true);
                const card = elements.getElement(CardElement);

                const {paymentMethod, error} = await stripe.createPaymentMethod({
                    type: 'card',
                    card: card,
                });
                console.log(paymentMethod)

                if (error) {
                    setError(error.response.data)
                }
                else {
                    ApiService.saveStripeInfo({email:email, payment_method_id: paymentMethod.id,amount:amount,user:order.user,order:order._id,servicecenter:order.servicecenter.name,dateservice:order.timetable.datetable,timeservice:order.timeservice,servicecenteremail:order.servicecenter.user.username,servicecenterIncharge:order.servicecenter.user.name,userorder:order.user.name}).then(response => {
                        console.log(response.data);
                        const clientSecret=response.data['clientSecret']
                        sendSMS(order._id,order.user.username)
                        history.push(`/success/${order._id}`)
                        


                    }).catch(error => {
                        console.log(error)
                        setError(`Payment failed: ${error.message}`);
                    })
                }

            }
        ;

        return (  
            <Container >
                <br/>
                <span className="pbold">Pay Your Order</span>
                <hr/>
                {error?
                <Message variant='warning' text={error} />
            : null}
              <Box component="form" onSubmit={handleSubmit} noValidate >
              

             <CardElement
                        id="card-element"
                        onChange={handleChange}
                    />
                    <div className="card-errors" role="alert">{error}</div>
   

        {showload?
       <>
       <Loader />
       <Button
          type="submit"
          fullwidth="true"
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled
        >
          Payment
        </Button>
       </>
        :
        <Button
        type="submit"
        fullwidth="true"
        style={{ borderRadius: 25,  backgroundColor: '#1CB0CD'}}

        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={order.isPaid}
      >
        Payment
      </Button>
        }


      </Box>
      </Container>   

       
        );

    }
;

export default CheckoutForm;