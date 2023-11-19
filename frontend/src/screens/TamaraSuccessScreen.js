import React, { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import { useLocation } from "react-router-dom"
import axios from 'axios';
import { UpdatePayTamara } from '../actions/orderActions'
import { useSelector, useDispatch } from 'react-redux'


function Succes({ history, match }) {
  const dispatch = useDispatch()

  const payTamaraUpdate = useSelector(state => state.payTamaraUpdate)
  const { success, paytamara, error, loading } = payTamaraUpdate
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const paymentStatus = params.get("paymentStatus")
  const order_id_tamara = params.get("orderId")
  const [listData, setListData] = useState([])

  const config = {// request setting
    header: {
      'Content-type': 'application/json'
    },
    data: {
      'order_id_tamara': order_id_tamara

    }
  }
  axios.post('api/v1/orders/paytamara/byid/', config).then(res => {
    console.log(res)
    console.log("test")
    setListData(res['data']['order'])
    console.log(res['data']['order'])
  })


  return (
    <Container style={{marginTop:'10px',width:'350px'}}>
      <Alert severity="info">
        <span className='fontflexible'>Your payment was Successful,<br />your order number is : {listData} </span>
      </Alert>
    </Container>
  )
}

export default Succes
