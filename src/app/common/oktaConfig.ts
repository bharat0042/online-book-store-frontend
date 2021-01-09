export default {
  oidc: {
    clientId: '0oa35mqzdthOiKtbh5d6',
    issuer: 'https://dev-7605412.okta.com/oauth2/default',
    redirectUri: 'http://localhost:4200/login/callback',
    scopes: ['openid', 'profile', 'email']
  },
  resourceServer: {
    messagesUrl: 'http://localhost:8080/v1/messages',
  },
};