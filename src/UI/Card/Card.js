import React from 'react'
import { Card as CardUI, CardBody, Spinner } from "@nextui-org/react";

const Card = (props) => {
    const isLoggedIn = props.isLoggedIn
    let childrens =  props.children;

    if (isLoggedIn === false) {
        childrens = `User needs to be logged in !`
    }

    return (
        <div className={`${props.className?props.className:""} light`}>
            <CardUI>
                <CardBody>
                    {props.isLoading ? <Spinner /> : childrens}
                </CardBody>
            </CardUI>
    </div> );
}

export default Card;