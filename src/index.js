import React from 'react';
import registerServiceWorker from './registerServiceWorker';
import theme from './theme'
import {MuiThemeProvider} from '@material-ui/core'
import {store} from './store';
import {Provider} from 'react-redux';
import {ThemeProvider} from '@material-ui/styles'
import {SnackbarProvider} from 'notistack';
import App from './store/store'
import ReactDOM from 'react-dom'
import {Router} from 'react-router-dom'
import history from './history'

ReactDOM.render(
    //react-router-dom make history global
    <Router history={history}>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <MuiThemeProvider theme={theme}>
                    <SnackbarProvider maxSnack={3}>
                        <App/>
                    </SnackbarProvider>
                </MuiThemeProvider>
            </ThemeProvider>
        </Provider>
    </Router>
    , document.getElementById('root'));
registerServiceWorker();
