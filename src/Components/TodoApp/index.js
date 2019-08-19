import React, { Component } from "react";
import BottomNav from "./BottomNav";
import { ActionButton } from "react-native-material-ui";
import {
  View,
  StyleSheet,
  Text,
  Button,
  AsyncStorage,
  Picker
} from "react-native";
import { observer } from "mobx-react";
import TodoStore from "../../stores/TodoStore";
import ItemContainer from "./ItemContainer";
import { observable } from "mobx";
import EnterTodo from "./EnterTodo";
import { Actions, ActionConst } from "react-native-router-flux";
import { create, persist } from "mobx-persist";
import { translate } from "../../Utils/TranslateHelpers";

@observer
class TodoApp extends Component {
  store = this.props.store;
  styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingBottom: 50
    },
    add: {
      bottom: 60
    },
    headerText: {
      color: "white"
    },
    header: {
      backgroundColor: "blue",
      height: 40,
      color: "white",
      padding: 15,
      justifyContent: "space-between",
      flexDirection: "row",
      alignItems: "center"
    }
  });

  @observable addtodo = false;
  onPressLogout = () => {
    AsyncStorage.removeItem("isLogin");
    Actions.login({ type: ActionConst.REPLACE });
  };
  handleAdd = () => {
    this.addtodo = !this.addtodo;
  };
  render() {
    return (
      <View key={Date.now()} style={this.styles.container}>
        <View style={this.styles.header}>
          <Text style={this.styles.headerText}>{translate("awetodo")}</Text>
          <Picker
            selectedValue={this.store.language}
            style={{ height: 50, width: 100 }}
            onValueChange={(itemValue, itemIndex) => {
              this.store.setLanguage(itemValue);
            }}
          >
            <Picker.Item label="English" value="en" />
            <Picker.Item label="Telugu" value="tel" />
            <Picker.Item label="Hindi" value="hi" />
          </Picker>
          <Button
            onPress={this.onPressLogout}
            title={translate("logout")}
            color="#843584"
            accessibilityLabel="a button to logout"
          />
        </View>

        {this.addtodo ? (
          <EnterTodo add={this.store.addTodo} show={this.handleAdd} />
        ) : (
          <ItemContainer store={this.store} />
        )}

        <ActionButton
          onPress={this.handleAdd}
          style={{ positionContainer: this.styles.add }}
        />
        <BottomNav store={this.store} />
      </View>
    );
  }
}

export default TodoApp;
