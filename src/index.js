/*!

=========================================================
* Material Dashboard React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { ToastProvider} from 'react-toast-notifications';

// core components
import Admin from "layouts/Admin.js";
import RTL from "layouts/RTL.js";

import "assets/css/material-dashboard-react.css?v=1.8.0";
import SignUp from "./views/SignUp/SignUp";
import {store} from './store/store'
import { Provider } from "react-redux";
import  Login  from "views/Login/Login";

const hist = createBrowserHistory();


ReactDOM.render(
  <Provider store={store}>
    <ToastProvider>
  <Router history={hist}>
    <Switch>
      <Route path="/admin" component={Admin} />
      <Route path="/rtl" component={RTL} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={SignUp} />
      <Redirect from="/" to="login"/>
    </Switch>
  </Router>
  </ToastProvider>
  </Provider>,
  document.getElementById("root")
);
