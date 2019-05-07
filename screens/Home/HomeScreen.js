import React from "react";
import styled from "styled-components/native";
import {
  ScrollView,
  Text,
  View,
  FlatList,
  TouchableOpacity
} from "react-native";
import debounce from "lodash/debounce";

import api from "../../utils/api";
import cable from "../../utils/cable";
import colors from "../../constants/Colors";
import Store from "../../store/store";

import Grab from "../../components/Grab";

class HomeScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      grabs: [],
      pageOffset: 2
    };

    this.loadMore = debounce(this.loadMore, 100);
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

    let res = await api.get(`/api/v2/holes/root/grabs?page=1`);

    if (res.data) {
      this.setState({
        grabs: res.data.grabs,
        loading: false
      });
    }
  };

  loadMore = async () => {
    const page = this.state.pageOffset;

    let res = await api.get(`/api/v2/holes/root/grabs?page=${page}`);

    if (res.data) {
      this.setState({
        grabs: [...this.state.grabs, ...res.data.grabs],
        pageOffset: this.state.pageOffset + 1
      });
    }
  };

  render() {
    let store = this.props.store;

    return (
      <Layout>
        {!store.state.loggedIn && (
          <Toast
            onPress={() => {
              this.props.navigation.navigate("Login");
            }}
          >
            <ToastText>🔓️ Tap here to log in</ToastText>
          </Toast>
        )}
        {this.state.loading && (
          <View>
            <LoadingState>Loading Grabs...</LoadingState>
          </View>
        )}
        {!this.state.loading && (
          <GrabStream>
            <FlatList
              data={this.state.grabs}
              onEndReached={this.loadMore}
              onEndReachedThreshold={0.01}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <Grab
                  id={item.id}
                  image={item.image_public_url}
                  username={item.user.username}
                  gravatar_hash={item.user.gravatar_hash}
                  created_at={item.created_at}
                  navigation={this.props.navigation}
                  description={item.description}
                />
              )}
            />
          </GrabStream>
        )}
      </Layout>
    );
  }
}

export default Store.withStore(HomeScreen);

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

const Toast = styled.TouchableOpacity`
  position: absolute;
  height: 48px;
  bottom: 0;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  z-index: 2;
  background-color: ${colors.tintColor};
`;

const ToastText = styled.Text`
  color: white;
  text-align: center;
  font-size: 16;
  padding: 10px;
`;

const GrabStream = styled.View`
  width: 100%;
  height: 100%;
`;
