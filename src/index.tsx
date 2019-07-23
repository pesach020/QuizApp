import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import './index.scss';
import App from './pages/App/App';
import * as serviceWorker from './serviceWorker';
import configureStore from './store/configureStore';
import {createMuiTheme} from '@material-ui/core';
import {ThemeProvider} from '@material-ui/styles';
import { BrowserRouter as Router} from 'react-router-dom';

const store = configureStore();

if(window.location.hostname.indexOf('localhost') > -1) {
    // @ts-ignore
    window['store'] = store;
}

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#673ab7'
        },
    },
    overrides: {
        MuiButton: {
            root: {
                borderRadius: '8px', // Some CSS
            },
        },
    },
});

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <Router>
                <App />
            </Router>
        </ThemeProvider>
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
