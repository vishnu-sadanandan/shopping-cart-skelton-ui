import React from 'react'
import styles from './HeaderMenu.module.css'
import HeaderCartButton from './HeaderCartButton.js'
import HeaderMenuOptions from './HeaderMenuOptions'

const Headermenu = (props) => {
    return (<>
        <header className={styles.header}>
            <div className={styles.left}><HeaderMenuOptions /></div>
            <div className={styles.middle}><span>Shopping Cart</span></div>
            <div className={styles.right}><HeaderCartButton onClick={props.onCartOpen} /></div>
        </header>
    </>);
}

export default Headermenu;