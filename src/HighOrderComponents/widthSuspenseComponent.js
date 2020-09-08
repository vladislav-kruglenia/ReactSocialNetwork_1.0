import React, {Suspense} from 'react';


const withSuspense = (Component) => {
    return (props) => {
        return (
            <Suspense fallback={<div>Loading...</div>}>
                <Component {...props}/>
            </Suspense>
        );
    }
}

export default withSuspense

/*
class RedirectComponent extends React.Component{
    render() {
        if(!this.props.isAuth) return <Redirect to={'/login'} />
        return <Component {...this.props}/>
    }
}*/
/*
let RedirectComponent = (props) =>{
    if(!props.isAuth) return <Redirect to={'/login'} />
    return <Component {...props}/>
}*/
