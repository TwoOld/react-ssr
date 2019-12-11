import React from 'react'
import ReactDOM from 'react-dom'
import App from '../src/app'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from '../src/store/store'

const Page = <Provider store={store}>
    <BrowserRouter>{App}</BrowserRouter>
</Provider>
ReactDOM.hydrate(Page, document.getElementById('app'))