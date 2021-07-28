import {createStore, applyMiddleware, combineReducers} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import {productListReducer} from './reducers/productReducers'


const reducer = combineReducers({
    productList: productListReducer,
})

const initialState = {}

const middleware = [thunk]

const store = createStore(reducer, composeWithDevTools(
    applyMiddleware(...middleware),
))

export default store
