import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {register} from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {Button, Col, Form, Row} from 'react-bootstrap'
import {Link} from 'react-router-dom'


function RegisterPage({location, history}) {

    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')
    const [message, setMessage] = useState('')


    const redirect = location.search ? location.search.split('=')[1] : '/'
    const userRegister = useSelector(state => state.userRegister)
    const {error, loading, userInfo} = userRegister


    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }

    }, [dispatch, history, userInfo, redirect])

    const handleSubmit = (e) => {
        e.preventDefault()
        setMessage('')
        if (password !== confirmPassword) {
            setMessage('Password do not match')
        } else {
            dispatch(register({name, email, password}))
        }
    }

    return (
        <FormContainer>
            <h1>Sign Up</h1>
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


                <Button type={'submit'} variant={'primary'}> SIGN UP</Button>

            </Form>

            <Row className={'py-3'}>
                <Col>
                    Already has account ?
                    <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>

                        Login IN
                    </Link>
                </Col>

            </Row>
        </FormContainer>
    )
}

export default RegisterPage