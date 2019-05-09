import { createConnectedStore } from "undux";
import { AsyncStorage } from "react-native";

let hasToken = false;

async function getSavedToken() {
  let jwt = await AsyncStorage.getItem("default_auth_token");

  hasToken = jwt !== null ? true : false;
}

getSavedToken();

// Create a store with an initial value.
export default createConnectedStore({
  loggedIn: hasToken,
  currentUser: {}
});
