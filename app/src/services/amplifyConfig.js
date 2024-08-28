export const _config = {
  Auth: {
    Cognito: {
      region: import.meta.env.VITE_URL_AWS_REGION,
      userPoolId: import.meta.env.VITE_URL_AWS_USERPOOLID,
      userPoolClientId: import.meta.env.VITE_URL_AWS_USERPOOLWEBCLIENTID,
    },
  },
};
