import React, {useEffect, useState} from 'react'
import {Button, Col, Form, Row} from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {useDispatch, useSelector} from 'react-redux'
import {actionUserDetails, register, updateUser} from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import {Link} from 'react-router-dom'
import {USER_UPDATE_RESET} from '../constants/userConstants'


function UserEditPage({match, history}) {
    const userId = match.params.id
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const userDetails = useSelector(state => state.userDetails)
    const {error, loading, user} = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const {error: errorUpdate, loading: loadingUpdate, success: successUpdate} = userUpdate


    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET })
            history.push('/admin/userlist')
        } else {

            if (!user.name || user._id !== Number(userId)) {
                dispatch(actionUserDetails(userId))
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }
    }, [user, userId, dispatch, history,])

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(updateUser({...user, name: name, email: email, isAdmin: isAdmin}))
    }

    return (
        <div>
            <Link to="/admin/userlist">
                Go Back
            </Link>

            <FormContainer>
                <h1>udit user</h1>

                {errorUpdate && <Message variant={'errorUpdate'}>{error}</Message>}
                {loadingUpdate && <Loader/>}
                {
                    loading ? <Loader/> :
                        error ? <Message variant="danger">{error}</Message>
                            : <Form onSubmit={handleSubmit}>
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


                                <Form.Group controlId={'isAdmin'}>

                                    <Form.Check
                                        type={'checkbox'}
                                        label='Is Admin'
                                        checked={isAdmin}
                                        onChange={(e) => setIsAdmin(e.target.checked)}
                                    />

                                </Form.Group>


                                <Button type={'submit'} variant={'primary'}> Update</Button>

                            </Form>
                }

            </FormContainer>
        </div>
    )
}

export default UserEditPage