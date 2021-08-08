import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {addToCart, removeFromCart} from '../actions/cartActions'
import {Button, Card, Col, Form, Image, ListGroup, Row} from 'react-bootstrap'
import Message from '../components/Message'
import {Link} from 'react-router-dom'
import {FaTrash} from 'react-icons/fa'


function CartPage({match, location, history}) {
    const productId = match.params.id
    const qty = location.search ? Number(location.search.split('=')[1]) : 1
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const {cartItems} = cart


    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])

    const handleRemoveFromCart = (id) => {
        dispatch(removeFromCart(id))
    }

    const handleCheckout = () => {
        history.push('/login?redirect=shipping')
    }


    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {
                    cartItems.length === 0 ?
                        (<Message>

                            your cart is empty
                            <Link to={'/'}> back</Link>
                        </Message>)
                        : (
                            <ListGroup variant={'flush'}>
                                {
                                    cartItems.map(item => {
                                        return (
                                            <ListGroup.Item key={item.product}>
                                                <Row>
                                                    <Col md={2}>
                                                        <Image src={item.image} alt={item.name} fluid rounded/>
                                                    </Col>
                                                    <Col md={3}>
                                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                    </Col>
                                                    <Col md={2}>
                                                        ${item.price}
                                                    </Col>
                                                    <Col md={3}>
                                                        <Form.Control
                                                            as={'select'}
                                                            value={item.qty}
                                                            onChange={e => dispatch(addToCart(item.product, Number(e.target.value)))}
                                                        >
                                                            {
                                                                [...Array(item.countInStock).keys()].map((k) => {
                                                                    return (
                                                                        <option key={k + 1} value={k + 1}> {k + 1}</option>
                                                                    )
                                                                })
                                                            }
                                                        </Form.Control>
                                                    </Col>
                                                    <Col md={1}>
                                                        <Button
                                                            type={'button'}
                                                            variant={'light'}
                                                            onClick={() => handleRemoveFromCart(item.product)}
                                                        >
                                                            <FaTrash/>
                                                        </Button>
                                                    </Col>

                                                </Row>
                                            </ListGroup.Item>)
                                    })
                                }

                            </ListGroup>
                        )

                }

            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant={'flush'}>
                        <ListGroup.Item>
                            <h2>SubTotal {cartItems.reduce((total, item) => total += item.qty, 0)} items </h2>
                            <h2>$ {cartItems.reduce((total, item) => total += item.qty * item.price, 0).toFixed(2)} </h2>
                        </ListGroup.Item>
                    </ListGroup>

                    <ListGroup.Item>
                        <Button
                            type="button"
                            className="btn-block"
                            disabled={cartItems.length === 0}
                            onClick={handleCheckout}
                        >
                            Proceed To Checkout
                        </Button>
                    </ListGroup.Item>

                </Card>
            </Col>
        </Row>
    )
}

export default CartPage