import { createConnectedStore } from "undux";
import { AsyncStorage } from "react-native";

async function getSavedToken() {
  let jwt = await AsyncStorage.getItem("default_auth_token");
  let hasToken = jwt !== null ? true : false;

  console.log(`hasToken: ${hasToken}`);

  return hasToken;
}

// Create a store with an initial value.
export default createConnectedStore({
  loggedIn: false,
  currentUser: {}
});
