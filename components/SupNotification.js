import React from "react";
import styled from "styled-components/native";
import { Image, View, Text, TouchableOpacity } from "react-native";
import TimeAgo from "react-native-timeago";
import Autolink from "react-native-autolink";

import colors from "../constants/Colors";

import Avatar from "./Avatar";

export default class SupNotification extends React.Component {
  goToAction = () => {
    this.props.navigation.navigate("Grab", {
      grab_id: this.props.grab_id,
      username: this.props.user.username,
      gravatar_hash: this.props.user.gravatar_hash
    });
  };

  render() {
    return (
      <Wrapper>
        <MetaBlock>
          <Avatar gravatar_hash={this.props.actor.gravatar_hash} size={32} />
          {this.props.variant === "voice_memo" && (
            <ActorAction>
              @{this.props.actor.username} left a voice memo
            </ActorAction>
          )}
          {this.props.variant === "chomment" && (
            <TouchableOpacity onPress={this.goToAction}>
              <ActorAction
                style={{
                  color: colors.tintColor
                }}
              >
                @{this.props.actor.username} left a chomment on your grab
              </ActorAction>
            </TouchableOpacity>
          )}
          {this.props.variant === "at_reply" && (
            <ActorAction>
              @{this.props.actor.username} mentioned you in chat
            </ActorAction>
          )}
        </MetaBlock>
        <MessageBlock>
          {this.props.message.match(/^💸.*💸️/) ? (
            <Message
              style={{
                color: colors.buttcoin
              }}
            >
              tipped {this.props.message.length}
            </Message>
          ) : (
            <Autolink
              text={this.props.message}
              webFallback={true}
              showAlert={true}
              linkStyle={{
                color: colors.tintColor
              }}
              style={{
                color: "white",
                fontSize: 16,
                lineHeight: 22
              }}
            />
          )}
        </MessageBlock>
        <MetaBlock spaced>
          <MetaBlock>
            <Image
              style={{
                width: 24,
                height: 24,
                marginRight: 8
              }}
              source={require("../assets/images/buttcoin.gif")}
            />
            <ButtcoinEarned>{this.props.message.length}</ButtcoinEarned>
          </MetaBlock>
          <TimeAgo
            time={this.props.created_at}
            style={{
              color: "#666",
              textAlign: "right"
            }}
          />
        </MetaBlock>
        <Divider />
      </Wrapper>
    );
  }
}

const Wrapper = styled.View`
  padding: 16px;
  padding-bottom: 8px;
`;

const Divider = styled.View`
  height: 1px;
  width: 100%;
  background-color: #111;
  margin-top: 24px;
`;

const MetaBlock = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: ${props => (props.spaced ? "space-between" : "flex-start")};
  padding: ${props => (props.spaced ? "0 8px" : 0)};
`;

const ActorAction = styled.Text`
  color: #6c6f93;
  font-size: 14px;
  padding-left: 6px;
`;

const MessageBlock = styled.View`
  margin: 12px 0;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 30px;
  padding: 12px 16px;
`;

const Message = styled.Text`
  color: #6c6f93;
  font-size: 16px;
  line-height: 22px;
`;

const ButtcoinEarned = styled.Text`
  color: ${colors.buttcoin};
`;
