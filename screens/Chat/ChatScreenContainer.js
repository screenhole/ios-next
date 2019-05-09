import React from "react";

import ChatScreen from "./ChatScreen";

export default class ChatScreenContainer extends React.Component {
  static navigationOptions = {
    title: "Chat",
    headerStyle: {
      backgroundColor: "#111",
      borderBottomColor: "rgba(255,255,255,.1)"
    },
    headerTintColor: "white"
  };

  render() {
    return <ChatScreen {...this.props} />;
  }
}
