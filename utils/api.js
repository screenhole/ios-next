import { create } from "apisauce";

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

// reset on 401 API responses
api.addResponseTransform(response => {
  if (!response.ok) {
    if (response.status === 401) {
      // api.resetLocalStorage();
      // window.location = window.location;
    }
  }
});

export default api;
