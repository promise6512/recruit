import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
import App from './App';
import Main from "./pages/main/main"
import Register from "./pages/register/register"
import Login from "./pages/login/login"
ReactDOM.render(
  <HashRouter>
    <Switch>
      <Route path="/register" component={Register}></Route>
      <Route path="/login" component={Login}></Route>
      <Route component={Main}></Route>
    </Switch>
  </HashRouter>,
  document.getElementById('root')
);
