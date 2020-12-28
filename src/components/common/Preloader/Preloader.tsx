import React, {FC} from 'react'
import preloader from "../../../img/loading2.gif";
import s from "./Preloader.module.css"

let Preloader: FC = () =>{
    return <div className={s.preloaderContainer}>
        <img src={preloader} alt={""}/>
    </div>
};

export default Preloader