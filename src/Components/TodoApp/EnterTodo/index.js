import React, { Component } from "react";
import {
  Modal,
  TextInput,
  Text,
  TouchableHighlight,
  View,
  Alert
} from "react-native";
import { observer } from "mobx-react";
import { translate } from "../../../Utils/TranslateHelpers";

@observer
class EnterTodo extends Component {
  state = {
    text: ""
  };

  handleSubmit = () => {
    if (this.state.text.trim() !== "") {
      this.props.add(this.state.text);
    }
    this.props.show();
  };

  render() {
    return (
      <TextInput
        style={{ height: 40, borderColor: "gray", borderWidth: 1, padding: 5 }}
        onChangeText={text => this.setState({ text })}
        placeholder={translate("enterTodoText")}
        value={this.state.text}
        onSubmitEditing={this.handleSubmit}
      />
    );
  }
}

export default EnterTodo;
