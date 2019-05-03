import React from "react";
import styled from "styled-components/native";
import {
  ScrollView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  AsyncStorage,
  FlatList
} from "react-native";
import TimeAgo from "react-native-timeago";

import api from "../utils/api";
import cable from "../utils/cable";
import colors from "../constants/Colors";

import Avatar from "../components/Avatar";

export default class ChatScreen extends React.Component {
  static navigationOptions = {
    title: "Chat",
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
      message: "",
      chat_messages: []
    };
  }

  createSocket = () => {
    cable.subscriptions.create(
      {
        channel: "ChommentsChannel",
        hole: "root"
      },
      {
        connected: () => {
          console.log("Connected!");
        },
        received: data => {
          this.setState({
            chat_messages: [data.chomment, ...this.state.chat_messages]
          });
        }
      }
    );
  };

  componentDidMount = async () => {
    this.createSocket();

    try {
      await AsyncStorage.getItem("jwt");

      this.setState({
        loggedIn: true
      });
    } catch (e) {
      this.setState({
        loggedIn: false
      });
    }

    let page = 0;
    let res = await api.get(`/api/v2/chat_messages?page=${page}`);

    if (res.data) {
      this.setState({
        chat_messages: [...res.data.chat_messages],
        loading: false
      });
    }
  };

  render() {
    return (
      <Layout>
        <ChatInput>
          <Field
            placeholder="Type a message..."
            ref={chomment => (this.chomment = chomment)}
            value={this.state.message}
            onChangeText={message => this.setState({ message })}
            placeholderTextColor="#666"
            keyboardAppearance="dark"
            returnKeyType="send"
            clearButtonMode="while-editing"
            enablesReturnKeyAutomatically
            selectionColor={colors.tintColor}
            multiline
            blurOnSubmit
            onSubmitEditing={this._postMessage}
          />
        </ChatInput>
        {this.state.loading && <LoadingState>Loading Chat...</LoadingState>}
        {!this.state.loading && (
          <ChatStream>
            <FlatList
              data={this.state.chat_messages}
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
          </ChatStream>
        )}
      </Layout>
    );
  }

  _postMessage = async () => {
    const message = this.state.message;

    await api.post(`/api/v2/chat_messages`, {
      chat_message: { message: message }
    });

    this.chomment.clear();
  };
}

const Layout = styled.View`
  background-color: #000;
  padding-top: 1px;
  height: 100%;
  flex-direction: column;
`;

const LoadingState = styled.Text`
  color: #666;
  font-size: 24px;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 32px;
`;

const ChatInput = styled.View`
  flex-direction: row;
  width: 100%;
`;

const Field = styled.TextInput`
  color: white;
  background-color: hsl(0, 0%, 3%);
  padding: 16px 12px;
  width: 100%;
  font-size: 18px;
  box-shadow: 0px 1px 0px rgba(255, 255, 255, 0.15);
`;

const ChatStream = styled.ScrollView`
  width: 100%;
  height: 100%;
`;

const ChatMessage = styled.View`
  padding: 16px 16px 0;
  flex-direction: row;
  width: 100%;
`;

const AvatarBlock = styled.View`
  width: 13%;
`;

const MessageBlock = styled.View`
  flex-direction: column;
  width: 87%;
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
`;
