// ManageMatchesScreen.js
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  FlatList,
  Modal,
  ScrollView,
  Alert,
} from 'react-native';
import { RootNavigationProp } from '../../../types/navigationType';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// ==================== 5.1 Matches List Screen ====================
const HostMatchList = ({}) => {
  const [activeTab, setActiveTab] = useState('upcoming');
  // const navigation = useNavigation<RootNavigationProp<'HostTabs'>>();
  const navigation = useNavigation<RootNavigationProp<'HostTabs'>>();
  const [matches] = useState({
    upcoming: [
      {
        id: '1',
        title: 'Weekend Warriors Cup',
        date: 'Sat, May 10 • 6:00 PM',
        slotsFilled: 12,
        totalSlots: 16,
        earnings: 120,
        status: 'upcoming',
        location: 'Central Park Field',
        entryFee: 10,
        prizePool: 500,
        players: [
          {
            id: '1',
            name: 'John D.',
            avatar: '👤',
            paid: true,
            status: 'confirmed',
          },
          {
            id: '2',
            name: 'Mike R.',
            avatar: '👤',
            paid: true,
            status: 'confirmed',
          },
          {
            id: '3',
            name: 'Sarah L.',
            avatar: '👩',
            paid: true,
            status: 'confirmed',
          },
          {
            id: '4',
            name: 'Alex M.',
            avatar: '👤',
            paid: false,
            status: 'pending',
          },
          {
            id: '5',
            name: 'Chris P.',
            avatar: '👤',
            paid: true,
            status: 'confirmed',
          },
        ],
      },
      {
        id: '2',
        title: '5v5 Tournament',
        date: 'Sun, May 11 • 4:00 PM',
        slotsFilled: 8,
        totalSlots: 12,
        earnings: 120,
        status: 'upcoming',
        location: 'Brooklyn Sports Club',
        entryFee: 15,
        prizePool: 300,
        players: [
          {
            id: '1',
            name: 'Emma W.',
            avatar: '👩',
            paid: true,
            status: 'confirmed',
          },
          {
            id: '2',
            name: 'Tom H.',
            avatar: '👤',
            paid: true,
            status: 'confirmed',
          },
          {
            id: '3',
            name: 'Jerry M.',
            avatar: '👤',
            paid: false,
            status: 'pending',
          },
        ],
      },
      {
        id: '3',
        title: 'Night Football League',
        date: 'Fri, May 16 • 8:00 PM',
        slotsFilled: 6,
        totalSlots: 10,
        earnings: 72,
        status: 'upcoming',
        location: 'Stadium Lights Arena',
        entryFee: 12,
        prizePool: 400,
        players: [
          {
            id: '1',
            name: 'Lisa K.',
            avatar: '👩',
            paid: true,
            status: 'confirmed',
          },
          {
            id: '2',
            name: 'Paul S.',
            avatar: '👤',
            paid: false,
            status: 'pending',
          },
        ],
      },
    ],
    ongoing: [
      {
        id: '4',
        title: 'Friday Night Lights',
        date: 'Today • 8:30 PM',
        slotsFilled: 16,
        totalSlots: 16,
        earnings: 192,
        status: 'ongoing',
        location: 'Eastside Arena',
        entryFee: 12,
        prizePool: 450,
        players: [
          {
            id: '1',
            name: 'Anna B.',
            avatar: '👩',
            paid: true,
            status: 'confirmed',
          },
          {
            id: '2',
            name: 'Mark T.',
            avatar: '👤',
            paid: true,
            status: 'confirmed',
          },
        ],
      },
    ],
    completed: [
      {
        id: '5',
        title: 'Corporate Cup',
        date: 'Apr 28 • 7:00 PM',
        slotsFilled: 14,
        totalSlots: 14,
        earnings: 280,
        status: 'completed',
        location: 'Downtown Field',
        entryFee: 20,
        prizePool: 1000,
        players: [
          {
            id: '1',
            name: 'John D.',
            avatar: '👤',
            paid: true,
            status: 'confirmed',
          },
          {
            id: '2',
            name: 'Sarah L.',
            avatar: '👩',
            paid: true,
            status: 'confirmed',
          },
        ],
      },
      {
        id: '6',
        title: 'Sunday League',
        date: 'Apr 27 • 10:00 AM',
        slotsFilled: 20,
        totalSlots: 20,
        earnings: 160,
        status: 'completed',
        location: 'Queens Bridge Park',
        entryFee: 8,
        prizePool: 200,
        players: [
          {
            id: '1',
            name: 'Mike R.',
            avatar: '👤',
            paid: true,
            status: 'confirmed',
          },
          {
            id: '2',
            name: 'Emma W.',
            avatar: '👩',
            paid: true,
            status: 'confirmed',
          },
        ],
      },
    ],
  });

  const tabs = [
    {
      id: 'upcoming',
      label: 'Upcoming',
      icon: '📅',
      count: matches.upcoming.length,
    },
    {
      id: 'ongoing',
      label: 'Ongoing',
      icon: '⚡',
      count: matches.ongoing.length,
    },
    {
      id: 'completed',
      label: 'Completed',
      icon: '✓',
      count: matches.completed.length,
    },
  ];

  const getFillPercentage = (filled, total) => {
    return (filled / total) * 100;
  };

  const MatchCard = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('HostManageMatch')}
      // onPress={()=>navigation.navigate("HostSingleMatchDetail")}
      style={styles.matchCard}
      //   onPress={() => onMatchSelect(item)}
    >
      <View style={styles.matchCardHeader}>
        <View style={styles.matchTitleContainer}>
          <Text style={styles.matchIcon}>🏟️</Text>
          <View>
            <Text style={styles.matchTitle}>{item.title}</Text>
            <Text style={styles.matchLocation}>{item.location}</Text>
          </View>
        </View>
        <View
          style={[
            styles.statusBadge,
            item.status === 'upcoming' && styles.upcomingBadge,
            item.status === 'ongoing' && styles.ongoingBadge,
            item.status === 'completed' && styles.completedBadge,
          ]}
        >
          <Text
            style={[
              styles.statusText,
              item.status === 'upcoming' && styles.upcomingStatusText,
              item.status === 'ongoing' && styles.ongoingStatusText,
              item.status === 'completed' && styles.completedStatusText,
            ]}
          >
            {item.status.toUpperCase()}
          </Text>
        </View>
      </View>

      <View style={styles.matchDetails}>
        <View style={styles.matchDetailItem}>
          <Text style={styles.matchDetailIcon}>📅</Text>
          <Text style={styles.matchDetailText}>{item.date}</Text>
        </View>
        <View style={styles.matchDetailItem}>
          <Text style={styles.matchDetailIcon}>👥</Text>
          <Text style={styles.matchDetailText}>
            {item.slotsFilled}/{item.totalSlots} slots
          </Text>
        </View>
        <View style={styles.matchDetailItem}>
          <Text style={styles.matchDetailIcon}>💰</Text>
          <Text style={styles.matchDetailText}>${item.earnings} earned</Text>
        </View>
      </View>

      <View style={styles.slotsContainer}>
        <View style={styles.slotsBar}>
          <View
            style={[
              styles.slotsFill,
              {
                width: `${getFillPercentage(
                  item.slotsFilled,
                  item.totalSlots,
                )}%`,
              },
            ]}
          />
        </View>
      </View>

      <View style={styles.cardFooter}>
        <TouchableOpacity
          style={styles.viewButton}
          //   onPress={() => onMatchSelect(item)}
          onPress={() => navigation.navigate('HostManageMatch')}
        >
          <Text style={styles.viewButtonText}>View Details →</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
  const { top } = useSafeAreaInsets();
  const renderHeader = () => (
    <View style={[styles.listHeader, { paddingTop: top }]}>
      <View style={styles.topBar}>
        <Text style={styles.headerTitle}>Manage Matches</Text>
        {/* <TouchableOpacity style={styles.createButton}>
          <Text style={styles.createButtonText}>+ Create</Text>
        </TouchableOpacity> */}
      </View>

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
            <View
              style={[
                styles.tabCount,
                activeTab === tab.id && styles.tabCountActive,
              ]}
            >
              <Text
                style={[
                  styles.tabCountText,
                  activeTab === tab.id && styles.tabCountTextActive,
                ]}
              >
                {tab.count}
              </Text>
            </View>
            {activeTab === tab.id && <View style={styles.tabIndicator} />}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>📭</Text>
      <Text style={styles.emptyTitle}>No {activeTab} matches</Text>
      <Text style={styles.emptyMessage}>
        Your {activeTab} matches will appear here
      </Text>
      <TouchableOpacity style={styles.emptyButton}>
        <Text style={styles.emptyButtonText}>+ Create a Match</Text>
      </TouchableOpacity>
    </View>
  );

  const currentMatches = matches[activeTab] || [];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      <FlatList
        data={currentMatches}
        renderItem={({ item }) => <MatchCard item={item} />}
        keyExtractor={item => item.id}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

