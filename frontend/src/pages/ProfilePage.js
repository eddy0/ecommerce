import React, {useEffect, useState} from 'react'
import {Button, Col, Form, Row, Table} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {actionUpdateUserProfile, actionUserDetails, actionUserProfileReset} from '../actions/userActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {listMyOrders} from '../actions/orderActions'
import {Link} from 'react-router-dom'
import {FaTimes} from 'react-icons/fa'


function ProfilePage({history}) {

    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')
    const [message, setMessage] = useState('')


    // const redirect = location.search ? location.search.split('=')[1] : '/'
    const userDetails = useSelector(state => state.userDetails)
    const {error, loading, user} = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const {success} = userUpdateProfile

    const orderListMy = useSelector(state => state.orderListMy)
    const {loading: loadingOrders, error: errorOrders, orders} = orderListMy

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            if (!user || !user.name || success || userInfo._id !== user._id) {
                dispatch(actionUserProfileReset())
                dispatch(actionUserDetails('profile'))
                dispatch(listMyOrders())
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }

    }, [dispatch, history, userInfo, user, success])

    const handleSubmit = (e) => {
        e.preventDefault()
        setMessage('')
        if (password !== confirmPassword) {
            setMessage('Password do not match')
        } else {
            dispatch(actionUpdateUserProfile({
                id: user._id,
                name: name,
                email: email,
                password: password
            }))
        }
    }


    return (
        <Row>
            <Col md={12}>

                <h2>User Profile</h2>
                {message && <Message variant={'danger'}>{message}</Message>}
                {error && <Message variant={'danger'}>{error}</Message>}
                {loading && <Loader/>}

                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId={'name'}>
                        <Form.Label>
                            Name
                        </Form.Label>
                        <Form.Control
                            type={'text'}
                            placeholder={'enter name'}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />


                    </Form.Group>

                    <Form.Group controlId={'email'}>
                        <Form.Label>
                            Email Address
                        </Form.Label>
                        <Form.Control
                            type={'email'}
                            placeholder={'enter email'}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />


                    </Form.Group>


                    <Form.Group controlId={'password'}>
                        <Form.Label>
                            Password
                        </Form.Label>
                        <Form.Control
                            type={'password'}
                            placeholder={'enter password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                    </Form.Group>

                    <Form.Group controlId={'confirmPassword'}>
                        <Form.Label>
                            Confirm Password
                        </Form.Label>
                        <Form.Control
                            type={'password'}
                            placeholder={'confirm password'}
                            value={confirmPassword}
                            onChange={(e) => setconfirmPassword(e.target.value)}
                        />

                    </Form.Group>


                    <Button type={'submit'} variant={'primary'}> UPDATE</Button>

                </Form>

            </Col>
            <Col md={12}>
                <h2>My Orders</h2>
                {loadingOrders ? (
                    <Loader/>
                ) : errorOrders ? (
                    <Message variant="danger">{errorOrders}</Message>
                ) : (
                    <Table striped responsive className="table-sm">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Paid</th>
                            <th>Delivered</th>
                            <th></th>
                        </tr>
                        </thead>

                        <tbody>
                        {orders.map(order => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>${order.totalPrice}</td>
                                <td>{
                                    order.isPaid
                                        ? order.paidAt.substring(0, 10)
                                        : (
                                            <FaTimes color={'red'}/>
                                        )
                                }
                                </td>
                                <td>
                                    <Link to={`/order/${order._id}`}>
                                        <Button className="btn-sm">Details</Button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                )}
            </Col>
        </Row>
    )
}

export default ProfilePage