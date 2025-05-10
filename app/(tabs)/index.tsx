import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Switch, ScrollView, ActivityIndicator, Alert, Platform } from 'react-native';
import { MessageCircle, TriangleAlert as AlertTriangle, Info as InfoIcon } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import { usePermissionsService } from '@/services/permissions';
import { useSmsService } from '@/services/sms';

export default function HomeScreen() {
  const { hasPermissions, requestPermissions, isLoading } = usePermissionsService();
  const { isServiceActive, toggleService, stats } = useSmsService();

  useEffect(() => {
    if (Platform.OS === 'web') {
      Alert.alert(
        'Platform Warning',
        'SMS functionality requires Android. This preview shows the UI only.'
      );
    }
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      <View style={styles.header}>
        <Text style={styles.title}>SMS Forwarder</Text>
      </View>
      
      <ScrollView style={styles.content}>
        {!hasPermissions ? (
          <View style={styles.permissionContainer}>
            <AlertTriangle size={60} color="#E53935" style={styles.icon} />
            <Text style={styles.permissionTitle}>SMS Permission Required</Text>
            <Text style={styles.permissionText}>
              This app needs permission to read your SMS messages in order to forward them to Telegram.
              Your messages are only forwarded to your configured Telegram bot and are not stored or sent elsewhere.
            </Text>
            <TouchableOpacity 
              style={styles.permissionButton}
              onPress={requestPermissions}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Grant Permissions</Text>
              )}
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <View style={styles.statusCard}>
              <View style={styles.statusHeader}>
                <Text style={styles.statusTitle}>Forwarding Service</Text>
                <Switch
                  value={isServiceActive}
                  onValueChange={toggleService}
                  trackColor={{ false: '#767577', true: '#81c784' }}
                  thumbColor={isServiceActive ? '#43A047' : '#f4f3f4'}
                />
              </View>
              <View style={styles.statusInfo}>
                <View style={[styles.statusIndicator, isServiceActive ? styles.statusActive : styles.statusInactive]}>
                  <Text style={styles.statusText}>
                    {isServiceActive ? 'Active' : 'Inactive'}
                  </Text>
                </View>
                <Text style={styles.statusDescription}>
                  {isServiceActive 
                    ? 'Service is running. New SMS messages will be forwarded to Telegram.' 
                    : 'Service is stopped. SMS messages will not be forwarded.'}
                </Text>
              </View>
            </View>
            
            <View style={styles.statsCard}>
              <Text style={styles.cardTitle}>Statistics</Text>
              <View style={styles.statRow}>
                <MessageCircle size={18} color="#1E88E5" />
                <Text style={styles.statLabel}>Total forwarded:</Text>
                <Text style={styles.statValue}>{stats.totalForwarded}</Text>
              </View>
              <View style={styles.statRow}>
                <MessageCircle size={18} color="#1E88E5" />
                <Text style={styles.statLabel}>Forwarded today:</Text>
                <Text style={styles.statValue}>{stats.todayForwarded}</Text>
              </View>
              <View style={styles.statRow}>
                <MessageCircle size={18} color="#1E88E5" />
                <Text style={styles.statLabel}>Last forwarded:</Text>
                <Text style={styles.statValue}>{stats.lastForwarded}</Text>
              </View>
            </View>
            
            <View style={styles.infoCard}>
              <InfoIcon size={20} color="#1E88E5" style={styles.infoIcon} />
              <Text style={styles.infoText}>
                Make sure your Telegram bot token and chat ID are correctly configured in Settings.
              </Text>
            </View>
          </>
        )}
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
  permissionContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  icon: {
    marginBottom: 16,
  },
  permissionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
    textAlign: 'center',
  },
  permissionText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  permissionButton: {
    backgroundColor: '#1E88E5',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  statusCard: {
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
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  statusInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIndicator: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginRight: 12,
  },
  statusActive: {
    backgroundColor: '#E8F5E9',
  },
  statusInactive: {
    backgroundColor: '#FFEBEE',
  },
  statusText: {
    fontWeight: '600',
    fontSize: 12,
    color: '#333',
  },
  statusDescription: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  statsCard: {
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
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statLabel: {
    fontSize: 14,
    color: '#333',
    marginLeft: 8,
    flex: 1,
  },
  statValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  infoCard: {
    backgroundColor: '#E3F2FD',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIcon: {
    marginRight: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
});