import { create } from "apisauce";
import { AsyncStorage } from "react-native";

const apiEndpoint = "https://api.screenhole.net";

const api = create({
  baseURL: apiEndpoint
  // baseURL: '/api',
  // baseURL: 'https://api.screenhole.net',
  // baseURL: 'https://screenhole-api.ngrok.io',
  // baseURL: "https://staging-api.screenhole.net",
});

api.websocketURL = "wss://api.screenhole.net";
// api.websocketURL = "wss://staging-api.screenhole.net";
// api.websocketURL = 'wss://screenhole-api.ngrok.io';

api.authenticated = false;

// reset on 401 API responses
api.addResponseTransform(response => {
  if (!response.ok) {
    if (response.status === 401) {
      // api.resetLocalStorage();
      // window.location = window.location;
    }
  }
});

api.setAuthHeader = async token => {
  try {
    await AsyncStorage.setItem("default_auth_token", token);

    api.setHeader("Authorization", `Bearer ${token}`);
    console.log("Authorized with token.");

    api.authenticated = !!token;
  } catch (e) {
    console.error("Failed to log in.");
  }
};

export default api;
