import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.joaquinmx.todo',
  appName: 'to-do',
  webDir: 'dist/to-do',
  server: {
    androidScheme: 'https'
  }
};

export default config;
