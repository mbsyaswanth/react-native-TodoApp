import React, { Component } from "react";
import BottomNav from "./BottomNav";
import { ActionButton } from "react-native-material-ui";
import { View, StyleSheet, Text, SafeAreaView, StatusBar } from "react-native";
import TodoItems from "./TodoItem";
import { observer } from "mobx-react";
import TodoStore from "../../stores/TodoStore";
import ItemContainer from "./ItemContainer";
import { observable } from "mobx";
import EnterTodo from "./EnterTodo";

@observer
class TodoApp extends Component {
  store = new TodoStore();
  styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingBottom: 50
    },
    add: {
      bottom: 60
    },
    headerText: {
      textAlign: "center",
      color: "white"
    },
    header: {
      backgroundColor: "blue",
      height: 40,
      color: "white",
      justifyContent: "center",
      marginTop: StatusBar.currentHeight
    }
  });

  @observable addtodo = false;

  handleAdd = () => {
    this.addtodo = !this.addtodo;
  };
  render() {
    return (
      <View style={this.styles.container}>
        <View style={this.styles.header}>
          <Text style={this.styles.headerText}>Todo App</Text>
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
