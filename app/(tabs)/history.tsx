import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { MessageCircle, Calendar, User, Phone, Trash2 } from 'lucide-react-native';

// Mock data for message history
const mockMessages = [
  {
    id: '1',
    sender: '+1234567890',
    content: 'Your verification code is 123456',
    timestamp: '2023-05-15 14:30',
    forwarded: true
  },
  {
    id: '2',
    sender: '+1987654321',
    content: 'Hi! Are you available for a meeting tomorrow?',
    timestamp: '2023-05-15 13:15',
    forwarded: true
  },
  {
    id: '3',
    sender: '+1555555555',
    content: 'Your package has been delivered.',
    timestamp: '2023-05-14 10:45',
    forwarded: true
  },
  {
    id: '4',
    sender: '+1444444444',
    content: 'Payment of $50.00 received. Thank you!',
    timestamp: '2023-05-13 16:20',
    forwarded: false
  },
  {
    id: '5',
    sender: '+1333333333',
    content: 'Reminder: Your appointment is tomorrow at 2PM.',
    timestamp: '2023-05-12 09:10',
    forwarded: true
  }
];

export default function HistoryScreen() {
  const [messages, setMessages] = useState(mockMessages);
  const [expandedMessage, setExpandedMessage] = useState<string | null>(null);

  const deleteMessage = (id: string) => {
    setMessages(messages.filter(message => message.id !== id));
  };

  const toggleExpand = (id: string) => {
    setExpandedMessage(expandedMessage === id ? null : id);
  };

  const renderMessage = ({ item }: { item: typeof mockMessages[0] }) => {
    const isExpanded = expandedMessage === item.id;
    
    return (
      <TouchableOpacity 
        style={styles.messageCard}
        onPress={() => toggleExpand(item.id)}
      >
        <View style={styles.messageHeader}>
          <View style={styles.senderContainer}>
            <User size={16} color="#666" style={styles.icon} />
            <Text style={styles.senderText} numberOfLines={1}>{item.sender}</Text>
          </View>
          <View style={[
            styles.statusBadge, 
            item.forwarded ? styles.forwardedBadge : styles.pendingBadge
          ]}>
            <Text style={styles.statusText}>
              {item.forwarded ? 'Forwarded' : 'Failed'}
            </Text>
          </View>
        </View>
        
        <View style={styles.messageContent}>
          <Text 
            style={styles.contentText} 
            numberOfLines={isExpanded ? undefined : 2}
          >
            {item.content}
          </Text>
        </View>
        
        <View style={styles.messageFooter}>
          <View style={styles.timeContainer}>
            <Calendar size={14} color="#666" style={styles.icon} />
            <Text style={styles.timeText}>{item.timestamp}</Text>
          </View>
          
          {isExpanded && (
            <TouchableOpacity 
              style={styles.deleteButton}
              onPress={() => deleteMessage(item.id)}
            >
              <Trash2 size={16} color="#E53935" />
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Message History</Text>
      </View>
      
      {messages.length === 0 ? (
        <View style={styles.emptyContainer}>
          <MessageCircle size={60} color="#ccc" />
          <Text style={styles.emptyText}>No message history</Text>
          <Text style={styles.emptySubtext}>
            Messages that have been forwarded to Telegram will appear here
          </Text>
        </View>
      ) : (
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
        />
      )}
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
  list: {
    padding: 16,
  },
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});