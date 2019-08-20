import React, { Component } from "react";
import { observer } from "mobx-react";
import { translate } from "../../../Utils/TranslateHelpers";
import { Input } from "./styledComponents";
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
      <Input
        onChangeText={text => this.setState({ text })}
        placeholder={translate("enterTodoText")}
        value={this.state.text}
        onSubmitEditing={this.handleSubmit}
      />
    );
  }
}

export default EnterTodo;
