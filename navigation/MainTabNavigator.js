import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";

import HomeScreenContainer from "../screens/Home/HomeScreenContainer";
import ChatScreenContainer from "../screens/Chat/ChatScreenContainer";
import UploadScreen from "../screens/Upload/UploadScreen";
import SupScreenContainer from "../screens/Sup/SupScreenContainer";
import ExtraScreenContainer from "../screens/Extra/ExtraScreenContainer";
import LoginScreenContainer from "../screens/Login/LoginScreenContainer";
import GrabScreenContainer from "../screens/Grab/GrabScreenContainer";
import ProfileScreenContainer from "../screens/Profile/ProfileScreenContainer";

const HomeStack = createStackNavigator({
  Home: HomeScreenContainer,
  Grab: {
    screen: GrabScreenContainer,
    path: "grab/:id"
  },
  Profile: {
    screen: ProfileScreenContainer,
    path: "user/:username"
  }
});

const ChatStack = createStackNavigator({
  Chat: ChatScreenContainer,
  Profile: {
    screen: ProfileScreenContainer,
    path: "user/:username"
  }
});

const UploadStack = createStackNavigator({
  Upload: UploadScreen
});

const SupStack = createStackNavigator({
  Sup: SupScreenContainer,
  Grab: {
    screen: GrabScreenContainer,
    path: "grab/:id"
  },
  Profile: {
    screen: ProfileScreenContainer,
    path: "user/:username"
  }
});

const ExtraStack = createStackNavigator({
  Extra: ExtraScreenContainer,
  Login: LoginScreenContainer
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
    // UploadStack,
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
