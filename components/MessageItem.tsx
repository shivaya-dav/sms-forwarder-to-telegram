import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { User, Calendar, Trash2 } from 'lucide-react-native';

interface MessageItemProps {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  forwarded: boolean;
  expanded: boolean;
  onPress: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function MessageItem({
  id,
  sender,
  content,
  timestamp,
  forwarded,
  expanded,
  onPress,
  onDelete
}: MessageItemProps) {
  return (
    <TouchableOpacity 
      style={styles.messageCard}
      onPress={() => onPress(id)}
    >
      <View style={styles.messageHeader}>
        <View style={styles.senderContainer}>
          <User size={16} color="#666" style={styles.icon} />
          <Text style={styles.senderText} numberOfLines={1}>{sender}</Text>
        </View>
        <View style={[
          styles.statusBadge, 
          forwarded ? styles.forwardedBadge : styles.pendingBadge
        ]}>
          <Text style={styles.statusText}>
            {forwarded ? 'Forwarded' : 'Failed'}
          </Text>
        </View>
      </View>
      
      <View style={styles.messageContent}>
        <Text 
          style={styles.contentText} 
          numberOfLines={expanded ? undefined : 2}
        >
          {content}
        </Text>
      </View>
      
      <View style={styles.messageFooter}>
        <View style={styles.timeContainer}>
          <Calendar size={14} color="#666" style={styles.icon} />
          <Text style={styles.timeText}>{timestamp}</Text>
        </View>
        
        {expanded && (
          <TouchableOpacity 
            style={styles.deleteButton}
            onPress={() => onDelete(id)}
          >
            <Trash2 size={16} color="#E53935" />
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  messageCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  senderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  senderText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginLeft: 4,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginLeft: 8,
  },
  forwardedBadge: {
    backgroundColor: '#E8F5E9',
  },
  pendingBadge: {
    backgroundColor: '#FFEBEE',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  messageContent: {
    marginBottom: 12,
  },
  contentText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  messageFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  icon: {
    marginRight: 4,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 6,
  },
  deleteText: {
    fontSize: 12,
    color: '#E53935',
    marginLeft: 4,
  },
});