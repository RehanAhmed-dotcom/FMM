// HomeScreen.js
// import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
  FlatList,
  Modal,
  ScrollView,
  Platform,
} from 'react-native';
import {
  BottomTabNavigationProp,
  RootNavigationProp,
} from '../../../types/navigationType';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [isJoinModalVisible, setIsJoinModalVisible] = useState(false);
  const [isStatsModalVisible, setIsStatsModalVisible] = useState(false);
  const [isRewardModalVisible, setIsRewardModalVisible] = useState(false);
  const [isSeeAllVisible, setIsSeeAllVisible] = useState(false);
  const navigation = useNavigation<RootNavigationProp<'MyTabs'>>();
  // User Data
  const userData = {
    name: 'Alex Morgan',
    location: 'New York, USA',
    rank: '#342',
    matchesPlayed: 127,
    wins: 89,
    draws: 24,
    losses: 14,
    winRate: 70,
    totalGoals: 67,
    totalAssists: 34,
    manOfTheMatch: 12,
    notificationCount: 3,
    credits: 250,
  };

  // Nearby Matches Data
  const nearbyMatches = [
    {
      id: '1',
      title: 'Weekend Warriors Cup',
      location: 'Central Park Field',
      distance: '0.8 km',
      time: 'Today, 6:00 PM',
      entryFee: 10,
      slotsLeft: 8,
      totalSlots: 16,
      prize: 500,
      level: 'Intermediate',
      image: '🏟️',
      players: ['John D.', 'Mike R.', 'Sarah L.', 'Alex M.'],
    },
    {
      id: '2',
      title: '5v5 Tournament',
      location: 'Brooklyn Sports Club',
      distance: '2.3 km',
      time: 'Tomorrow, 4:00 PM',
      entryFee: 15,
      slotsLeft: 4,
      totalSlots: 12,
      prize: 300,
      level: 'Pro',
      image: '⚽',
      players: ['Chris P.', 'David B.', 'Emma W.'],
    },
    {
      id: '3',
      title: 'Sunday League',
      location: 'Queens Bridge Park',
      distance: '3.1 km',
      time: 'Sun, 10:00 AM',
      entryFee: 8,
      slotsLeft: 12,
      totalSlots: 20,
      prize: 200,
      level: 'Beginner',
      image: '🏆',
      players: ['Tom H.', 'Jerry M.', 'Lucy K.'],
    },
    {
      id: '4',
      title: 'Night Football',
      location: 'Stadium Lights Arena',
      distance: '4.5 km',
      time: 'Today, 8:00 PM',
      entryFee: 12,
      slotsLeft: 2,
      totalSlots: 10,
      prize: 400,
      level: 'All Levels',
      image: '🌙',
      players: ['Ryan G.', 'Kevin P.'],
    },
    {
      id: '5',
      title: 'Corporate Cup',
      location: 'Downtown Field',
      distance: '1.5 km',
      time: 'Mon, 7:00 PM',
      entryFee: 20,
      slotsLeft: 6,
      totalSlots: 14,
      prize: 1000,
      level: 'Pro',
      image: '💼',
      players: ['Lisa M.', 'Paul R.', 'Anna K.'],
    },
    {
      id: '6',
      title: 'Friday Night Lights',
      location: 'Eastside Arena',
      distance: '2.8 km',
      time: 'Fri, 8:30 PM',
      entryFee: 12,
      slotsLeft: 3,
      totalSlots: 16,
      prize: 450,
      level: 'Intermediate',
      image: '🌟',
      players: ['Steve O.', 'Nancy D.', 'Mark T.'],
    },
  ];

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'nearby', label: 'Nearby' },
    { id: 'trending', label: 'Trending' },
    { id: 'free', label: 'Free Entry' },
  ];

  const openJoinModal = match => {
    setSelectedMatch(match);
    setIsJoinModalVisible(true);
  };

  const handleJoinMatch = () => {
    // alert(
    //   `Joined ${selectedMatch.title}! Entry fee: $${selectedMatch.entryFee}`,
    // );
    navigation.navigate('Payment');
    setIsJoinModalVisible(false);
  };

  const handleClaimReward = () => {
    alert('Reward claimed! Get 1 free entry on your next match.');
    setIsRewardModalVisible(false);
  };

  const renderMatchCard = ({ item }) => (
    <TouchableOpacity
      style={styles.matchCard}
      onPress={() => openJoinModal(item)}
    >
      <View style={styles.matchCardHeader}>
        <View style={styles.matchImageContainer}>
          <Text style={styles.matchImage}>{item.image}</Text>
        </View>
        <View style={styles.matchInfo}>
          <Text style={styles.matchTitle}>{item.title}</Text>
          <View style={styles.matchLocation}>
            <Text style={styles.matchLocationIcon}>📍</Text>
            <Text style={styles.matchLocationText}>{item.location}</Text>
            <Text style={styles.matchDistance}>{item.distance}</Text>
          </View>
        </View>
        <View style={styles.matchLevelBadge}>
          <Text style={styles.matchLevelText}>{item.level}</Text>
        </View>
      </View>

      <View style={styles.matchDetails}>
        <View style={styles.matchDetailItem}>
          <Text style={styles.matchDetailIcon}>⏰</Text>
          <Text style={styles.matchDetailText}>{item.time}</Text>
        </View>
        <View style={styles.matchDetailItem}>
          <Text style={styles.matchDetailIcon}>💰</Text>
          <Text style={styles.matchDetailText}>${item.entryFee}</Text>
        </View>
        <View style={styles.matchDetailItem}>
          <Text style={styles.matchDetailIcon}>🏆</Text>
          <Text style={styles.matchDetailText}>${item.prize}</Text>
        </View>
      </View>

      <View style={styles.matchFooter}>
        <View style={styles.slotsContainer}>
          <View style={styles.slotsBar}>
            <View
              style={[
                styles.slotsFill,
                { width: `${(item.slotsLeft / item.totalSlots) * 100}%` },
              ]}
            />
          </View>
          <Text style={styles.slotsText}>
            {item.slotsLeft}/{item.totalSlots} spots left
          </Text>
        </View>
        <TouchableOpacity style={styles.joinButton}>
          <Text style={styles.joinButtonText}>Join</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderFilterChip = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.filterChip,
        selectedFilter === item.id && styles.filterChipActive,
      ]}
      onPress={() => setSelectedFilter(item.id)}
    >
      <Text
        style={[
          styles.filterChipText,
          selectedFilter === item.id && styles.filterChipTextActive,
        ]}
      >
        {item.label}
      </Text>
    </TouchableOpacity>
  );

  // Join Match Modal
  const JoinMatchModal = () => (
    <Modal
      visible={isJoinModalVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setIsJoinModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Join Match</Text>
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setIsJoinModalVisible(false)}
              >
                <Text style={styles.modalCloseText}>✕</Text>
              </TouchableOpacity>
            </View>

            {selectedMatch && (
              <>
                <View style={styles.matchHero}>
                  <Text style={styles.matchHeroIcon}>
                    {selectedMatch.image}
                  </Text>
                  <Text style={styles.matchHeroTitle}>
                    {selectedMatch.title}
                  </Text>
                  <View style={styles.matchHeroBadge}>
                    <Text style={styles.matchHeroBadgeText}>
                      {selectedMatch.level}
                    </Text>
                  </View>
                </View>

                <View style={styles.modalInfoGrid}>
                  <View style={styles.modalInfoItem}>
                    <Text style={styles.modalInfoIcon}>📍</Text>
                    <Text style={styles.modalInfoLabel}>Location</Text>
                    <Text style={styles.modalInfoValue}>
                      {selectedMatch.location}
                    </Text>
                  </View>
                  <View style={styles.modalInfoItem}>
                    <Text style={styles.modalInfoIcon}>⏰</Text>
                    <Text style={styles.modalInfoLabel}>Time</Text>
                    <Text style={styles.modalInfoValue}>
                      {selectedMatch.time}
                    </Text>
                  </View>
                  <View style={styles.modalInfoItem}>
                    <Text style={styles.modalInfoIcon}>💰</Text>
                    <Text style={styles.modalInfoLabel}>Entry Fee</Text>
                    <Text style={styles.modalInfoValue}>
                      ${selectedMatch.entryFee}
                    </Text>
                  </View>
                  <View style={styles.modalInfoItem}>
                    <Text style={styles.modalInfoIcon}>🏆</Text>
                    <Text style={styles.modalInfoLabel}>Prize Pool</Text>
                    <Text style={styles.modalInfoValue}>
                      ${selectedMatch.prize}
                    </Text>
                  </View>
                </View>

                <View style={styles.modalSection}>
                  <Text style={styles.modalSectionTitle}>
                    👥 Current Players
                  </Text>
                  <View style={styles.playersList}>
                    {selectedMatch.players.map((player, idx) => (
                      <View key={idx} style={styles.playerItem}>
                        <Text style={styles.playerIcon}>⚽</Text>
                        <Text style={styles.playerName}>{player}</Text>
                      </View>
                    ))}
                    <View style={styles.playerItem}>
                      <Text style={styles.playerIcon}>➕</Text>
                      <Text style={styles.playerName}>You (joining)</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.modalSection}>
                  <Text style={styles.modalSectionTitle}>
                    💰 Payment Summary
                  </Text>
                  <View style={styles.paymentRow}>
                    <Text style={styles.paymentLabel}>Entry Fee</Text>
                    <Text style={styles.paymentValue}>
                      ${selectedMatch.entryFee}
                    </Text>
                  </View>
                  <View style={styles.paymentRow}>
                    <Text style={styles.paymentLabel}>Platform Fee</Text>
                    <Text style={styles.paymentValue}>$1.00</Text>
                  </View>
                  <View style={styles.paymentTotal}>
                    <Text style={styles.paymentTotalLabel}>Total</Text>
                    <Text style={styles.paymentTotalValue}>
                      ${selectedMatch.entryFee + 1}
                    </Text>
                  </View>
                </View>

                <View style={styles.modalActions}>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => setIsJoinModalVisible(false)}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.confirmButton}
                    onPress={handleJoinMatch}
                  >
                    <Text style={styles.confirmButtonText}>Confirm Join</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  // Stats Details Modal
  const StatsDetailsModal = () => (
    <Modal
      visible={isStatsModalVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setIsStatsModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Performance Stats</Text>
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setIsStatsModalVisible(false)}
              >
                <Text style={styles.modalCloseText}>✕</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.statsHero}>
              <View style={styles.statsHeroAvatar}>
                <Text style={styles.statsHeroEmoji}>⚽</Text>
              </View>
              <Text style={styles.statsHeroName}>{userData.name}</Text>
              <Text style={styles.statsHeroRank}>
                Global Rank {userData.rank}
              </Text>
            </View>

            <View style={styles.statsSummary}>
              <View style={styles.statsSummaryItem}>
                <Text style={styles.statsSummaryValue}>
                  {userData.matchesPlayed}
                </Text>
                <Text style={styles.statsSummaryLabel}>Total Matches</Text>
              </View>
              <View style={styles.statsDivider} />
              <View style={styles.statsSummaryItem}>
                <Text style={styles.statsSummaryValue}>
                  {userData.winRate}%
                </Text>
                <Text style={styles.statsSummaryLabel}>Win Rate</Text>
              </View>
            </View>

            <View style={styles.modalSection}>
              <Text style={styles.modalSectionTitle}>📊 Match Record</Text>
              <View style={styles.recordContainer}>
                <View style={styles.recordItem}>
                  <Text style={[styles.recordValue, { color: '#22C35D' }]}>
                    {userData.wins}
                  </Text>
                  <Text style={styles.recordLabel}>Wins</Text>
                </View>
                <View style={styles.recordItem}>
                  <Text style={[styles.recordValue, { color: '#FFA500' }]}>
                    {userData.draws}
                  </Text>
                  <Text style={styles.recordLabel}>Draws</Text>
                </View>
                <View style={styles.recordItem}>
                  <Text style={[styles.recordValue, { color: '#FF4444' }]}>
                    {userData.losses}
                  </Text>
                  <Text style={styles.recordLabel}>Losses</Text>
                </View>
              </View>
            </View>

            <View style={styles.modalSection}>
              <Text style={styles.modalSectionTitle}>🎯 Performance</Text>
              <View style={styles.performanceGrid}>
                <View style={styles.performanceItem}>
                  <Text style={styles.performanceIcon}>⚽</Text>
                  <Text style={styles.performanceValue}>
                    {userData.totalGoals}
                  </Text>
                  <Text style={styles.performanceLabel}>Goals</Text>
                </View>
                <View style={styles.performanceItem}>
                  <Text style={styles.performanceIcon}>🎯</Text>
                  <Text style={styles.performanceValue}>
                    {userData.totalAssists}
                  </Text>
                  <Text style={styles.performanceLabel}>Assists</Text>
                </View>
                <View style={styles.performanceItem}>
                  <Text style={styles.performanceIcon}>⭐</Text>
                  <Text style={styles.performanceValue}>
                    {userData.manOfTheMatch}
                  </Text>
                  <Text style={styles.performanceLabel}>MOTM</Text>
                </View>
              </View>
            </View>

            <View style={styles.modalSection}>
              <Text style={styles.modalSectionTitle}>📈 Season Progress</Text>
              <View style={styles.progressItem}>
                <Text style={styles.progressLabel}>Next Rank Promotion</Text>
                <View style={styles.progressBarContainer}>
                  <View style={[styles.progressBarFill, { width: '68%' }]} />
                </View>
                <Text style={styles.progressText}>158/230 points</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.closeStatsButton}
              onPress={() => setIsStatsModalVisible(false)}
            >
              <Text style={styles.closeStatsButtonText}>Close</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  // Claim Reward Modal
  const RewardClaimModal = () => (
    <Modal
      visible={isRewardModalVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setIsRewardModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Claim Your Reward</Text>
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setIsRewardModalVisible(false)}
              >
                <Text style={styles.modalCloseText}>✕</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.rewardHero}>
              <Text style={styles.rewardHeroIcon}>🎁</Text>
              <Text style={styles.rewardHeroTitle}>Special Offer!</Text>
              <Text style={styles.rewardHeroSubtitle}>
                Play 3 Matches → Get 1 Free
              </Text>
            </View>

            <View style={styles.modalSection}>
              <Text style={styles.modalSectionTitle}>📋 Offer Details</Text>
              <View style={styles.offerDetail}>
                <Text style={styles.offerDetailIcon}>✅</Text>
                <Text style={styles.offerDetailText}>
                  Join any 3 paid matches
                </Text>
              </View>
              <View style={styles.offerDetail}>
                <Text style={styles.offerDetailIcon}>✅</Text>
                <Text style={styles.offerDetailText}>
                  Get 1 free entry coupon
                </Text>
              </View>
              <View style={styles.offerDetail}>
                <Text style={styles.offerDetailIcon}>✅</Text>
                <Text style={styles.offerDetailText}>Valid for 30 days</Text>
              </View>
              <View style={styles.offerDetail}>
                <Text style={styles.offerDetailIcon}>✅</Text>
                <Text style={styles.offerDetailText}>
                  Transferable to friends
                </Text>
              </View>
            </View>

            <View style={styles.modalSection}>
              <Text style={styles.modalSectionTitle}>📊 Your Progress</Text>
              <View style={styles.rewardProgressContainer}>
                <View style={styles.rewardProgressBarContainer}>
                  <View style={[styles.rewardProgressFill, { width: '66%' }]} />
                </View>
                <Text style={styles.rewardProgressText}>
                  2/3 matches completed
                </Text>
              </View>
              <View style={styles.matchesCompleted}>
                <View style={styles.completedMatch}>
                  <Text style={styles.completedMatchIcon}>✓</Text>
                  <Text style={styles.completedMatchText}>
                    Weekend Warriors Cup
                  </Text>
                </View>
                <View style={styles.completedMatch}>
                  <Text style={styles.completedMatchIcon}>✓</Text>
                  <Text style={styles.completedMatchText}>5v5 Tournament</Text>
                </View>
                <View style={styles.completedMatch}>
                  <Text style={styles.completedMatchIcon}>○</Text>
                  <Text style={styles.completedMatchTextPending}>
                    One more match to go!
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setIsRewardModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Later</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={handleClaimReward}
              >
                <Text style={styles.confirmButtonText}>Claim Now</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  // See All Matches Screen
  const SeeAllMatchesScreen = () => (
    <Modal
      visible={isSeeAllVisible}
      transparent={false}
      animationType="slide"
      onRequestClose={() => setIsSeeAllVisible(false)}
    >
      <View style={styles.seeAllContainer}>
        <StatusBar barStyle="light-content" backgroundColor="#000000" />

        <View style={styles.seeAllHeader}>
          <TouchableOpacity onPress={() => setIsSeeAllVisible(false)}>
            <Text style={styles.seeAllBackButton}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.seeAllTitle}>All Matches</Text>
          <View style={{ width: 50 }} />
        </View>

        <FlatList
          data={nearbyMatches}
          renderItem={renderMatchCard}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.seeAllList}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </Modal>
  );

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search matches, players..."
            placeholderTextColor="#666666"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Text style={styles.clearIcon}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* <View style={styles.heroBanner}>
        <Text style={styles.heroEmoji}>⚡</Text>
        <View style={styles.heroContent}>
          <Text style={styles.heroTitle}>Find Matches Near You</Text>
          <Text style={styles.heroSubtitle}>Discover and join local games</Text>
        </View>
      </View> */}

      <TouchableOpacity
        style={styles.statsWidget}
        onPress={() => setIsStatsModalVisible(true)}
        activeOpacity={0.7}
      >
        <View style={styles.statsHeader}>
          <Text style={styles.statsTitle}>📊 Your Performance</Text>
          <Text style={styles.statsMore}>Details →</Text>
        </View>
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{userData.rank}</Text>
            <Text style={styles.statLabel}>Global Rank</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{userData.matchesPlayed}</Text>
            <Text style={styles.statLabel}>Matches</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{userData.wins}</Text>
            <Text style={styles.statLabel}>Wins</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{userData.winRate}%</Text>
            <Text style={styles.statLabel}>Win Rate</Text>
          </View>
        </View>
      </TouchableOpacity>

      <View style={[styles.sectionHeader, { paddingHorizontal: 0 }]}>
        <Text style={styles.sectionTitle}>📍 Nearby Matches</Text>
        <TouchableOpacity onPress={() => setIsSeeAllVisible(true)}>
          <Text style={styles.sectionSeeAll}>See All →</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filters}
        renderItem={renderFilterChip}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filtersContainer}
      />
    </View>
  );

  const renderFooter = () => (
    <View style={styles.footerContainer}>
      <TouchableOpacity
        style={styles.rewardBanner}
        onPress={() => setIsRewardModalVisible(true)}
        activeOpacity={0.7}
      >
        <View style={styles.rewardIconContainer}>
          <Text style={styles.rewardIcon}>🎁</Text>
        </View>
        <View style={styles.rewardContent}>
          <Text style={styles.rewardTitle}>Special Offer!</Text>
          <Text style={styles.rewardDescription}>
            Play 3 matches → Get 1 Free Entry
          </Text>
          <View style={styles.rewardProgress}>
            <View style={styles.rewardProgressBar}>
              <View style={styles.rewardProgressFill} />
            </View>
            <Text style={styles.rewardProgressText}>2/3 matches completed</Text>
          </View>
        </View>
        <View style={styles.rewardButton}>
          <Text style={styles.rewardButtonText}>Claim →</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.bottomSpacing} />
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <View
        style={[
          styles.topBar,
          {
            paddingHorizontal: 20,
            paddingTop: Platform.OS === 'ios' ? 40 : 20,
          },
        ]}
      >
        <TouchableOpacity style={styles.locationContainer}>
          <View style={styles.locationIconContainer}>
            <Text style={styles.locationIcon}>📍</Text>
          </View>
          <View>
            <Text style={styles.locationLabel}>Your Location</Text>
            <View style={styles.locationRow}>
              <Text style={styles.locationText}>{userData.location}</Text>
              <Text style={styles.locationChevron}>▼</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Notifications')}
          style={styles.notificationContainer}
        >
          <Text style={styles.notificationIcon}>🔔</Text>
          {userData.notificationCount > 0 && (
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationBadgeText}>
                {userData.notificationCount}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
      <FlatList
        data={nearbyMatches}
        renderItem={renderMatchCard}
        keyExtractor={item => item.id}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        initialNumToRender={5}
        removeClippedSubviews={true}
      />

      <JoinMatchModal />
      <StatsDetailsModal />
      <RewardClaimModal />
      <SeeAllMatchesScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  listContent: {
    paddingBottom: 20,
  },
  headerContainer: { paddingHorizontal: 20 },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#22C35D20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  locationIcon: {
    fontSize: 22,
  },
  locationLabel: {
    fontSize: 12,
    color: '#888888',
    marginBottom: 2,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginRight: 6,
  },
  locationChevron: {
    fontSize: 12,
    color: '#22C35D',
  },
  notificationContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1A1A1A',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  notificationIcon: {
    fontSize: 22,
  },
  notificationBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#FF4444',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  notificationBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  searchContainer: {
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    paddingHorizontal: 16,
    height: 52,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 12,
    color: '#888888',
  },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
  },
  clearIcon: {
    fontSize: 16,
    color: '#888888',
  },
  heroBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#22C35D10',
    borderRadius: 20,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#22C35D30',
  },
  heroEmoji: {
    fontSize: 40,
    marginRight: 16,
  },
  heroContent: {
    flex: 1,
  },
  heroTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#22C35D',
    marginBottom: 4,
  },
  heroSubtitle: {
    fontSize: 13,
    color: '#888888',
  },
  statsWidget: {
    backgroundColor: '#1A1A1A',
    borderRadius: 20,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  statsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  statsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  statsMore: {
    fontSize: 13,
    color: '#22C35D',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#22C35D',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: '#888888',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#2A2A2A',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  sectionSeeAll: {
    fontSize: 14,
    color: '#22C35D',
  },
  filtersContainer: {
    marginBottom: 20,
    gap: 10,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#1A1A1A',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    marginRight: 10,
  },
  filterChipActive: {
    backgroundColor: '#22C35D20',
    borderColor: '#22C35D',
  },
  filterChipText: {
    fontSize: 14,
    color: '#888888',
    fontWeight: '500',
  },
  filterChipTextActive: {
    color: '#22C35D',
  },
  matchCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 20,
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  matchCardHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  matchImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: '#22C35D20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  matchImage: {
    fontSize: 32,
  },
  matchInfo: {
    flex: 1,
  },
  matchTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  matchLocation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  matchLocationIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  matchLocationText: {
    fontSize: 12,
    color: '#888888',
    flex: 1,
  },
  matchDistance: {
    fontSize: 11,
    color: '#22C35D',
    marginLeft: 8,
  },
  matchLevelBadge: {
    backgroundColor: '#22C35D20',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  matchLevelText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#22C35D',
  },
  matchDetails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#2A2A2A',
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
    marginBottom: 12,
  },
  matchDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  matchDetailIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  matchDetailText: {
    fontSize: 13,
    color: '#CCCCCC',
    fontWeight: '500',
  },
  matchFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  slotsContainer: {
    flex: 1,
    marginRight: 12,
  },
  slotsBar: {
    height: 4,
    backgroundColor: '#2A2A2A',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 6,
  },
  slotsFill: {
    height: '100%',
    backgroundColor: '#22C35D',
    borderRadius: 2,
  },
  slotsText: {
    fontSize: 11,
    color: '#888888',
  },
  joinButton: {
    backgroundColor: '#22C35D',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 12,
  },
  joinButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  footerContainer: {
    paddingHorizontal: 20,
    marginTop: 8,
  },
  rewardBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFD70010',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#FFD70030',
  },
  rewardIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFD70020',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  rewardIcon: {
    fontSize: 28,
  },
  rewardContent: {
    flex: 1,
  },
  rewardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFD700',
    marginBottom: 2,
  },
  rewardDescription: {
    fontSize: 12,
    color: '#CCCCCC',
    marginBottom: 8,
  },
  rewardProgress: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rewardProgressBar: {
    flex: 1,
    height: 4,
    backgroundColor: '#2A2A2A',
    borderRadius: 2,
    overflow: 'hidden',
    marginRight: 8,
  },
  rewardProgressFill: {
    width: '66%',
    height: '100%',
    backgroundColor: '#FFD700',
    borderRadius: 2,
  },
  rewardProgressText: {
    fontSize: 10,
    color: '#888888',
  },
  rewardButton: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  rewardButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#000000',
  },
  bottomSpacing: {
    height: 20,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
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
  modalCloseButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#2A2A2A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCloseText: {
    fontSize: 16,
    color: '#888888',
  },
  modalInfoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  modalInfoItem: {
    width: '50%',
    marginBottom: 16,
  },
  modalInfoIcon: {
    fontSize: 20,
    marginBottom: 6,
  },
  modalInfoLabel: {
    fontSize: 11,
    color: '#888888',
    marginBottom: 4,
  },
  modalInfoValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  modalSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  modalSectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#22C35D',
    marginBottom: 12,
  },
  modalActions: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#888888',
  },
  confirmButton: {
    flex: 1,
    backgroundColor: '#22C35D',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  confirmButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  // Join Match Modal Specific
  matchHero: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#0D0D0D',
    margin: 20,
    borderRadius: 20,
  },
  matchHeroIcon: {
    fontSize: 50,
    marginBottom: 12,
  },
  matchHeroTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  matchHeroBadge: {
    backgroundColor: '#22C35D20',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  matchHeroBadgeText: {
    fontSize: 12,
    color: '#22C35D',
    fontWeight: '600',
  },
  playersList: {
    gap: 8,
  },
  playerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0D0D0D',
    padding: 10,
    borderRadius: 12,
  },
  playerIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  playerName: {
    fontSize: 14,
    color: '#CCCCCC',
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  paymentLabel: {
    fontSize: 13,
    color: '#888888',
  },
  paymentValue: {
    fontSize: 13,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  paymentTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#2A2A2A',
  },
  paymentTotalLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#22C35D',
  },
  paymentTotalValue: {
    fontSize: 15,
    fontWeight: '700',
    color: '#22C35D',
  },
  // Stats Modal Specific
  statsHero: {
    alignItems: 'center',
    padding: 20,
  },
  statsHeroAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#22C35D20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statsHeroEmoji: {
    fontSize: 40,
  },
  statsHeroName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  statsHeroRank: {
    fontSize: 13,
    color: '#22C35D',
  },
  statsSummary: {
    flexDirection: 'row',
    backgroundColor: '#0D0D0D',
    margin: 20,
    padding: 16,
    borderRadius: 16,
  },
  statsSummaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  statsSummaryValue: {
    fontSize: 28,
    fontWeight: '800',
    color: '#22C35D',
  },
  statsSummaryLabel: {
    fontSize: 12,
    color: '#888888',
  },
  statsDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#2A2A2A',
  },
  recordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  recordItem: {
    alignItems: 'center',
  },
  recordValue: {
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 4,
  },
  recordLabel: {
    fontSize: 12,
    color: '#888888',
  },
  performanceGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  performanceItem: {
    alignItems: 'center',
  },
  performanceIcon: {
    fontSize: 28,
    marginBottom: 6,
  },
  performanceValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  performanceLabel: {
    fontSize: 11,
    color: '#888888',
  },
  progressItem: {
    marginTop: 4,
  },
  progressLabel: {
    fontSize: 13,
    color: '#CCCCCC',
    marginBottom: 8,
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: '#2A2A2A',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 6,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#22C35D',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 11,
    color: '#888888',
    textAlign: 'right',
  },
  closeStatsButton: {
    backgroundColor: '#22C35D',
    margin: 20,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  closeStatsButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  // Reward Modal Specific
  rewardHero: {
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#FFD70010',
    margin: 20,
    borderRadius: 20,
  },
  rewardHeroIcon: {
    fontSize: 60,
    marginBottom: 12,
  },
  rewardHeroTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFD700',
    marginBottom: 4,
  },
  rewardHeroSubtitle: {
    fontSize: 14,
    color: '#CCCCCC',
  },
  offerDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  offerDetailIcon: {
    fontSize: 16,
    marginRight: 12,
    color: '#22C35D',
  },
  offerDetailText: {
    fontSize: 13,
    color: '#CCCCCC',
  },
  rewardProgressContainer: {
    marginBottom: 16,
  },
  rewardProgressBarContainer: {
    height: 8,
    backgroundColor: '#2A2A2A',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  matchesCompleted: {
    marginTop: 8,
    gap: 8,
  },
  completedMatch: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  completedMatchIcon: {
    fontSize: 16,
    marginRight: 12,
    color: '#22C35D',
  },
  completedMatchText: {
    fontSize: 13,
    color: '#CCCCCC',
  },
  completedMatchTextPending: {
    fontSize: 13,
    color: '#FFD700',
  },
  // See All Screen
  seeAllContainer: {
    flex: 1,
    backgroundColor: '#000000',
  },
  seeAllHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 40 : 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  seeAllBackButton: {
    fontSize: 16,
    color: '#22C35D',
    fontWeight: '600',
  },
  seeAllTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  seeAllList: {
    paddingTop: 16,
    paddingBottom: 30,
  },
});

export default Home;
