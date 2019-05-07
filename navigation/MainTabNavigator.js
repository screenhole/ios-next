import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";

import HomeScreenContainer from "../screens/Home/HomeScreenContainer";
import ChatScreen from "../screens/Chat/ChatScreen";
import UploadScreen from "../screens/Upload/UploadScreen";
import SupScreen from "../screens/Sup/SupScreen";
import ExtraScreen from "../screens/Extra/ExtraScreen";
import LoginScreen from "../screens/Login/LoginScreen";
import GrabScreen from "../screens/Grab/GrabScreen";

const HomeStack = createStackNavigator({
  Home: HomeScreenContainer,
  Grab: {
    screen: GrabScreen,
    path: "grab/:id"
  }
});

const ChatStack = createStackNavigator({
  Chat: ChatScreen
});

const UploadStack = createStackNavigator({
  Upload: UploadScreen
});

const SupStack = createStackNavigator({
  Sup: SupScreen
});

const ExtraStack = createStackNavigator({
  Extra: ExtraScreen,
  Login: LoginScreen
});

HomeStack.navigationOptions = {
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="home" />
};

ChatStack.navigationOptions = {
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="chat" />
};

UploadStack.navigationOptions = {
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="add" />
};

SupStack.navigationOptions = {
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="sup" />
};

ExtraStack.navigationOptions = {
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="hamburger" />
};

export default createBottomTabNavigator(
  {
    HomeStack,
    ChatStack,
    UploadStack,
    SupStack,
    ExtraStack
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
