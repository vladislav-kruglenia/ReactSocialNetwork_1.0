import React from 'react'
import preloader from "../../../img/loading2.gif";
import s from "./Preloader.module.css"

let Preloader = (props) =>{
    return <div className={s.preloaderContainer}>
        <img src={preloader} alt={""}/>
    </div>
}

export default Preloader