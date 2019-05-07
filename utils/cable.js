import api from "./api";
import ActionCable from "react-native-actioncable";
import { encode as btoa } from "base-64";

let { authenticated } = api;

let cableSocketUrl;

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
