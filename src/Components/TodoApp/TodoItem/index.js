import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Vibration,
  TextInput,
  Text
} from "react-native";
import { Checkbox, IconToggle, Icon } from "react-native-material-ui";
import { observer } from "mobx-react";
import { observable, action } from "mobx";
@observer
class TodoItem extends Component {
  @observable isEditing = false;
  @observable input = this.props.todo.description;

  @action.bound handleLongPress() {
    this.isEditing = true;
    Vibration.vibrate(10);
    console.log("long press detected");
  }

  submitEdit = () => {
    this.props.todo.editTodo(this.input);
    this.isEditing = false;
  };

  @action.bound handleEdit(text) {
    this.input = text;
  }

  styles = StyleSheet.create({
    item: {
      flexDirection: "row",
      alignItems: "center"
    },
    delete: {
      padding: 5
    },
    todotext: {
      textDecorationLine: this.props.todo.isCompleted ? "line-through" : "none"
    }
  });

  onCheck = () => {
    this.props.todo.toggleCompleted();
  };

  delete = () => {
    // alert("delete?");
    console.log("in alert");
    Alert.alert(
      "Warning!",
      "Do you really want to delete?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Delete", onPress: () => this.props.delete(this.props.todo) }
      ],
      { cancelable: false }
    );
  };

  render() {
    const { description, id, isCompleted } = this.props.todo;

    return (
      <>
        {!this.isEditing ? (
          <View style={this.styles.item}>
            <View style={{ width: 50 }}>
              <Checkbox
                onLongPress={this.handleLongPress}
                label=""
                value={id}
                checked={isCompleted}
                onCheck={this.onCheck}
              />
            </View>
            <TouchableOpacity
              onLongPress={this.handleLongPress}
              style={{ flex: 1 }}
            >
              <Text
                style={{
                  textDecorationLine: this.props.todo.isCompleted
                    ? "line-through"
                    : "none"
                }}
              >
                {description}
              </Text>
            </TouchableOpacity>

            <IconToggle
              style={this.styles.delete}
              onPress={this.delete}
              name="delete"
            />
          </View>
        ) : (
          <TextInput
            style={{
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              padding: 5
            }}
            onChangeText={this.handleEdit}
            placeholder="What needs to be done?"
            value={this.input}
            onSubmitEditing={this.submitEdit}
          />
        )}
      </>
    );
  }
}

export default TodoItem;
