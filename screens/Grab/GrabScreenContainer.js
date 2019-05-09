import React from "react";
import colors from "../../constants/Colors";

import GrabScreen from "./GrabScreen";

export default class GrabScreenContainer extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: `@${navigation.getParam("username", "mrhole")}’s grab`,
    headerStyle: {
      backgroundColor: "#111",
      borderBottomColor: "rgba(255,255,255,.1)"
    },
    headerTintColor: colors.tintColor,
    headerTitleStyle: {
      color: "white"
    }
    // headerRight: (
    //   <Button
    //     onPress={() => alert("This is a button!")}
    //     title="Share"
    //     color={colors.tintColor}
    //   />
    // )
  });

  render() {
    return <GrabScreen {...this.props} />;
  }
}
