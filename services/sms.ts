import { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import { useSettingsStore } from '@/stores/settings';

interface SmsStats {
  totalForwarded: number;
  todayForwarded: number;
  lastForwarded: string;
}

export function useSmsService() {
  const { settings } = useSettingsStore();
  const [isServiceActive, setIsServiceActive] = useState(false);
  const [stats, setStats] = useState<SmsStats>({
    totalForwarded: 0,
    todayForwarded: 0,
    lastForwarded: 'Never'
  });

  useEffect(() => {
    // In a real implementation, this would check if the service is running
    // and retrieve actual statistics from persistent storage
    
    // Load saved stats
    const loadStats = async () => {
      // Simulated stats loading
      // In a real app, this would come from AsyncStorage or another storage mechanism
      setStats({
        totalForwarded: 42,
        todayForwarded: 5,
        lastForwarded: '10 minutes ago'
      });
    };
    
    loadStats();
  }, []);

  const toggleService = () => {
    // In a real implementation, this would start or stop the native SMS listening service
    
    // If telegramToken and chatId are not set, don't allow enabling the service
    if (!isServiceActive && (!settings.telegramToken || !settings.telegramChatId)) {
      alert('Please configure your Telegram Bot Token and Chat ID in Settings first.');
      return;
    }
    
    setIsServiceActive(prev => !prev);
    
    if (!isServiceActive) {
      // Service is being activated
      // Update stats to simulate activity
      setStats(prevStats => ({
        ...prevStats,
        lastForwarded: 'Just now'
      }));
    }
  };

  const sendSmsToTelegram = async (sender: string, message: string) => {
    // In a real implementation, this would send the SMS to the Telegram API
    // using the configured bot token and chat ID
    
    if (Platform.OS === 'web') {
      console.warn('Cannot send SMS on web platform');
      return false;
    }
    
    if (!settings.telegramToken || !settings.telegramChatId) {
      console.error('Telegram settings not configured');
      return false;
    }
    
    // In a real app, we would make an actual API call here
    // For demo purposes, we'll simulate a successful API call
    
    // Update stats
    setStats(prevStats => ({
      totalForwarded: prevStats.totalForwarded + 1,
      todayForwarded: prevStats.todayForwarded + 1,
      lastForwarded: 'Just now'
    }));
    
    return true;
  };

  return {
    isServiceActive,
    toggleService,
    stats,
    sendSmsToTelegram
  };
}