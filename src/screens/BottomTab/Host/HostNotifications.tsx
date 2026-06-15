// HostNotificationScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  FlatList,
  Modal,
  Switch,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const HostNotifications = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [pushEnabled, setPushEnabled] = useState(true);

  const [notifications, setNotifications] = useState([
    // Player Joined Notifications
    {
      id: '1',
      type: 'player_joined',
      title: 'New Player Joined!',
      message: 'John Doe joined "Weekend Warriors Cup"',
      time: 'Just now',
      icon: '⚽',
      isRead: false,
      priority: 'high',
      playerName: 'John Doe',
      playerAvatar: '👤',
      matchTitle: 'Weekend Warriors Cup',
      matchId: 'M001',
    },
    {
      id: '2',
      type: 'player_joined',
      title: 'Player Joined',
      message: 'Sarah Williams joined "5v5 Tournament"',
      time: '5 min ago',
      icon: '⚽',
      isRead: false,
      priority: 'high',
      playerName: 'Sarah Williams',
      playerAvatar: '👩',
      matchTitle: '5v5 Tournament',
      matchId: 'M002',
    },
    {
      id: '3',
      type: 'player_joined',
      title: 'New Player Alert',
      message: 'Mike Roberts joined "Night Football League"',
      time: '15 min ago',
      icon: '⚽',
      isRead: true,
      priority: 'medium',
      playerName: 'Mike Roberts',
      playerAvatar: '👤',
      matchTitle: 'Night Football League',
      matchId: 'M003',
    },
    {
      id: '4',
      type: 'player_joined',
      title: 'Player Joined',
      message: 'Emma Watson joined "Sunday League"',
      time: '1 hour ago',
      icon: '⚽',
      isRead: true,
      priority: 'low',
      playerName: 'Emma Watson',
      playerAvatar: '👩',
      matchTitle: 'Sunday League',
      matchId: 'M004',
    },

    // Match Full Notifications
    {
      id: '5',
      type: 'match_full',
      title: 'Match is Full!',
      message:
        '"Weekend Warriors Cup" has reached full capacity. 16/16 slots filled.',
      time: '10 min ago',
      icon: '🟢',
      isRead: false,
      priority: 'high',
      matchTitle: 'Weekend Warriors Cup',
      slotsFilled: 16,
      totalSlots: 16,
    },
    {
      id: '6',
      type: 'match_full',
      title: 'Match Full Alert',
      message: '"5v5 Tournament" is now fully booked! 12/12 players confirmed.',
      time: '30 min ago',
      icon: '🟢',
      isRead: true,
      priority: 'high',
      matchTitle: '5v5 Tournament',
      slotsFilled: 12,
      totalSlots: 12,
    },
    {
      id: '7',
      type: 'match_full',
      title: 'Waiting List Started',
      message:
        '"Night Football League" is full. 3 players added to waiting list.',
      time: '2 hours ago',
      icon: '📋',
      isRead: true,
      priority: 'medium',
      matchTitle: 'Night Football League',
      waitingList: 3,
    },

    // Match Cancelled Notifications
    {
      id: '8',
      type: 'match_cancelled',
      title: 'Match Cancelled',
      message: '"Corporate Cup" has been cancelled due to low participation.',
      time: '1 hour ago',
      icon: '❌',
      isRead: false,
      priority: 'high',
      matchTitle: 'Corporate Cup',
      reason: 'Low participation',
    },
    {
      id: '9',
      type: 'match_cancelled',
      title: 'Match Cancelled',
      message: '"Monday Night League" cancelled. Refunds have been processed.',
      time: 'Yesterday',
      icon: '❌',
      isRead: true,
      priority: 'medium',
      matchTitle: 'Monday Night League',
      reason: 'Weather conditions',
    },
    {
      id: '10',
      type: 'match_cancelled',
      title: 'Match Postponed',
      message: '"Weekend Cup" has been postponed to next Saturday.',
      time: '2 days ago',
      icon: '⏰',
      isRead: true,
      priority: 'low',
      matchTitle: 'Weekend Cup',
      newDate: 'Next Saturday',
    },
  ]);

  const tabs = [
    { id: 'all', label: 'All', icon: '🔔', count: notifications.length },
    {
      id: 'player_joined',
      label: 'Joined',
      icon: '⚽',
      count: notifications.filter(n => n.type === 'player_joined').length,
    },
    {
      id: 'match_full',
      label: 'Full',
      icon: '🟢',
      count: notifications.filter(n => n.type === 'match_full').length,
    },
    {
      id: 'match_cancelled',
      label: 'Cancel',
      icon: '❌',
      count: notifications.filter(n => n.type === 'match_cancelled').length,
    },
  ];

  const markAsRead = id => {
    setNotifications(prev =>
      prev.map(notif => (notif.id === id ? { ...notif, isRead: true } : notif)),
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, isRead: true })));
    // Alert.alert('Success', 'All notifications marked as read');
  };

  const clearAll = () => {
    // Alert.alert(
    //   'Clear All',
    //   'Are you sure you want to clear all notifications?',
    //   [
    //     { text: 'Cancel', style: 'cancel' },
    //     {
    //       text: 'Clear',
    //       style: 'destructive',
    //       onPress: () => {
    //         setNotifications([]);
    //         Alert.alert('Success', 'All notifications cleared');
    //       },
    //     },
    //   ],
    // );
  };

  const handleNotificationPress = item => {
    markAsRead(item.id);
    let actionMessage = '';
    if (item.type === 'player_joined') {
      actionMessage = `View ${item.playerName}'s profile and match details`;
    } else if (item.type === 'match_full') {
      actionMessage = `Manage ${item.matchTitle} - View player list`;
    } else if (item.type === 'match_cancelled') {
      actionMessage = `Review cancellation details for ${item.matchTitle}`;
    }
    // Alert.alert(item.title, `${item.message}\n\n${actionMessage}`);
  };

  const getFilteredNotifications = () => {
    if (activeTab === 'all') {
      return notifications;
    }
    return notifications.filter(n => n.type === activeTab);
  };

  const getPriorityColor = priority => {
    switch (priority) {
      case 'high':
        return '#FF4444';
      case 'medium':
        return '#FFA500';
      case 'low':
        return '#22C35D';
      default:
        return '#888888';
    }
  };

  const getTypeIcon = type => {
    switch (type) {
      case 'player_joined':
        return '⚽';
      case 'match_full':
        return '🟢';
      case 'match_cancelled':
        return '❌';
      default:
        return '🔔';
    }
  };

  const getTypeColor = type => {
    switch (type) {
      case 'player_joined':
        return '#22C35D';
      case 'match_full':
        return '#3498DB';
      case 'match_cancelled':
        return '#FF4444';
      default:
        return '#888888';
    }
  };

  const NotificationItem = ({ item }) => {
    const getDetailText = () => {
      if (item.type === 'player_joined') {
        return `👤 ${item.playerName} • ${item.matchTitle}`;
      } else if (item.type === 'match_full') {
        return `📊 ${item.slotsFilled}/${item.totalSlots} slots filled`;
      } else if (item.type === 'match_cancelled') {
        return item.reason ? `📋 Reason: ${item.reason}` : `📋 Match cancelled`;
      }
      return '';
    };

    return (
      <TouchableOpacity
        style={[
          styles.notificationCard,
          !item.isRead && styles.notificationCardUnread,
        ]}
        onPress={() => handleNotificationPress(item)}
        activeOpacity={0.7}
      >
        <View style={styles.notificationIconContainer}>
          <View
            style={[
              styles.notificationIconBg,
              { backgroundColor: getTypeColor(item.type) + '20' },
            ]}
          >
            <Text style={styles.notificationIcon}>{item.icon}</Text>
          </View>
          {!item.isRead && <View style={styles.unreadDot} />}
        </View>

        <View style={styles.notificationContent}>
          <View style={styles.notificationHeader}>
            <Text style={styles.notificationTitle}>{item.title}</Text>
            <View
              style={[
                styles.priorityBadge,
                { backgroundColor: getPriorityColor(item.priority) + '20' },
              ]}
            >
              <Text
                style={[
                  styles.priorityText,
                  { color: getPriorityColor(item.priority) },
                ]}
              >
                {item.priority === 'high'
                  ? 'Urgent'
                  : item.priority === 'medium'
                  ? 'Soon'
                  : 'Info'}
              </Text>
            </View>
          </View>
          <Text style={styles.notificationMessage}>{item.message}</Text>
          <View style={styles.notificationFooter}>
            <Text style={styles.notificationTime}>🕐 {item.time}</Text>
            <Text style={styles.detailText}>{getDetailText()}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderHeader = () => {
    const filteredCount = getFilteredNotifications().length;
    const unreadCount = notifications.filter(n => !n.isRead).length;
    const { top } = useSafeAreaInsets();
    return (
      <View style={[styles.headerContainer, { paddingTop: top }]}>
        <View style={styles.topBar}>
          <Text style={styles.headerTitle}>Notifications</Text>
          {/* <TouchableOpacity style={styles.settingsButton}>
            <Text style={styles.settingsIcon}>⚙️</Text>
          </TouchableOpacity> */}
        </View>

        {/* Push Notification Toggle */}
        <View style={styles.pushToggleContainer}>
          <View style={styles.pushToggleLeft}>
            <Text style={styles.pushToggleIcon}>📱</Text>
            <View>
              <Text style={styles.pushToggleLabel}>Push Notifications</Text>
              <Text style={styles.pushToggleDesc}>
                Get alerts when players join
              </Text>
            </View>
          </View>
          <Switch
            value={pushEnabled}
            onValueChange={setPushEnabled}
            trackColor={{ false: '#2A2A2A', true: '#22C35D' }}
            thumbColor={pushEnabled ? '#FFFFFF' : '#f4f3f4'}
          />
        </View>

        {/* Stats Summary */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{notifications.length}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: '#22C35D' }]}>
              {unreadCount}
            </Text>
            <Text style={styles.statLabel}>Unread</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              {notifications.filter(n => n.type === 'player_joined').length}
            </Text>
            <Text style={styles.statLabel}>Joined</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              {notifications.filter(n => n.type === 'match_full').length}
            </Text>
            <Text style={styles.statLabel}>Match Full</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              {notifications.filter(n => n.type === 'match_cancelled').length}
            </Text>
            <Text style={styles.statLabel}>Cancelled</Text>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          {tabs.map(tab => (
            <TouchableOpacity
              key={tab.id}
              style={[styles.tab, activeTab === tab.id && styles.tabActive]}
              onPress={() => setActiveTab(tab.id)}
            >
              <Text style={styles.tabIcon}>{tab.icon}</Text>
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab.id && styles.tabTextActive,
                ]}
              >
                {tab.label}
              </Text>
              {tab.count > 0 && (
                <View
                  style={[
                    styles.tabBadge,
                    activeTab === tab.id && styles.tabBadgeActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.tabBadgeText,
                      activeTab === tab.id && styles.tabBadgeTextActive,
                    ]}
                  >
                    {tab.count}
                  </Text>
                </View>
              )}
              {activeTab === tab.id && <View style={styles.tabIndicator} />}
            </TouchableOpacity>
          ))}
        </View>

        {/* Legend */}
        <View style={styles.legendContainer}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#22C35D' }]} />
            <Text style={styles.legendText}>Player Joined</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#3498DB' }]} />
            <Text style={styles.legendText}>Match Full</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#FF4444' }]} />
            <Text style={styles.legendText}>Match Cancelled</Text>
          </View>
        </View>

        {/* Action Bar */}
        <View style={styles.actionBar}>
          <Text style={styles.filterInfoText}>
            Showing {filteredCount} notifications
          </Text>
          <View style={styles.actionButtons}>
            {unreadCount > 0 && (
              <TouchableOpacity
                onPress={markAllAsRead}
                style={styles.markAllButton}
              >
                <Text style={styles.markAllText}>Mark all read</Text>
              </TouchableOpacity>
            )}
            {notifications.length > 0 && (
              <TouchableOpacity onPress={clearAll} style={styles.clearButton}>
                <Text style={styles.clearText}>Clear all</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>🔔</Text>
      <Text style={styles.emptyTitle}>No Notifications</Text>
      <Text style={styles.emptyMessage}>
        You'll receive notifications when players join your matches, matches
        fill up, or when matches are cancelled.
      </Text>
    </View>
  );

  const filteredNotifications = getFilteredNotifications();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      <FlatList
        data={filteredNotifications}
        renderItem={({ item }) => <NotificationItem item={item} />}
        keyExtractor={item => item.id}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        initialNumToRender={10}
        removeClippedSubviews={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  listContent: {
    paddingBottom: 30,
  },
  // Header Styles
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  settingsButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1A1A1A',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  settingsIcon: {
    fontSize: 22,
  },
  // Push Toggle
  pushToggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  pushToggleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  pushToggleIcon: {
    fontSize: 28,
  },
  pushToggleLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  pushToggleDesc: {
    fontSize: 11,
    color: '#888888',
  },
  // Stats Container
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#1A1A1A',
    borderRadius: 20,
    paddingVertical: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 10,
    color: '#888888',
  },
  statDivider: {
    width: 1,
    height: 35,
    backgroundColor: '#2A2A2A',
  },
  // Tabs
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#1A1A1A',
    borderRadius: 30,
    padding: 4,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 26,
    gap: 6,
    position: 'relative',
  },
  tabActive: {
    backgroundColor: '#22C35D20',
  },
  tabIcon: {
    fontSize: 14,
  },
  tabText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#888888',
  },
  tabTextActive: {
    color: '#22C35D',
  },
  tabBadge: {
    backgroundColor: '#2A2A2A',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 10,
  },
  tabBadgeActive: {
    backgroundColor: '#22C35D',
  },
  tabBadgeText: {
    fontSize: 9,
    fontWeight: '600',
    color: '#888888',
  },
  tabBadgeTextActive: {
    color: '#FFFFFF',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: -2,
    width: 35,
    height: 2,
    backgroundColor: '#22C35D',
    borderRadius: 1,
  },
  // Legend
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 16,
    paddingVertical: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendText: {
    fontSize: 11,
    color: '#888888',
  },
  // Action Bar
  actionBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  filterInfoText: {
    fontSize: 12,
    color: '#888888',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  markAllButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  markAllText: {
    fontSize: 12,
    color: '#22C35D',
    fontWeight: '600',
  },
  clearButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  clearText: {
    fontSize: 12,
    color: '#FF4444',
    fontWeight: '600',
  },
  // Notification Card
  notificationCard: {
    flexDirection: 'row',
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  notificationCardUnread: {
    backgroundColor: '#22C35D10',
    borderColor: '#22C35D30',
  },
  notificationIconContainer: {
    position: 'relative',
    marginRight: 14,
  },
  notificationIconBg: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationIcon: {
    fontSize: 26,
  },
  unreadDot: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#22C35D',
    borderWidth: 2,
    borderColor: '#1A1A1A',
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  notificationTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
    flex: 1,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  priorityText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  notificationMessage: {
    fontSize: 13,
    color: '#BBBBBB',
    lineHeight: 18,
    marginBottom: 6,
  },
  notificationFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  notificationTime: {
    fontSize: 11,
    color: '#666666',
  },
  detailText: {
    fontSize: 11,
    color: '#22C35D',
    fontWeight: '500',
  },
  // Empty State
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  emptyMessage: {
    fontSize: 14,
    color: '#888888',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default HostNotifications;
