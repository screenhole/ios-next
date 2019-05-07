import React from "react";

import HomeScreen from "./HomeScreen";

export default class HomeScreenContainer extends React.Component {
  static navigationOptions = {
    title: "Screenhole",
    headerStyle: {
      backgroundColor: "#111",
      borderBottomColor: "rgba(255,255,255,.1)"
    },
    headerTintColor: "white"
  };

  render() {
    return <HomeScreen {...this.props} />;
  }
}
