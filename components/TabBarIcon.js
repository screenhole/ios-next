import React from "react";
import { View, Platform } from "react-native";

import Colors from "../constants/Colors";

import AddIcon from "./icons/AddIcon";
import ChatIcon from "./icons/ChatIcon";
import HamburgerIcon from "./icons/HamburgerIcon";
import HomeIcon from "./icons/HomeIcon";
import SettingsIcon from "./icons/SettingsIcon";
import SupIcon from "./icons/SupIcon";

export default class TabBarIcon extends React.Component {
  render() {
    return (
      <View
        style={{
          marginTop: Platform.OS === 'ios' ? 20 : 0
        }}
      >
        {this._renderIcon()}
      </View>
    );
  }

  _renderIcon = () => {
    switch (this.props.name) {
      case "add":
        return (
          <AddIcon
            color={
              this.props.focused
                ? Colors.tabIconSelected
                : Colors.tabIconDefault
            }
          />
        );
        break;

      case "home":
        return (
          <HomeIcon
            color={
              this.props.focused
                ? Colors.tabIconSelected
                : Colors.tabIconDefault
            }
          />
        );
        break;

      case "chat":
        return (
          <ChatIcon
            color={
              this.props.focused
                ? Colors.tabIconSelected
                : Colors.tabIconDefault
            }
          />
        );
        break;

      case "settings":
        return (
          <SettingsIcon
            color={
              this.props.focused
                ? Colors.tabIconSelected
                : Colors.tabIconDefault
            }
          />
        );
        break;

      case "hamburger":
        return (
          <HamburgerIcon
            color={
              this.props.focused
                ? Colors.tabIconSelected
                : Colors.tabIconDefault
            }
          />
        );
        break;

      case "sup":
        return (
          <SupIcon
            color={
              this.props.focused
                ? Colors.tabIconSelected
                : Colors.tabIconDefault
            }
          />
        );
        break;

      default:
        return (
          <AddIcon
            color={
              this.props.focused
                ? Colors.tabIconSelected
                : Colors.tabIconDefault
            }
          />
        );
    }
  };
}
