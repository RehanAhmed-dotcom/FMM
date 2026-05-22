// MatchDetailScreen.js
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
  Image,
  Platform,
} from 'react-native';
import { RootNavigationProp } from '../../../types/navigationType';
import { Dimensions } from 'react-native';
const screenWidth = Dimensions.get('window').width;
const MatchDetail = () => {
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [isSlotModalVisible, setIsSlotModalVisible] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [isJoining, setIsJoining] = useState(false);
  const navigation = useNavigation<RootNavigationProp<'MatchDetail'>>();
  // Match Data
  const match = {
    id: '1',
    title: 'Weekend Warriors Cup',
    bannerIcon: '🏟️',
    groundName: 'Central Park Field',
    location: 'Central Park, New York, NY 10022',
    distance: '0.8 km',
    date: 'Saturday, May 3, 2026',
    time: '6:00 PM - 8:00 PM',
    entryFee: 10,
    totalSlots: 16,
    availableSlots: 8,
    prize: 500,
    level: 'Intermediate',
    levelColor: '#FFA500',
    description:
      'Join the intense weekend tournament! Open to all intermediate players. This is a competitive but friendly match where you can showcase your skills and win exciting prizes.',
    rules: [
      '5v5 format (5 players per team)',
      '20 minutes per half',
      'No slide tackles from behind',
      'Offside rules apply',
      'Substitutions allowed on the fly',
      'Yellow card = 2 min sin bin',
      'Red card = match ejection + 1 match ban',
    ],
    amenities: [
      'Free parking available',
      'Water stations on site',
      'Locker rooms with showers',
      'First aid station',
      'Spectator seating',
      'Food vendors',
    ],
    coordinates: { lat: 40.7812, lng: -73.9665 },
    players: [
      {
        id: '1',
        name: 'John D.',
        avatar: '👤',
        skill: 'Pro',
        position: 'Striker',
      },
      {
        id: '2',
        name: 'Mike R.',
        avatar: '👤',
        skill: 'Intermediate',
        position: 'Midfielder',
      },
      {
        id: '3',
        name: 'Sarah L.',
        avatar: '👩',
        skill: 'Pro',
        position: 'Defender',
      },
      {
        id: '4',
        name: 'Alex M.',
        avatar: '👤',
        skill: 'Intermediate',
        position: 'Goalkeeper',
      },
      {
        id: '5',
        name: 'Chris P.',
        avatar: '👤',
        skill: 'Beginner',
        position: 'Winger',
      },
      {
        id: '6',
        name: 'Emma W.',
        avatar: '👩',
        skill: 'Pro',
        position: 'Striker',
      },
      {
        id: '7',
        name: 'Tom H.',
        avatar: '👤',
        skill: 'Intermediate',
        position: 'Midfielder',
      },
      {
        id: '8',
        name: 'Jerry M.',
        avatar: '👤',
        skill: 'Beginner',
        position: 'Defender',
      },
    ],
    organizer: {
      name: 'Sports League NYC',
      rating: 4.8,
      totalMatches: 127,
      avatar: '🏢',
    },
  };

  const handleOpenSlotSelection = () => {
    setIsSlotModalVisible(true);
  };
  // for adding multiple slots
  // const handleSlotSelect = slotNumber => {
  //   if (selectedSlots.includes(slotNumber)) {
  //     setSelectedSlots(selectedSlots.filter(s => s !== slotNumber));
  //   } else {
  //     setSelectedSlots([...selectedSlots, slotNumber]);
  //   }
  // };

  // for adding single slot
  const handleSlotSelect = (slotNumber: any) => {
    setSelectedSlots([slotNumber]);
  };
  const handleContinue = () => {
    if (selectedSlots.length === 0) {
      alert('Please select at least one slot');
      return;
    }
    setIsJoining(true);
    setTimeout(() => {
      setIsJoining(false);
      setIsSlotModalVisible(false);
      navigation.navigate('Payment');
      // alert(
      //   `Successfully joined match! Selected ${
      //     selectedSlots.length
      //   } slot(s). Total: $${selectedSlots.length * match.entryFee}`,
      // );
      setSelectedSlots([]);
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
          { backgroundColor: getSkillColor(item.skill) + '20' },
        ]}
      >
        <Text
          style={[styles.playerSkillText, { color: getSkillColor(item.skill) }]}
        >
          {item.skill}
        </Text>
      </View>
      <Text style={styles.playerPosition}>{item.position}</Text>
    </View>
  );

  const getSkillColor = skill => {
    switch (skill) {
      case 'Pro':
        return '#22C35D';
      case 'Intermediate':
        return '#FFA500';
      case 'Beginner':
        return '#3498DB';
      default:
        return '#888888';
    }
  };

  // Map View Component (simulated with emoji map)
  const MapView = () => (
    <View style={styles.mapContainer}>
      <View style={styles.mapBackground}>
        <View style={styles.mapGrid}>
          {[...Array(6)].map((_, i) => (
            <View key={i} style={styles.mapRow}>
              {[...Array(6)].map((_, j) => (
                <View key={j} style={styles.mapCell} />
              ))}
            </View>
          ))}
        </View>
        <View style={styles.mapPin}>
          <Text style={styles.mapPinIcon}>📍</Text>
          <Text style={styles.mapPinText}>Central Park Field</Text>
        </View>
        <View style={styles.mapRoute}>
          <View style={styles.mapRouteLine} />
          <View style={styles.mapRouteDot} />
          <View style={styles.mapRouteEnd} />
        </View>
      </View>
      <View style={styles.mapAddress}>
        <Text style={styles.mapAddressIcon}>📍</Text>
        <Text style={styles.mapAddressText}>{match.location}</Text>
        <Text style={styles.mapDistance}>{match.distance} away</Text>
      </View>
      <TouchableOpacity style={styles.getDirectionsButton}>
        <Text style={styles.getDirectionsButtonText}>Get Directions →</Text>
      </TouchableOpacity>
    </View>
  );

  // Slot Selection Modal
  const SlotSelectionModal = () => {
    const availableSlots = 8;
    const totalPrice = selectedSlots.length * match.entryFee;

    return (
      <Modal
        visible={isSlotModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsSlotModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Slots</Text>
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setIsSlotModalVisible(false)}
              >
                <Text style={styles.modalCloseText}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.modalInfo}>
                <Text style={styles.modalInfoText}>
                  Available slots: {match.availableSlots} / {match.totalSlots}
                </Text>
                <Text style={styles.modalInfoSubtext}>
                  Select how many players you want to register (1-10)
                </Text>
              </View>

              <View style={styles.slotsGrid}>
                {[...Array(10)].map((_, index) => {
                  const slotNumber = index + 1;
                  const isAvailable = slotNumber <= match.availableSlots;
                  const isSelected = selectedSlots.includes(slotNumber);

                  return (
                    <TouchableOpacity
                      key={slotNumber}
                      style={[
                        styles.slotCard,
                        !isAvailable && styles.slotCardDisabled,
                        // isSelected && styles.slotCardSelected,
                        {
                          // borderWidth: isSelected ? 2 : 1,
                          borderColor: isSelected ? '#22C35D' : '#2A2A2A',
                        },
                      ]}
                      onPress={() =>
                        isAvailable && handleSlotSelect(slotNumber)
                      }
                      disabled={!isAvailable}
                    >
                      <Text
                        style={[
                          styles.slotNumber,
                          !isAvailable && styles.slotNumberDisabled,
                          isSelected && styles.slotNumberSelected,
                        ]}
                      >
                        {slotNumber}
                      </Text>
                      <Text
                        style={[
                          styles.slotLabel,
                          !isAvailable && styles.slotLabelDisabled,
                        ]}
                      >
                        {slotNumber === 1 ? 'Player' : 'Players'}
                      </Text>
                      {isSelected && (
                        <View style={styles.checkmarkBadge}>
                          <Text style={styles.checkmarkText}>✓</Text>
                        </View>
                      )}
                      {!isAvailable && (
                        <View style={styles.soldOutBadge}>
                          <Text style={styles.soldOutText}>Full</Text>
                        </View>
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>

              {selectedSlots.length > 0 && (
                <View style={styles.summaryContainer}>
                  <Text style={styles.summaryTitle}>Order Summary</Text>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>
                      Entry Fee per player
                    </Text>
                    <Text style={styles.summaryValue}>${match.entryFee}</Text>
                  </View>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Number of players</Text>
                    <Text style={styles.summaryValue}>
                      × {selectedSlots.length}
                    </Text>
                  </View>
                  <View style={styles.summaryDivider} />
                  <View style={styles.summaryTotal}>
                    <Text style={styles.summaryTotalLabel}>Total Amount</Text>
                    <Text style={styles.summaryTotalValue}>${totalPrice}</Text>
                  </View>
                </View>
              )}

              <View style={styles.modalActions}>
                <TouchableOpacity
                  style={styles.cancelSlotButton}
                  onPress={() => {
                    setSelectedSlots([]);
                    setIsSlotModalVisible(false);
                  }}
                >
                  <Text style={styles.cancelSlotButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.continueButton,
                    selectedSlots.length === 0 && styles.continueButtonDisabled,
                  ]}
                  onPress={handleContinue}
                  disabled={selectedSlots.length === 0 || isJoining}
                >
                  <Text style={styles.continueButtonText}>
                    {isJoining ? 'Processing...' : `Continue $${totalPrice}`}
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Banner Section */}
        <View style={styles.bannerContainer}>
          <View style={styles.bannerGradient}>
            {/* <TouchableOpacity style={styles.shareButton}>
              <Text style={styles.shareButtonText}>📤</Text>
            </TouchableOpacity> */}
          </View>
          <View style={styles.bannerContent}>
            <Text style={styles.bannerIcon}>{match.bannerIcon}</Text>
            <Text style={styles.bannerTitle}>{match.title}</Text>
            <View
              style={[
                styles.levelBadge,
                { backgroundColor: match.levelColor + '20' },
              ]}
            >
              <Text style={[styles.levelText, { color: match.levelColor }]}>
                {match.level}
              </Text>
            </View>
          </View>
        </View>

        {/* Quick Info Cards */}
        <View style={styles.quickInfoContainer}>
          <View style={styles.quickInfoCard}>
            <Text style={styles.quickInfoIcon}>💰</Text>
            <Text style={styles.quickInfoLabel}>Entry Fee</Text>
            <Text style={styles.quickInfoValue}>${match.entryFee}</Text>
          </View>
          <View style={styles.quickInfoCard}>
            <Text style={styles.quickInfoIcon}>🏆</Text>
            <Text style={styles.quickInfoLabel}>Prize Pool</Text>
            <Text style={styles.quickInfoValue}>${match.prize}</Text>
          </View>
          <View style={styles.quickInfoCard}>
            <Text style={styles.quickInfoIcon}>👥</Text>
            <Text style={styles.quickInfoLabel}>Slots Left</Text>
            <Text style={styles.quickInfoValue}>
              {match.availableSlots}/{match.totalSlots}
            </Text>
          </View>
        </View>

        {/* Date & Time */}
        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <View style={styles.infoIconContainer}>
              <Text style={styles.infoIcon}>📅</Text>
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Date & Time</Text>
              <Text style={styles.infoValue}>{match.date}</Text>
              <Text style={styles.infoSubvalue}>{match.time}</Text>
            </View>
          </View>
        </View>

        {/* Location with Map */}
        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <View style={styles.infoIconContainer}>
              <Text style={styles.infoIcon}>📍</Text>
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Location</Text>
              <Text style={styles.infoValue}>{match.groundName}</Text>
            </View>
          </View>
          <MapView />
        </View>

        {/* Description */}
        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <View style={styles.infoIconContainer}>
              <Text style={styles.infoIcon}>📝</Text>
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Description</Text>
              <Text style={styles.descriptionText}>{match.description}</Text>
            </View>
          </View>
        </View>

        {/* Players Joined Section */}
        <View style={styles.infoSection}>
          <View style={styles.playersHeader}>
            <View style={styles.infoRow}>
              <View style={styles.infoIconContainer}>
                <Text style={styles.infoIcon}>👥</Text>
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Players Joined</Text>
                <Text style={styles.playersCount}>
                  {match.players.length} / {match.totalSlots} players
                </Text>
              </View>
            </View>
            <View style={styles.slotsProgressBar}>
              <View
                style={[
                  styles.slotsProgressFill,
                  {
                    width: `${
                      (match.players.length / match.totalSlots) * 100
                    }%`,
                  },
                ]}
              />
            </View>
          </View>

          <FlatList
            data={match.players}
            renderItem={renderPlayerItem}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.playersList}
          />
        </View>

        {/* Rules Section */}
        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <View style={styles.infoIconContainer}>
              <Text style={styles.infoIcon}>📋</Text>
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Rules & Format</Text>
              {match.rules.map((rule, idx) => (
                <View key={idx} style={styles.ruleItem}>
                  <Text style={styles.ruleBullet}>•</Text>
                  <Text style={styles.ruleText}>{rule}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Amenities Section */}
        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <View style={styles.infoIconContainer}>
              <Text style={styles.infoIcon}>✨</Text>
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Amenities</Text>
              <View style={styles.amenitiesList}>
                {match.amenities.map((amenity, idx) => (
                  <View key={idx} style={styles.amenityChip}>
                    <Text style={styles.amenityText}>{amenity}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>

        {/* Organizer Section */}
        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <View style={styles.infoIconContainer}>
              <Text style={styles.infoIcon}>🏢</Text>
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Organizer</Text>
              <View style={styles.organizerCard}>
                <Text style={styles.organizerAvatar}>
                  {match.organizer.avatar}
                </Text>
                <View style={styles.organizerInfo}>
                  <Text style={styles.organizerName}>
                    {match.organizer.name}
                  </Text>
                  <View style={styles.organizerRating}>
                    <Text style={styles.ratingStar}>⭐</Text>
                    <Text style={styles.ratingValue}>
                      {match.organizer.rating}
                    </Text>
                    <Text style={styles.ratingMatches}>
                      ({match.organizer.totalMatches} matches)
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Join Button */}
        <View style={styles.joinButtonContainer}>
          <TouchableOpacity
            style={styles.joinButton}
            onPress={handleOpenSlotSelection}
          >
            <Text style={styles.joinButtonText}>Join Match →</Text>
          </TouchableOpacity>
          <Text style={styles.joinDisclaimer}>
            By joining, you agree to the match rules and terms of service
          </Text>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>

      <SlotSelectionModal />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    paddingTop: Platform.OS === 'ios' ? 40 : 20,
  },
  // Banner Styles
  bannerContainer: {
    height: 280,
    // backgroundColor: '#1A1A1A',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
    position: 'relative',
  },
  bannerGradient: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  backButton: {
    paddingVertical: 8,
    paddingLeft: 16,
  },
  backButtonText: {
    fontSize: 16,
    color: '#22C35D',
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
    fontSize: 80,
    marginBottom: 16,
  },
  bannerTitle: {
    fontSize: 28,
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
  // Quick Info
  quickInfoContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: -30,
    marginBottom: 20,
    gap: 12,
  },
  quickInfoCard: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  quickInfoIcon: {
    fontSize: 24,
    marginBottom: 6,
  },
  quickInfoLabel: {
    fontSize: 11,
    color: '#888888',
    marginBottom: 4,
  },
  quickInfoValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#22C35D',
  },
  // Info Sections
  infoSection: {
    marginHorizontal: 20,
    marginBottom: 24,
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
  infoContent: {
    flex: 1,
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
  descriptionText: {
    fontSize: 14,
    color: '#CCCCCC',
    lineHeight: 22,
  },
  // Map Styles
  mapContainer: {
    marginTop: 12,
  },
  mapBackground: {
    height: 180,
    backgroundColor: '#0D2B1A',
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  mapGrid: {
    flex: 1,
  },
  mapRow: {
    flex: 1,
    flexDirection: 'row',
  },
  mapCell: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: '#22C35D20',
  },
  mapPin: {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    backgroundColor: '#22C35D',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  mapPinIcon: {
    fontSize: 14,
  },
  mapPinText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  mapRoute: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  mapRouteLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#22C35D',
  },
  mapRouteDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#22C35D',
    marginLeft: 8,
  },
  mapRouteEnd: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#22C35D',
    marginLeft: 8,
  },
  mapAddress: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  mapAddressIcon: {
    fontSize: 14,
    marginRight: 8,
  },
  mapAddressText: {
    flex: 1,
    fontSize: 13,
    color: '#CCCCCC',
  },
  mapDistance: {
    fontSize: 12,
    color: '#22C35D',
    fontWeight: '500',
  },
  getDirectionsButton: {
    backgroundColor: '#22C35D20',
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
  },
  getDirectionsButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#22C35D',
  },
  // Players Section
  playersHeader: {
    marginBottom: 16,
  },
  playersCount: {
    fontSize: 13,
    color: '#888888',
    marginTop: 2,
  },
  slotsProgressBar: {
    height: 4,
    backgroundColor: '#2A2A2A',
    borderRadius: 2,
    overflow: 'hidden',
    marginTop: 8,
  },
  slotsProgressFill: {
    height: '100%',
    backgroundColor: '#22C35D',
    borderRadius: 2,
  },
  playersList: {
    paddingRight: 16,
    gap: 12,
  },
  playerCard: {
    alignItems: 'center',
    backgroundColor: '#0D0D0D',
    padding: 12,
    borderRadius: 16,
    minWidth: 100,
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
    marginBottom: 4,
  },
  playerSkillText: {
    fontSize: 10,
    fontWeight: '600',
  },
  playerPosition: {
    fontSize: 11,
    color: '#888888',
  },
  // Rules Section
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
    fontSize: 13,
    color: '#CCCCCC',
    lineHeight: 20,
  },
  // Amenities
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
  // Organizer
  organizerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0D0D0D',
    padding: 12,
    borderRadius: 16,
    marginTop: 8,
  },
  organizerAvatar: {
    fontSize: 40,
    marginRight: 12,
  },
  organizerInfo: {
    flex: 1,
  },
  organizerName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  organizerRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
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
  // Join Button
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
  modalContainer: {
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
  modalCloseButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#2A2A2A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCloseText: {
    fontSize: 18,
    color: '#888888',
  },
  modalInfo: {
    padding: 20,
    backgroundColor: '#0D0D0D',
    margin: 20,
    borderRadius: 16,
  },
  modalInfoText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#22C35D',
    textAlign: 'center',
    marginBottom: 4,
  },
  modalInfoSubtext: {
    fontSize: 12,
    color: '#888888',
    textAlign: 'center',
  },
  slotsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12, // consistent spacing
    justifyContent: 'flex-start', // not space-between
  },

  slotCard: {
    // width: '22%', // change this to:
    width: (screenWidth - 48 - 36) / 4, // (containerPadding - gaps) / columns
    aspectRatio: 1,
    backgroundColor: '#0D0D0D',
    borderRadius: 16,
    alignItems: 'center',
    paddingBottom: 15,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#2A2A2A',
    position: 'relative',
  },
  // slotsGrid: {
  //   flexDirection: 'row',
  //   flexWrap: 'wrap',
  //   paddingHorizontal: 20,
  //   gap: 12,
  //   justifyContent: 'center',
  // },
  // slotCard: {
  //   width: '22%',
  //   aspectRatio: 1,
  //   backgroundColor: '#0D0D0D',
  //   borderRadius: 16,
  //   alignItems: 'center',
  //   // paddingBottom: 10,
  //   justifyContent: 'center',
  //   borderWidth: 1,
  //   borderColor: '#2A2A2A',
  //   position: 'relative',
  // },
  slotCardSelected: {
    backgroundColor: '#22C35D20',
    borderColor: '#22C35D',
    borderWidth: 2,
  },
  slotCardDisabled: {
    opacity: 0.4,
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
  slotNumberDisabled: {
    color: '#666666',
  },
  slotLabel: {
    fontSize: 10,
    color: '#888888',
  },
  slotLabelDisabled: {
    color: '#444444',
  },
  checkmarkBadge: {
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
  checkmarkText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  soldOutBadge: {
    position: 'absolute',
    bottom: -8,
    backgroundColor: '#FF4444',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  soldOutText: {
    fontSize: 8,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  summaryContainer: {
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
  cancelSlotButton: {
    flex: 1,
    backgroundColor: '#2A2A2A',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  cancelSlotButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#888888',
  },
  continueButton: {
    flex: 2,
    backgroundColor: '#22C35D',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  continueButtonDisabled: {
    opacity: 0.5,
  },
  continueButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default MatchDetail;
