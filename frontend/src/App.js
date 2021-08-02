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

                </Container>
            </main>
            <Footer/>

        </Router>
    )
}

export default App
