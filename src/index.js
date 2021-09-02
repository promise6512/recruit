import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Main from "./pages/main/main"
import Register from "./pages/register/register"
import Login from "./pages/login/login"
import { Provider } from 'react-redux';
import store from './store'
//import './test/socketIO'
ReactDOM.render(
  <Provider store={store}>
  <HashRouter>
    <Switch>
      <Route path="/register" component={Register}></Route>
      <Route path="/login" component={Login}></Route>
      <Route component={Main}></Route>
    </Switch>
  </HashRouter>
  </Provider>,
  document.getElementById('root')
);
