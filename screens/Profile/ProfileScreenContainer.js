import React from "react";

import colors from "../../constants/Colors";

import ProfileScreen from "./ProfileScreen";

export default class ProfileScreenContainer extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    // title: `@${navigation.getParam("username", "mrhole")}`,
    title: "Profile",
    headerStyle: {
      backgroundColor: "#111",
      borderBottomColor: "rgba(255,255,255,.1)"
    },
    headerTintColor: colors.tintColor,
    headerTitleStyle: {
      color: "white"
    }
  });

  render() {
    return <ProfileScreen {...this.props} />;
  }
}
