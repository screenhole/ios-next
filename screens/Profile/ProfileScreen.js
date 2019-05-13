import React from "react";
import {
  ScrollView,
  Animated,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  AsyncStorage,
  RefreshControl
} from "react-native";
import styled from "styled-components/native";
import debounce from "lodash/debounce";

import api from "../../utils/api";

import Avatar from "../../components/Avatar";
import Grab from "../../components/Grab";

export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      isRefreshing: false,
      grabs: [],
      user: false,
      pageOffset: 2
    };

    this.loadMore = debounce(this.loadMore, 100);
  }

  componentDidMount = async () => {
    let user = await api.get(
      `/users/${this.props.navigation.getParam("username", "mrhole")}`
    );

    let grabs = await api.get(
      `/users/${this.props.navigation.getParam(
        "user_id",
        "abc123"
      )}/grabs?page=1`
    );

    console.log(user.data);
    console.log(grabs.data);

    if (user.data) {
      this.setState({
        user: user.data.user
      });
    }

    if (grabs.data) {
      this.setState({
        grabs: grabs.data.grabs,
        loading: false
      });
    }
  };

  loadMore = async () => {
    const page = this.state.pageOffset;

    let res = await api.get(
      `/users/${this.props.navigation.getParam(
        "username",
        "mrhole"
      )}/grabs?page=${page}`
    );

    if (res.data) {
      this.setState({
        grabs: [...this.state.grabs, ...res.data.grabs],
        pageOffset: this.state.pageOffset + 1
      });
    }
  };

  onRefresh = async () => {
    let user = await api.get(
      `/users/${this.props.navigation.getParam(
        "username",
        "mrhole"
      )}/grabs?page=1`
    );

    if (res.data) {
      this.setState({
        grabs: res.data.grabs,
        pageOffset: 2
      });
    }
  };

  render() {
    return (
      <Layout>
        {this.state.loading && (
          <Center>
            <LoadingState>
              Loading @{this.props.navigation.getParam("username", "mrhole")}’s
              profile...
            </LoadingState>
          </Center>
        )}
        {!this.state.loading && (
          <View
            style={{
              padding: 16,
              alignItems: "center",
              borderBottomWidth: 1,
              borderBottomColor: "#222"
            }}
          >
            <ProfileHeader>
              <Avatar
                size={76}
                gravatar_hash={this.props.navigation.getParam(
                  "gravatar_hash",
                  "none"
                )}
              />
              <View>
                <Username>
                  @{this.props.navigation.getParam("username", "mrhole")}
                </Username>
                <FullName>{this.state.user.name}</FullName>
              </View>
            </ProfileHeader>
            <Bio>{this.state.user.bio}</Bio>
          </View>
        )}
        {!this.state.loading && (
          <GrabStream>
            <FlatList
              data={this.state.grabs}
              onEndReached={this.loadMore}
              onEndReachedThreshold={0.01}
              keyExtractor={item => item.id}
              scrollEventThrottle={0}
              onScroll={Animated.event([
                { nativeEvent: { contentOffset: { y: this.state.scrollY } } }
              ])}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.isRefreshing}
                  onRefresh={this.onRefresh}
                />
              }
              renderItem={({ item }) => (
                <Grab
                  id={item.id}
                  image={item.image_public_url}
                  username={item.user.username}
                  user_id={item.user.id}
                  gravatar_hash={item.user.gravatar_hash}
                  created_at={item.created_at}
                  navigation={this.props.navigation}
                  description={item.description}
                  memos={item.memos}
                />
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
`;

const Center = styled.View`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoadingState = styled.Text`
  color: #666;
  font-size: 24px;
`;

const ProfileHeader = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`;

const Username = styled.Text`
  color: #444;
  font-size: 18px;
  margin-top: 8px;
  margin-left: 8px;
`;

const FullName = styled.Text`
  color: white;
  font-size: 24px;
  margin-left: 8px;
`;

const Bio = styled.Text`
  color: #999;
  font-size: 16px;
  line-height: 22px;
  margin-top: 8px;
  width: 100%;
`;

const GrabStream = styled.View`
  width: 100%;
  height: 100%;
`;
