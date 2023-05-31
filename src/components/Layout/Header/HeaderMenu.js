import React from 'react'
import styles from './HeaderMenu.module.css'
import HeaderCartButton from './HeaderCartButton.js'
import LoginButton from './LoginButton.js'

const Headermenu = (props) => {
    return (<>
        <header className={styles.header}>
            <LoginButton onClick={props.onCartOpen} />
            <span>Shopping Cart</span>
            <HeaderCartButton onClick={props.onCartOpen} />
        </header>
    </>);
}

export default Headermenu;