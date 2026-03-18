import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'egms-feedback-mobile',
  webDir: 'dist',
  server: {
    androidScheme: 'http'
  }
};

export default config;