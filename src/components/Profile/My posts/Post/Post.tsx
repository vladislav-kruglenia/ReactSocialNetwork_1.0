import React, {FC} from 'react';
import s from "./Post.module.css"
import {PostPropsType} from "../../Types/PostTypes";

const Post:FC<PostPropsType> = (props) =>{
    return(
        <div className={s.postContainer} >
            <div className={s.postTop}>
                <div><img src={props.photo} alt={""}/></div>
                <div>{props.name}</div>
            </div>
            <div className={s.postText}>{props.message}</div>
        </div>
    )
};

export default Post