import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Table, Container } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useSelector, useDispatch } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { getMyOrderList } from '../actions/orderActions'
import Button from '@mui/material/Button';
import { Helmet } from 'react-helmet';
import axios from 'axios';


function ListOrdersScreen({ history }) {
    const dispatch = useDispatch()
    const [totalPrice, setTotalPrice] = useState("");

    // handle getUserDetails
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin


    const userDetails = useSelector(state => state.userDetails)
    const { user, error: errorUserDetails, loading: loadingUserDetails } = userDetails


    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success, error: errorUpdateProfile, loading: loadingUpdateProfile } = userUpdateProfile


    // handle getMyOrderList
    const orderListMy = useSelector(state => state.orderListMy)
    const { orders, error: errorOrders, loading: loadingOrders } = orderListMy

    

    // handle loading and error
    let loading = false
    let error = ''

    if (loadingUserDetails || loadingUpdateProfile) {
        loading = true
    }

    if (errorUserDetails) {
        error = errorUserDetails
    } else if (errorUpdateProfile) {
        error = errorUpdateProfile
    }


      
    //   const handelCapture= (id) => {
    //     const data={
    //         "order_id": "7b6f0d93-8853-48d0-a769-f641a2212142",
    //         "total_amount": {
    //         "amount": "100.00",
    //         "currency": "AED"
    //         },
    //         "tax_amount": {
    //         "amount": "100.00",
    //         "currency": "AED"
    //         },
    //         "shipping_amount": {
    //         "amount": "100.00",
    //         "currency": "AED"
    //         },
    //         "discount_amount": {
    //         "amount": "100.00",
    //         "currency": "AED"
    //         },
    //         "items": [
    //         {}
    //         ],
    //         "shipping_info": {
    //         "shipped_at": "2019-08-24T14:15:22Z",
    //         "shipping_company": "DHL",
    //         "tracking_number": "123456",
    //         "tracking_url": "https://shipping.com/tracking?id=123456"
    //         }
    //         }
      
    //       const method="POST"
    //       return axios({
    //         url: `https://api-sandbox.tamara.co/payments/capture`,
    //         method,
    //         data,
    //         headers: {
    //           'Content-type': 'application/json',
    //           Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhY2NvdW50SWQiOiJhMGMwYjAwMy03NWY2LTQ3ZjEtOTQ5ZC1mYTkwNzkwMTliMjAiLCJ0eXBlIjoibWVyY2hhbnQiLCJzYWx0IjoiOWM3NWQ0ZGY0MGRkZTc2N2E3ODhlZDRlNTY5NzdlN2MiLCJyb2xlcyI6WyJST0xFX01FUkNIQU5UIl0sImlhdCI6MTY5MzQ2MjE2NiwiaXNzIjoiVGFtYXJhIn0.OpSRcgDVK4M4mgL7Mg4F_PPTm0m6TZPm7-BHvyO9U4v_NT2gLkD7PfFNwcGygOPYaaoB18p1HIfxJEjyi7099AxYtGOucmbwKoXAvtjpaMtgAKZVZN4GrkoX3mfVRzjtzCmjNQULWi5yoQs6wmz_REKM_P7AycPUwsve-WRwVaVnUSgWrNI-xsDkWj1bj3KQky11TMryi3z6ZEiXefkaXaucPFhgwlRqUtYqkNNYRet8PTdWC0S1In1gZg8bdkJZa7uhirOkwARga_Zp1n1OcZQyfEbEPlzIe4X-oTnzW7yH4EDtozl6d3lgZW8_iiTcbdDDESCLe2VJO-MwwRIFYw'
    //       }
    //       })
    //       .then(response => {
    //         console.log(response.data);
    //   })
    // }
    
    useEffect(() => {

        if (!userInfo) {
            history.push('/registerotpscreen?redirect=')
        } else {
            if (!user || !user.name || success) {
                dispatch(getMyOrderList())
            } else {
            }
        }
    }, [history, userInfo, user, dispatch, success])


    return (
        <Container>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Drivo my order</title>
                <meta name="description" content="my order" />
            </Helmet>
            <h1>My order<span className='textnormalbold'>(ckeck your order)</span></h1>

            <Row>

                <Col xs={12} sm={12} md={12} lg={12} xl={12}>

                    <hr />
                    {
                        loadingOrders ? (
                            <Loader />
                        ) : errorOrders ? (
                            <Message variant='danger' text={errorOrders} />
                        ) : orders && orders.length === 0 ? (
                            <Message variant='warning' text='There is no any order !' />
                        ) : (
                            <Table striped responsive className='table-sm text-center'>
                                <thead>
                                    <tr>
                                        <th>id</th>
                                        <th>date</th>
                                        <th>total</th>
                                        <th>payment Method</th>
                                        <th>paid</th>
                                        <th>delivered</th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        orders.map(order => (
                                            <tr
                                                key={order._id}
                                                className={order.isPaid && order.isDelivered ? 'bg-success text-white' : ''}
                                            >
                                                <td>#{order._id}</td>
                                                <td>{order.createdAt.substring(0, 10)}</td>
                                                <td>AED {order.totalPrice}</td>
                                                <td> {order.paymentMethod}
                                   
                                                </td>

                                                <td>
                                                {order.paymentMethod=='tamara'&&  order.isPaid ?
                                                        order.paidAt.substring(0, 10) : (
                                                            <i className='fas fa-times text-danger'></i>
                                                        )
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        order.isDelivered ?
                                                            order.deliveredAt.substring(0, 10) : (
                                                                <i className='fas fa-times text-danger'></i>
                                                            )
                                                    }
                                                </td>
                                                <td>
                                                    <LinkContainer to={`/payment/${order._id}`}>
                                                        <Button
                                                            className='btn-sm'
                                                        >
                                                            details(Cancel OR Refund)
                                                        </Button>
                                                    </LinkContainer>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>
                        )
                    }
                </Col>
            </Row>
            <br/><br/><br/></Container>
    )
}

export default ListOrdersScreen