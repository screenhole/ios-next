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
  FlatList,
  Image,
  KeyboardAvoidingView
} from "react-native";
import { LinearGradient } from "expo";
import TimeAgo from "react-native-timeago";

import api from "../../utils/api";
import colors from "../../constants/Colors";
import Store from "../../store/store";

import Avatar from "../../components/Avatar";
import BigButton from "../../components/BigButton";
import Grab from "../../components/Grab";

import LoginScreen from "../Login/LoginScreen";

class GrabScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      grab: false,
      message: ""
    };
  }

  componentDidMount = async () => {
    this.loadGrab();
  };

  loadGrab = async () => {
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
  };

  render() {
    const { navigation } = this.props;

    return (
      <KeyboardAvoidingView behavior="position" enabled>
        <Layout>
          <ScrollView>
            {this.state.loading && (
              <Grab
                id={navigation.getParam("grab_id", "")}
                image={navigation.getParam("image", "")}
                username={navigation.getParam("username", "")}
                gravatar_hash={navigation.getParam("gravatar_hash", "")}
                created_at={navigation.getParam("created_at", "")}
                description={navigation.getParam("description", "")}
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
                memos={this.state.grab.memos}
                fromDetails
              />
            )}
            {this.props.store.get("loggedIn") && (
              <ChommentInputBlock>
                <ChommentInput>
                  <ChommentField
                    placeholder="Type a chomment..."
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
                </ChommentInput>
              </ChommentInputBlock>
            )}
            {!this.state.loading && this.state.grab.memos && (
              <FlatList
                data={this.state.grab.memos.reverse()}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                  <ChatMessage>
                    <AvatarBlock>
                      <Avatar
                        gravatar_hash={item.user.gravatar_hash}
                        size={36}
                      />
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
                      {item.message.match(/^💸.*💸️/) ? (
                        <Message
                          style={{
                            color: colors.buttcoin
                          }}
                        >
                          tipped {item.message.length}
                        </Message>
                      ) : (
                        <Message>{item.message}</Message>
                      )}
                    </MessageBlock>
                  </ChatMessage>
                )}
              />
            )}
            <View
              style={{
                height: 24
              }}
            />
          </ScrollView>
        </Layout>
      </KeyboardAvoidingView>
    );
  }

  _postMessage = async () => {
    const message = this.state.message;

    await api.post(`/grabs/${this.state.grab.id}/memos`, {
      memo: {
        variant: "chomment",
        message: message,
        pending: false
      }
    });

    this.loadGrab();
    this.chomment.clear();
  };
}

export default Store.withStore(GrabScreen);

const Layout = styled.View`
  background-color: #000;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
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

const ChommentInputBlock = styled.View`
  padding: 16px;
`;

const ChommentInput = styled.View`
  border: 2px solid rgba(255, 255, 255, 0.15);
  border-radius: 30px;
  width: 100%;
  background-color: hsl(0, 0%, 3%);
`;

const ChommentField = styled.TextInput`
  color: white;
  padding: 16px;
  width: 100%;
  font-size: 18px;
`;
