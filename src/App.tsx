import withSuspense from "./HighOrderComponents/widthSuspense/widthSuspenseComponent";
import React, {FC} from 'react';
import './App.css';
import {BrowserRouter, Redirect,/*BrowserRouter*/ Route, Switch, withRouter} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import HeaderContainer from "./components/Header/HeaderContainer";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/appReducer";
import Preloader from "./components/common/Preloader/Preloader";
import store, {AppStateType} from "./redux/storeRedux";
import {AppPropsTypes, mapDispatchPropsTypes, mapStatePropsTypes, OwnPropsType} from "./AppTypes";
import {UsersPage} from "./components/Users/UsersPage";
import {LoginPage} from "./components/LoginPage/LoginPage";

const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"));
const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));

const SuspendedProfile = withSuspense(ProfileContainer);
const SuspendedDialogs = withSuspense(DialogsContainer);


class App extends React.Component<AppPropsTypes> {
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
                                       render={() => <SuspendedDialogs/>}/>

                                <Route path='/profile/:userId?'
                                       render={() => <SuspendedProfile/>}/>

                                <Route path='/news' render={() => <News/>}/>

                                <Route path='/music' render={() => <Music/>}/>

                                <Route path='/settings' render={() => <Settings/>}/>

                                <Route path='/users' render={() => <UsersPage pageName={"Самураи"}/>}/>

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

let mapStateToProps = (state: AppStateType):mapStatePropsTypes => ({
    initialized: state.app.initialized
});

export let AppContainer = compose<React.ComponentType>(
    withRouter,
    connect<mapStatePropsTypes,
        mapDispatchPropsTypes,
        OwnPropsType,
        AppStateType>(mapStateToProps, {authMe: initializeApp})
)(App);

export const SamuraiJSApp: FC = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <AppContainer/>
            </Provider>
        </BrowserRouter>
    )
};

/*export const SamuraiJSApp = (props) =>{
    return <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <AppContainer />
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
}*/



