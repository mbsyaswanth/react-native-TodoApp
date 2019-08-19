import React, { Component } from "react";
import { setI18nConfig, translate } from "./src/Utils/TranslateHelpers";
import TodoApp from "./src/Components/TodoApp";
import { Router, Scene, Action } from "react-native-router-flux";
import Login from "./src/Components/Login";
import LoginStore from "./src/stores/AuthStore";
import SplashScreen from "./src/Components/SplashScreen";
import TodoStore from "./src/stores/TodoStore";
import { create } from "mobx-persist";
import { AsyncStorage } from "react-native";

const hydrate = create({
  storage: AsyncStorage,
  jsonify: true
});
const loginStore = new LoginStore();
const todoStore = new TodoStore();

hydrate("todoStore", todoStore).then(() =>
  todoStore.setLanguage(todoStore.language)
);

export default class App extends Component {
  constructor(props) {
    super(props);
    todoStore.setLanguage(todoStore.language);
  }

  render() {
    return (
      <Router>
        <Scene key="root" hideNavBar>
          <Scene key="splashscreen" component={SplashScreen} initial />
          <Scene
            key="login"
            title={translate("login")}
            login={loginStore.login}
            component={Login}
          />
          <Scene key="home" store={todoStore} component={TodoApp} hideNavBar />
        </Scene>
      </Router>
    );
  }
}
