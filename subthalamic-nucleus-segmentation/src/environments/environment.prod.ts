import { server, vapidKey } from './local-env.prod';

export const environment = {
  production: true,
  server,
  vapidPublicKey: vapidKey
};
