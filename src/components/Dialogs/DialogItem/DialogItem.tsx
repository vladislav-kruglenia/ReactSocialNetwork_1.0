import React, {FC} from "react";
import s from "./DialogItem.module.css"
import {NavLink} from "react-router-dom";
import Hardi from "../../../img/User.jpg"
import {DialogItemProps} from "../Types/DialogItemTypes";


const DialogItem: FC<DialogItemProps> = (props) => {
    return (
        <div className={s.item}>
            <NavLink activeClassName={s.active} to={"/dialogs/" + props.id}>
                <img src={Hardi} alt=""/>
                {props.name}
            </NavLink>
        </div>
    )
};



export default DialogItem