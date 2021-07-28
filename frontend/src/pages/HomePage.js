import React, {useEffect, useState} from 'react'
import {Col, Row} from 'react-bootstrap'
import Product from '../components/Product'
import axios from 'axios'


function HomePage(props) {
    const [products, setProducts] = useState([])

    useEffect(() => {
        async function fetchData() {
            const {data} = await axios.get('/api/products/')
            setProducts(data)
        }

        fetchData()

    }, [])
    return (
        <div>
            <h1>
                Lastest Products
            </h1>
            <Row>
                {products.map((p) => {
                    return (
                        <Col key={p._id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={p} />
                        </Col>
                    )
                })}

            </Row>
        </div>
    )
}

export default HomePage