// src/amplifyConfig.js

const amplifyConfig = {
  Auth: {
    Cognito: {
      region: "us-east-1",
      userPoolId: "us-east-1_o3Krw0Z0S",
      userPoolClientId: "4kv3irhk9mdkk0gvad1rkclhan",
      loginWith: { email: true }
    }
  },
  API: {
    GraphQL: {
      endpoint: "https://6vzcu35bvrgqhaua2ox76pr4oq.appsync-api.us-east-1.amazonaws.com/graphql",
      region: "us-east-1",
      defaultAuthMode: "userPool"
    }
  }
};


