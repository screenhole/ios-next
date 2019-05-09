import React from "react";
import styled from "styled-components/native";
import {
  ScrollView,
  Text,
  TextInput,
  View,
  Button,
  TouchableOpacity,
  AsyncStorage,
  Alert
} from "react-native";

import api from "../../utils/api";
import colors from "../../constants/Colors";
import Store from "../../store/store";

import BigButton from "../../components/BigButton";

class LoginScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      username: "",
      password: ""
    };
  }

  componentDidMount = async () => {
    let token = await AsyncStorage.getItem("default_auth_token");

    if (token !== null) {
      api.setAuthHeader(token);
      this.props.store.set("loggedIn")(true);
    } else {
      this.props.store.set("loggedIn")(false);
    }
  };

  render() {
    const store = this.props.store;

    return (
      <Layout>
        {store.get("loggedIn") ? (
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
      </Layout>
    );
  }

  authenticate = async () => {
    const store = this.props.store;

    let token = await api.post("/users/token", {
      auth: {
        username: this.state.username,
        password: this.state.password
      }
    });

    if (token.ok) {
      await AsyncStorage.setItem("default_auth_token", token.data.jwt);
      api.setAuthHeader(token.data.jwt);
      store.set("loggedIn")(true);
      // this.props.navigation.navigate("Home");
    } else {
      await AsyncStorage.removeItem("default_auth_token");
      store.set("loggedIn")(false);
      Alert.alert(
        "Hmm...",
        "Are you sure this is the right password?",
        [
          {
            text: "Dismiss",
            style: "cancel"
          }
        ],
        { cancelable: true }
      );
    }
  };
}

export default Store.withStore(LoginScreen);

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
