// ViewMatchScreen.js
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Modal,
  FlatList,
} from 'react-native';
import { RootNavigationProp } from '../../../../types/navigationType';

const HostSingleMatchDetail = ({}) => {
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [isJoining, setIsJoining] = useState(false);
  const navigation =
    useNavigation<RootNavigationProp<'HostSingleMatchDetail'>>();
  // Sample match data (would come from props in real app)
  const matchData = {
    id: '1',
    title: 'Weekend Warriors Cup',
    host: {
      name: 'John Doe',
      rating: 4.8,
      totalMatches: 24,
      avatar: '🧑‍💼',
    },
    location: 'Central Park Field',
    address: 'Central Park, New York, NY 10022',
    date: 'Saturday, May 10, 2026',
    time: '6:00 PM - 8:00 PM',
    duration: '2 hours',
    entryFee: 10,
    prizePool: 500,
    totalSlots: 16,
    slotsFilled: 12,
    slotsRemaining: 4,
    level: 'Intermediate',
    description:
      'Join the intense weekend tournament! Open to all intermediate players. This is a competitive but friendly match where you can showcase your skills and win exciting prizes.',
    rules: [
      '5v5 format (5 players per team)',
      '20 minutes per half',
      'No slide tackles from behind',
      'Offside rules apply',
      'Substitutions allowed on the fly',
      'Yellow card = 2 min sin bin',
    ],
    amenities: [
      'Free parking available',
      'Water stations on site',
      'Locker rooms with showers',
      'First aid station',
      'Spectator seating',
    ],
    players: [
      { id: '1', name: 'John D.', avatar: '👤', skill: 'Pro' },
      { id: '2', name: 'Mike R.', avatar: '👤', skill: 'Intermediate' },
      { id: '3', name: 'Sarah L.', avatar: '👩', skill: 'Pro' },
      { id: '4', name: 'Alex M.', avatar: '👤', skill: 'Intermediate' },
      { id: '5', name: 'Chris P.', avatar: '👤', skill: 'Beginner' },
      { id: '6', name: 'Emma W.', avatar: '👩', skill: 'Pro' },
      { id: '7', name: 'Tom H.', avatar: '👤', skill: 'Intermediate' },
      { id: '8', name: 'Jerry M.', avatar: '👤', skill: 'Beginner' },
      { id: '9', name: 'Lisa K.', avatar: '👩', skill: 'Intermediate' },
      { id: '10', name: 'Paul S.', avatar: '👤', skill: 'Pro' },
      { id: '11', name: 'Anna B.', avatar: '👩', skill: 'Intermediate' },
      { id: '12', name: 'Mark T.', avatar: '👤', skill: 'Beginner' },
    ],
    coordinates: { lat: 40.7812, lng: -73.9665 },
  };

  const getFillPercentage = () => {
    return (matchData.slotsFilled / matchData.totalSlots) * 100;
  };

  const getLevelColor = () => {
    switch (matchData.level) {
      case 'Beginner':
        return '#3498DB';
      case 'Intermediate':
        return '#FFA500';
      case 'Pro':
        return '#22C35D';
      default:
        return '#888888';
    }
  };

  const handleOpenJoinModal = () => {
    setSelectedSlots([1]);
    setShowJoinModal(true);
  };

  const handleSlotSelect = slotNumber => {
    if (selectedSlots.includes(slotNumber)) {
      setSelectedSlots(selectedSlots.filter(s => s !== slotNumber));
    } else {
      setSelectedSlots([...selectedSlots, slotNumber]);
    }
  };

  const handleConfirmJoin = () => {
    // if (selectedSlots.length === 0) {
    //   alert('Please select at least one slot');
    //   return;
    // }
    setIsJoining(true);
    setTimeout(() => {
      setIsJoining(false);
      setShowJoinModal(false);
      // alert(
      //   `Successfully joined ${selectedSlots.length} slot(s)! Total: $${
      //     selectedSlots.length * matchData.entryFee
      //   }`,
      // );
    }, 1500);
  };

  const renderPlayerItem = ({ item, index }) => (
    <View style={styles.playerCard}>
      <View style={styles.playerAvatar}>
        <Text style={styles.playerAvatarEmoji}>{item.avatar}</Text>
      </View>
      <Text style={styles.playerName}>{item.name}</Text>
      <View
        style={[
          styles.playerSkillBadge,
          { backgroundColor: getLevelColorForSkill(item.skill) + '20' },
        ]}
      >
        <Text
          style={[
            styles.playerSkillText,
            { color: getLevelColorForSkill(item.skill) },
          ]}
        >
          {item.skill}
        </Text>
      </View>
    </View>
  );

  const getLevelColorForSkill = skill => {
    switch (skill) {
      case 'Beginner':
        return '#3498DB';
      case 'Intermediate':
        return '#FFA500';
      case 'Pro':
        return '#22C35D';
      default:
        return '#888888';
    }
  };

  const JoinModal = () => (
    <Modal
      visible={showJoinModal}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setShowJoinModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.joinModalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Join Match</Text>
            <TouchableOpacity onPress={() => setShowJoinModal(false)}>
              <Text style={styles.modalCloseText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.modalInfo}>
              <Text style={styles.modalInfoTitle}>{matchData.title}</Text>
              <Text style={styles.modalInfoSubtitle}>{matchData.location}</Text>
              <View style={styles.modalInfoRow}>
                <Text style={styles.modalInfoLabel}>Entry Fee</Text>
                <Text style={styles.modalInfoValue}>${matchData.entryFee}</Text>
              </View>
              <View style={styles.modalInfoRow}>
                <Text style={styles.modalInfoLabel}>Available Slots</Text>
                <Text style={styles.modalInfoValue}>
                  {matchData.slotsRemaining}/{matchData.totalSlots}
                </Text>
              </View>
            </View>

            <View style={styles.slotsSection}>
              <Text style={styles.slotsTitle}>Select Slots</Text>
              <View style={styles.slotsGrid}>
                {[...Array(Math.min(matchData.slotsRemaining, 10))].map(
                  (_, idx) => {
                    const slotNum = idx + 1;
                    const isSelected = selectedSlots.includes(slotNum);
                    return (
                      <TouchableOpacity
                        key={slotNum}
                        style={[
                          styles.slotCard,
                          isSelected && styles.slotCardSelected,
                        ]}
                        onPress={() => handleSlotSelect(slotNum)}
                      >
                        <Text
                          style={[
                            styles.slotNumber,
                            isSelected && styles.slotNumberSelected,
                          ]}
                        >
                          {slotNum}
                        </Text>
                        <Text style={styles.slotLabel}>
                          Player{slotNum > 1 ? 's' : ''}
                        </Text>
                        {isSelected && (
                          <View style={styles.slotCheck}>
                            <Text style={styles.slotCheckText}>✓</Text>
                          </View>
                        )}
                      </TouchableOpacity>
                    );
                  },
                )}
              </View>
            </View>

            {selectedSlots.length > 0 && (
              <View style={styles.summarySection}>
                <Text style={styles.summaryTitle}>Summary</Text>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Players</Text>
                  <Text style={styles.summaryValue}>
                    ×{selectedSlots.length}
                  </Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Entry Fee</Text>
                  <Text style={styles.summaryValue}>${matchData.entryFee}</Text>
                </View>
                <View style={styles.summaryDivider} />
                <View style={styles.summaryTotal}>
                  <Text style={styles.summaryTotalLabel}>Total</Text>
                  <Text style={styles.summaryTotalValue}>
                    ${selectedSlots.length * matchData.entryFee}
                  </Text>
                </View>
              </View>
            )}

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowJoinModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.confirmButton,
                  (selectedSlots.length === 0 || isJoining) &&
                    styles.confirmButtonDisabled,
                ]}
                onPress={handleConfirmJoin}
                disabled={selectedSlots.length === 0 || isJoining}
              >
                <Text style={styles.confirmButtonText}>
                  {isJoining
                    ? 'Processing...'
                    : `Confirm Join $${
                        selectedSlots.length * matchData.entryFee
                      }`}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Banner */}
        <View style={styles.bannerContainer}>
          <View style={styles.bannerOverlay}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareButton}>
              <Text style={styles.shareButtonText}>📤</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bannerContent}>
            <Text style={styles.bannerIcon}>🏟️</Text>
            <Text style={styles.bannerTitle}>{matchData.title}</Text>
            <View
              style={[
                styles.levelBadge,
                { backgroundColor: getLevelColor() + '20' },
              ]}
            >
              <Text style={[styles.levelText, { color: getLevelColor() }]}>
                {matchData.level}
              </Text>
            </View>
          </View>
        </View>

        {/* Host Info */}
        <View style={styles.hostContainer}>
          <View style={styles.hostAvatar}>
            <Text style={styles.hostAvatarEmoji}>{matchData.host.avatar}</Text>
          </View>
          <View style={styles.hostInfo}>
            <Text style={styles.hostName}>Hosted by {matchData.host.name}</Text>
            <View style={styles.hostRating}>
              <Text style={styles.ratingStar}>⭐</Text>
              <Text style={styles.ratingValue}>{matchData.host.rating}</Text>
              <Text style={styles.ratingMatches}>
                ({matchData.host.totalMatches} matches)
              </Text>
            </View>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.quickStats}>
          <View style={styles.statCard}>
            <Text style={styles.statIcon}>💰</Text>
            <Text style={styles.statValue}>${matchData.entryFee}</Text>
            <Text style={styles.statLabel}>Entry Fee</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statCard}>
            <Text style={styles.statIcon}>🏆</Text>
            <Text style={styles.statValue}>${matchData.prizePool}</Text>
            <Text style={styles.statLabel}>Prize Pool</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statCard}>
            <Text style={styles.statIcon}>👥</Text>
            <Text style={styles.statValue}>{matchData.slotsRemaining}</Text>
            <Text style={styles.statLabel}>Slots Left</Text>
          </View>
        </View>

        {/* Date & Time */}
        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <View style={styles.infoIconContainer}>
              <Text style={styles.infoIcon}>📅</Text>
            </View>
            <View>
              <Text style={styles.infoLabel}>Date & Time</Text>
              <Text style={styles.infoValue}>{matchData.date}</Text>
              <Text style={styles.infoSubvalue}>{matchData.time}</Text>
            </View>
          </View>
        </View>

        {/* Location */}
        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <View style={styles.infoIconContainer}>
              <Text style={styles.infoIcon}>📍</Text>
            </View>
            <View style={styles.locationContent}>
              <Text style={styles.infoLabel}>Location</Text>
              <Text style={styles.infoValue}>{matchData.location}</Text>
              <Text style={styles.infoSubvalue}>{matchData.address}</Text>
            </View>
          </View>
          <View style={styles.mapPlaceholder}>
            <Text style={styles.mapIcon}>🗺️</Text>
            <Text style={styles.mapText}>Map View</Text>
          </View>
        </View>

        {/* Slots Progress */}
        <View style={styles.infoSection}>
          <Text style={styles.infoLabel}>👥 Slots Availability</Text>
          <View style={styles.slotsHeader}>
            <Text style={styles.slotsCount}>
              {matchData.slotsFilled}/{matchData.totalSlots} spots filled
            </Text>
            <Text style={styles.slotsRemaining}>
              {matchData.slotsRemaining} spots left
            </Text>
          </View>
          <View style={styles.slotsBar}>
            <View
              style={[styles.slotsFill, { width: `${getFillPercentage()}%` }]}
            />
          </View>
        </View>

        {/* Players Joined */}
        <View style={styles.infoSection}>
          <Text style={styles.infoLabel}>
            👥 Players Joined ({matchData.slotsFilled})
          </Text>
          <FlatList
            data={matchData.players.slice(0, 12)}
            renderItem={renderPlayerItem}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.playersList}
          />
        </View>

        {/* Description */}
        <View style={styles.infoSection}>
          <Text style={styles.infoLabel}>📝 Description</Text>
          <Text style={styles.descriptionText}>{matchData.description}</Text>
        </View>

        {/* Rules */}
        <View style={styles.infoSection}>
          <Text style={styles.infoLabel}>📋 Rules & Format</Text>
          {matchData.rules.map((rule, idx) => (
            <View key={idx} style={styles.ruleItem}>
              <Text style={styles.ruleBullet}>•</Text>
              <Text style={styles.ruleText}>{rule}</Text>
            </View>
          ))}
        </View>

        {/* Amenities */}
        <View style={styles.infoSection}>
          <Text style={styles.infoLabel}>✨ Amenities</Text>
          <View style={styles.amenitiesList}>
            {matchData.amenities.map((amenity, idx) => (
              <View key={idx} style={styles.amenityChip}>
                <Text style={styles.amenityText}>{amenity}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Join Button */}
        <View style={styles.joinButtonContainer}>
          <TouchableOpacity
            style={styles.joinButton}
            onPress={handleOpenJoinModal}
          >
            <Text style={styles.joinButtonText}>Join Match →</Text>
          </TouchableOpacity>
          <Text style={styles.joinDisclaimer}>
            By joining, you agree to the match rules and terms of service
          </Text>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>

      <JoinModal />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  // Banner Styles
  bannerContainer: {
    height: 280,
    backgroundColor: '#1A1A1A',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    position: 'relative',
  },
  bannerOverlay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  shareButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareButtonText: {
    fontSize: 18,
  },
  bannerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  bannerIcon: {
    fontSize: 70,
    marginBottom: 12,
  },
  bannerTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  levelBadge: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  levelText: {
    fontSize: 13,
    fontWeight: '700',
  },
  // Host Info
  hostContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    marginHorizontal: 20,
    marginTop: -30,
    marginBottom: 20,
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  hostAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#22C35D20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  hostAvatarEmoji: {
    fontSize: 28,
  },
  hostInfo: {
    flex: 1,
  },
  hostName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  hostRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingStar: {
    fontSize: 12,
  },
  ratingValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFD700',
  },
  ratingMatches: {
    fontSize: 11,
    color: '#888888',
  },
  // Quick Stats
  quickStats: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#1A1A1A',
    borderRadius: 20,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
  },
  statIcon: {
    fontSize: 24,
    marginBottom: 6,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#22C35D',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 11,
    color: '#888888',
  },
  statDivider: {
    width: 1,
    height: 50,
    backgroundColor: '#2A2A2A',
  },
  // Info Sections
  infoSection: {
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#1A1A1A',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  infoRow: {
    flexDirection: 'row',
  },
  infoIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#22C35D20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  infoIcon: {
    fontSize: 22,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#22C35D',
    marginBottom: 6,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  infoSubvalue: {
    fontSize: 13,
    color: '#888888',
  },
  locationContent: {
    flex: 1,
  },
  mapPlaceholder: {
    marginTop: 12,
    height: 120,
    backgroundColor: '#0D2B1A',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  mapIcon: {
    fontSize: 24,
  },
  mapText: {
    fontSize: 14,
    color: '#22C35D',
  },
  slotsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  slotsCount: {
    fontSize: 12,
    color: '#888888',
  },
  slotsRemaining: {
    fontSize: 12,
    fontWeight: '600',
    color: '#22C35D',
  },
  slotsBar: {
    height: 6,
    backgroundColor: '#2A2A2A',
    borderRadius: 3,
    overflow: 'hidden',
  },
  slotsFill: {
    height: '100%',
    backgroundColor: '#22C35D',
    borderRadius: 3,
  },
  playersList: {
    paddingRight: 16,
    gap: 12,
    marginTop: 12,
  },
  playerCard: {
    alignItems: 'center',
    backgroundColor: '#0D0D0D',
    padding: 12,
    borderRadius: 16,
    minWidth: 90,
    marginRight: 12,
  },
  playerAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#22C35D20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  playerAvatarEmoji: {
    fontSize: 28,
  },
  playerName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  playerSkillBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  playerSkillText: {
    fontSize: 10,
    fontWeight: '600',
  },
  descriptionText: {
    fontSize: 14,
    color: '#CCCCCC',
    lineHeight: 22,
  },
  ruleItem: {
    flexDirection: 'row',
    alignItems: 'center',
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
    marginTop: 4,
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
  joinButtonContainer: {
    marginHorizontal: 20,
    marginBottom: 30,
  },
  joinButton: {
    backgroundColor: '#22C35D',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#22C35D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  joinButtonText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  joinDisclaimer: {
    fontSize: 11,
    color: '#666666',
    textAlign: 'center',
  },
  bottomSpacing: {
    height: 30,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    justifyContent: 'flex-end',
  },
  joinModalContainer: {
    backgroundColor: '#1A1A1A',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
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
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  modalCloseText: {
    fontSize: 18,
    color: '#888888',
  },
  modalInfo: {
    padding: 20,
    backgroundColor: '#0D0D0D',
    margin: 20,
    borderRadius: 20,
  },
  modalInfoTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  modalInfoSubtitle: {
    fontSize: 13,
    color: '#888888',
    marginBottom: 12,
  },
  modalInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  modalInfoLabel: {
    fontSize: 13,
    color: '#888888',
  },
  modalInfoValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#22C35D',
  },
  slotsSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  slotsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#22C35D',
    marginBottom: 16,
  },
  slotsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  slotCard: {
    width: '22%',
    aspectRatio: 1,
    backgroundColor: '#0D0D0D',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#2A2A2A',
    position: 'relative',
  },
  slotCardSelected: {
    backgroundColor: '#22C35D20',
    borderColor: '#22C35D',
    borderWidth: 2,
  },
  slotNumber: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  slotNumberSelected: {
    color: '#22C35D',
  },
  slotLabel: {
    fontSize: 10,
    color: '#888888',
  },
  slotCheck: {
    position: 'absolute',
    top: -6,
    right: -6,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#22C35D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  slotCheckText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  summarySection: {
    margin: 20,
    padding: 16,
    backgroundColor: '#0D0D0D',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#22C35D30',
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#22C35D',
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 13,
    color: '#888888',
  },
  summaryValue: {
    fontSize: 13,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: '#2A2A2A',
    marginVertical: 12,
  },
  summaryTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryTotalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  summaryTotalValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#22C35D',
  },
  modalActions: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#2A2A2A',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#888888',
  },
  confirmButton: {
    flex: 2,
    backgroundColor: '#22C35D',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  confirmButtonDisabled: {
    opacity: 0.5,
  },
  confirmButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default HostSingleMatchDetail;
