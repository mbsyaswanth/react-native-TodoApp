import React, { Component } from "react";
import BottomNav from "./BottomNav";
import { ActionButton } from "react-native-material-ui";
import { StyleSheet, Button, AsyncStorage, Picker } from "react-native";
import { observer } from "mobx-react";
import ItemContainer from "./ItemContainer";
import { observable } from "mobx";
import EnterTodo from "./EnterTodo";
import { Actions, ActionConst } from "react-native-router-flux";
import { translate } from "../../Utils/TranslateHelpers";
import { Container, Header, HeaderText } from "./styledComponents";

@observer
class TodoApp extends Component {
  store = this.props.store;

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
      <Container key={Date.now()}>
        <Header>
          <HeaderText>{translate("awetodo")}</HeaderText>
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
        </Header>

        {this.addtodo ? (
          <EnterTodo add={this.store.addTodo} show={this.handleAdd} />
        ) : (
          <ItemContainer store={this.store} />
        )}

        <ActionButton
          onPress={this.handleAdd}
          style={{
            positionContainer: {
              bottom: 60
            }
          }}
        />
        <BottomNav store={this.store} />
      </Container>
    );
  }
}

export default TodoApp;
