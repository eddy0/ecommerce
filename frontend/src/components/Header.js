import React from 'react'
import {Form, FormControl, Navbar, Nav, Button, Container} from 'react-bootstrap'
import {FaShoppingCart, FaUser} from 'react-icons/fa'
import {Link} from 'react-router-dom'


function Header(props) {
    return (
        <header>
            <Navbar bg="dark" variant={'dark'} expand="lg" collapseOnSelect={true}>
                <Container>

                    <Navbar.Brand  as={Link} to="/">Shop</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll"/>
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="mr-auto my-2 my-lg-0"
                            style={{maxHeight: '100px'}}
                            navbarScroll
                        >
                            <Nav.Link as={Link} to="/cart">
                                <FaShoppingCart/>
                                Cart
                            </Nav.Link>
                            <Nav.Link as={Link} to="/login">
                                <FaUser/>
                                <span>Login</span>
                            </Nav.Link>
                        </Nav>
                        <Form className="d-flex">
                            <FormControl
                                type="search"
                                placeholder="Search"
                                className="mr-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header