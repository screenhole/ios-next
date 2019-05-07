import React from "react";
import styled from "styled-components/native";
import { View, Text, FlatList } from "react-native";
import debounce from "lodash/debounce";

import api from "../../utils/api";
import colors from "../../constants/Colors";

export default class SupScreen extends React.Component {
  static navigationOptions = {
    title: "Sup",
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
      notes: [],
      pageOffset: 2,
      hasMore: true
    };

    this.loadMore = debounce(this.loadMore, 100);
  }

  componentDidMount = async () => {
    const page = 1;
    let res = await api.get(`/sup?page=${page}`);

    if (res.data) {
      this.setState({
        notes: res.data.notes,
        loading: false
      });
    }
  };

  loadMore = async () => {
    const page = this.state.pageOffset;
    let res = await api.get(`/sup?page=${page}`);

    if (!res.ok) {
      return this.setState({ hasMore: false });
    }

    if (res.data) {
      this.setState({
        notes: [...this.state.notes, ...res.data.notes],
        pageOffset: this.state.pageOffset + 1
      });
    }

    if (!res.data.meta.next_page) {
      this.setState({ hasMore: false });
    }
  };

  render() {
    return (
      <Wrapper>
        {!this.state.loading && (
          <FlatList
            data={this.state.notes}
            onEndReached={this.loadMore}
            onEndReachedThreshold={0.01}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <Notification>
                <Message>{item.meta.summary}</Message>
              </Notification>
            )}
          />
        )}
      </Wrapper>
    );
  }
}

const Wrapper = styled.View`
  background-color: black;
  height: 100%;
`;

const Notification = styled.View``;

const Message = styled.Text`
  color: white;
`;
