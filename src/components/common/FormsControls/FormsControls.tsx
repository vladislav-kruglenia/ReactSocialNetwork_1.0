import React, {FC} from "react";
import styles from "./FormsControls.module.css"
import {Field, WrappedFieldProps} from "redux-form";
import {FieldValidatorType} from "../../../utils/validators/valitatorsTypes";
import {FormControlPropsType} from "./FormsControlsTypes";


const FormControl: FC<FormControlPropsType> = ({meta, children}) => {
    const hasError = meta.touched && meta.error;
    return <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
        <div>
            {children}
        </div>
        {hasError && <div><span>{meta.error}</span></div>}
    </div>
};

export const Textarea: FC<WrappedFieldProps> = (props) => {
    // const {input, meta, child, ...restProps} = props;
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}><textarea {...input} {...restProps}/></FormControl>
};

export const Input: FC<WrappedFieldProps> = (props) => {
    // const {input, meta, child, ...restProps} = props;
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}><input {...input} {...restProps}/></FormControl>
};

export function createField<FormKeysType extends string> (placeholder: string | undefined,
                            component: FC<WrappedFieldProps>,
                            name: FormKeysType,
                            validators: Array<FieldValidatorType>,
                            props = {},
                            text = "") {
    return <div>
        <Field
            placeholder={placeholder}
            component={component}
            name={name}
            validate={validators}
            {...props}
        />{text}
    </div>
}

