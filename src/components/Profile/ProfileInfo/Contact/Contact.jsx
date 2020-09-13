import React from 'react';


const Contact = (props) => {
    return (
        <>
            <i>{props.contactName}: </i>{props.contactValue}<br/>
        </>
    )
}

export default Contact