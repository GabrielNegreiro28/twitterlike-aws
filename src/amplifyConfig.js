// src/amplifyConfig.js
const amplifyConfig = {
  Auth: {
    Cognito: {
      region: "Sus-east-1", // ex: "us-east-1"
      userPoolId: "us-east-1_o3Krw0Z0S", // ex: "us-east-1_xxxxx"
      userPoolClientId: "4kv3irhk9mdkk0gvad1rkclhan",
      loginWith: {
        email: true
      }
    }
  }
};

export default amplifyConfig;
