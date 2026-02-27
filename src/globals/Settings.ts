// Removed: import type { GlobalConfig } from 'payload';

/**
 * Settings configuration - previously a Payload GlobalConfig.
 * Now just a type definition for the settings shape until
 * the Hono API + Drizzle integration is complete.
 */
export interface SettingsConfig {
  companyName: string;
  phone: string;
  email: string;
  licenseNumber: string;
  insuranceAmount: string;
  bbbRating: string;
  missionStatement: string;
  stats: Array<{ value: string; label: string }>;
  values: Array<{ title: string; description: string }>;
  brandVoice: string;
  brandTone: string;
  brandAvoid: string;
  themePreference: 'candlelight' | 'original';
  warranty: {
    enableNotifications: boolean;
    notificationEmailTemplate: string;
  };
}

export const defaultSettings: SettingsConfig = {
  companyName: 'Texas Prestige Masonry',
  phone: '',
  email: '',
  licenseNumber: '',
  insuranceAmount: '',
  bbbRating: '',
  missionStatement: '',
  stats: [],
  values: [],
  brandVoice: '',
  brandTone: '',
  brandAvoid: '',
  themePreference: 'candlelight',
  warranty: {
    enableNotifications: false,
    notificationEmailTemplate: '',
  },
};
