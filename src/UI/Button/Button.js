import React, { Component } from 'react'
import styles from "./Button.module.css"
// class Button extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             isButtonActive : props.isButtonActive || true
//         }
//     }
//     render() {
//         return (<button className={styles.button} onClick={this.props.onClick}>
//             {this.props.children}
//         </button> );
//     }
// }

const Button = (props) => {
    return (<button className={styles.button} onClick={props.onClick}>
        {props.children}
    </button> );
}

export default Button;