import React, {Suspense} from 'react';


function withSuspense<WCP>(WrappedComponent: React.ComponentType<WCP>)  {
    return (props: WCP) => {
        return <Suspense fallback={<div>Loading...</div>}>
                <WrappedComponent {...props}/>
            </Suspense>
    }
}

export default withSuspense;

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
