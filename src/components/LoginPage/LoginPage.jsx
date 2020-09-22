import React from 'react'
import {reduxForm} from "redux-form";
import {createField, Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {loginThunkCreator} from "../../redux/authReducer";
import {Redirect} from "react-router-dom";
import style from "./LoginPage.module.css"
import s2 from "../common/Button.module.css";


let LoginForm = ({handleSubmit, error, captchaURL}) => {
    return <form onSubmit={handleSubmit}>
        {createField("Email", Input, "email", [required], {type: "text"})}
        {createField("Password", Input, "password", [required], {type: "password"})}
        {/*{createField(null,"input","rememberMe",[],{type: "checkbox"},"remember me")}*/}
        {captchaURL && <img src={captchaURL} alt={''}/>}
        {captchaURL && createField("", Input, "captchaURL", [required])}
        {
            error && <div className={style.formSummaryError}>
                {error}
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
        props.loginThunkCreator(formData.email, formData.password, formData.rememberMe, formData.captchaURL)
    }

    if (props.isAuth) return <Redirect to={'/profile'}/>
    return <div className={style.loginForm}>
        <div className={style.loginFormContainer}>
            <h1>Login</h1>
            <LoginForm onSubmit={onSubmit} captchaURL={props.captchaURL}/>
        </div>
    </div>
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        captchaURL: state.auth.captchaURL
    }
}

export default connect(mapStateToProps, {loginThunkCreator})(LoginPage)