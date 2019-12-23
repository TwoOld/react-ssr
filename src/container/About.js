import React from 'react'
import styles from './About.css'
import withStyles from '../withStyles'
function About(props) {
    if (props.staticContext) {
        props.staticContext.css.push(styles._getCss())
    }
    return <div>
        <h1 className={styles.title}>About</h1>
    </div>
}
// About.loadData = () => { }
export default withStyles(About, styles)