import React from 'react'
import styles from "./Modal.module.css"
import Card from '../Card/Card';
import ReactDOM from 'react-dom';



const ModalContainer = (props) => {
    return (        <>
        <div className={styles.backdrop} onClick={props.onClose} />
        <Card className={`${styles.modal}`}>
            <div className={styles.content}>{props.children}</div>
        </Card>
    </>);
}

const Modal = (props) => {
    return (
        <>
            {ReactDOM.createPortal(<ModalContainer {...props}>{props.children}</ModalContainer>, document.getElementById("overlay-contents"))}
        </>
    )
}

export default Modal;