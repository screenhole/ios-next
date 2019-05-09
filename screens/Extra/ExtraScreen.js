import React from "react";
import { View, Button, Linking, AsyncStorage } from "react-native";
import styled from "styled-components/native";

import colors from "../../constants/Colors";
import Store from "../../store/store";

import BigButton from "../../components/BigButton";

class ExtraScreen extends React.Component {
  render() {
    return (
      <Wrapper>
        <More>
          🚧️ Work in progress 🚧️
          {"\n"}
          {"\n"}
          Where is grab upload?
          {"\n"}
          Slightly delayed for technical reasons.
          {"\n"}
          {"\n"}
          Thanks for testing!
        </More>
        <Buttons>
          <Button title="Log out" onPress={this._clearAsyncStorage} />
          <View
            style={{
              marginBottom: 32
            }}
          />
          <Button
            title="Send feedback over email"
            onPress={() => {
              Linking.openURL("mailto:wojtek@thinko.com");
            }}
          />
          <View
            style={{
              marginBottom: 64
            }}
          />
          <Button
            title="Sign up"
            onPress={() => {
              alert("Coming soon! Please sign up on screenhole.net for now.");
            }}
          />
          <View
            style={{
              marginBottom: 32
            }}
          />

          <Button
            title="Log in"
            onPress={() => {
              this.props.navigation.navigate("Login");
            }}
          />
        </Buttons>
      </Wrapper>
    );
  }

  _clearAsyncStorage = async () => {
    await AsyncStorage.clear();
    this.props.store.set("loggedIn")(false);
    this.props.navigation.navigate("Home");
  };
}

export default Store.withStore(ExtraScreen);

const Wrapper = styled.View`
  background-color: black;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const More = styled.Text`
  color: #666;
  font-size: 14px;
  height: 30%;
  padding: 32px;
  text-align: center;
`;

const Buttons = styled.View`
  flex: 1;
  height: 70%;
  justify-content: center;
  align-items: center;
`;
