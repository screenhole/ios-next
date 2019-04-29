import React from "react";
import {
  ScrollView,
  Text,
  TextInput,
  View,
  TouchableOpacity
} from "react-native";
import colors from "../constants/Colors";
import { WebBrowser, LinearGradient } from "expo";
import styled from "styled-components/native";

import BigButton from "../components/BigButton";

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    title: "Log in",
    headerStyle: {
      backgroundColor: "#111",
      borderBottomColor: "rgba(255,255,255,.1)"
    },
    headerTintColor: "white"
  };

  constructor() {
    super();

    this.state = {
      username: "",
      password: ""
    };
  }

  render() {
    return (
      <Layout>
        <ScrollView>
          <Header>Log in</Header>
          <InputGroup>
            <Field
              placeholder="username"
              onChangeText={username => this.setState({ username })}
              placeholderTextColor="#666"
              autoCapitalize="none"
              autoCorrect={false}
              autoFocus
              keyboardAppearance="dark"
              returnKeyType="next"
              textContentType="username"
            />
            <Field
              placeholder="password"
              onChangeText={password => this.setState({ password })}
              placeholderTextColor="#666"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardAppearance="dark"
              returnKeyType="go"
              secureTextEntry={true}
              textContentType="password"
            />
            <BigButton
              label="Let me in"
              haptic={true}
              onPressAction={this.authenticate}
            />
          </InputGroup>
        </ScrollView>
      </Layout>
    );
  }

  authenticate = () => {};
}

const Layout = styled.View`
  background-color: #000;
  padding: 32px;
  padding-top: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Header = styled.Text`
  color: white;
  font-size: 40px;
  margin-top: 32px;
  margin-bottom: 12px;
`;

const InputGroup = styled.View``;

const Field = styled.TextInput`
  color: white;
  background-color: #222;
  padding: 16px 12px;
  border-radius: 8px;
  width: 100%;
  font-size: 18px;
  margin: 6px 0;
`;
