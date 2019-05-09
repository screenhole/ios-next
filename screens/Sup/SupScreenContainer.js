import React from "react";

import SupScreen from "./SupScreen";

export default class SupScreenContainer extends React.Component {
  static navigationOptions = {
    title: "Sup",
    headerStyle: {
      backgroundColor: "#111",
      borderBottomColor: "rgba(255,255,255,.1)"
    },
    headerTintColor: "white"
  };

  render() {
    return <SupScreen {...this.props} />;
  }
}
