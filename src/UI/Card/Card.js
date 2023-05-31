import React from 'react'
import styles from "./Card.module.css"

const Card = (props) => {
    const isLoggedIn = props.isLoggedIn
    let childrens =  props.children;

    if (isLoggedIn === false) {
        childrens = `User needs to be logged in !`
    }

    return (<div className={`${styles.card} ${props.className}`}>
        {props.isLoading ? `Content loading ...` : childrens}

    </div> );
}

export default Card;