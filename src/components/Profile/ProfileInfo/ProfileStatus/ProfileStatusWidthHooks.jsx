import React, {useEffect, useState} from 'react';
import s from './ProfileStatus.module.css'
import s2 from './../../../common/Button.module.css'

const ProfileStatusWidthHooks = (props) => {
    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)

    useEffect(() => {
        setStatus(props.status)
    }, [props.status]);

    let activateEditMode = () => {
        setEditMode(true)
    };
    let deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    };

    let onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
    };

    if(!props.isOwner){
        return <div className={s.profileStatusContainer}>
            <div>
                <h2>{props.nameUser}</h2>
            </div>
            <div className={s.status}>
                {props.status || "Нет статуса, сори"}
            </div>
        </div>
    }


    return (
        <div className={s.profileStatusContainer}>
            <div>
                <h2>{props.nameUser}</h2>
            </div>
            {!editMode &&
            <div onClick={activateEditMode} className={s.status}>
                {props.status || "Нет статуса, сори"}
            </div>
            }
            {editMode &&
            <div>
                <input
                    onBlur={deactivateEditMode}
                    onChange={onStatusChange}
                    value={status}
                    autoFocus={true}
                />
                <button className={s2.buttonStyle} onClick={deactivateEditMode}>Save</button>
            </div>
            }
        </div>
    )
}

export default ProfileStatusWidthHooks