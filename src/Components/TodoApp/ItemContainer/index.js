import React, { Component } from "react";
import { FlatList, Text } from "react-native";
import TodoItem from "../TodoItem";
import { observer } from "mobx-react";
import { translate } from "../../../Utils/TranslateHelpers";
import {HelpMsg} from "./styledComponents"

@observer
class ItemContainer extends Component {
  displayList = () => {
    const { filteredList, filter, removeTodo } = this.props.store;
    if (filteredList.length === 0) {
      if (filter === "ALL") {
        return (
          <HelpMsg>
            <Text>{translate("noall")}</Text>
          </HelpMsg>
        );
      }
      if (filter === "ACTIVE") {
        return (
          <HelpMsg>
            <Text>{translate("noactive")}</Text>
          </HelpMsg>
        );
      }
      if (filter === "COMPLETED") {
        return (
          <HelpMsg>
            <Text>{translate("nocompleted")}</Text>
          </HelpMsg>
        );
      }
    }
    return (
      <FlatList
        data={filteredList}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <TodoItem todo={item} delete={removeTodo} />}
      />
    );
  };

  render() {
    return this.displayList();
  }
}

export default ItemContainer;
