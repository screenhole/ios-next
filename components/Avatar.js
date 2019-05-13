import React from "react";
import styled from "styled-components/native";
import { Image, View } from "react-native";

export default class Avatar extends React.Component {
  gravatar = () => {
    return (
      "https://www.gravatar.com/avatar/" +
      this.props.gravatar_hash +
      "?size=" +
      encodeURIComponent(this.props.size * 3 || 100)
    );
  };

  render() {
    return (
      <AvatarWrapper
        style={{
          width: this.props.size || 32
        }}
        onPress={this.props.onPress}
      >
        <Image
          style={{
            width: this.props.size,
            height: this.props.size
          }}
          source={{ uri: this.gravatar() }}
          onPress={this.props.onPress}
        />
      </AvatarWrapper>
    );
  }
}

const AvatarWrapper = styled.View`
  border-radius: 1000;
  overflow: hidden;
  background-color: #111;
`;
