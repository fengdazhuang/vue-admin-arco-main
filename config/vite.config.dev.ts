import { mergeConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import baseConig from './vite.config.base';

export default mergeConfig(
  {
    mode: 'development',
    // server: {
    //  host: 'localhost',
    //     port: 8081,
    //     proxy: {
    //         "/admin": {
    //             target: "http://localhost:8001"
    //         },
    //         "/competition":{
    //             target: "http://localhost:8004"
    //         }
    //     }
    // },
    plugins: [
      eslint({
        cache: false,
        include: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.vue'],
        exclude: ['node_modules'],
      }),
    ],
  },
  baseConig
);
