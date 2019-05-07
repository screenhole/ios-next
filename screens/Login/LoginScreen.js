import React from "react";
import styled from "styled-components/native";
import {
  ScrollView,
  Text,
  TextInput,
  View,
  Button,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import { LinearGradient } from "expo";

import api from "../../utils/api";
import colors from "../../constants/Colors";

import BigButton from "../../components/BigButton";

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: "black",
      borderBottomColor: "black"
    },
    headerTintColor: colors.tintColor
  };

  constructor() {
    super();

    this.state = {
      username: "",
      password: "",
      loggedIn: false
    };
  }

  componentDidMount = async () => {
    try {
      let token = await AsyncStorage.getItem("default_auth_token");

      if (token) {
        this.setState({
          loggedIn: true
        });
      }
    } catch (e) {
      this.setState({
        loggedIn: false
      });
    }
  };

  render() {
    return (
      <Layout>
        {this.state.loggedIn ? (
          <View>
            <Header>You’re logged in.</Header>
          </View>
        ) : (
          <View>
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
                selectionColor={colors.tintColor}
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
                selectionColor={colors.tintColor}
                onSubmitEditing={this.authenticate}
              />
              <BigButton
                label="Let me in"
                haptic={true}
                onPressAction={this.authenticate}
              />
            </InputGroup>
          </View>
        )}
        <View
          style={{
            marginTop: 80
          }}
        >
          <Button title="Clear AsyncStorage" onPress={this.clearAsyncStorage} />
        </View>
      </Layout>
    );
  }

  authenticate = async () => {
    const token = await api.post("/users/token", {
      auth: {
        username: this.state.username,
        password: this.state.password
      }
    });

    try {
      api.setAuthHeader(token.data.jwt);

      this.setState({
        loggedIn: true
      });

      this.props.navigation.navigate("Home");
    } catch (e) {
      console.error("Failed to log in.");
    }
  };

  clearAsyncStorage = async () => {
    AsyncStorage.clear();
  };
}

const Layout = styled.View`
  background-color: #000;
  padding: 32px;
  padding-top: 0;
  height: 100%;
  z-index: 2;
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
