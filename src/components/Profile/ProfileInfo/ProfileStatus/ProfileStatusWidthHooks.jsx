import React, {useEffect, useState} from 'react';

const ProfileStatusWidthHooks = (props) => {
    let [editMode,setEditMode] = useState(false)
    let [status,setStatus] = useState(props.status)

    useEffect(()=>{
        setStatus(props.status)
    },[props.status])

    let activateEditMode = () =>{
        setEditMode(true)
    }
    let deactivateEditMode = () =>{
        setEditMode(false)
        props.updateStatus(status)
    }

    let onStatusChange = (e) =>{
        setStatus(e.currentTarget.value)
    }


    return (
        <div>
            {!editMode &&
                <div>
                    <span onDoubleClick={activateEditMode}>{props.status || "Нет статуса, сори"}</span>
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
            </div>
            }
        </div>
    )
}

export default ProfileStatusWidthHooks