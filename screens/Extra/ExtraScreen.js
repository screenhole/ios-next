import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";

import colors from "../../constants/Colors";

import BigButton from "../../components/BigButton";

export default class ExtraScreen extends React.Component {
  static navigationOptions = {
    title: "Menu",
    headerStyle: {
      backgroundColor: "#111",
      borderBottomColor: "rgba(255,255,255,.1)"
    },
    headerTintColor: colors.tintColor,
    headerTitleStyle: {
      color: "white"
    }
  };

  render() {
    return (
      <Wrapper>
        <More>🚧️ Work in progress</More>
        <Buttons>
          <BigButton label="Log in" />
          <BigButton label="Sign up" />
        </Buttons>
      </Wrapper>
    );
  }
}

const Wrapper = styled.View`
  background-color: black;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const More = styled.Text`
  color: #666;
  font-size: 14px;
  height: 50%;
  padding: 32px;
`;

const Buttons = styled.View`
  flex: 1;
  height: 50%;
  justify-content: center;
  align-items: center;
`;
