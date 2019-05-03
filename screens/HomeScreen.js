import React from "react";
import styled from "styled-components/native";
import {
  Dimensions,
  ScrollView,
  Text,
  View,
  FlatList,
  TouchableOpacity
} from "react-native";
import Image from "react-native-scalable-image";
import TimeAgo from "react-native-timeago";

import api from "../utils/api";
import cable from "../utils/cable";

import Avatar from "../components/Avatar";

const GRAB_PADDING = 16;

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Screenhole",
    headerStyle: {
      backgroundColor: "#111",
      borderBottomColor: "rgba(255,255,255,.1)"
    },
    headerTintColor: "white"
  };

  constructor() {
    super();

    this.state = {
      loading: true,
      grabs: []
    };
  }

  createSocket = () => {
    cable.subscriptions.create(
      {
        channel: "GrabsChannel",
        hole: "root"
      },
      {
        connected: () => {
          console.log("Connected!");
        },
        received: data => {
          this.setState({
            grabs: [data.grab, ...this.state.grabs]
          });
        }
      }
    );
  };

  componentDidMount = async () => {
    this.createSocket();

    let res = await api.get(`/api/v2/holes/root/grabs?page=0`);

    if (res.data) {
      this.setState({
        grabs: res.data.grabs,
        loading: false
      });
    }
  };

  render() {
    return (
      <Layout>
        {this.state.loading && (
          <View>
            <LoadingState>Loading Grabs...</LoadingState>
          </View>
        )}
        {!this.state.loading && (
          <GrabStream>
            <FlatList
              data={this.state.grabs}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <Grab>
                  <GrabAuthor>
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
                  </GrabAuthor>
                  <ImageBorder>
                    <GrabImage
                      width={Dimensions.get("window").width - GRAB_PADDING * 2}
                      source={{ uri: item.image_public_url }}
                    />
                  </ImageBorder>
                </Grab>
              )}
            />
          </GrabStream>
        )}
      </Layout>
    );
  }
}

const Layout = styled.View`
  background-color: #000;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoadingState = styled.Text`
  color: #666;
  font-size: 24px;
`;

const Description = styled.Text`
  color: white;
  font-size: 24px;
`;

const GrabStream = styled.ScrollView`
  width: 100%;
  height: 100%;
`;

const Grab = styled.View`
  padding: ${GRAB_PADDING}px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 20px;
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

const ImageBorder = styled.View`
  border-radius: 5px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.15);
`;

const GrabImage = styled(Image)`
  border-radius: 4px;
  overflow: hidden;
`;
