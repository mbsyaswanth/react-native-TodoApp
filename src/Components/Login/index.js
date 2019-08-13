import React, { Component } from "react";
import {
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

@observer
class Login extends Component {
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

  verifyIfAlreadyLogin = async () => {
    try {
      const login = await AsyncStorage.getItem("isLogin");
      if (login === "true") {
        Actions.home();
        console.log("retrived islogin", login);
      }
    } catch (e) {
      console.log("error retriving async value", e);
    }
  };

  render() {
    this.verifyIfAlreadyLogin();
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
        <Button title={"Login"} onPress={this.onLogin} />
        {this.isLoading && <ActivityIndicator size="large" color="#0003ff" />}
      </View>
    );
  }
}

export default Login;
