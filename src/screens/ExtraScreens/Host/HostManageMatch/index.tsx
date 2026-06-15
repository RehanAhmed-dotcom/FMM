// ManageMatchScreen.js
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  TextInput,
  Modal,
  FlatList,
  Switch,
} from 'react-native';
import { RootNavigationProp } from '../../../../types/navigationType';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const HostManageMatch = ({}) => {
  const [match, setMatch] = useState({
    id: '1',
    title: 'Weekend Warriors Cup',
    location: 'Central Park Field',
    address: 'Central Park, New York, NY 10022',
    date: 'Saturday, May 10, 2026',
    time: '6:00 PM',
    duration: '2 hours',
    entryFee: 10,
    prize: 500,
    totalSlots: 16,
    slotsFilled: 12,
    description:
      'Join the intense weekend tournament! Open to all intermediate players.',
    rules: [
      '5v5 format (5 players per team)',
      '20 minutes per half',
      'No slide tackles from behind',
      'Offside rules apply',
    ],
    amenities: ['Free parking', 'Water stations', 'Locker rooms'],
    status: 'upcoming',
    players: [
      {
        id: '1',
        name: 'John D.',
        email: 'john@example.com',
        phone: '+1 234 567 8900',
        status: 'confirmed',
        paid: true,
      },
      {
        id: '2',
        name: 'Mike R.',
        email: 'mike@example.com',
        phone: '+1 234 567 8901',
        status: 'confirmed',
        paid: true,
      },
      {
        id: '3',
        name: 'Sarah L.',
        email: 'sarah@example.com',
        phone: '+1 234 567 8902',
        status: 'confirmed',
        paid: true,
      },
      {
        id: '4',
        name: 'Alex M.',
        email: 'alex@example.com',
        phone: '+1 234 567 8903',
        status: 'pending',
        paid: false,
      },
      {
        id: '5',
        name: 'Chris P.',
        email: 'chris@example.com',
        phone: '+1 234 567 8904',
        status: 'confirmed',
        paid: true,
      },
      {
        id: '6',
        name: 'Emma W.',
        email: 'emma@example.com',
        phone: '+1 234 567 8905',
        status: 'pending',
        paid: false,
      },
      {
        id: '7',
        name: 'Tom H.',
        email: 'tom@example.com',
        phone: '+1 234 567 8906',
        status: 'confirmed',
        paid: true,
      },
      {
        id: '8',
        name: 'Jerry M.',
        email: 'jerry@example.com',
        phone: '+1 234 567 8907',
        status: 'confirmed',
        paid: true,
      },
      {
        id: '9',
        name: 'Lisa K.',
        email: 'lisa@example.com',
        phone: '+1 234 567 8908',
        status: 'pending',
        paid: false,
      },
      {
        id: '10',
        name: 'Paul S.',
        email: 'paul@example.com',
        phone: '+1 234 567 8909',
        status: 'confirmed',
        paid: true,
      },
      {
        id: '11',
        name: 'Anna B.',
        email: 'anna@example.com',
        phone: '+1 234 567 8910',
        status: 'confirmed',
        paid: true,
      },
      {
        id: '12',
        name: 'Mark T.',
        email: 'mark@example.com',
        phone: '+1 234 567 8911',
        status: 'confirmed',
        paid: true,
      },
    ],
  });
  const navigation = useNavigation<RootNavigationProp<'HostManageMatch'>>();
  const [activeTab, setActiveTab] = useState('details');
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [showPlayerModal, setShowPlayerModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [editableMatch, setEditableMatch] = useState({ ...match });

  const tabs = [
    { id: 'details', label: 'Match Details', icon: '📋' },
    { id: 'players', label: 'Players', icon: '👥' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  const handleUpdateMatch = () => {
    setMatch({ ...editableMatch });
    setShowEditModal(false);
    // if (onUpdate) onUpdate(editableMatch);
    // alert('Match updated successfully!');
  };

  const handleCancelMatch = () => {
    setShowCancelModal(false);
    // if (onDelete) onDelete(match.id);
    // alert('Match cancelled successfully');
    // onBack?.();
  };

  const updatePlayerStatus = (playerId, status) => {
    setMatch(prev => ({
      ...prev,
      players: prev.players.map(p =>
        p.id === playerId ? { ...p, status } : p,
      ),
    }));
    setShowPlayerModal(false);
    // alert(
    //   `Player ${status === 'confirmed' ? 'confirmed' : 'removed'} successfully`,
    // );
  };

  const updatePaymentStatus = (playerId, paid) => {
    setMatch(prev => ({
      ...prev,
      players: prev.players.map(p => (p.id === playerId ? { ...p, paid } : p)),
    }));
    // alert(`Payment status updated`);
  };

  const handleSendNotification = () => {
    // alert('Notification sent to all players!');
  };

  const getFillPercentage = () => {
    return (match.slotsFilled / match.totalSlots) * 100;
  };

  const getStatusColor = status => {
    switch (status) {
      case 'confirmed':
        return '#22C35D';
      case 'pending':
        return '#FFA500';
      case 'cancelled':
        return '#FF4444';
      default:
        return '#888888';
    }
  };

  const PlayerListItem = ({ player }) => (
    <TouchableOpacity
      style={styles.playerListItem}
      onPress={() => {
        setSelectedPlayer(player);
        setShowPlayerModal(true);
      }}
    >
      <View style={styles.playerAvatar}>
        <Text style={styles.playerAvatarText}>⚽</Text>
      </View>
      <View style={styles.playerInfo}>
        <Text style={styles.playerName}>{player.name}</Text>
        <Text style={styles.playerContact}>{player.email}</Text>
        <Text style={styles.playerContact}>{player.phone}</Text>
      </View>
      <View style={styles.playerStatusContainer}>
        <View
          style={[
            styles.playerStatusBadge,
            { backgroundColor: getStatusColor(player.status) + '20' },
          ]}
        >
          <Text
            style={[
              styles.playerStatusText,
              { color: getStatusColor(player.status) },
            ]}
          >
            {player.status.toUpperCase()}
          </Text>
        </View>
        <View style={styles.playerPaymentBadge}>
          <Text
            style={[
              styles.playerPaymentText,
              player.paid ? styles.paidText : styles.unpaidText,
            ]}
          >
            {player.paid ? '✓ Paid' : '❌ Unpaid'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const PlayerDetailModal = () => (
    <Modal
      visible={showPlayerModal}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setShowPlayerModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Player Details</Text>
            <TouchableOpacity onPress={() => setShowPlayerModal(false)}>
              <Text style={styles.modalCloseText}>✕</Text>
            </TouchableOpacity>
          </View>

          {selectedPlayer && (
            <ScrollView>
              <View style={styles.playerDetailAvatar}>
                <Text style={styles.playerDetailAvatarText}>⚽</Text>
              </View>
              <Text style={styles.playerDetailName}>{selectedPlayer.name}</Text>

              <View style={styles.playerDetailInfo}>
                <View style={styles.playerDetailRow}>
                  <Text style={styles.playerDetailLabel}>📧 Email</Text>
                  <Text style={styles.playerDetailValue}>
                    {selectedPlayer.email}
                  </Text>
                </View>
                <View style={styles.playerDetailRow}>
                  <Text style={styles.playerDetailLabel}>📱 Phone</Text>
                  <Text style={styles.playerDetailValue}>
                    {selectedPlayer.phone}
                  </Text>
                </View>
                <View style={styles.playerDetailRow}>
                  <Text style={styles.playerDetailLabel}>📊 Status</Text>
                  <View
                    style={[
                      styles.playerDetailStatus,
                      {
                        backgroundColor:
                          getStatusColor(selectedPlayer.status) + '20',
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.playerDetailStatusText,
                        { color: getStatusColor(selectedPlayer.status) },
                      ]}
                    >
                      {selectedPlayer.status.toUpperCase()}
                    </Text>
                  </View>
                </View>
                <View style={styles.playerDetailRow}>
                  <Text style={styles.playerDetailLabel}>💰 Payment</Text>
                  <View
                    style={[
                      styles.playerDetailPayment,
                      selectedPlayer.paid ? styles.paidBg : styles.unpaidBg,
                    ]}
                  >
                    <Text
                      style={[
                        styles.playerDetailPaymentText,
                        selectedPlayer.paid
                          ? styles.paidText
                          : styles.unpaidText,
                      ]}
                    >
                      {selectedPlayer.paid
                        ? 'Payment Received'
                        : 'Payment Pending'}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.modalActions}>
                {selectedPlayer.status !== 'confirmed' && (
                  <TouchableOpacity
                    style={styles.confirmPlayerButton}
                    onPress={() =>
                      updatePlayerStatus(selectedPlayer.id, 'confirmed')
                    }
                  >
                    <Text style={styles.confirmPlayerButtonText}>
                      ✓ Confirm Player
                    </Text>
                  </TouchableOpacity>
                )}
                {selectedPlayer.status === 'confirmed' && (
                  <TouchableOpacity
                    style={styles.removePlayerButton}
                    onPress={() =>
                      updatePlayerStatus(selectedPlayer.id, 'pending')
                    }
                  >
                    <Text style={styles.removePlayerButtonText}>
                      ✗ Remove Player
                    </Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  style={styles.paymentToggleButton}
                  onPress={() =>
                    updatePaymentStatus(selectedPlayer.id, !selectedPlayer.paid)
                  }
                >
                  <Text style={styles.paymentToggleButtonText}>
                    {selectedPlayer.paid ? 'Mark as Unpaid' : 'Mark as Paid'}
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          )}
        </View>
      </View>
    </Modal>
  );

  const EditMatchModal = () => (
    <Modal
      visible={showEditModal}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setShowEditModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.editModalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Edit Match</Text>
            <TouchableOpacity onPress={() => setShowEditModal(false)}>
              <Text style={styles.modalCloseText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView>
            <View style={styles.editForm}>
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Match Title</Text>
                <TextInput
                  style={styles.input}
                  value={editableMatch.title}
                  onChangeText={text =>
                    setEditableMatch({ ...editableMatch, title: text })
                  }
                  placeholderTextColor="#666"
                />
              </View>

              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Location</Text>
                <TextInput
                  style={styles.input}
                  value={editableMatch.location}
                  onChangeText={text =>
                    setEditableMatch({ ...editableMatch, location: text })
                  }
                  placeholderTextColor="#666"
                />
              </View>

              <View style={styles.rowInputs}>
                <View
                  style={[styles.inputWrapper, { flex: 1, marginRight: 8 }]}
                >
                  <Text style={styles.inputLabel}>Date</Text>
                  <TextInput
                    style={styles.input}
                    value={editableMatch.date}
                    onChangeText={text =>
                      setEditableMatch({ ...editableMatch, date: text })
                    }
                    placeholderTextColor="#666"
                  />
                </View>
                <View style={[styles.inputWrapper, { flex: 1 }]}>
                  <Text style={styles.inputLabel}>Time</Text>
                  <TextInput
                    style={styles.input}
                    value={editableMatch.time}
                    onChangeText={text =>
                      setEditableMatch({ ...editableMatch, time: text })
                    }
                    placeholderTextColor="#666"
                  />
                </View>
              </View>

              <View className="rowInputs">
                <View
                  style={[styles.inputWrapper, { flex: 1, marginRight: 8 }]}
                >
                  <Text style={styles.inputLabel}>Entry Fee ($)</Text>
                  <TextInput
                    style={styles.input}
                    value={String(editableMatch.entryFee)}
                    onChangeText={text =>
                      setEditableMatch({
                        ...editableMatch,
                        entryFee: Number(text),
                      })
                    }
                    keyboardType="numeric"
                    placeholderTextColor="#666"
                  />
                </View>
                <View style={[styles.inputWrapper, { flex: 1 }]}>
                  <Text style={styles.inputLabel}>Prize Pool ($)</Text>
                  <TextInput
                    style={styles.input}
                    value={String(editableMatch.prize)}
                    onChangeText={text =>
                      setEditableMatch({
                        ...editableMatch,
                        prize: Number(text),
                      })
                    }
                    keyboardType="numeric"
                    placeholderTextColor="#666"
                  />
                </View>
              </View>

              <View className="rowInputs">
                <View
                  style={[styles.inputWrapper, { flex: 1, marginRight: 8 }]}
                >
                  <Text style={styles.inputLabel}>Total Slots</Text>
                  <TextInput
                    style={styles.input}
                    value={String(editableMatch.totalSlots)}
                    onChangeText={text =>
                      setEditableMatch({
                        ...editableMatch,
                        totalSlots: Number(text),
                      })
                    }
                    keyboardType="numeric"
                    placeholderTextColor="#666"
                  />
                </View>
              </View>

              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Description</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  value={editableMatch.description}
                  onChangeText={text =>
                    setEditableMatch({ ...editableMatch, description: text })
                  }
                  multiline
                  numberOfLines={3}
                  placeholderTextColor="#666"
                />
              </View>
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelEditButton}
                onPress={() => setShowEditModal(false)}
              >
                <Text style={styles.cancelEditButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.saveEditButton}
                onPress={handleUpdateMatch}
              >
                <Text style={styles.saveEditButtonText}>Save Changes</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  const CancelMatchModal = () => (
    <Modal
      visible={showCancelModal}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setShowCancelModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.cancelModalContainer}>
          <View style={styles.cancelIconContainer}>
            <Text style={styles.cancelIcon}>⚠️</Text>
          </View>
          <Text style={styles.cancelTitle}>Cancel Match?</Text>
          <Text style={styles.cancelDescription}>
            Are you sure you want to cancel this match? This action cannot be
            undone.
            {match.slotsFilled > 0 &&
              ` ${match.slotsFilled} players will be notified.`}
          </Text>
          <View style={styles.cancelActions}>
            <TouchableOpacity
              style={styles.cancelNoButton}
              onPress={() => setShowCancelModal(false)}
            >
              <Text style={styles.cancelNoText}>No, Keep Match</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelYesButton}
              onPress={handleCancelMatch}
            >
              <Text style={styles.cancelYesText}>Yes, Cancel Match</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  const renderDetailsTab = () => (
    <View style={styles.tabContent}>
      {/* Match Status Banner */}
      <View
        style={[
          styles.statusBanner,
          { backgroundColor: getStatusColor(match.status) + '20' },
        ]}
      >
        <Text
          style={[
            styles.statusBannerText,
            { color: getStatusColor(match.status) },
          ]}
        >
          Match Status: {match.status.toUpperCase()}
        </Text>
      </View>

      {/* Match Info */}
      <View style={styles.infoCard}>
        <Text style={styles.infoCardTitle}>📋 Match Information</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>🏟️ Title</Text>
          <Text style={styles.infoValue}>{match.title}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>📍 Location</Text>
          <Text style={styles.infoValue}>{match.location}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>📅 Date</Text>
          <Text style={styles.infoValue}>{match.date}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>⏰ Time</Text>
          <Text style={styles.infoValue}>{match.time}</Text>
        </View>
      </View>

      {/* Financial Info */}
      <View style={styles.infoCard}>
        <Text style={styles.infoCardTitle}>💰 Financial Summary</Text>
        <View style={styles.financialRow}>
          <Text style={styles.financialLabel}>Entry Fee</Text>
          <Text style={styles.financialValue}>${match.entryFee}</Text>
        </View>
        <View style={styles.financialRow}>
          <Text style={styles.financialLabel}>Prize Pool</Text>
          <Text style={styles.financialValue}>${match.prize}</Text>
        </View>
        <View style={styles.financialRow}>
          <Text style={styles.financialLabel}>Confirmed Players</Text>
          <Text style={styles.financialValue}>
            {match.players.filter(p => p.status === 'confirmed').length}
          </Text>
        </View>
        <View style={styles.financialDivider} />
        <View style={styles.financialTotal}>
          <Text style={styles.financialTotalLabel}>Total Revenue</Text>
          <Text style={styles.financialTotalValue}>
            ${match.players.filter(p => p.paid).length * match.entryFee}
          </Text>
        </View>
      </View>

      {/* Slots Overview */}
      <View style={styles.infoCard}>
        <Text style={styles.infoCardTitle}>👥 Slots Overview</Text>
        <View style={styles.slotsOverview}>
          <Text style={styles.slotsCount}>
            {match.slotsFilled}/{match.totalSlots} spots filled
          </Text>
          <View style={styles.slotsBarLarge}>
            <View
              style={[
                styles.slotsFillLarge,
                { width: `${getFillPercentage()}%` },
              ]}
            />
          </View>
        </View>
      </View>

      {/* Description */}
      <View style={styles.infoCard}>
        <Text style={styles.infoCardTitle}>📝 Description</Text>
        <Text style={styles.descriptionText}>{match.description}</Text>
      </View>

      {/* Rules */}
      <View style={styles.infoCard}>
        <Text style={styles.infoCardTitle}>📋 Rules</Text>
        {match.rules.map((rule, idx) => (
          <View key={idx} style={styles.ruleItem}>
            <Text style={styles.ruleBullet}>•</Text>
            <Text style={styles.ruleText}>{rule}</Text>
          </View>
        ))}
      </View>

      {/* Amenities */}
      <View style={styles.infoCard}>
        <Text style={styles.infoCardTitle}>✨ Amenities</Text>
        <View style={styles.amenitiesList}>
          {match.amenities.map((amenity, idx) => (
            <View key={idx} style={styles.amenityChip}>
              <Text style={styles.amenityText}>{amenity}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  const renderPlayersTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.playersHeader}>
        <Text style={styles.playersCount}>
          {match.players.filter(p => p.status === 'confirmed').length} Confirmed
          / {match.players.length} Total
        </Text>
        <TouchableOpacity
          style={styles.notifyAllButton}
          onPress={handleSendNotification}
        >
          <Text style={styles.notifyAllButtonText}>📢 Notify All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={match.players}
        renderItem={({ item }) => <PlayerListItem player={item} />}
        keyExtractor={item => item.id}
        scrollEnabled={false}
        contentContainerStyle={styles.playersList}
      />
    </View>
  );

  const renderSettingsTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.settingsCard}>
        <Text style={styles.settingsCardTitle}>⚙️ Match Settings</Text>

        <TouchableOpacity
          style={styles.settingsItem}
          onPress={() => setShowEditModal(true)}
        >
          <View style={styles.settingsItemLeft}>
            <Text style={styles.settingsIcon}>✏️</Text>
            <Text style={styles.settingsLabel}>Edit Match Details</Text>
          </View>
          <Text style={styles.settingsArrow}>→</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingsItem}
          onPress={handleSendNotification}
        >
          <View style={styles.settingsItemLeft}>
            <Text style={styles.settingsIcon}>📢</Text>
            <Text style={styles.settingsLabel}>Send Notification to All</Text>
          </View>
          <Text style={styles.settingsArrow}>→</Text>
        </TouchableOpacity>

        <View style={styles.settingsDivider} />

        <TouchableOpacity
          style={[styles.settingsItem, styles.dangerItem]}
          onPress={() => setShowCancelModal(true)}
        >
          <View style={styles.settingsItemLeft}>
            <Text style={styles.dangerIcon}>⚠️</Text>
            <Text style={styles.dangerLabel}>Cancel Match</Text>
          </View>
          <Text style={styles.dangerArrow}>→</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'details':
        return renderDetailsTab();
      case 'players':
        return renderPlayersTab();
      case 'settings':
        return renderSettingsTab();
      default:
        return renderDetailsTab();
    }
  };
  const { top } = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Manage Match</Text>
        <View style={{ width: 50 }} />
      </View>

      {/* Match Title Banner */}
      <View style={styles.titleBanner}>
        <Text style={styles.titleBannerIcon}>🏟️</Text>
        <View>
          <Text style={styles.titleBannerTitle}>{match.title}</Text>
          <Text style={styles.titleBannerLocation}>{match.location}</Text>
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
            {activeTab === tab.id && <View style={styles.tabIndicator} />}
          </TouchableOpacity>
        ))}
      </View>

      {/* Tab Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {renderActiveTab()}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Modals */}
      <PlayerDetailModal />
      <EditMatchModal />
      <CancelMatchModal />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
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
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  titleBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    margin: 20,
    padding: 16,
    borderRadius: 20,
    gap: 14,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  titleBannerIcon: {
    fontSize: 40,
  },
  titleBannerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  titleBannerLocation: {
    fontSize: 13,
    color: '#888888',
  },
  tabsContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
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
    fontSize: 16,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#888888',
  },
  tabTextActive: {
    color: '#22C35D',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: -2,
    width: 30,
    height: 2,
    backgroundColor: '#22C35D',
    borderRadius: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
  tabContent: {
    paddingBottom: 20,
  },
  statusBanner: {
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  statusBannerText: {
    fontSize: 14,
    fontWeight: '700',
  },
  infoCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  infoCardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#22C35D',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoLabel: {
    width: 100,
    fontSize: 13,
    color: '#888888',
  },
  infoValue: {
    flex: 1,
    fontSize: 13,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  financialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  financialLabel: {
    fontSize: 13,
    color: '#888888',
  },
  financialValue: {
    fontSize: 13,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  financialDivider: {
    height: 1,
    backgroundColor: '#2A2A2A',
    marginVertical: 12,
  },
  financialTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  financialTotalLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  financialTotalValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#22C35D',
  },
  slotsOverview: {
    marginTop: 4,
  },
  slotsCount: {
    fontSize: 13,
    color: '#888888',
    marginBottom: 8,
  },
  slotsBarLarge: {
    height: 8,
    backgroundColor: '#2A2A2A',
    borderRadius: 4,
    overflow: 'hidden',
  },
  slotsFillLarge: {
    height: '100%',
    backgroundColor: '#22C35D',
    borderRadius: 4,
  },
  descriptionText: {
    fontSize: 14,
    color: '#CCCCCC',
    lineHeight: 22,
  },
  ruleItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  ruleBullet: {
    fontSize: 14,
    color: '#22C35D',
    marginRight: 10,
  },
  ruleText: {
    flex: 1,
    fontSize: 13,
    color: '#CCCCCC',
  },
  amenitiesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  amenityChip: {
    backgroundColor: '#0D0D0D',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  amenityText: {
    fontSize: 12,
    color: '#888888',
  },
  playersHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  playersCount: {
    fontSize: 13,
    color: '#888888',
  },
  notifyAllButton: {
    backgroundColor: '#22C35D20',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  notifyAllButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#22C35D',
  },
  playersList: {
    gap: 10,
  },
  playerListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  playerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#22C35D20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  playerAvatarText: {
    fontSize: 24,
  },
  playerInfo: {
    flex: 1,
  },
  playerName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  playerContact: {
    fontSize: 11,
    color: '#888888',
  },
  playerStatusContainer: {
    alignItems: 'flex-end',
    gap: 6,
  },
  playerStatusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  playerStatusText: {
    fontSize: 10,
    fontWeight: '700',
  },
  playerPaymentBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    backgroundColor: '#1A1A1A',
  },
  playerPaymentText: {
    fontSize: 9,
    fontWeight: '600',
  },
  paidText: {
    color: '#22C35D',
  },
  unpaidText: {
    color: '#FFA500',
  },
  settingsCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  settingsCardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#22C35D',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  settingsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  settingsItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingsIcon: {
    fontSize: 20,
  },
  settingsLabel: {
    fontSize: 15,
    color: '#FFFFFF',
  },
  settingsArrow: {
    fontSize: 16,
    color: '#888888',
  },
  settingsDivider: {
    height: 8,
    backgroundColor: '#0D0D0D',
  },
  dangerItem: {
    backgroundColor: '#FF444410',
  },
  dangerIcon: {
    fontSize: 20,
  },
  dangerLabel: {
    fontSize: 15,
    color: '#FF4444',
  },
  dangerArrow: {
    fontSize: 16,
    color: '#FF4444',
  },
  bottomSpacing: {
    height: 30,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: '#1A1A1A',
    borderRadius: 24,
    width: '100%',
    maxWidth: 400,
    maxHeight: '80%',
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  editModalContainer: {
    backgroundColor: '#1A1A1A',
    borderRadius: 24,
    width: '100%',
    maxWidth: 400,
    maxHeight: '85%',
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  modalCloseText: {
    fontSize: 18,
    color: '#888888',
  },
  playerDetailAvatar: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  playerDetailAvatarText: {
    fontSize: 60,
  },
  playerDetailName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  playerDetailInfo: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#2A2A2A',
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  playerDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  playerDetailLabel: {
    fontSize: 14,
    color: '#888888',
  },
  playerDetailValue: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  playerDetailStatus: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  playerDetailStatusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  playerDetailPayment: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  playerDetailPaymentText: {
    fontSize: 12,
    fontWeight: '600',
  },
  paidBg: {
    backgroundColor: '#22C35D20',
  },
  unpaidBg: {
    backgroundColor: '#FFA50020',
  },
  modalActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20,
    gap: 10,
  },
  confirmPlayerButton: {
    flex: 1,
    backgroundColor: '#22C35D',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  confirmPlayerButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  removePlayerButton: {
    flex: 1,
    backgroundColor: '#FF4444',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  removePlayerButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  paymentToggleButton: {
    flex: 1,
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  paymentToggleButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  // Edit Form
  editForm: {
    padding: 20,
  },
  inputWrapper: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#CCCCCC',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#0D0D0D',
    borderRadius: 12,
    padding: 12,
    color: '#FFFFFF',
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  rowInputs: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelEditButton: {
    flex: 1,
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  cancelEditButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#888888',
  },
  saveEditButton: {
    flex: 1,
    backgroundColor: '#22C35D',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  saveEditButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  // Cancel Match Modal
  cancelModalContainer: {
    backgroundColor: '#1A1A1A',
    borderRadius: 24,
    padding: 24,
    width: '100%',
    maxWidth: 340,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF4444',
  },
  cancelIconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#FF444420',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  cancelIcon: {
    fontSize: 36,
  },
  cancelTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FF4444',
    marginBottom: 12,
    textAlign: 'center',
  },
  cancelDescription: {
    fontSize: 14,
    color: '#CCCCCC',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  cancelActions: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  cancelNoButton: {
    flex: 1,
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  cancelNoText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#888888',
  },
  cancelYesButton: {
    flex: 1,
    backgroundColor: '#FF4444',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  cancelYesText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default HostManageMatch;
