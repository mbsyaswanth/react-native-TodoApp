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
import { translate } from "../../../Utils/TranslateHelpers";
import {
  Item,
  TodoText,
  Input,
  CheckContainer,
  TextContainer
} from "./styledComponents";

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
    delete: {
      padding: 5
    }
  });

  onCheck = () => {
    this.props.todo.toggleCompleted();
  };

  delete = () => {
    // alert("delete?");
    console.log("in alert");
    Alert.alert(
      translate("warning"),
      translate("warningText"),
      [
        {
          text: translate("cancel"),
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: translate("delete"),
          onPress: () => this.props.delete(this.props.todo)
        }
      ],
      { cancelable: false }
    );
  };

  render() {
    const { description, id, isCompleted } = this.props.todo;

    return (
      <>
        {!this.isEditing ? (
          <Item>
            <CheckContainer>
              <Checkbox
                onLongPress={this.handleLongPress}
                label=""
                value={id}
                checked={isCompleted}
                onCheck={this.onCheck}
              />
            </CheckContainer>
            <TextContainer onLongPress={this.handleLongPress}>
              <TodoText todo={this.props.todo}>{description}</TodoText>
            </TextContainer>

            <IconToggle
              style={this.styles.delete}
              onPress={this.delete}
              name="delete"
            />
          </Item>
        ) : (
          <Input
            onChangeText={this.handleEdit}
            placeholder={translate("enterTodoText")}
            value={this.input}
            onSubmitEditing={this.submitEdit}
          />
        )}
      </>
    );
  }
}

export default TodoItem;
