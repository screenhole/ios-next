import React from "react";
import { Dimensions, View, TouchableOpacity, Text } from "react-native";
import styled from "styled-components/native";
import Image from "react-native-scalable-image";
import TimeAgo from "react-native-timeago";

import Avatar from "./Avatar";

import colors from "../constants/Colors";
const GRAB_PADDING = 16;

export default class Grab extends React.Component {
  render() {
    return (
      <GrabWrapper fromDetails={this.props.fromDetails}>
        <GrabAuthor>
          <View
            style={{
              flexDirection: "row"
            }}
          >
            <Avatar gravatar_hash={this.props.gravatar_hash} size={36} />
            <UsernameLink>
              <Username>{this.props.username}</Username>
            </UsernameLink>
          </View>
          <View>
            <TimeAgo
              time={this.props.created_at}
              style={{
                color: "#666"
              }}
            />
          </View>
        </GrabAuthor>
        <ImageBorder
          activeOpacity={1}
          onPress={() =>
            this.props.navigation.navigate("Grab", {
              grab_id: this.props.id,
              username: this.props.username,
              created_at: this.props.created_at,
              gravatar_hash: this.props.gravatar_hash,
              description: this.props.description,
              image: this.props.image_public_url
            })
          }
        >
          <GrabImage
            width={Dimensions.get("window").width - GRAB_PADDING * 2}
            source={{ uri: this.props.image, cache: "default" }}
          />
        </ImageBorder>
        {this.props.description !== null && (
          <GrabIndent>
            <Indent />
            <GrabDescription>{this.props.description}</GrabDescription>
          </GrabIndent>
        )}
      </GrabWrapper>
    );
  }
}

const GrabWrapper = styled.View`
  padding: ${GRAB_PADDING}px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: ${props => (props.fromDetails ? 0 : `${GRAB_PADDING}px`)};
`;

const GrabAuthor = styled.View`
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

const ImageBorder = styled.TouchableOpacity`
  border-radius: 5px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.15);
`;

const GrabImage = styled(Image)`
  border-radius: 4px;
  overflow: hidden;
`;

const GrabIndent = styled.View`
  margin-top: ${GRAB_PADDING};
  flex-direction: row;
`;

const Indent = styled.View`
  background-color: ${colors.tintColor};
  width: 3px;
`;

const GrabDescription = styled.Text`
  color: white;
  padding-left: 8px;
  flex: 1;
`;
