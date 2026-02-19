// OAuth and Payment Configuration

export const CONFIG = {
  paystack: {
    publicKey: "pk_test_2554897c67f7a1582cfb0287921bc8bd867690bc",
  },
  google: {
    clientId: "841707431867-80amcuekvmo57sumufv1i9k6he0kg8g6.apps.googleusercontent.com",
    redirectUri: `${window.location.origin}/auth/google/callback`,
  },
  github: {
    clientId: "Ov23liT4sHyZ7f4K6his",
    redirectUri: `${window.location.origin}/auth/github/callback`,
  },
};

export const getGoogleAuthUrl = () => {
  const params = new URLSearchParams({
    client_id: CONFIG.google.clientId,
    redirect_uri: CONFIG.google.redirectUri,
    response_type: "token",
    scope: "email profile",
    prompt: "select_account",
  });
  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
};

export const getGitHubAuthUrl = () => {
  const params = new URLSearchParams({
    client_id: CONFIG.github.clientId,
    redirect_uri: CONFIG.github.redirectUri,
    scope: "user:email",
  });
  return `https://github.com/login/oauth/authorize?${params.toString()}`;
};
