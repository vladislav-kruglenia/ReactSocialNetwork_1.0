import React from "react";
import s from "./DialogItem.module.css"
import {NavLink} from "react-router-dom";
import Hardi from "../../../img/User.jpg"


const DialogItem = (props) => {
    return (
        <div className={s.item}>
            <NavLink activeClassName={s.active} to={"/dialogs/" + props.id}>
                <img src={Hardi} alt=""/>
                {props.name}
            </NavLink>
        </div>
    )
}



export default DialogItem