import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Container, Card, Image, Form } from 'react-bootstrap'
import { fetchProductvehicle } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Box from '@mui/material/Box';
import ProductCard from "../components/ProductCard";
import Button from '@mui/material/Button';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import Modal from '@mui/material/Modal';
import {BiArrowBack} from "react-icons/bi";
import { Helmet } from 'react-helmet';



function ProductsScreen({match,history}) {
  const dispatch = useDispatch()
  const listProducts = useSelector(state => state.listProduct)
  const { error, loading, products } = listProducts

  const [selectedItems, setSelectedItems] = useState([]);

  const addToCompare = (item) => {
    setSelectedItems((selectedItems) => [...selectedItems, item]);
  };

  const removeFromCompare = (item) => {
    const filteredItems = selectedItems.filter(
      (product) => product.id !== item.id
    );
    setSelectedItems((selectedItems) => filteredItems);
  };

  useEffect(() => {
    dispatch(fetchProductvehicle(match.params.id))
  }, [dispatch])
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const [open, setOpen] = React.useState(false);
  const handleOpenmodal = () => {
    setOpen(true);
  }
  return (
    <Container >
            <Helmet>
        <meta charSet="utf-8" />
        <title>Drivo products </title>
        <meta name="description" content="prodcut filtered by vehicle" />
      </Helmet>
      <h1>Product for your vehicle</h1>

<Button onClick={() => history.goBack()}><BiArrowBack size={15}/></Button>
       <Row>
        <Col >
        

          {loading ? <Loader />
            : error ? <Message variant='danger' text={error} />
              : <Row>
                {products.map(product => (
                  <Col key={product._id} xs={12} sm={6} md={6} lg={4} xl={4} xxl={3}>
                  <ProductCard
                      key={product.id}
                      product={product}
                      selected={selectedItems}
                      addToCompare={addToCompare}
                      removeFromCompare={removeFromCompare}
                    />
                  </Col>
                ))}
              </Row>


          }


        </Col>


      </Row>

    </Container>
  )
}

export default ProductsScreen
