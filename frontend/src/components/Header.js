import React from 'react'
import {Form, FormControl, Navbar, Nav, Button, Container, NavDropdown} from 'react-bootstrap'
import {FaShoppingCart, FaUser} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {logout} from '../actions/userActions'
import SearchBox from './SearchBox'


function Header(props) {

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
    const dispatch = useDispatch()

    const handleLogout = () => {
        console.log('logout')
        dispatch(logout())
    }

    console.log(userInfo)

    return (
        <header>
            <Navbar bg="dark" variant={'dark'} expand="lg" collapseOnSelect={true}>
                <Container>

                    <Navbar.Brand as={Link} to="/">Shop</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll"/>
                    <Navbar.Collapse id="navbarScroll">
                        <SearchBox />
                        <Nav
                            className="mr-auto my-2 my-lg-0"
                            style={{maxHeight: '100px'}}
                            navbarScroll
                        >
                            <Nav.Link as={Link} to="/cart">
                                <FaShoppingCart/>
                                Cart
                            </Nav.Link>

                            {
                                userInfo  ?
                                    (
                                        <NavDropdown id={'username'} title={userInfo.name}>
                                            <NavDropdown.Item as={Link} to={'/profile'}>
                                                profile
                                            </NavDropdown.Item>
                                            <NavDropdown.Item onClick={handleLogout}>
                                                logout
                                            </NavDropdown.Item>
                                        </NavDropdown>

                                    )
                                    : (<Nav.Link as={Link} to="/login">
                                        <FaUser/>
                                        <span>Login</span>
                                    </Nav.Link>)
                            }

                            {userInfo && userInfo.isAdmin &&
                            (
                                <NavDropdown id={'admin'} title={'admin'}>
                                    <NavDropdown.Item as={Link} to={'/admin/userlist'}>
                                        users
                                    </NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to={'/admin/productlist'}>
                                        products
                                    </NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to={'/admin/orderlist'}>
                                        orders
                                    </NavDropdown.Item>


                                </NavDropdown>

                            )
                            }


                        </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header