const dev = {
  MAX_ATTACHMENT_SIZE: 5000000,
  s3: {
    REGION: "us-east-1",
    BUCKET: "econmag-bucket",
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://cdjvuib84m.execute-api.us-east-1.amazonaws.com/production/",
    authorizationType: "NONE",
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_E4bYP5bYv",
    APP_CLIENT_ID: "5odjpv35ou3m49t63lhn4mgogk",
    IDENTITY_POOL_ID: "us-east-1:6e770ce2-d455-4d5a-903b-0ce67a139a60",
  },
};

const prod = {
  MAX_ATTACHMENT_SIZE: 5000000,
  s3: {
    REGION: "us-east-1",
    BUCKET: "econmag-bucket",
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://cdjvuib84m.execute-api.us-east-1.amazonaws.com/production/",
    authorizationType: "NONE",
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_E4bYP5bYv",
    APP_CLIENT_ID: "5odjpv35ou3m49t63lhn4mgogk",
    IDENTITY_POOL_ID: "us-east-1:6e770ce2-d455-4d5a-903b-0ce67a139a60",
  },
};

const config = process.env.REACT_APP_STAGE === "prod" ? prod : dev;

export default {
  // Add common config values here
  MAX_ATTACHMENT_SIZE: 5000000,
  ...config,
};
