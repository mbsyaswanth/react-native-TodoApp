import React, { Component } from "react";
import { BottomNavigation } from "react-native-material-ui";
import { observer } from "mobx-react";
import { filters } from "../../../constants";
import { translate } from "../../../Utils/TranslateHelpers";
import {Container} from "./styledComponents";

@observer
class BottomNav extends Component {
  state = {
    active: this.props.store.filter
  };

  

  render() {
    const { setFilter } = this.props.store;
    return (
      <Container>
        <BottomNavigation active={this.state.active} hidden={false}>
          <BottomNavigation.Action
            key={filters.all}
            icon="list"
            label={translate("all")}
            onPress={() => {
              this.setState({ active: filters.all });
              setFilter(filters.all);
            }}
          />
          <BottomNavigation.Action
            key={filters.active}
            icon="lock-open"
            label={translate("active")}
            onPress={() => {
              this.setState({ active: filters.active });
              setFilter(filters.active);
            }}
          />
          <BottomNavigation.Action
            key={filters.completed}
            icon="check-circle"
            label={translate("completed")}
            onPress={() => {
              this.setState({ active: filters.completed });
              setFilter(filters.completed);
            }}
          />
        </BottomNavigation>
      </Container>
    );
  }
}

export default BottomNav;
