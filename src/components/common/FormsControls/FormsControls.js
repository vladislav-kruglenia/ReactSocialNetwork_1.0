import React from "react";
import styles from "./FormsControls.module.css"
import {Field} from "redux-form";


const FormControl = ({input, meta, child, ...props}) => {

    const hasError = meta.touched && meta.error
    return <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
        <div>
            {props.children}
        </div>
        {hasError && <div><span>{meta.error}</span></div>}
    </div>
}

export const Textarea = (props) => {
    const {input, meta, child, ...restProps} = props
    return <FormControl {...props}><textarea {...input} {...restProps}/></FormControl>
}

export const Input = (props) => {
    const {input, meta, child, ...restProps} = props
    return <FormControl {...props}><input {...input} {...restProps}/></FormControl>
}

export const createField = (placeholder, component, name, validators, props = {}, text = "") => (
    <div>
        <Field
            placeholder={placeholder}
            component={component}
            name={name}
            validate={validators}
            {...props}
        />{text}
    </div>
)

