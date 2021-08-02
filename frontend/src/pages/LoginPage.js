import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import FormContainer from '../components/FormContainer'
import {Form, Button, Row, Col} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {login} from '../actions/userActions'
import Message from '../components/Message'
import Loader from '../components/Loader'


function LoginPage({location, history}) {

    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const redirect = location.search ? location.search.split('=')[1] : '/'
    const userLogin = useSelector(state => state.userLogin)
    const { error, loading, userInfo } = userLogin

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }

    }, [dispatch, history, userInfo, redirect])

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    return (
        <FormContainer>
            <h1>Sign In</h1>
            {error && <Message variant={'danger'}>{error}</Message>}
            {loading && <Loader /> }

            <Form onSubmit={handleSubmit}>
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

                <Button type={'submit'} variant={'primary'}> SIGN IN</Button>

            </Form>

            <Row className={'py-3'}>
                <Col>
                    new Customer ?
                    <Link to={redirect ? `/register?redirect=${redirect}`: '/register'}>

                        register
                    </Link>
                </Col>

            </Row>
        </FormContainer>
    )
}

export default LoginPage