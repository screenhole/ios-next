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
  FlatList
} from "react-native";
import { LinearGradient } from "expo";
import TimeAgo from "react-native-timeago";

import api from "../../utils/api";
import colors from "../../constants/Colors";

import Avatar from "../../components/Avatar";
import BigButton from "../../components/BigButton";
import Grab from "../../components/Grab";

import LoginScreen from "../Login/LoginScreen";

export default class GrabScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: `@${navigation.getParam("username", "mrhole")}’s grab`,
    headerStyle: {
      backgroundColor: "#111",
      borderBottomColor: "rgba(255,255,255,.1)"
    },
    headerTintColor: colors.tintColor,
    headerTitleStyle: {
      color: "white"
    }
    // headerRight: (
    //   <Button
    //     onPress={() => alert("This is a button!")}
    //     title="Share"
    //     color={colors.tintColor}
    //   />
    // )
  });

  constructor() {
    super();

    this.state = {
      username: "",
      password: "",
      loggedIn: false,
      loading: true,
      grab: false
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

      // Load grab
      const grab_id = this.props.navigation.getParam("grab_id", null);
      let res = await api.get(`/grabs/${grab_id}`);

      console.log(res);

      if (res.ok) {
        this.setState({
          grab: res.data.grab,
          loading: false
        });
      }
    } catch (e) {
      this.setState({
        loggedIn: false
      });
    }
  };

  render() {
    const { navigation } = this.props;
    return (
      <Layout>
        <ScrollView>
          {this.state.loading && (
            <Grab
              id={navigation.getParam("grab_id", null)}
              image={navigation.getParam("image", null)}
              username={navigation.getParam("username", null)}
              gravatar_hash={navigation.getParam("gravatar_hash", null)}
              created_at={navigation.getParam("created_at", null)}
              description={navigation.getParam("description", null)}
              fromDetails
            />
          )}
          {!this.state.loading && (
            <Grab
              id={this.state.grab.id}
              image={this.state.grab.image_public_url}
              username={this.state.grab.user.username}
              gravatar_hash={this.state.grab.user.gravatar_hash}
              created_at={this.state.grab.created_at}
              navigation={this.props.navigation}
              description={this.state.grab.description}
              fromDetails
            />
          )}
          {!this.state.loading && this.state.grab.memos && (
            <FlatList
              data={this.state.grab.memos.reverse()}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <ChatMessage>
                  <AvatarBlock>
                    <Avatar gravatar_hash={item.user.gravatar_hash} size={36} />
                  </AvatarBlock>
                  <MessageBlock>
                    <MessageAuthor>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center"
                        }}
                      >
                        <UsernameLink>
                          <Username>{item.user.username}</Username>
                        </UsernameLink>
                      </View>
                      <TimeAgo
                        time={item.created_at}
                        style={{
                          color: "#444",
                          fontSize: 13
                        }}
                      />
                    </MessageAuthor>
                    <Message>{item.message}</Message>
                  </MessageBlock>
                </ChatMessage>
              )}
            />
          )}
        </ScrollView>
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
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Chomment = styled.View`
  padding: 0 16px;
  margin-bottom: 16px;
`;

const ChatMessage = styled.View`
  padding: 16px 16px 0;
  flex-direction: row;
  width: 100%;
`;

const AvatarBlock = styled.View`
  width: 44px;
`;

const MessageBlock = styled.View`
  flex-direction: column;
  flex: 1;
`;

const MessageAuthor = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const UsernameLink = styled.TouchableOpacity`
  border-radius: 20px;
`;

const Username = styled.Text`
  color: white;
  font-weight: 700;
  font-size: 16px;
`;

const Message = styled.Text`
  color: #6c6f93;
  font-size: 16px;
  line-height: 22px;
  margin-top: 6px;
`;
