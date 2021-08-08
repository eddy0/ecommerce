import React, {useEffect} from 'react'
import CheckoutSteps from '../components/CheckoutSteps'
import {Button, Card, Col, Image, ListGroup, Row} from 'react-bootstrap'
import Message from '../components/Message'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {getOrderDetails} from '../actions/orderActions'
import Loader from '../components/Loader'


function OrderPage({match, history}) {
    const dispatch = useDispatch()
    const orderId = match.params.id


    const orderDetails = useSelector(state => state.orderDetails)
    const {order, error, loading} = orderDetails

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    if (!loading && !error) {
        order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    }

    //Af0rFO-Dex7r7MvAl1MCy_MdP9Vo2XJoVgrc7i5bWCfXNiQ9WGls_DzpGJySCYOvWC04SYRbvmS31Nw7

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')

        }

        if (!order || Number(order._id) !== Number(orderId)) {

            dispatch(getOrderDetails(orderId))
        }

    }, [dispatch, order, orderId])

    if (loading) {
        return <Loader/>
    }

    if (error) {
        return <Message variant="danger">{error}</Message>
    }

    return (
        <div>
            <h1>Order: {order._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p><strong>Name: </strong> {order.user.name}</p>
                            <p><strong>Email: </strong>
                                <a target={'_blank'}
                                   href={`mailto:${order.user.email}`}>{order.user.email}
                                </a>
                            </p>
                            <p>
                                <strong>Shipping: </strong>
                                {order.shippingAddress.address}, {order.shippingAddress.city}
                                {'  '}
                                {order.shippingAddress.postalCode},
                                {'  '}
                                {order.shippingAddress.country}
                            </p>

                            {order.isDelivered ? (
                                <Message variant='success'>Delivered on {order.deliveredAt}</Message>
                            ) : (
                                <Message variant='warning'>Not Delivered</Message>
                            )}

                        </ListGroup.Item>
                    </ListGroup>
                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <p>
                            <strong>Method: </strong>
                            {order.paymentMethod}
                        </p>
                        {order.isPaid ? (
                            <Message variant='success'>Paid on {order.paidAt}</Message>
                        ) : (
                            <Message variant='warning'>Not Paid</Message>
                        )}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {order.orderItems.length === 0
                            ? (<Message variant="info">
                                Your cart is empty
                            </Message>)
                            : (
                                <ListGroup variant={'flush'}>
                                    {order.orderItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded/>
                                                </Col>

                                                <Col>
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </Col>

                                                <Col md={4}>
                                                    {item.qty} X ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}

                                </ListGroup>
                            )

                        }
                    </ListGroup.Item>

                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Items:</Col>
                                    <Col>${order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping:</Col>
                                    <Col>${order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax:</Col>
                                    <Col>${order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total:</Col>
                                    <Col>${order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            {/*{!order.isPaid && (*/}
                            {/*    <ListGroup.Item>*/}
                            {/*        {loadingPay && <Loader />}*/}

                            {/*        {!sdkReady ? (*/}
                            {/*            <Loader />*/}
                            {/*        ) : (*/}
                            {/*            <PayPalButton*/}
                            {/*                amount={order.totalPrice}*/}
                            {/*                onSuccess={successPaymentHandler}*/}
                            {/*            />*/}
                            {/*        )}*/}
                            {/*    </ListGroup.Item>*/}
                            {/*)}*/}


                        </ListGroup>

                        {/*{loadingDeliver && <Loader />}*/}
                        {/*{userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (*/}
                        {/*    <ListGroup.Item>*/}
                        {/*        <Button*/}
                        {/*            type='button'*/}
                        {/*            className='btn btn-block'*/}
                        {/*            onClick={deliverHandler}*/}
                        {/*        >*/}
                        {/*            Mark As Delivered*/}
                        {/*        </Button>*/}
                        {/*    </ListGroup.Item>*/}
                        {/*)}*/}

                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default OrderPage