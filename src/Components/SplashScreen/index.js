import React, { Component } from "react";
import { Text, View, AsyncStorage } from "react-native";
import { Actions, ActionConst } from "react-native-router-flux";
import { translate } from "../../Utils/TranslateHelpers";
import { Container, Logo } from "./styledComponents";
class SplashScreen extends Component {
  componentDidMount() {
    setTimeout(async () => {
      try {
        const login = await AsyncStorage.getItem("isLogin");
        if (login === "true") {
          Actions.home({ type: ActionConst.REPLACE });
          console.log("retrived islogin", login);
        } else {
          Actions.login({ type: ActionConst.REPLACE });
        }
      } catch (e) {
        console.log("error retriving async value", e);
      }
    }, 1500);
  }

  render() {
    return (
      <Container>
        <Logo> {translate("awetodo")} </Logo>
      </Container>
    );
  }
}

export default SplashScreen;
