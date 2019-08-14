import React, { Component } from "react";
import {
  I18nManager,
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  Alert,
  ActivityIndicator,
  AsyncStorage
} from "react-native";
import { observer } from "mobx-react";
import { observable, action } from "mobx";
import { Actions, ActionConst } from "react-native-router-flux";
import * as RNLocalize from "react-native-localize";
import i18n from "i18n-js";
import memoize from "lodash.memoize";

const translationGetters = {
  // lazy requires (metro bundler does not support symlinks)
  en: () => require("../../translations/en.json"),
  tel: () => require("../../translations/tel.json")
};

const translate = memoize(
  (key, config) => i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key)
);

const setI18nConfig = () => {
  // fallback if no available language fits
  const fallback = { languageTag: "tel", isRTL: false };

  const { languageTag, isRTL } =
    RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
    fallback;

  // clear translation cache
  translate.cache.clear();
  // update layout direction
  I18nManager.forceRTL(isRTL);
  // set i18n-js config
  i18n.translations = { tel: translationGetters["tel"]() };
  i18n.locale = "tel";
};

@observer
class Login extends Component {
  constructor(props) {
    super(props);
    setI18nConfig(); // set initial config
  }

  componentDidMount() {
    RNLocalize.addEventListener("change", this.handleLocalizationChange);
  }

  componentWillUnmount() {
    RNLocalize.removeEventListener("change", this.handleLocalizationChange);
  }

  handleLocalizationChange = () => {
    setI18nConfig();
    this.forceUpdate();
  };

  styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#ecf0f1"
    },
    input: {
      width: 200,
      height: 44,
      padding: 10,
      borderWidth: 1,
      borderColor: "black",
      marginBottom: 10
    }
  });

  @observable username = "";
  @observable password = "";
  @observable isLoading = false;

  onLogin = async () => {
    console.log("pressed login");
    this.isLoading = true;
    const isValid = await this.props.login(this.username, this.password);
    this.isLoading = false;
    if (isValid) {
      this.storeData();
      Actions.home({ type: ActionConst.REPLACE });
    } else {
      Alert.alert(
        "Error",
        "Please enter valid details",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      );
    }
  };

  storeData = async () => {
    try {
      await AsyncStorage.setItem("isLogin", "true");
      console.log("set isLogin ");
    } catch (e) {
      console.log("error found :", e);
    }
  };

  // verifyIfAlreadyLogin = async () => {
  //   try {
  //     const login = await AsyncStorage.getItem("isLogin");
  //     if (login === "true") {
  //       Actions.home();
  //       console.log("retrived islogin", login);
  //     }
  //   } catch (e) {
  //     console.log("error retriving async value", e);
  //   }
  // };

  render() {
    return (
      <View style={this.styles.container}>
        <Text>Username</Text>
        <TextInput
          value={this.username}
          style={this.styles.input}
          onChangeText={username => (this.username = username)}
          placeholder={"Username"}
        />
        <Text>Password</Text>
        <TextInput
          value={this.password}
          style={this.styles.input}
          placeholder={"Password"}
          secureTextEntry={true}
          onChangeText={password => (this.password = password)}
        />
        <Button title={translate("login")} onPress={this.onLogin} />
        {this.isLoading && <ActivityIndicator size="large" color="#0003ff" />}
      </View>
    );
  }
}

export default Login;
