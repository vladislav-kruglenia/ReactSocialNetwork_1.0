import React from 'react';
import s from "./Post.module.css"

const Post = (props) =>{
    return(
        <div className={s.item} >
            <img src="https://f4.bcbits.com/img/0011837834_50.jpg" alt={""}/>
            {props.message}
            <div>
                <span>like </span>
                {props.likeCounts}
            </div>
        </div>
    )
}

export default Post