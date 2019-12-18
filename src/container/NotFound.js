import React from 'react'
import { Route } from 'react-router-dom'

function Status({ code, children }) {
    return <Route render={({ staticContext }) => {
        if (staticContext) {
            staticContext.statuscode = code
        }
        return children
    }}></Route>
}
function NotFound(props) {
    console.log('not found', props);

    return <Status code={404}>
        <h1>你瞅啥</h1>
        <img id='img_404' src='./404.jpg' alt=''></img>
    </Status>
}

export default NotFound