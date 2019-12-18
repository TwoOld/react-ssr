import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { getUserInfo } from '../store/user'
import { Redirect } from 'react-router-dom'

function User(props) {
    useEffect(() => {
        console.log('effect', props.userInfo);

        if (!props.userInfo.name) {
            props.getUserInfo()
        }
    }, [])
    // return (
    //     <div>
    //         <h1>hello {props.userInfo.name}, {props.userInfo.best}</h1>
    //     </div>
    // )
    return <Redirect to='/about'></Redirect>
}
User.loadData = (store) => {
    return store.dispatch(getUserInfo())
}
export default connect(
    state => ({ userInfo: state.user.userInfo }),
    { getUserInfo }
)(User)