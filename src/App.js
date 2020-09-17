import withSuspense from "./HighOrderComponents/widthSuspenseComponent";
import React from 'react';
import './App.css';
import {BrowserRouter, Redirect,/*BrowserRouter*/ Route, Switch, withRouter} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginPage from "./components/LoginPage/LoginPage";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/appReducer";
import Preloader from "./components/common/Preloader/Preloader";
import store from "./redux/storeRedux";

const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"));
const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));
//import ProfileContainer from "./components/Profile/ProfileContainer";
//import DialogsContainer from "./components/Dialogs/DialogsContainer";


class App extends React.Component {
    componentDidMount() {
        this.props.authMe()
    }

    render() {
        if (!this.props.initialized) return <Preloader/>;

        return (
            <div className="app-wrapper">
                <HeaderContainer/>
                <div className="app-wrapper-content">
                    <div className="app-wrapper-container">
                        <Navbar/>
                        <div className={"app-content"}>
                            <Switch>
                                <Route exact path='/'
                                       render={() => <Redirect to={"/profile"}/>}/>

                                <Route path='/dialogs'
                                       render={withSuspense(DialogsContainer)}/>

                                <Route path='/profile/:userId?'
                                       render={withSuspense(ProfileContainer)}/>

                                <Route path='/news' render={() => <News/>}/>

                                <Route path='/music' render={() => <Music/>}/>

                                <Route path='/settings' render={() => <Settings/>}/>

                                <Route path='/users' render={() => <UsersContainer/>}/>

                                <Route path='/login' render={() => <LoginPage/>}/>

                                <Route path='*' render={() => <div>404 NOT FOUND</div>}/>
                            </Switch>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

let mapStateToProps = (state) => ({
    initialized: state.app.initialized
})

export let AppContainer = compose(
    withRouter,
    connect(mapStateToProps, {authMe: initializeApp})
)(App)

export const SamuraiJSApp = (props) => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <AppContainer/>
            </Provider>
        </BrowserRouter>
    )
}

/*export const SamuraiJSApp = (props) =>{
    return <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <AppContainer />
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
}*/



