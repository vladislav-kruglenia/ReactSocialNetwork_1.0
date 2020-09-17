import React from 'react';
import s from "./Post.module.css"

const Post = (props) =>{
    return(
        <div className={s.postContainer} >
            <div className={s.postTop}>
                <div><img src={props.photo} alt={""}/></div>
                <div>{props.name}</div>
            </div>
            <div className={s.postText}>{props.message}</div>


            {/*<div>
                <span>like </span>
                {props.likeCounts}
            </div>*/}
        </div>
    )
}

export default Post