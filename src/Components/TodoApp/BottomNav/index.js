import React, { Component } from "react";
import { BottomNavigation } from "react-native-material-ui";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { observer } from "mobx-react";

@observer
class BottomNav extends Component {
  state = {
    active: "all"
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
            key="all"
            icon="list"
            label="all"
            onPress={() => {
              this.setState({ active: "all" });
              setFilter("ALL");
            }}
          />
          <BottomNavigation.Action
            key="active"
            icon="lock-open"
            label="Active"
            onPress={() => {
              this.setState({ active: "active" });
              setFilter("ACTIVE");
            }}
          />
          <BottomNavigation.Action
            key="completed"
            icon="check-circle"
            label="Completed"
            onPress={() => {
              this.setState({ active: "completed" });
              setFilter("COMPLETED");
            }}
          />
        </BottomNavigation>
      </View>
    );
  }
}

export default BottomNav;
