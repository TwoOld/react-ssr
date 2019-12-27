import React from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'
function withStyles(Comp, styles) {
    function Wrapped(props) {
        if (props.staticContext) {
            props.staticContext.css.push(styles._getCss())
        }
        Comp.lo
        return <Comp {...props} />
    }
    hoistNonReactStatics(Wrapped, Comp)
    return Wrapped
}
export default withStyles