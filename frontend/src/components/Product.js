import React from 'react'
import { Card, Row ,Col} from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom'
import Divider from '@mui/material/Divider';

function Product({ product }) {
    return (
        <div>
            <Card className="p-1 my-1 rounded" sx={{ textAlign: 'center'}}>
            <Row>
            <Col className="ps-5" sx={{ textAlign: 'center', alignitems: 'center' }}>
             <h4> {product.brand}</h4>
            </Col>
          
          </Row>
                <Divider ></Divider>
                <Link to={`/product/${product._id}`}>
                    <Card.Img src={product.image} className="card-img-top" />
                </Link>
                <Divider ></Divider>
                <Card.Body>
                   
                    <Card.Text as="div"  sx={{ textAlign: 'center'}}>
                        <Row>
                            <Col>{product.name}</Col>
                        </Row>
                       <Row>
                        <Col><img src={'assets/img/car.png'}></img></Col>
                        <Col><p>Year:2016</p></Col>
                        <Divider ></Divider>
                        <Col><p>${product.price}AED</p></Col>
                        </Row>
                        <Row>
                        <Col> <p><Rating value={product.rating} text={`${product.numReviews} reviews`} color={"#F8E825"} /></p></Col>
                        </Row>
                    </Card.Text>

                 
                </Card.Body>
            </Card>
        </div>
    )
}

export default Product
