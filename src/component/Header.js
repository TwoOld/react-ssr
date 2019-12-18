import React from 'react'
import { Link } from 'react-router-dom'

export default () => {
    return <div>
        <Link to='/'>Index</Link>
        <span>|</span>
        <Link to='/about'>About</Link>
        <span>|</span>
        <Link to='/user'>User</Link>
        <span>|</span>
        <Link to='/abc'>NotFound</Link>
    </div>
}