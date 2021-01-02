import React, {FC} from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {
    FormikHelpersOnSubmitType,
    UsersSearchFormPropsType,
    UsersSearchFormValuesType
} from "../Types/UsersSearchFormTypes";
import {FilterType} from "../../../redux/Types/UsersReducerTypes";

const usersSearchFormValidate = (values: UsersSearchFormValuesType) => {
    const errors = {};
    return errors;
};

export const UsersSearchForm: FC<UsersSearchFormPropsType> = React.memo((props) => {

    const submit = (values: UsersSearchFormValuesType, {setSubmitting}: FormikHelpersOnSubmitType) => {
        debugger
        const filter: FilterType = {
            term: values.term,
            friend: values.friend === "null"
                ? null
                : values.friend === "true"
        };
        props.onFilterChanged(filter);
        setSubmitting(false);
    };

    return <>
        <Formik
            initialValues={{term: '', friend: "null"}}
            validate={usersSearchFormValidate}
            onSubmit={submit}
        >
            {({isSubmitting}) => (
                <Form>
                    <Field type="text" name="term"/>
                    <ErrorMessage name="term" component="div"/>
                    <Field name="friend" as="select">
                        <option value="null">All</option>
                        <option value="true">Only followed</option>
                        <option value="false">Only unfollowed</option>
                    </Field>
                    <button type="submit" disabled={isSubmitting}>
                        Submit
                    </button>
                </Form>
            )}
        </Formik>
    </>
});
