import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {SamuraiJSApp} from './App';


ReactDOM.render(<SamuraiJSApp/>, document.getElementById('root'));



//ReactDOM.render(AppContainer, document.getElementById('root'));
/*let rerenderEntireTree = (state) =>{
    ReactDOM.render(
        <React.StrictMode>
            <BrowserRouter>
                <Provider store={store}>
                    <AppContainer state={state}
                         dispatch={store.dispatch.bind(store)}
                         store={store}/>
                </Provider>
            </BrowserRouter>
        </React.StrictMode>,
        document.getElementById('root')
    );
}

rerenderEntireTree(store.getState());

store.subscribe(() => {
    let state = store.getState()
    rerenderEntireTree(state)
});*/

//serviceWorker.unregister();
