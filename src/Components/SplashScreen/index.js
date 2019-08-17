import React, { Component } from "react";
import { Text, View, AsyncStorage } from "react-native";
import { Actions, ActionConst } from "react-native-router-flux";
import { translate } from "../../Utils/TranslateHelpers";

class SplashScreen extends Component {
  styles = {
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor:
        "linear-gradient(45deg, rgb(140, 85, 250) 0%,rgb(200, 215, 253) 75%,rgb(143, 230, 243) 100%)"
    },
    logo: {
      fontSize: 45,
      fontWeight: "bold",
      color: "white"
    }
  };

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
      <View style={this.styles.container}>
        <Text style={this.styles.logo}> {translate("awetodo")} </Text>
      </View>
    );
  }
}

export default SplashScreen;
