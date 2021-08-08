import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {Card, Col, Image, ListGroup, Row, Button, Form} from 'react-bootstrap'
import Rating from '../components/Rating'
import axios from 'axios'
import {useDispatch, useSelector} from 'react-redux'
import {listProductDetails} from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'


function ProductPage({match, history}) {
    // const product = products.find(p => p._id === match.params.id)
    const dispatch = useDispatch()
    const [qty, setQty] = useState(1)
    const {product, loading, error} = useSelector(state => state.productDetails)


    useEffect(() => {
        dispatch(listProductDetails(match.params.id))
    }, [dispatch, match])

    const handleAddToCart = () => {
        console.log('add id:', match.params.id)
        history.push(`/cart/${match.params.id}?qty=${qty}`)

    }

    if (loading) {
        return <Loader/>
    }

    if (error) {
        return <Message variant={'danger'}>error</Message>
    }



    return (
        <div>
            {product.name}
            <div>
                <Link to={'/'} className={'btn btn-light my-3'}>
                    Go Back
                </Link>
            </div>
            <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name}/>
                </Col>
                <Col md={3}>
                    <ListGroup variant={'flush'}>
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'}/>
                        </ListGroup.Item>


                        <ListGroup.Item>
                            Price: ${product.price}
                        </ListGroup.Item>


                        <ListGroup.Item>
                            Description: {product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>


                <Col md={3}>
                    <Card>
                        <ListGroup variant={'flush'}>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price:</Col>
                                    <Col>
                                        <strong>{product.price}</strong>
                                    </Col>
                                </Row>

                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Status:</Col>
                                    <Col>
                                        <strong>{product.countInStock > 0 ? 'In stock' : 'Out of stock'}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            {
                                product.countInStock > 0 && (
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>QTY</Col>
                                            <Col xs={'auto'} className={'my-1'}>
                                                <Form.Control
                                                    as={'select'}
                                                    value={qty}
                                                    onChange={e => setQty(e.target.value)}
                                                >
                                                {
                                                    [...Array(product.countInStock).keys()].map((k) => {
                                                        return (
                                                            <option key={k + 1} value={k + 1}> {k + 1}</option>
                                                        )
                                                    })
                                                }
                                                </Form.Control>


                                            </Col>

                                        </Row>

                                    </ListGroup.Item>
                                )
                            }

                            <ListGroup.Item>
                                <Button className={'btn-block'} type={'button'} onClick={handleAddToCart} disabled={product.countInStock === 0}>Add
                                    to cart</Button>
                            </ListGroup.Item>


                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default ProductPage