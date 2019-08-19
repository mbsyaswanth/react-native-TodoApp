import React, { Component } from "react";
import { setI18nConfig } from "./src/Utils/TranslateHelpers";
import TodoApp from "./src/Components/TodoApp";
import { Router, Scene, Action } from "react-native-router-flux";
import Login from "./src/Components/Login";
import LoginStore from "./src/stores/AuthStore";
import SplashScreen from "./src/Components/SplashScreen";
import { View } from "react-native";

const store = new LoginStore();

export default class App extends Component {
  constructor(props) {
    super(props);
    setI18nConfig("en"); // set initial config
  }

  componentDidMount() {
    this.forceUpdate();
  }

  componentWillUnmount() {
    this.forceUpdate();
  }

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
