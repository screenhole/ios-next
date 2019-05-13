import React from "react";
import styled from "styled-components/native";
import {
  ScrollView,
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  AsyncStorage,
  FlatList,
  RefreshControl
} from "react-native";
import TimeAgo from "react-native-timeago";
import debounce from "lodash/debounce";
import Autolink from "react-native-autolink";

import api from "../../utils/api";
import cable from "../../utils/cable";
import colors from "../../constants/Colors";
import Store from "../../store/store";

import Avatar from "../../components/Avatar";

class ChatScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      isRefreshing: false,
      pageOffset: 2,
      message: "",
      chat_messages: []
    };

    this.loadMore = debounce(this.loadMore, 100);
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

    let page = 1;
    let res = await api.get(`/api/v2/chat_messages?page=${page}`);

    if (res.data) {
      this.setState({
        chat_messages: [...res.data.chat_messages],
        loading: false
      });
    }
  };

  loadMore = async () => {
    const page = this.state.pageOffset;

    let res = await api.get(`/api/v2/chat_messages?page=${page}`);

    console.log(res.data.chat_messages);

    if (res.data) {
      this.setState({
        chat_messages: [...this.state.chat_messages, ...res.data.chat_messages],
        pageOffset: this.state.pageOffset + 1
      });
    }
  };

  onRefresh = async () => {
    let res = await api.get(`/api/v2/chat_messages?page=1`);

    if (res.data) {
      this.setState({
        chat_messages: res.data.chat_messages,
        pageOffset: 2
      });
    }
  };

  render() {
    let store = this.props.store;

    return (
      <Layout>
        {store.get("loggedIn") ? (
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
        ) : (
          <View
            style={{
              height: 54,
              paddingTop: 6,
              backgroundColor: "hsl(0,0%,4%)"
            }}
          >
            <Button
              title="Log in to send messages"
              color={colors.tintColor}
              onPress={() => {
                this.props.navigation.navigate("Login");
              }}
            />
          </View>
        )}
        {this.state.loading && <LoadingState>Loading Chat...</LoadingState>}
        {!this.state.loading && (
          <ChatStream>
            <FlatList
              data={this.state.chat_messages}
              onEndReached={this.loadMore}
              onEndReachedThreshold={0.01}
              keyExtractor={item => item.id}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.isRefreshing}
                  onRefresh={this.onRefresh}
                />
              }
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

                    {/* fucking dependency hell, i’m gonna get the mention linking working later */}
                    <Autolink
                      text={item.message}
                      webFallback={true}
                      showAlert={true}
                      linkStyle={{
                        color: colors.tintColor
                      }}
                      style={{
                        color: "#6c6f93",
                        fontSize: 16,
                        lineHeight: 22
                      }}
                    />
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

export default Store.withStore(ChatScreen);

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

const ChatStream = styled.View`
  width: 100%;
  height: 92%;
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
