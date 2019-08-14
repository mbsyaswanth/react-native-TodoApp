import React, { Component } from "react";
import TodoApp from "./src/Components/TodoApp";
import { Router, Scene, Action } from "react-native-router-flux";
import Login from "./src/Components/Login";
import LoginStore from "./src/stores/AuthStore";
import SplashScreen from "./src/Components/SplashScreen";

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
