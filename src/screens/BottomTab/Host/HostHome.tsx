// HostDashboardScreen.js
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
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { RootNavigationProp } from '../../../types/navigationType';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// ==================== MATCH DETAIL MODAL ====================
const MatchDetailModal = ({
  visible,
  match,
  onClose,
  onManage,
  navigation,
}) => {
  if (!match) return null;

  const fillPercentage = (match.slotsFilled / match.totalSlots) * 100;
  const isUpcoming = match.status === 'upcoming';

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Match Details</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.modalCloseText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.detailHero}>
              <Text style={styles.detailHeroIcon}>🏟️</Text>
              <Text style={styles.detailHeroTitle}>{match.title}</Text>
              <Text style={styles.detailHeroLocation}>{match.location}</Text>
              <View
                style={[
                  styles.detailStatusBadge,
                  isUpcoming ? styles.upcomingBadge : styles.completedBadge,
                ]}
              >
                <Text
                  style={[
                    styles.detailStatusText,
                    isUpcoming
                      ? styles.upcomingStatusText
                      : styles.completedStatusText,
                  ]}
                >
                  {isUpcoming ? 'Upcoming' : 'Completed'}
                </Text>
              </View>
            </View>

            <View style={styles.detailInfoGrid}>
              <View style={styles.detailInfoItem}>
                <Text style={styles.detailInfoIcon}>📅</Text>
                <Text style={styles.detailInfoLabel}>Date</Text>
                <Text style={styles.detailInfoValue}>{match.date}</Text>
              </View>
              <View style={styles.detailInfoItem}>
                <Text style={styles.detailInfoIcon}>⏰</Text>
                <Text style={styles.detailInfoLabel}>Time</Text>
                <Text style={styles.detailInfoValue}>{match.time}</Text>
              </View>
              <View style={styles.detailInfoItem}>
                <Text style={styles.detailInfoIcon}>👥</Text>
                <Text style={styles.detailInfoLabel}>Slots</Text>
                <Text style={styles.detailInfoValue}>
                  {match.slotsFilled}/{match.totalSlots}
                </Text>
              </View>
              {match.entryFee && (
                <View style={styles.detailInfoItem}>
                  <Text style={styles.detailInfoIcon}>💰</Text>
                  <Text style={styles.detailInfoLabel}>Entry Fee</Text>
                  <Text style={styles.detailInfoValue}>{match.entryFee}</Text>
                </View>
              )}
              {match.prize && (
                <View style={styles.detailInfoItem}>
                  <Text style={styles.detailInfoIcon}>🏆</Text>
                  <Text style={styles.detailInfoLabel}>Prize Pool</Text>
                  <Text style={styles.detailInfoValue}>{match.prize}</Text>
                </View>
              )}
              {match.revenue && (
                <View style={styles.detailInfoItem}>
                  <Text style={styles.detailInfoIcon}>💵</Text>
                  <Text style={styles.detailInfoLabel}>Revenue</Text>
                  <Text style={styles.detailInfoValue}>${match.revenue}</Text>
                </View>
              )}
            </View>

            <View style={styles.detailSection}>
              <Text style={styles.detailSectionTitle}>
                📊 Slot Availability
              </Text>
              <View style={styles.detailSlotsBar}>
                <View
                  style={[
                    styles.detailSlotsFill,
                    { width: `${fillPercentage}%` },
                  ]}
                />
              </View>
              <Text style={styles.detailSlotsText}>
                {match.slotsFilled} out of {match.totalSlots} spots filled (
                {match.totalSlots - match.slotsFilled} spots remaining)
              </Text>
            </View>

            {match.players && (
              <View style={styles.detailSection}>
                <Text style={styles.detailSectionTitle}>
                  👥 Registered Players
                </Text>
                {match.players.map((player, idx) => (
                  <View key={idx} style={styles.playerListItem}>
                    <Text style={styles.playerListIcon}>⚽</Text>
                    <Text style={styles.playerListName}>{player}</Text>
                  </View>
                ))}
              </View>
            )}

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.closeDetailButton}
                onPress={onClose}
              >
                <Text style={styles.closeDetailButtonText}>Close</Text>
              </TouchableOpacity>
              {isUpcoming && (
                <TouchableOpacity
                  style={styles.manageDetailButton}
                  onPress={() => {
                    // onManage?.(match);
                    // onClose();
                    navigation.navigate('HostSingleMatchDetail');
                  }}
                >
                  <Text style={styles.manageDetailButtonText}>
                    Manage Match
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

// ==================== SEE ALL SCREENS ====================
const SeeAllScreen = ({
  visible,
  title,
  matches,
  onClose,
  onMatchPress,
  type,
}) => {
  const renderMatchItem = ({ item }) => (
    <TouchableOpacity
      style={styles.seeAllCard}
      onPress={() => onMatchPress(item)}
    >
      <View style={styles.seeAllCardHeader}>
        <Text style={styles.seeAllCardIcon}>🏟️</Text>
        <View style={styles.seeAllCardInfo}>
          <Text style={styles.seeAllCardTitle}>{item.title}</Text>
          <Text style={styles.seeAllCardLocation}>{item.location}</Text>
        </View>
        <View
          style={[
            styles.seeAllStatusBadge,
            item.status === 'upcoming'
              ? styles.upcomingBadge
              : styles.completedBadge,
          ]}
        >
          <Text
            style={[
              styles.seeAllStatusText,
              item.status === 'upcoming'
                ? styles.upcomingStatusText
                : styles.completedStatusText,
            ]}
          >
            {item.status === 'upcoming' ? 'Upcoming' : 'Completed'}
          </Text>
        </View>
      </View>
      <View style={styles.seeAllCardDetails}>
        <View style={styles.seeAllDetailItem}>
          <Text style={styles.seeAllDetailIcon}>📅</Text>
          <Text style={styles.seeAllDetailText}>
            {item.date} • {item.time}
          </Text>
        </View>
        <View style={styles.seeAllDetailItem}>
          <Text style={styles.seeAllDetailIcon}>👥</Text>
          <Text style={styles.seeAllDetailText}>
            {item.slotsFilled}/{item.totalSlots} slots
          </Text>
        </View>
        {item.entryFee && (
          <View style={styles.seeAllDetailItem}>
            <Text style={styles.seeAllDetailIcon}>💰</Text>
            <Text style={styles.seeAllDetailText}>{item.entryFee}</Text>
          </View>
        )}
      </View>
      <TouchableOpacity style={styles.seeAllViewButton}>
        <Text style={styles.seeAllViewButtonText}>View Details →</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={visible}
      transparent={false}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.seeAllContainer}>
        <StatusBar barStyle="light-content" backgroundColor="#000000" />
        <View style={styles.seeAllHeader}>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.seeAllBackButton}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.seeAllTitle}>{title}</Text>
          <View style={{ width: 50 }} />
        </View>
        <FlatList
          data={matches}
          renderItem={renderMatchItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.seeAllList}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyIcon}>📭</Text>
              <Text style={styles.emptyTitle}>No matches found</Text>
              <Text style={styles.emptyMessage}>
                Your matches will appear here
              </Text>
            </View>
          }
        />
      </View>
    </Modal>
  );
};

