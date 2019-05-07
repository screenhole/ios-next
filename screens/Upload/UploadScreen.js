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

import LoginScreen from "../Login/LoginScreen";

export default class UploadScreen extends React.Component {
  static navigationOptions = {
    title: "Post a Grab",
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
            <Header>Grab upload form</Header>
          </View>
        ) : (
          <Header>
            You need to log in. Probably redirect to login here. Or set logged
            in state with MobX and access here.
          </Header>
        )}
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
