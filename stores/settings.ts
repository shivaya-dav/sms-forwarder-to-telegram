import { useState, useEffect } from 'react';

interface Settings {
  telegramToken: string;
  telegramChatId: string;
  filterPhoneNumbers: string;
  filterKeywords: string;
  isBlacklist: boolean;
  showNotifications: boolean;
}

const defaultSettings: Settings = {
  telegramToken: '',
  telegramChatId: '',
  filterPhoneNumbers: '',
  filterKeywords: '',
  isBlacklist: true, // true = blacklist, false = whitelist
  showNotifications: true
};

export function useSettingsStore() {
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  useEffect(() => {
    // In a real implementation, this would load settings from AsyncStorage
    // For demo purposes, we're using the default settings
    loadSettings();
  }, []);

  const loadSettings = async () => {
    // Simulate loading settings from storage
    // In a real app, this would use AsyncStorage or another storage solution
    setSettings(defaultSettings);
  };

  const saveSettings = async (newSettings: Settings) => {
    // Simulate saving settings to storage
    // In a real app, this would use AsyncStorage or another storage solution
    setSettings(newSettings);
  };

  const updateTelegramSettings = (token: string, chatId: string) => {
    const newSettings = {
      ...settings,
      telegramToken: token,
      telegramChatId: chatId
    };
    saveSettings(newSettings);
  };

  const updateFilterSettings = (
    phoneNumbers: string,
    keywords: string,
    isBlacklist: boolean
  ) => {
    const newSettings = {
      ...settings,
      filterPhoneNumbers: phoneNumbers,
      filterKeywords: keywords,
      isBlacklist
    };
    saveSettings(newSettings);
  };

  const updateNotificationSettings = (showNotifications: boolean) => {
    const newSettings = {
      ...settings,
      showNotifications
    };
    saveSettings(newSettings);
  };

  const clearAllData = () => {
    // Reset to default settings
    saveSettings(defaultSettings);
    // In a real app, this would also clear message history and other data
  };

  return {
    settings,
    updateTelegramSettings,
    updateFilterSettings,
    updateNotificationSettings,
    clearAllData
  };
}