// ==================== MAIN DASHBOARD SCREEN ====================
const HostHome = ({}) => {
  const [hostData] = useState({
    name: 'John',
    fullName: 'John Doe',
    verified: true,
    avatar: '🧑‍💼',
    totalMatchesHosted: 24,
    totalEarnings: 2840,
    totalPlayers: 187,
    rating: 4.8,
  });
  const navigation = useNavigation<RootNavigationProp<'HostTabs'>>();
  const [upcomingMatches, setUpcomingMatches] = useState([
    {
      id: '1',
      title: 'Weekend Warriors Cup',
      location: 'Central Park Field',
      date: 'Saturday, May 10',
      time: '6:00 PM',
      slotsFilled: 12,
      totalSlots: 16,
      entryFee: '$10',
      prize: '$500',
      status: 'upcoming',
      players: [
        'John D.',
        'Mike R.',
        'Sarah L.',
        'Alex M.',
        'Chris P.',
        'Emma W.',
        'Tom H.',
        'Jerry M.',
        'Lisa K.',
        'Paul S.',
        'Anna B.',
        'Mark T.',
      ],
    },
    {
      id: '2',
      title: '5v5 Tournament',
      location: 'Brooklyn Sports Club',
      date: 'Sunday, May 11',
      time: '4:00 PM',
      slotsFilled: 8,
      totalSlots: 12,
      entryFee: '$15',
      prize: '$300',
      status: 'upcoming',
      players: [
        'Player 1',
        'Player 2',
        'Player 3',
        'Player 4',
        'Player 5',
        'Player 6',
        'Player 7',
        'Player 8',
      ],
    },
    {
      id: '3',
      title: 'Night Football League',
      location: 'Stadium Lights Arena',
      date: 'Friday, May 16',
      time: '8:00 PM',
      slotsFilled: 6,
      totalSlots: 10,
      entryFee: '$12',
      prize: '$400',
      status: 'upcoming',
      players: [
        'Night 1',
        'Night 2',
        'Night 3',
        'Night 4',
        'Night 5',
        'Night 6',
      ],
    },
    {
      id: '4',
      title: 'Sunday League',
      location: 'Queens Bridge Park',
      date: 'Sunday, May 18',
      time: '10:00 AM',
      slotsFilled: 14,
      totalSlots: 20,
      entryFee: '$8',
      prize: '$200',
      status: 'upcoming',
      players: [
        'Sunday 1',
        'Sunday 2',
        'Sunday 3',
        'Sunday 4',
        'Sunday 5',
        'Sunday 6',
        'Sunday 7',
        'Sunday 8',
        'Sunday 9',
        'Sunday 10',
        'Sunday 11',
        'Sunday 12',
        'Sunday 13',
        'Sunday 14',
      ],
    },
  ]);

  const [recentMatches, setRecentMatches] = useState([
    {
      id: '5',
      title: 'Friday Night Lights',
      location: 'Eastside Arena',
      date: 'May 2, 2026',
      time: '8:30 PM',
      slotsFilled: 16,
      totalSlots: 16,
      entryFee: '$12',
      prize: '$450',
      status: 'completed',
      revenue: 192,
      players: [
        'Complete 1',
        'Complete 2',
        'Complete 3',
        'Complete 4',
        'Complete 5',
        'Complete 6',
        'Complete 7',
        'Complete 8',
        'Complete 9',
        'Complete 10',
        'Complete 11',
        'Complete 12',
        'Complete 13',
        'Complete 14',
        'Complete 15',
        'Complete 16',
      ],
    },
    {
      id: '6',
      title: 'Corporate Cup',
      location: 'Downtown Field',
      date: 'Apr 28, 2026',
      time: '7:00 PM',
      slotsFilled: 14,
      totalSlots: 14,
      entryFee: '$20',
      prize: '$1000',
      status: 'completed',
      revenue: 280,
      players: [
        'Corporate 1',
        'Corporate 2',
        'Corporate 3',
        'Corporate 4',
        'Corporate 5',
        'Corporate 6',
        'Corporate 7',
        'Corporate 8',
        'Corporate 9',
        'Corporate 10',
        'Corporate 11',
        'Corporate 12',
        'Corporate 13',
        'Corporate 14',
      ],
    },
  ]);

  const [showUpcomingSeeAll, setShowUpcomingSeeAll] = useState(false);
  const [showRecentSeeAll, setShowRecentSeeAll] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const renderStatCard = (icon, value, label, color) => (
    <View style={styles.statCard}>
      <View
        style={[styles.statIconContainer, { backgroundColor: color + '20' }]}
      >
        <Text style={styles.statIcon}>{icon}</Text>
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );

  const renderMatchCard = ({ item }) => {
    const fillPercentage = (item.slotsFilled / item.totalSlots) * 100;
    const isUpcoming = item.status === 'upcoming';

    return (
      <TouchableOpacity
        style={styles.matchCard}
        onPress={() => {
          setSelectedMatch(item);
          // setShowDetailModal(true);
          navigation.navigate('HostManageMatch');
        }}
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
              isUpcoming ? styles.upcomingBadge : styles.completedBadge,
            ]}
          >
            <Text
              style={[
                styles.statusBadgeText,
                isUpcoming
                  ? styles.upcomingStatusText
                  : styles.completedStatusText,
              ]}
            >
              {isUpcoming ? 'Upcoming' : 'Completed'}
            </Text>
          </View>
        </View>

        <View style={styles.matchDetails}>
          <View style={styles.matchDetail}>
            <Text style={styles.matchDetailIcon}>📅</Text>
            <Text style={styles.matchDetailText}>{item.date}</Text>
          </View>
          <View style={styles.matchDetail}>
            <Text style={styles.matchDetailIcon}>⏰</Text>
            <Text style={styles.matchDetailText}>{item.time}</Text>
          </View>
        </View>

        <View style={styles.slotsContainer}>
          <View style={styles.slotsHeader}>
            <Text style={styles.slotsLabel}>Slots Filled</Text>
            <Text style={styles.slotsCount}>
              {item.slotsFilled}/{item.totalSlots}
            </Text>
          </View>
          <View style={styles.slotsBar}>
            <View style={[styles.slotsFill, { width: `${fillPercentage}%` }]} />
          </View>
        </View>

        {isUpcoming && item.entryFee && (
          <View style={styles.matchFooter}>
            <View style={styles.feeContainer}>
              <Text style={styles.feeLabel}>Entry Fee</Text>
              <Text style={styles.feeValue}>{item.entryFee}</Text>
            </View>
            <View style={styles.prizeContainer}>
              <Text style={styles.prizeLabel}>Prize Pool</Text>
              <Text style={styles.prizeValue}>{item.prize}</Text>
            </View>
            <TouchableOpacity
              style={styles.cardManageButton}
              //   onPress={() => onManageMatches?.(item)}
              onPress={() => {
                setSelectedMatch(item);
                // setShowDetailModal(true);
                navigation.navigate('HostManageMatch');
              }}
            >
              <Text style={styles.cardManageButtonText}>Manage</Text>
            </TouchableOpacity>
          </View>
        )}

        {!isUpcoming && item.revenue && (
          <View style={styles.completedFooter}>
            <View style={styles.revenueContainer}>
              <Text style={styles.revenueIcon}>💰</Text>
              <Text style={styles.revenueLabel}>Revenue Earned</Text>
              <Text style={styles.revenueValue}>${item.revenue}</Text>
            </View>
            <TouchableOpacity style={styles.viewStatsButton}>
              <Text style={styles.viewStatsButtonText}>View Stats</Text>
            </TouchableOpacity>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <View style={styles.welcomeSection}>
        <View>
          <Text style={styles.welcomeText}>Welcome back,</Text>
          <Text style={styles.userName}>{hostData.fullName}</Text>
          {hostData.verified && (
            <View style={styles.verifiedBadge}>
              <Text style={styles.verifiedIcon}>✓</Text>
              <Text style={styles.verifiedText}>Verified Host</Text>
            </View>
          )}
        </View>
        {/* <TouchableOpacity
          onPress={() => {
            navigation.navigate('HostTabs', { screen: 'HostProfile' });
          }}
          style={styles.profileIcon}
        >
          <AntDesign name="user" size={20} color={'white'} />
           </TouchableOpacity> */}
      </View>

      <View style={styles.statsContainer}>
        {renderStatCard(
          '🏟️',
          hostData.totalMatchesHosted,
          'Matches Hosted',
          '#22C35D',
        )}
        {renderStatCard(
          '💰',
          `$${hostData.totalEarnings}`,
          'Total Earnings',
          '#FFD700',
        )}
        {renderStatCard(
          '👥',
          hostData.totalPlayers,
          'Total Players',
          '#3498DB',
        )}
      </View>

      <View style={styles.quickActionsContainer}>
        <Text style={styles.sectionTitle}>⚡ Quick Actions</Text>
        <View style={styles.actionButtons}>
          {/* <TouchableOpacity
            style={[styles.actionButton, styles.createButton]}
            onPress={() => navigation.navigate('HostCreateMatch')}
          >
            <Text style={styles.createButtonIcon}>➕</Text>
            <Text style={styles.createButtonText}>Create Match</Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            style={[styles.actionButton, styles.manageButton]}
            onPress={() => navigation.navigate('HostWithdraw')}
          >
            <Text style={styles.manageButtonIcon}>📋</Text>
            <Text style={styles.manageButtonText}>Widthdraw amount</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.matchesHeader}>
        <Text style={styles.sectionTitle}>📅 Upcoming Matches</Text>
        <TouchableOpacity onPress={() => setShowUpcomingSeeAll(true)}>
          <Text style={styles.seeAllText}>
            See All ({upcomingMatches.length}) →
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderFooter = () => (
    <View style={styles.footerContainer}>
      {recentMatches.length > 0 && (
        <>
          <View style={styles.recentHeader}>
            <Text style={styles.sectionTitle}>📊 Recent Matches</Text>
            <TouchableOpacity onPress={() => setShowRecentSeeAll(true)}>
              <Text style={styles.seeAllText}>
                See All ({recentMatches.length}) →
              </Text>
            </TouchableOpacity>
          </View>
          {recentMatches.slice(0, 2).map(match => (
            <TouchableOpacity
              key={match.id}
              style={styles.recentMatchCard}
              onPress={() => {
                setSelectedMatch(match);
                setShowDetailModal(true);
              }}
            >
              <View style={styles.recentMatchInfo}>
                <Text style={styles.recentMatchTitle}>{match.title}</Text>
                <Text style={styles.recentMatchLocation}>{match.location}</Text>
                <Text style={styles.recentMatchDate}>
                  {match.date} • {match.time}
                </Text>
              </View>
              <View style={styles.recentMatchStats}>
                <Text style={styles.revenueEarned}>+${match.revenue}</Text>
                <TouchableOpacity style={styles.reviewButton}>
                  <Text style={styles.reviewButtonText}>Details</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </>
      )}

      <View style={styles.bottomSpacing} />
    </View>
  );
  const { top } = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      <FlatList
        data={upcomingMatches.slice(0, 3)}
        renderItem={renderMatchCard}
        keyExtractor={item => item.id}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* See All Modals */}
      <SeeAllScreen
        visible={showUpcomingSeeAll}
        title="All Upcoming Matches"
        matches={upcomingMatches}
        onClose={() => setShowUpcomingSeeAll(false)}
        onMatchPress={match => {
          setShowUpcomingSeeAll(false);
          setSelectedMatch(match);
          setShowDetailModal(true);
        }}
        type="upcoming"
      />

      <SeeAllScreen
        visible={showRecentSeeAll}
        title="All Recent Matches"
        matches={recentMatches}
        onClose={() => setShowRecentSeeAll(false)}
        onMatchPress={match => {
          setShowRecentSeeAll(false);
          setSelectedMatch(match);
          setShowDetailModal(true);
        }}
        type="recent"
      />

      {/* Match Detail Modal */}
      <MatchDetailModal
        visible={showDetailModal}
        match={selectedMatch}
        navigation={navigation}
        onClose={() => {
          setShowDetailModal(false);
          setSelectedMatch(null);
        }}
        // onManage={onManageMatches}
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
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
  },
  welcomeSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  welcomeText: {
    fontSize: 14,
    color: '#888888',
    marginBottom: 4,
  },
  userName: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#22C35D20',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: 'flex-start',
    gap: 6,
  },
  verifiedIcon: {
    fontSize: 12,
    color: '#22C35D',
    fontWeight: '700',
  },
  verifiedText: {
    fontSize: 11,
    color: '#22C35D',
    fontWeight: '600',
  },
  profileIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#1A1A1A',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  profileEmoji: {
    fontSize: 26,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 28,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    borderRadius: 20,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  statIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  statIcon: {
    fontSize: 22,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: '#888888',
  },
  quickActionsContainer: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 16,
    gap: 10,
  },
  createButton: {
    backgroundColor: '#22C35D',
  },
  manageButton: {
    backgroundColor: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  createButtonIcon: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  createButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  manageButtonIcon: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  manageButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  matchesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  seeAllText: {
    fontSize: 13,
    color: '#22C35D',
    fontWeight: '600',
  },
  matchCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
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
    fontSize: 28,
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
  completedBadge: {
    backgroundColor: '#88888820',
  },
  statusBadgeText: {
    fontSize: 10,
    fontWeight: '600',
  },
  upcomingStatusText: {
    color: '#22C35D',
  },
  completedStatusText: {
    color: '#888888',
  },
  matchDetails: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  matchDetail: {
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
  slotsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  slotsLabel: {
    fontSize: 11,
    color: '#888888',
  },
  slotsCount: {
    fontSize: 11,
    fontWeight: '600',
    color: '#22C35D',
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
  matchFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#2A2A2A',
  },
  feeContainer: {
    alignItems: 'center',
  },
  feeLabel: {
    fontSize: 10,
    color: '#888888',
    marginBottom: 2,
  },
  feeValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#22C35D',
  },
  prizeContainer: {
    alignItems: 'center',
  },
  prizeLabel: {
    fontSize: 10,
    color: '#888888',
    marginBottom: 2,
  },
  prizeValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFD700',
  },
  cardManageButton: {
    backgroundColor: '#22C35D',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  cardManageButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  completedFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#2A2A2A',
  },
  revenueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  revenueIcon: {
    fontSize: 14,
  },
  revenueLabel: {
    fontSize: 11,
    color: '#888888',
  },
  revenueValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#22C35D',
  },
  viewStatsButton: {
    backgroundColor: '#2A2A2A',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 10,
  },
  viewStatsButtonText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#888888',
  },
  footerContainer: {
    paddingHorizontal: 20,
  },
  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 8,
  },
  recentMatchCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  recentMatchInfo: {
    flex: 1,
  },
  recentMatchTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  recentMatchLocation: {
    fontSize: 11,
    color: '#888888',
    marginBottom: 2,
  },
  recentMatchDate: {
    fontSize: 10,
    color: '#666666',
  },
  recentMatchStats: {
    alignItems: 'flex-end',
    gap: 6,
  },
  revenueEarned: {
    fontSize: 16,
    fontWeight: '800',
    color: '#22C35D',
  },
  reviewButton: {
    backgroundColor: '#2A2A2A',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  reviewButtonText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#888888',
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
  detailHero: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#0D0D0D',
    margin: 20,
    borderRadius: 20,
  },
  detailHeroIcon: {
    fontSize: 50,
    marginBottom: 12,
  },
  detailHeroTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
    textAlign: 'center',
  },
  detailHeroLocation: {
    fontSize: 13,
    color: '#888888',
    marginBottom: 10,
  },
  detailStatusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  detailStatusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  detailInfoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  detailInfoItem: {
    width: '50%',
    marginBottom: 16,
  },
  detailInfoIcon: {
    fontSize: 20,
    marginBottom: 6,
  },
  detailInfoLabel: {
    fontSize: 11,
    color: '#888888',
    marginBottom: 4,
  },
  detailInfoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  detailSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  detailSectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#22C35D',
    marginBottom: 12,
  },
  detailSlotsBar: {
    height: 6,
    backgroundColor: '#2A2A2A',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 8,
  },
  detailSlotsFill: {
    height: '100%',
    backgroundColor: '#22C35D',
    borderRadius: 3,
  },
  detailSlotsText: {
    fontSize: 12,
    color: '#888888',
  },
  playerListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0D0D0D',
    padding: 10,
    borderRadius: 12,
    marginBottom: 8,
  },
  playerListIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  playerListName: {
    fontSize: 14,
    color: '#CCCCCC',
  },
  modalActions: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  closeDetailButton: {
    flex: 1,
    backgroundColor: '#2A2A2A',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  closeDetailButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#888888',
  },
  manageDetailButton: {
    flex: 1,
    backgroundColor: '#22C35D',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  manageDetailButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  // See All Screen Styles
  seeAllContainer: {
    flex: 1,
    backgroundColor: '#000000',
  },
  seeAllHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
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
    padding: 20,
    paddingBottom: 30,
  },
  seeAllCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  seeAllCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  seeAllCardIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  seeAllCardInfo: {
    flex: 1,
  },
  seeAllCardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  seeAllCardLocation: {
    fontSize: 12,
    color: '#888888',
  },
  seeAllStatusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  seeAllStatusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  seeAllCardDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#2A2A2A',
  },
  seeAllDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  seeAllDetailIcon: {
    fontSize: 12,
  },
  seeAllDetailText: {
    fontSize: 12,
    color: '#CCCCCC',
  },
  seeAllViewButton: {
    backgroundColor: '#22C35D20',
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
  },
  seeAllViewButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#22C35D',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
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
  },
});

export default HostHome;
