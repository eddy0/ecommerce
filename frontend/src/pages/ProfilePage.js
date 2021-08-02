import React, {useEffect, useState} from 'react'
import {Button, Col, Form, Row} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {actionUpdateUserProfile, actionUserDetails, actionUserProfileReset, register} from '../actions/userActions'
import Message from '../components/Message'
import Loader from '../components/Loader'


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


    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            if (!user || !user.name || success) {
                dispatch(actionUserProfileReset())
                dispatch(actionUserDetails('profile'))
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

            </Col>
        </Row>
    )
}

export default ProfilePage