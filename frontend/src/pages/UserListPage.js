import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {actionListUsers, deleteUser} from '../actions/userActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {FaCheck, FaEdit, FaTrash} from 'react-icons/fa'
import {Button, Table} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {log} from '../utils'


function UserListPage({history}) {
    const dispatch = useDispatch()
    const userList = useSelector(state => state.userList)
    const {loading, error, users} = userList
    const {userInfo} = useSelector(state => state.userLogin)

    const userDelete = useSelector(state => state.userDelete)
    const { success: successDelete } = userDelete


    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(actionListUsers())
        } else {
            history.push('/login')
        }

    }, [dispatch, history, successDelete, userInfo])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            dispatch(deleteUser(id))
        }
    }


    return (
        <div>
            <h1>Users</h1>
            {
                loading
                    ? <Loader/>
                    : error
                        ? <Message variant={'danger'}>{error}</Message>
                        : (
                            users &&
                            <div>
                                <Table striped bordered hover responsive className="table-sm">
                                    <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>NAME</th>
                                        <th>EMAIL</th>
                                        <th>ADMIN</th>
                                        <th></th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                    {users.map(user => (
                                        <tr key={user._id}>
                                            <td>{user._id}</td>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.isAdmin ? (
                                                <FaCheck color={'green'}/>
                                            ) : (
                                                <FaCheck color={'red'}/>
                                            )}</td>

                                            <td>
                                                <Link to={`/admin/user/${user._id}/edit`}>
                                                    <Button variant="light" className="btn-sm">
                                                        <FaEdit/>
                                                    </Button>
                                                </Link>

                                                <Button variant="danger" className="btn-sm"
                                                        onClick={() => deleteHandler(user._id)}>
                                                    <FaTrash/>
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </Table>
                            </div>
                        )
            }

        </div>
    )
}

export default UserListPage