// ==================== 5.2 Match Detail (Host View) ====================
const MatchDetailHostView = ({
  match,
  onBack,
  onEdit,
  onCancel,
  onMarkComplete,
}) => {
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);

  const handleCancelMatch = () => {
    setShowCancelModal(false);
    if (onCancel) onCancel(match.id);
    // Alert.alert('Match Cancelled', `${match.title} has been cancelled.`);
    onBack();
  };

  const handleMarkComplete = () => {
    setShowCompleteModal(false);
    if (onMarkComplete) onMarkComplete(match.id);
    // Alert.alert(
    //   'Match Completed',
    //   `${match.title} has been marked as completed.`,
    // );
    onBack();
  };

  const getStatusColor = () => {
    switch (match.status) {
      case 'upcoming':
        return '#22C35D';
      case 'ongoing':
        return '#FFA500';
      case 'completed':
        return '#888888';
      default:
        return '#22C35D';
    }
  };

  const PlayerListItem = ({ player }) => (
    <View style={styles.playerItem}>
      <View style={styles.playerAvatarSmall}>
        <Text style={styles.playerAvatarText}>{player.avatar}</Text>
      </View>
      <View style={styles.playerInfo}>
        <Text style={styles.playerName}>{player.name}</Text>
        <Text style={styles.playerStatus}>{player.status}</Text>
      </View>
      <View
        style={[
          styles.paymentBadge,
          player.paid ? styles.paidBadge : styles.pendingBadge,
        ]}
      >
        <Text
          style={[
            styles.paymentText,
            player.paid ? styles.paidText : styles.pendingText,
          ]}
        >
          {player.paid ? 'Paid' : 'Pending'}
        </Text>
      </View>
    </View>
  );

  const CancelModal = () => (
    <Modal
      visible={showCancelModal}
      transparent
      animationType="fade"
      onRequestClose={() => setShowCancelModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.cancelModal}>
          <View style={styles.modalIconContainer}>
            <Text style={styles.modalIcon}>⚠️</Text>
          </View>
          <Text style={styles.modalTitle}>Cancel Match?</Text>
          <Text style={styles.modalDescription}>
            Are you sure you want to cancel "{match.title}"? This action cannot
            be undone.
            {match.slotsFilled > 0 &&
              ` ${match.slotsFilled} players will be notified.`}
          </Text>
          <View style={styles.modalActions}>
            <TouchableOpacity
              style={styles.modalCancelButton}
              onPress={() => setShowCancelModal(false)}
            >
              <Text style={styles.modalCancelText}>No, Keep</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalConfirmButton}
              onPress={handleCancelMatch}
            >
              <Text style={styles.modalConfirmText}>Yes, Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  const CompleteModal = () => (
    <Modal
      visible={showCompleteModal}
      transparent
      animationType="fade"
      onRequestClose={() => setShowCompleteModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.completeModal}>
          <View style={styles.modalIconContainer}>
            <Text style={styles.modalIcon}>✓</Text>
          </View>
          <Text style={styles.modalTitle}>Mark as Completed?</Text>
          <Text style={styles.modalDescription}>
            Mark "{match.title}" as completed. This will finalize all statistics
            and earnings.
          </Text>
          <View style={styles.modalActions}>
            <TouchableOpacity
              style={styles.modalCancelButton}
              onPress={() => setShowCompleteModal(false)}
            >
              <Text style={styles.modalCancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalConfirmButton}
              onPress={handleMarkComplete}
            >
              <Text style={styles.modalConfirmText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      <View style={styles.detailHeader}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.detailHeaderTitle}>Match Details</Text>
        <View style={{ width: 50 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.detailContent}
      >
        {/* Status Banner */}
        <View
          style={[
            styles.statusBanner,
            { backgroundColor: getStatusColor() + '20' },
          ]}
        >
          <Text style={[styles.statusBannerText, { color: getStatusColor() }]}>
            Status: {match.status.toUpperCase()}
          </Text>
        </View>

        {/* Match Info Section */}
        <View style={styles.detailSection}>
          <Text style={styles.sectionTitle}>📍 Match Info</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>🏟️ Title</Text>
            <Text style={styles.infoValue}>{match.title}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>📅 Date</Text>
            <Text style={styles.infoValue}>{match.date}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>📍 Location</Text>
            <Text style={styles.infoValue}>{match.location}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>💰 Entry Fee</Text>
            <Text style={styles.infoValue}>${match.entryFee}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>🏆 Prize Pool</Text>
            <Text style={styles.infoValue}>${match.prizePool}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>👥 Slots</Text>
            <Text style={styles.infoValue}>
              {match.slotsFilled}/{match.totalSlots} filled
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>💰 Earnings</Text>
            <Text style={styles.infoValueGreen}>${match.earnings}</Text>
          </View>
        </View>

        {/* Players List Section */}
        <View style={styles.detailSection}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>👥 Players List</Text>
            <Text style={styles.playerCount}>
              {match.players.length} players
            </Text>
          </View>
          {match.players.map(player => (
            <PlayerListItem key={player.id} player={player} />
          ))}
        </View>

        {/* Actions Section */}
        <View style={styles.detailSection}>
          <Text style={styles.sectionTitle}>⚙️ Actions</Text>

          {match.status !== 'completed' && (
            <>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => onEdit(match)}
              >
                <Text style={styles.actionIcon}>✏️</Text>
                <Text style={styles.actionText}>Edit Match</Text>
                <Text style={styles.actionArrow}>→</Text>
              </TouchableOpacity>

              {match.status === 'upcoming' && (
                <TouchableOpacity
                  style={[styles.actionButton, styles.dangerAction]}
                  onPress={() => setShowCancelModal(true)}
                >
                  <Text style={styles.dangerIcon}>⚠️</Text>
                  <Text style={styles.dangerActionText}>Cancel Match</Text>
                  <Text style={styles.dangerArrow}>→</Text>
                </TouchableOpacity>
              )}

              {match.status === 'ongoing' && (
                <TouchableOpacity
                  style={[styles.actionButton, styles.successAction]}
                  onPress={() => setShowCompleteModal(true)}
                >
                  <Text style={styles.successIcon}>✓</Text>
                  <Text style={styles.successActionText}>
                    Mark as Completed
                  </Text>
                  <Text style={styles.successArrow}>→</Text>
                </TouchableOpacity>
              )}
            </>
          )}

          {match.status === 'completed' && (
            <View style={styles.completedMessage}>
              <Text style={styles.completedIcon}>✅</Text>
              <Text style={styles.completedText}>Match has been completed</Text>
            </View>
          )}
        </View>
      </ScrollView>

      <CancelModal />
      <CompleteModal />
    </View>
  );
};

