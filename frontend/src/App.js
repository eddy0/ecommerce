import './App.css'
import './bootstrap.min.css'
import Header from './components/Header'
import Footer from './components/Footer'
import {Container} from 'react-bootstrap'
import HomePage from './pages/HomePage'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import ProductPage from './pages/ProductPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProfilePage from './pages/ProfilePage'
import TestPage from './pages/TestPage'
import CartPage from './pages/CartPage'
import ShippingPage from './pages/ShippingPage'
import PaymentPage from './pages/PaymentPage'
import PlaceOrderPage from './pages/PlaceOrderPage'
import OrderPage from './pages/OrderPage'

function App() {
    return (
        <Router>
            <Header/>
            <main className={'py-5'}>
                <Container>
                    <Route path={'/'} component={HomePage} exact />
                    <Route path={'/product/:id'} component={ProductPage} />
                    <Route path={'/login'} component={LoginPage} exact />
                    <Route path={'/register'} component={RegisterPage} exact />
                    <Route path={'/profile'} component={ProfilePage} exact />
                    <Route path={'/cart'} component={CartPage} exact />
                    <Route path={'/cart/:id'} component={CartPage} exact />
                    <Route path={'/shipping'} component={ShippingPage} exact />
                    <Route path={'/payment'} component={PaymentPage} exact />
                    <Route path={'/placeorder'} component={PlaceOrderPage} exact />
                    <Route path={'/order/:id'} component={OrderPage} exact />


                    <Route path={'/test'} component={TestPage} exact />

                </Container>
            </main>
            <Footer/>

        </Router>
    )
}

export default App
