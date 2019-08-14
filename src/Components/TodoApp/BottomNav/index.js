import React, { Component } from "react";
import { BottomNavigation } from "react-native-material-ui";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { observer } from "mobx-react";
import { filters } from "../../../constants";
@observer
class BottomNav extends Component {
  state = {
    active: this.props.store.filter
  };

  styles = StyleSheet.create({
    container: {
      flex: 1
    },
    add: {
      bottom: 70
    },
    bottomNav: {
      position: "absolute",
      bottom: 0,
      width: Dimensions.get("window").width,
      backgroundColor: "yellow"
    }
  });

  render() {
    const { setFilter } = this.props.store;
    return (
      <View style={this.styles.bottomNav}>
        <BottomNavigation active={this.state.active} hidden={false}>
          <BottomNavigation.Action
            key={filters.all}
            icon="list"
            label="all"
            onPress={() => {
              this.setState({ active: filters.all });
              setFilter(filters.all);
            }}
          />
          <BottomNavigation.Action
            key={filters.active}
            icon="lock-open"
            label="Active"
            onPress={() => {
              this.setState({ active: filters.active });
              setFilter(filters.active);
            }}
          />
          <BottomNavigation.Action
            key={filters.completed}
            icon="check-circle"
            label="Completed"
            onPress={() => {
              this.setState({ active: filters.completed });
              setFilter(filters.completed);
            }}
          />
        </BottomNavigation>
      </View>
    );
  }
}

export default BottomNav;