// ==================== Main Component ====================
const ManageMatchesScreen = () => {
  const [view, setView] = useState('list'); // list, detail
  const [selectedMatch, setSelectedMatch] = useState(null);

  const handleMatchSelect = match => {
    setSelectedMatch(match);
    setView('detail');
  };

  const handleBack = () => {
    setView('list');
    setSelectedMatch(null);
  };

  const handleEditMatch = match => {
    // Alert.alert('Edit Match', `Editing ${match.title}`);
  };

  const handleCancelMatch = matchId => {
    // Handle cancellation logic
  };

  const handleMarkComplete = matchId => {
    // Handle mark complete logic
  };

  const handleCreateMatch = () => {
    // Alert.alert('Create Match', 'Navigate to Create Match Screen');
  };

  if (view === 'detail' && selectedMatch) {
    return (
      <MatchDetailHostView
        match={selectedMatch}
        onBack={handleBack}
        onEdit={handleEditMatch}
        onCancel={handleCancelMatch}
        onMarkComplete={handleMarkComplete}
      />
    );
  }

  return (
    <MatchesListScreen
    //   onMatchSelect={handleMatchSelect}
    //   onCreateMatch={handleCreateMatch}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  // List Screen Styles
  listContent: {
    paddingBottom: 30,
  },
  listHeader: {
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
  createButton: {
    backgroundColor: '#22C35D',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  createButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
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
    fontSize: 13,
    fontWeight: '600',
    color: '#888888',
  },
  tabTextActive: {
    color: '#22C35D',
  },
  tabCount: {
    backgroundColor: '#2A2A2A',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  tabCountActive: {
    backgroundColor: '#22C35D',
  },
  tabCountText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#888888',
  },
  tabCountTextActive: {
    color: '#FFFFFF',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: -2,
    width: 30,
    height: 2,
    backgroundColor: '#22C35D',
    borderRadius: 1,
  },
  // Match Card
  matchCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 20,
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  matchCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  matchTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  matchIcon: {
    fontSize: 32,
  },
  matchTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  matchLocation: {
    fontSize: 12,
    color: '#888888',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  upcomingBadge: {
    backgroundColor: '#22C35D20',
  },
  ongoingBadge: {
    backgroundColor: '#FFA50020',
  },
  completedBadge: {
    backgroundColor: '#88888820',
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  upcomingStatusText: {
    color: '#22C35D',
  },
  ongoingStatusText: {
    color: '#FFA500',
  },
  completedStatusText: {
    color: '#888888',
  },
  matchDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  matchDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  matchDetailIcon: {
    fontSize: 12,
  },
  matchDetailText: {
    fontSize: 12,
    color: '#CCCCCC',
  },
  slotsContainer: {
    marginBottom: 12,
  },
  slotsBar: {
    height: 4,
    backgroundColor: '#2A2A2A',
    borderRadius: 2,
    overflow: 'hidden',
  },
  slotsFill: {
    height: '100%',
    backgroundColor: '#22C35D',
    borderRadius: 2,
  },
  cardFooter: {
    alignItems: 'flex-end',
  },
  viewButton: {
    backgroundColor: '#22C35D20',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
  },
  viewButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#22C35D',
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
    marginBottom: 20,
  },
  emptyButton: {
    backgroundColor: '#22C35D',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  emptyButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  // Detail Screen Styles
  detailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  backButton: {
    paddingVertical: 8,
    paddingRight: 16,
  },
  backButtonText: {
    fontSize: 16,
    color: '#22C35D',
    fontWeight: '600',
  },
  detailHeaderTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  detailContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  statusBanner: {
    marginVertical: 20,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  statusBannerText: {
    fontSize: 14,
    fontWeight: '700',
  },
  detailSection: {
    backgroundColor: '#1A1A1A',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#22C35D',
    marginBottom: 12,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  playerCount: {
    fontSize: 12,
    color: '#888888',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 13,
    color: '#888888',
  },
  infoValue: {
    fontSize: 13,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  infoValueGreen: {
    fontSize: 16,
    fontWeight: '800',
    color: '#22C35D',
  },
  // Player Item
  playerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0D0D0D',
    borderRadius: 16,
    padding: 12,
    marginBottom: 8,
  },
  playerAvatarSmall: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#22C35D20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  playerAvatarText: {
    fontSize: 22,
  },
  playerInfo: {
    flex: 1,
  },
  playerName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  playerStatus: {
    fontSize: 11,
    color: '#888888',
  },
  paymentBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  paidBadge: {
    backgroundColor: '#22C35D20',
  },
  pendingBadge: {
    backgroundColor: '#FFA50020',
  },
  paymentText: {
    fontSize: 11,
    fontWeight: '600',
  },
  paidText: {
    color: '#22C35D',
  },
  pendingText: {
    color: '#FFA500',
  },
  // Actions
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0D0D0D',
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
  },
  actionIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  actionText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  actionArrow: {
    fontSize: 16,
    color: '#888888',
  },
  dangerAction: {
    backgroundColor: '#FF444410',
  },
  dangerIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  dangerActionText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#FF4444',
  },
  dangerArrow: {
    fontSize: 16,
    color: '#FF4444',
  },
  successAction: {
    backgroundColor: '#22C35D10',
  },
  successIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  successActionText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#22C35D',
  },
  successArrow: {
    fontSize: 16,
    color: '#22C35D',
  },
  completedMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0D0D0D',
    borderRadius: 16,
    padding: 20,
    gap: 10,
  },
  completedIcon: {
    fontSize: 24,
  },
  completedText: {
    fontSize: 14,
    color: '#888888',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  cancelModal: {
    backgroundColor: '#1A1A1A',
    borderRadius: 24,
    padding: 24,
    width: '100%',
    maxWidth: 340,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF4444',
  },
  completeModal: {
    backgroundColor: '#1A1A1A',
    borderRadius: 24,
    padding: 24,
    width: '100%',
    maxWidth: 340,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#22C35D',
  },
  modalIconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalIcon: {
    fontSize: 36,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 12,
    textAlign: 'center',
  },
  modalDescription: {
    fontSize: 14,
    color: '#CCCCCC',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  modalCancelButton: {
    flex: 1,
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  modalCancelText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#888888',
  },
  modalConfirmButton: {
    flex: 1,
    backgroundColor: '#FF4444',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  modalConfirmText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default HostMatchList;
