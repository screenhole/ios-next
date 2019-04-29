import React from "react";
import { ScrollView, Text, View, Button } from "react-native";
import { WebBrowser } from "expo";
import styled from "styled-components/native";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <Layout>
        <CenterText>Sup</CenterText>
        <Button
          onPress={this._handleHelpPress}
          title="Open Screenhole"
          color="#7137f9"
        />
      </Layout>
    );
  }

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync("https://screenhole.com");
  };
}

const Layout = styled.View`
  background-color: #000;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CenterText = styled.Text`
  font-size: 72;
  color: white;
  text-align: center;
`;
