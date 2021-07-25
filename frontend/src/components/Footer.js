import React from 'react'
import {Col, Container, Row} from 'react-bootstrap'


function Footer(props) {
    return (
        <footer>
            <Container>
                <Row>
                    <Col className={'text-center py-3'}>
                        Copy right &copy; footer
                    </Col>
                </Row>

            </Container>
        </footer>
    )
}

export default Footer