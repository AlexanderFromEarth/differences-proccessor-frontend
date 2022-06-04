import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './components';
import {Store, StoreContext} from './stores';
import './index.css';

ReactDOM
    .createRoot(document.getElementById('root') as HTMLElement)
    .render(
        <React.StrictMode>
            <StoreContext.Provider value={new Store()}>
                <App/>
            </StoreContext.Provider>
        </React.StrictMode>
    );
