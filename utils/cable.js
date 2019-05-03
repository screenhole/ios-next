import api from "./api";
import ActionCable from "react-native-actioncable";

let { authenticated } = api;

var cableSocketUrl;

if (authenticated && api.headers) {
  let token = api.headers.Authorization.split(/ /)[1];
  token = btoa(token);
  cableSocketUrl = `${api.websocketURL}/cable?token=${token}`;
} else {
  let token = btoa("guest");
  cableSocketUrl = `${api.websocketURL}/cable?token=${token}`;
}

let cable = ActionCable.createConsumer(cableSocketUrl);

export default cable;
