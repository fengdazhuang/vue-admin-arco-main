import { mergeConfig } from 'vite';
import baseConig from './vite.config.base';

export default mergeConfig(
  {
    mode: 'production',
      server: {
          host: 'localhost',
          port: 8081,
          proxy: {
              "/admin": {
                  target: "http://localhost:8001"
              },
              "/competition":{
                  target: "http://localhost:8004"
              }
          }
      },
  },
  baseConig
);
