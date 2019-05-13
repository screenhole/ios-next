import React from "react";
import styled from "styled-components/native";
import { View, Text, FlatList, Button, RefreshControl } from "react-native";
import debounce from "lodash/debounce";

import api from "../../utils/api";
import colors from "../../constants/Colors";
import Store from "../../store/store";

import SupNotification from "../../components/SupNotification";

class SupScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      isRefreshing: false,
      notes: [],
      pageOffset: 2,
      hasMore: true
    };

    this.loadMore = debounce(this.loadMore, 100);
  }

  componentDidMount = async () => {
    const page = 1;
    let res = await api.get(`/api/v2/notifications?page=${page}`);

    if (res.data) {
      this.setState({
        notes: res.data.notes,
        loading: false
      });
    }
  };

  loadMore = async () => {
    const page = this.state.pageOffset;
    let res = await api.get(`/api/v2/hole/root/notifications?page=${page}`);

    if (!res.ok) {
      return this.setState({ hasMore: false });
    }

    if (res.data) {
      this.setState({
        notes: [...this.state.notes, ...res.data.notes],
        pageOffset: this.state.pageOffset + 1,
        loading: false
      });
    }

    if (!res.data.meta.next_page) {
      this.setState({ hasMore: false });
    }
  };

  onRefresh = async () => {
    let res = await api.get(`/api/v2/notifications?page=1`);

    if (res.data) {
      this.setState({
        notes: res.data.notes
      });
    }
  };

  render() {
    const store = this.props.store;
    const loggedIn = store.get("loggedIn");

    return (
      <Wrapper>
        {!loggedIn && (
          <View
            style={{
              height: "100%",
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Button
              title="Log in to see your activity"
              color={colors.tintColor}
              onPress={() => {
                this.props.navigation.navigate("Login");
              }}
            />
          </View>
        )}
        {loggedIn && this.state.loading && (
          <View
            style={{
              height: "100%",
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <LoadingState>Loading your notifications...</LoadingState>
          </View>
        )}
        {loggedIn && !this.state.loading && (
          <FlatList
            data={this.state.notes}
            onEndReached={this.loadMore}
            onEndReachedThreshold={0.01}
            keyExtractor={item => item.id}
            refreshControl={
              <RefreshControl
                refreshing={this.state.isRefreshing}
                onRefresh={this.onRefresh}
              />
            }
            renderItem={({ item }) => (
              <SupNotification
                message={item.meta.summary}
                actor={item.actor}
                user={item.user}
                created_at={item.created_at}
                grab_id={item.meta.grab_id}
                buttcoin={item.meta.buttcoin_earned}
                variant={item.variant}
                navigation={this.props.navigation}
              />
            )}
          />
        )}
      </Wrapper>
    );
  }
}

export default Store.withStore(SupScreen);

const Wrapper = styled.View`
  background-color: black;
  height: 100%;
`;

const LoadingState = styled.Text`
  color: #666;
  font-size: 24px;
  text-align: center;
`;
