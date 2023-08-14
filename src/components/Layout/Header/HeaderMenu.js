import React from 'react'
import styles from './HeaderMenu.module.css'
import HeaderCartButton from './HeaderCartButton.js'
import LoginButton from './LoginButton.js'

const Headermenu = (props) => {
    return (<>
        <header className={styles.header}>
            <div className={styles.left}><LoginButton onClick={props.onCartOpen} /></div>
            <div className={styles.middle}><span>Shopping Cart</span></div>
            <div className={styles.right}><HeaderCartButton onClick={props.onCartOpen} /></div>
        </header>
    </>);
}

export default Headermenu;