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

  componentDidMount = async () => {
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
            onChangeText={message => this.setState({ message })}
            placeholderTextColor="#666"
            keyboardAppearance="dark"
            returnKeyType="send"
            blurOnSubmit
            clearButtonMode="while-editing"
            enablesReturnKeyAutomatically
            selectionColor={colors.tintColor}
          />
        </ChatInput>
        {!this.state.loading && (
          <ChatStream>
            <FlatList
              data={this.state.chat_messages}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <ChatMessage>
                  <MessageAuthor>
                    <View
                      style={{
                        flexDirection: "row"
                      }}
                    >
                      <Avatar
                        gravatar_hash={item.user.gravatar_hash}
                        size={36}
                      />
                      <UsernameLink>
                        <Username>{item.user.username}</Username>
                      </UsernameLink>
                    </View>
                    <View>
                      <TimeAgo
                        time={item.created_at}
                        style={{
                          color: "#666"
                        }}
                      />
                    </View>
                  </MessageAuthor>
                  <Message>{item.message}</Message>
                </ChatMessage>
              )}
            />
          </ChatStream>
        )}
      </Layout>
    );
  }
}

const Layout = styled.View`
  background-color: #000;
  padding-top: 0;
  height: 100%;
  flex-direction: column;
`;

const ChatInput = styled.View`
  flex-direction: row;
  width: 100%;
`;

const Field = styled.TextInput`
  color: white;
  background-color: #222;
  padding: 16px 12px;
  width: 100%;
  font-size: 18px;
`;

const ChatStream = styled.ScrollView`
  width: 100%;
  height: 100%;
`;

const MessageAuthor = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 8px;
`;

const UsernameLink = styled.TouchableOpacity`
  padding: 6px 10px;
  border-radius: 20px;
  border: 2px solid rgba(255, 255, 255, 0.15);
  margin-left: 6px;
`;

const Username = styled.Text`
  color: white;
  font-size: 16px;
`;

const ChatMessage = styled.View`
  padding: 16px;
`;

const Message = styled.Text`
  color: white;
`;
