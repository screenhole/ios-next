import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import LinksScreen from "../screens/LinksScreen";
import SettingsScreen from "../screens/SettingsScreen";
import LoginScreen from "../screens/LoginScreen";

const HomeStack = createStackNavigator({
  Home: HomeScreen
});

HomeStack.navigationOptions = {
  showLabel: false,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? `ios-home` : "md-home"}
    />
  )
};

const LinksStack = createStackNavigator({
  Links: LinksScreen
});

LinksStack.navigationOptions = {
  showLabel: false,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-chatbubbles" : "md-chatbubbles"}
    />
  )
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen
});

SettingsStack.navigationOptions = {
  showLabel: false,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-notifications" : "md-notifications"}
    />
  )
};

const LoginStack = createStackNavigator({
  Login: LoginScreen
});

LoginStack.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-unlock" : "md-unlock"}
    />
  )
};

export default createBottomTabNavigator(
  {
    LoginStack,
    HomeStack,
    LinksStack,
    SettingsStack
  },
  {
    tabBarOptions: {
      showLabel: false,
      showIcon: true,
      style: {
        backgroundColor: "#222",
        borderTopColor: "rgba(255,255,255,.1)"
      }
    }
  }
);
