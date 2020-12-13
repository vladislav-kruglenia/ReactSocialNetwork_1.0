import React, {FC} from 'react';
import s from "../ProfileInfo.module.css";
import {ContactType} from "../../Types/ContactTypes";


const Contact:FC<ContactType> = (props) => {
    return (
        <div className={s.contact}>
            <div>{props.contactName}: </div>
            <div>{props.contactValue}</div>{/*<br/>*/}
        </div>
    )
};

export default Contact