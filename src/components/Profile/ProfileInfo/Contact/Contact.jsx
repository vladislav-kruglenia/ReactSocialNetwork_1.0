import React from 'react';
import s from "../ProfileInfo.module.css";


const Contact = (props) => {
    return (
        <div className={s.contact}>
            <div>{props.contactName}: </div>
            <div>{props.contactValue}</div>{/*<br/>*/}
        </div>
    )
}

export default Contact