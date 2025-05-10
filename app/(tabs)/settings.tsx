import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Switch, ScrollView, Alert, Platform } from 'react-native';
import { Save, Key, MessageSquare, Filter, Bell, Delete } from 'lucide-react-native';
import { useSettingsStore } from '@/stores/settings';

export default function SettingsScreen() {
  const { 
    settings, 
    updateTelegramSettings, 
    updateFilterSettings, 
    updateNotificationSettings,
    clearAllData 
  } = useSettingsStore();
  
  const [telegramToken, setTelegramToken] = useState(settings.telegramToken);
  const [telegramChatId, setTelegramChatId] = useState(settings.telegramChatId);
  const [filterPhoneNumbers, setFilterPhoneNumbers] = useState(settings.filterPhoneNumbers);
  const [filterKeywords, setFilterKeywords] = useState(settings.filterKeywords);
  
  const saveTelegramSettings = () => {
    if (!telegramToken.trim()) {
      Alert.alert('Error', 'Telegram Bot Token cannot be empty');
      return;
    }
    if (!telegramChatId.trim()) {
      Alert.alert('Error', 'Telegram Chat ID cannot be empty');
      return;
    }
    
    updateTelegramSettings(telegramToken.trim(), telegramChatId.trim());
    Alert.alert('Success', 'Telegram settings saved successfully');
  };
  
  const saveFilterSettings = () => {
    updateFilterSettings(
      filterPhoneNumbers,
      filterKeywords,
      settings.isBlacklist
    );
    Alert.alert('Success', 'Filter settings saved successfully');
  };
  
  const toggleFilterMode = () => {
    updateFilterSettings(
      settings.filterPhoneNumbers,
      settings.filterKeywords,
      !settings.isBlacklist
    );
  };
  
  const toggleNotifications = () => {
    updateNotificationSettings(!settings.showNotifications);
  };
  
  const handleClearAllData = () => {
    Alert.alert(
      'Confirm Reset',
      'This will clear all settings and message history. This action cannot be undone. Continue?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Reset All Data',
          onPress: () => {
            clearAllData();
            Alert.alert('Success', 'All data has been reset');
          },
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>
      
      <ScrollView style={styles.content}>
        {/* Telegram Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Telegram Settings</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Bot Token</Text>
            <TextInput
              style={styles.input}
              value={telegramToken}
              onChangeText={setTelegramToken}
              placeholder="Enter your Telegram bot token"
              secureTextEntry={true}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Chat ID</Text>
            <TextInput
              style={styles.input}
              value={telegramChatId}
              onChangeText={setTelegramChatId}
              placeholder="Enter your Telegram chat ID"
              keyboardType="number-pad"
            />
          </View>
          
          <TouchableOpacity 
            style={styles.saveButton}
            onPress={saveTelegramSettings}
          >
            <Save size={18} color="#fff" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Save Telegram Settings</Text>
          </TouchableOpacity>
          
          <View style={styles.infoBox}>
            <Key size={16} color="#1E88E5" style={styles.infoIcon} />
            <Text style={styles.infoText}>
              You need to create a Telegram bot using BotFather and get a chat ID. 
              Visit the Help section for detailed instructions.
            </Text>
          </View>
        </View>
        
        {/* Filtering Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Message Filtering</Text>
          
          <View style={styles.switchRow}>
            <View>
              <Text style={styles.switchLabel}>Filter Mode</Text>
              <Text style={styles.switchDescription}>
                {settings.isBlacklist 
                  ? 'Blacklist (forward all except filtered)' 
                  : 'Whitelist (only forward filtered)'}
              </Text>
            </View>
            <Switch
              value={settings.isBlacklist}
              onValueChange={toggleFilterMode}
              trackColor={{ false: '#81c784', true: '#767577' }}
              thumbColor={settings.isBlacklist ? '#f4f3f4' : '#43A047'}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Phone Numbers</Text>
            <TextInput
              style={styles.input}
              value={filterPhoneNumbers}
              onChangeText={setFilterPhoneNumbers}
              placeholder="Enter phone numbers separated by commas"
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Keywords</Text>
            <TextInput
              style={styles.input}
              value={filterKeywords}
              onChangeText={setFilterKeywords}
              placeholder="Enter keywords separated by commas"
            />
          </View>
          
          <TouchableOpacity 
            style={styles.saveButton}
            onPress={saveFilterSettings}
          >
            <Filter size={18} color="#fff" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Save Filter Settings</Text>
          </TouchableOpacity>
        </View>
        
        {/* Notification Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          
          <View style={styles.switchRow}>
            <View>
              <Text style={styles.switchLabel}>Show Notifications</Text>
              <Text style={styles.switchDescription}>
                Display notifications when messages are forwarded
              </Text>
            </View>
            <Switch
              value={settings.showNotifications}
              onValueChange={toggleNotifications}
              trackColor={{ false: '#767577', true: '#81c784' }}
              thumbColor={settings.showNotifications ? '#43A047' : '#f4f3f4'}
            />
          </View>
        </View>
        
        {/* Reset Data */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data Management</Text>
          
          <TouchableOpacity 
            style={styles.dangerButton}
            onPress={handleClearAllData}
          >
            <Delete size={18} color="#fff" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Reset All Data</Text>
          </TouchableOpacity>
          
          <Text style={styles.dangerText}>
            This will clear all settings and message history. This action cannot be undone.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    paddingTop: 48,
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 12,
    fontSize: 14,
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#1E88E5',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  buttonIcon: {
    marginRight: 8,
  },
  infoBox: {
    backgroundColor: '#E3F2FD',
    borderRadius: 6,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  infoIcon: {
    marginRight: 10,
    marginTop: 2,
  },
  infoText: {
    fontSize: 12,
    color: '#333',
    flex: 1,
    lineHeight: 18,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  switchLabel: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  switchDescription: {
    fontSize: 12,
    color: '#666',
    maxWidth: 240,
  },
  dangerButton: {
    backgroundColor: '#E53935',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  dangerText: {
    fontSize: 12,
    color: '#E53935',
    textAlign: 'center',
  },
});