const RC = require("@ringcentral/sdk").SDK;
const Subscription = require("@ringcentral/subscriptions").Subscriptions;
const keys = require("../config/keys");
const axios = require("axios");

var rcsdk = new RC({
  server: keys.RINGCENTRAL_SERVER_URL,
  clientId: keys.RINGCENTRAL_CLIENT_ID,
  clientSecret: keys.RINGCENTRAL_CLIENT_SECRET,
});
var platform = rcsdk.platform();

var subs = new Subscription({ sdk: rcsdk });
const subscription = subs.createSubscription();

function login() {
  return platform.login({
    username: keys.RINGCENTRAL_USERNAME,
    password: keys.RINGCENTRAL_PASSWORD,
    extension: keys.RINGCENTRAL_EXTENSION,
  });
}

function getSubscription() {
  return subscription;
}

function sendMessage(toNumber, subject) {
  return platform.post("/restapi/v1.0/account/~/extension/~/sms", {
    from: { phoneNumber: keys.RINGCENTRAL_USERNAME },
    to: [{ phoneNumber: toNumber }],
    text: subject,
  });
}

function postToClient(req) {
  console.log(req.uri);
  axios.post(req.uri, req).catch((error) => {
    console.log(error);
    return error;
  });
}

module.exports = { login, sendMessage, getSubscription, postToClient };
