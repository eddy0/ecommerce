import React, {useEffect, useState} from 'react'
import {Col, Row} from 'react-bootstrap'
import Product from '../components/Product'
import axios from 'axios'
import {useDispatch, useSelector} from 'react-redux'
import {listProducts} from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'


function HomePage(props) {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const {error, loading, products} = productList

    useEffect(() => {
        dispatch(listProducts())

    }, [dispatch])

    if (loading) {
        return <Loader />
    }

    if (error) {
        return <Message variant={'danger'}>error</Message>
    }

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