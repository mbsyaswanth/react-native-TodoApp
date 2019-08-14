import React, { Component } from "react";
import TodoApp from "./src/Components/TodoApp";
import { Router, Scene, Action } from "react-native-router-flux";
import Login from "./src/Components/Login";
import LoginStore from "./src/stores/AuthStore";
import SplashScreen from "./src/Components/SplashScreen";
import * as RNLocalize from "react-native-localize";
import i18n from "i18n-js";
import memoize from "lodash.memoize";

const store = new LoginStore();

export default class App extends Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene
            key="splashscreen"
            component={SplashScreen}
            initial
            hideNavBar
          />
          <Scene
            key="login"
            title="Login"
            login={store.login}
            component={Login}
          />
          <Scene key="home" component={TodoApp} hideNavBar />
        </Scene>
      </Router>
    );
  }
}
