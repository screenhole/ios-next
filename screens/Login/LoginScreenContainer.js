import React from "react";

import colors from "../../constants/Colors";
import LoginScreen from "./LoginScreen";

export default class LoginScreenContainer extends React.Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: "black",
      borderBottomColor: "black"
    },
    headerTintColor: colors.tintColor
  };

  render() {
    return <LoginScreen {...this.props} />;
  }
}
