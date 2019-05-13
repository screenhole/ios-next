import React from "react";
import {
  Image as NativeImage,
  Dimensions,
  View,
  TouchableOpacity,
  Text
} from "react-native";
import styled from "styled-components/native";
import Image from "react-native-scalable-image";
import TimeAgo from "react-native-timeago";

import Avatar from "./Avatar";
import ChommentIcon from "./icons/ChommentIcon";

import api from "../utils/api";
import colors from "../constants/Colors";
import Store from "../store/store";

const GRAB_PADDING = 16;

class Grab extends React.Component {
  buttcoinTips = () => {
    const tips = (this.props.memos || []).filter(memo => {
      return (
        !memo.pending &&
        memo.variant === "chomment" &&
        memo.message.match(/^💸.*💸️/)
      );
    });

    return tips.reduce((memo, buttcoin) => {
      return memo + buttcoin.message.length;
    }, 0);
  };

  textMemos = () => {
    return (this.props.memos || []).filter(function(memo) {
      return (
        !memo.pending &&
        memo.variant === "chomment" &&
        !memo.message.match(/^💸.*💸️/)
      );
    });
  };

  dropTip = async () => {
    // let res = await api.post(`/api/v2/holes/root/grabs/${this.props.id}/tips`, {
    //   amount: 69
    // });
    // console.log(res);
  };

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
            <UsernameLink
              onPress={() =>
                this.props.navigation.navigate("Profile", {
                  username: this.props.username,
                  gravatar_hash: this.props.gravatar_hash,
                  user_id: this.props.user_id
                })
              }
            >
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
              user_id: this.props.user_id,
              username: this.props.username,
              created_at: this.props.created_at,
              gravatar_hash: this.props.gravatar_hash,
              description: this.props.description,
              image:
                this.props.image_public_url ||
                "https://screenhole.com/static/media/loader.707243b5.gif"
            })
          }
        >
          <GrabImage
            width={Dimensions.get("window").width - GRAB_PADDING * 2}
            source={{
              uri: `${this.props.image};1800x1000,fit.png`,
              cache: "default"
            }}
          />
        </ImageBorder>

        {this.props.description !== null && (
          <GrabIndent>
            <Indent />
            <GrabDescription>{this.props.description}</GrabDescription>
          </GrabIndent>
        )}
        <View
          style={{
            marginTop: 16
          }}
        />
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate("Grab", {
              grab_id: this.props.id,
              user_id: this.props.user_id,
              username: this.props.username,
              created_at: this.props.created_at,
              gravatar_hash: this.props.gravatar_hash,
              description: this.props.description,
              image:
                this.props.image_public_url ||
                "https://screenhole.com/static/media/loader.707243b5.gif"
            })
          }
        >
          <MetaBlock spaced>
            {this.buttcoinTips() > 0 && (
              <VerticalAlign>
                <NativeImage
                  style={{
                    width: 24,
                    height: 24,
                    marginRight: 8
                  }}
                  source={require("../assets/images/buttcoin.gif")}
                />
                <ButtcoinEarned>{this.buttcoinTips()}</ButtcoinEarned>
              </VerticalAlign>
            )}
            {this.textMemos().length > 0 && (
              <VerticalAlign>
                <ChommentIcon />
                <ChommentCount>{this.textMemos().length}</ChommentCount>
              </VerticalAlign>
            )}
          </MetaBlock>
        </TouchableOpacity>
      </GrabWrapper>
    );
  }
}

export default Store.withStore(Grab);

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

const MetaBlock = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const VerticalAlign = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 16px;
`;

const ButtcoinEarned = styled.Text`
  color: ${colors.buttcoin};
`;

const ChommentCount = styled.Text`
  color: ${colors.tintColor};
  margin-left: 8px;
`;
