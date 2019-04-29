import React, { Component } from "react";
import styled from "styled-components/native";
import { Platform, Text, TouchableOpacity } from "react-native";
import { Haptic, LinearGradient } from "expo";

export default class BigButton extends Component {
  render() {
    return (
      <TouchButton
        onPress={() => {
          if (Platform.OS === "ios" && this.props.haptic === true) {
            Haptic.impact(Haptic.ImpactFeedbackStyle["Heavy"]);
          }
          if (this.props.onPressAction) {
            return this.props.onPressAction();
          }
        }}
      >
        <LinearGradient
          colors={["rgb(103, 59, 237)", "rgb(72, 21, 224))"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={{
            borderRadius: 8,
            padding: 16
          }}
        >
          <ButtonText>{this.props.label}</ButtonText>
        </LinearGradient>
      </TouchButton>
    );
  }
}

const TouchButton = styled.TouchableOpacity`
  border-radius: 8px;
  margin-top: 48px;
`;

const ButtonText = styled.Text`
  color: white;
  text-align: center;
  font-size: 20px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;
