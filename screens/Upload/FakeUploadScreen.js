import React, { Fragment } from "react";
import styled from "styled-components/native";
import {
  Text,
  TextInput,
  ScrollView,
  View,
  Image,
  Button,
  TouchableOpacity,
  AsyncStorage,
  KeyboardAvoidingView,
  WebView
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ImagePicker, Permissions, FileSystem } from "expo";

import api from "../../utils/api";
import colors from "../../constants/Colors";
import Layout from "../../constants/Layout";

export default class FakeUploadScreen extends React.Component {
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
      loggedIn: false,
      loading: true,
      image: false,
      token: false,
      caption: "",
      progress: 0,
      uploading: false
    };
  }

  componentDidMount = async () => {
    try {
      let token = await AsyncStorage.getItem("default_auth_token");

      if (token !== null) {
        api.setHeader("Authorization", `Bearer ${token}`);

        this.setState({
          loggedIn: true,
          loading: false,
          token: token
        });
      }
    } catch (e) {
      this.setState({
        loggedIn: false,
        loading: false
      });

      console.warn(e);
      console.log(
        "No Authorization token present in AsyncStorage. Please log in."
      );
      alert("You need to log in to upload grabs.");
    }
  };

  render() {
    return (
      <Page>
        {!this.state.loading && this.state.loggedIn ? (
          <Fragment>
            <WebView
              originWhitelist={["*"]}
              source={{
                uri: `https://screenhole.com/cgi-bin/app/upload/${
                  this.state.token
                }`
              }}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              startInLoadingState={true}
            />
          </Fragment>
        ) : (
          <LoadingState>
            <Button
              title="Log in to post grabs"
              onPress={() => {
                this.props.navigation.navigate("Login");
              }}
            />
          </LoadingState>
        )}
      </Page>
    );
  }
}

const Page = styled.View`
  background-color: #000;
  padding-top: 0;
  flex: 1;
`;

const LoadingState = styled.View`
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 32px;
`;

const LoadingStateText = styled.Text`
  color: #666;
  font-size: 24px;
`;

const Uploader = styled.View`
  height: 100%;
  display: flex;
`;

const Subheader = styled.Text`
  color: #6c6f93;
  text-align: center;
  font-size: 16;
  line-height: 24;
  margin-bottom: 20px;
`;

const Caption = styled.View`
  border: 2px solid rgba(255, 255, 255, 0.15);
  border-radius: 30px;
  width: 100%;
  background-color: hsl(0, 0%, 3%);
`;

const CaptionField = styled.TextInput`
  color: white;
  padding: 16px;
  width: 100%;
  font-size: 18px;
  line-height: 24px;
  min-height: 80px;
`;

const ImageStage = styled.View`
  width: 100%;
  height: 300px;
  background-color: #111;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
