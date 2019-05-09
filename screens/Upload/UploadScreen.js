import React from "react";
import styled from "styled-components/native";
import {
  Text,
  TextInput,
  ScrollView,
  View,
  Image,
  Button,
  TouchableOpacity,
  AsyncStorage,
  KeyboardAvoidingView
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ImagePicker, Permissions } from "expo";

import api from "../../utils/api";
import colors from "../../constants/Colors";

import BigButton from "../../components/BigButton";

export default class UploadScreen extends React.Component {
  static navigationOptions = {
    title: "Post a Grab",
    headerStyle: {
      backgroundColor: "#111",
      borderBottomColor: "rgba(255,255,255,.1)"
    },
    headerTintColor: "white"
  };

  constructor() {
    super();

    this.state = {
      loggedIn: false,
      loading: true,
      image: false,
      caption: "",
      progress: 0,
      uploading: false
    };
  }

  componentDidMount = async () => {
    try {
      let token = await AsyncStorage.getItem("default_auth_token");

      if (token !== null) {
        api.setHeader("Authorization", `Bearer ${token}`);

        this.setState({
          loggedIn: true,
          loading: false
        });
      }
    } catch (e) {
      this.setState({
        loggedIn: false,
        loading: false
      });

      console.warn(e);
      console.log(
        "No Authorization token present in AsyncStorage. Please log in."
      );
      alert("You need to log in to upload grabs.");
    }
  };

  render() {
    return (
      <Layout>
        {!this.state.loading && this.state.loggedIn ? (
          <Uploader>
            <KeyboardAvoidingView
              behavior="position"
              keyboardVerticalOffset={106}
              enabled
            >
              {/* <Subheader>Upload those juicy images to Screenhole</Subheader> */}
              <TouchableOpacity
                style={{
                  marginBottom: 20
                }}
                onPress={this._pickMediaWithPermissionsCheck}
              >
                <ImageStage>
                  <Ionicons
                    name="ios-camera"
                    size={128}
                    color="#333"
                    style={{
                      position: "absolute"
                    }}
                  />
                  {this.state.image && (
                    <Image
                      resizeMode="contain"
                      source={{ uri: this.state.image }}
                      style={{ width: "100%", height: 300 }}
                    />
                  )}
                </ImageStage>
              </TouchableOpacity>
              <Caption>
                <CaptionField
                  placeholder="Type an optional caption for your grab..."
                  ref={caption => (this.caption = caption)}
                  value={this.state.caption}
                  onChangeText={caption => this.setState({ caption })}
                  placeholderTextColor="#666"
                  keyboardAppearance="dark"
                  clearButtonMode="while-editing"
                  selectionColor={colors.tintColor}
                  multiline
                />
              </Caption>
              <BigButton
                label="SEND IT"
                onPressAction={this._uploadGrab}
                style={{
                  marginTop: 20
                }}
              />
            </KeyboardAvoidingView>
          </Uploader>
        ) : (
          <LoadingState>
            <Button
              title="Log in to post grabs"
              onPress={() => {
                this.props.navigation.navigate("Login");
              }}
            />
          </LoadingState>
        )}
      </Layout>
    );
  }

  _pickMedia = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "Images",
      allowsEditing: false,
      quality: 0.5,
      exif: false
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  _pickMediaWithPermissionsCheck = async () => {
    const permission = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    if (permission.status !== "granted") {
      const newPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (newPermission.status === "granted") {
        this._pickMedia();
      }
    } else {
      this._pickMedia();
    }
  };

  uploadFile = async (file, url, token, options) => {
    if (!file) options.onError.apply(this, [null, "no file"]);

    options = options || {};
    // start upload
    const upload = new global.window.Carbon.Upload(file, {
      url: url,
      method: "PUT",
      authorization: "Bearer " + token,
      chuckSize: 1024 * 1024 * 32
    });
    if (options.onStart) {
      upload.on("start", e => options.onStart.apply(this, [upload, e]));
    }
    if (options.onProgress) {
      upload.on("progress", e => options.onProgress.apply(this, [upload, e]));
    }
    if (options.onComplete) {
      upload.on("complete", e => options.onComplete.apply(this, [upload, e]));
    }
    if (options.onError) {
      upload.on("error", e => options.onError.apply(this, [upload, e]));
    }
    return upload.start();
  };

  _uploadGrab = async () => {
    let getUploadToken = await api.post(`/api/v2/upload_tokens`);
    let data = getUploadToken.data;

    console.log(data);

    const file = this.state.image;
    const caption = this.caption.value;

    if (
      getUploadToken.ok ||
      file.type === "image/png" ||
      file.type === "image/jpg" ||
      file.type === "image/jpeg" ||
      file.type === "image/heic" ||
      file.type === "video/quicktime" ||
      file.type === "video/mp4"
    ) {
      // Start uploading if everything is ok
      this.uploadFile(file, data.url, data.token, {
        async onStart(upload, e) {
          console.log("start", upload, e);

          this.setState({
            uploading: true
          });
        },
        onProgress(upload, e) {
          console.log("progress", e, upload.baseUri, Math.round(e.value * 100));

          this.setState({
            progress: Math.round(e.value * 100)
          });
        },
        async onComplete(upload, e) {
          console.log("complete", upload, e);

          let uploadGrab = await api.post(endpoint, {
            grab: {
              image_path: upload.result.key,
              description: caption
            }
          });

          if (uploadGrab.ok) {
            this.grabUpload.value = "";
            this.grabCaption.value = "";

            this.setState({
              uploading: false,
              progress: 0
            });
          }
        },
        onError(upload, e) {
          console.log("error", upload, e);
          alert("Something went wrong. Check the console.");

          this.setState({
            uploading: false,
            progress: 0
          });
        }
      });
    } else {
      alert("Something went wrong. Check the console.");
      console.warn(data);
    }
  };
}

const Layout = styled.ScrollView`
  background-color: #000;
  padding-top: 0;
`;

const LoadingState = styled.View`
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 32px;
`;

const LoadingStateText = styled.Text`
  color: #666;
  font-size: 24px;
`;

const Uploader = styled.View`
  padding: 16px;
  height: 100%;
`;

const Subheader = styled.Text`
  color: #6c6f93;
  text-align: center;
  font-size: 16;
  line-height: 24;
  margin-bottom: 20px;
`;

const Caption = styled.View`
  border: 2px solid rgba(255, 255, 255, 0.15);
  border-radius: 30px;
  width: 100%;
  background-color: hsl(0, 0%, 3%);
`;

const CaptionField = styled.TextInput`
  color: white;
  padding: 16px;
  width: 100%;
  font-size: 18px;
  line-height: 24px;
  min-height: 80px;
`;

const ImageStage = styled.View`
  width: 100%;
  height: 300px;
  background-color: #111;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
