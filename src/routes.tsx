import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import SignIn from './pages/signIn';
import LoggedIn from './pages/loggedIn';

function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" component={SignIn} exact />
            <Route path="/loggedIn" component={LoggedIn} exact />
        </BrowserRouter>
    );
}

export default Routes;