import React from 'react'
import ReactDOM from 'react-dom'
import routes from '../src/app'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { getClientStore } from '../src/store/store'
import Header from '../src/component/Header'
import 'babel-polyfill'

const Page = <Provider store={getClientStore()}>
    <BrowserRouter>
        <Header></Header>
        <Switch>
            {routes.map(route => <Route {...route}></Route>)}
        </Switch>
    </BrowserRouter>
</Provider>
ReactDOM.hydrate(Page, document.getElementById('app'))