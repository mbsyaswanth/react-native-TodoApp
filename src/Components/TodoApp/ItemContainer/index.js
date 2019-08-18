import React, { Component } from "react";
import { View, FlatList, Text } from "react-native";
import TodoItem from "../TodoItem";
import { observer } from "mobx-react";
import { translate } from "../../../Utils/TranslateHelpers";

@observer
class ItemContainer extends Component {
  displayList = () => {
    const { filteredList, filter, removeTodo } = this.props.store;
    if (filteredList.length === 0) {
      if (filter === "ALL") {
        return (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              padding: 20,
              alignItems: "center"
            }}
          >
            <Text>{translate("noall")}</Text>
          </View>
        );
      }
      if (filter === "ACTIVE") {
        return (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              padding: 20,
              alignItems: "center"
            }}
          >
            <Text>{translate("noactive")}</Text>
          </View>
        );
      }
      if (filter === "COMPLETED") {
        return (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              padding: 20,
              alignItems: "center"
            }}
          >
            <Text>{translate("nocompleted")}</Text>
          </View>
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
    const { filteredList, removeTodo } = this.props.store;
    return this.displayList();
  }
}

export default ItemContainer;
