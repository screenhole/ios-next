import React from "react";
import colors from "../../constants/Colors";

import ExtraScreen from "./ExtraScreen";

export default class ExtraScreenContainer extends React.Component {
  static navigationOptions = {
    title: "Menu",
    headerStyle: {
      backgroundColor: "#111",
      borderBottomColor: "rgba(255,255,255,.1)"
    },
    headerTintColor: colors.tintColor,
    headerTitleStyle: {
      color: "white"
    }
  };

  render() {
    return <ExtraScreen {...this.props} />;
  }
}
