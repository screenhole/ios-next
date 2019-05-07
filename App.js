import React from "react";
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  AsyncStorage,
  SafeAreaView
} from "react-native";
import { AppLoading, Asset, Icon } from "expo";
import styled from "styled-components/native";

import api from "./utils/api";
import Store from "./store/store";

import AppNavigator from "./navigation/AppNavigator";
// Help reduce memory and CPU usage with useScreens
import { useScreens } from "react-native-screens";
useScreens();

export default class App extends React.Component {
  state = {
    isLoadingComplete: false
  };

  componentDidMount = async () => {
    try {
      let token = await AsyncStorage.getItem("default_auth_token");

      if (token !== null) {
        api.setHeader("Authorization", `Bearer ${token}`);
      }
    } catch (e) {
      console.warn(e);
      console.log(
        "No Authorization token present in AsyncStorage. Please log in."
      );
    }
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === "ios" && <StatusBar barStyle="light-content" />}
          <Store.Container>
            <AppNavigator />
          </Store.Container>
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        // png
      ])
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    color: "#fff"
  }
});
