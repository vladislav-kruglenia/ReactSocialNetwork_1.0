import React from 'react'
import {Field, reduxForm} from "redux-form";
import {Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {loginThunkCreator} from "../../redux/authReducer";
import {Redirect} from "react-router-dom";
import style from "./LoginPage.module.css"


let LoginForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field
                placeholder={"Email"}
                component={Input}
                name={"email"}
                validate={[required]}
            />
        </div>
        <div>
            <Field
                placeholder={"Password"}
                component={Input}
                name={"password"}
                validate={[required]}
            />
        </div>
        <div>
            <Field type={"checkbox"} component={"input"} name={"rememberMe"}/>remember me
        </div>
        {
            props.error && <div className={style.formSummaryError}>
                {props.error}
            </div>
        }
        <div>
            <button>Login</button>
        </div>
    </form>
}

LoginForm = reduxForm({form: 'login'})(LoginForm)

const LoginPage = (props) => {
    const onSubmit = (formData) => {
        console.log(formData)
        props.loginThunkCreator(formData.email, formData.password, formData.rememberMe)
    }

    if(props.isAuth) return <Redirect to={'/profile'}/>
    return <div>
        <h1>LoginPage</h1>
        <LoginForm onSubmit={onSubmit}/>
    </div>
}

const mapStateToProps = (state) =>{
    return{
        isAuth: state.auth.isAuth
    }
}

export default connect(mapStateToProps, {loginThunkCreator})(LoginPage)