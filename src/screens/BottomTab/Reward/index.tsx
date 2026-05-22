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
  Platform,
} from 'react-native';

const Reward = () => {
  const [activeTab, setActiveTab] = useState('leaderboards');
  const [selectedReward, setSelectedReward] = useState(null);
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [rewardProgress, setRewardProgress] = useState({
    matchesPlayed: 2,
    targetMatches: 3,
  });

  // Leaderboard Data
  const topPlayers = [
    {
      id: '1',
      rank: 1,
      name: 'Alex Morgan',
      points: 2840,
      avatar: '⚽',
      level: 'Legend',
      matches: 127,
      wins: 89,
    },
    {
      id: '2',
      rank: 2,
      name: 'Chris Evans',
      points: 2720,
      avatar: '🏃',
      level: 'Diamond',
      matches: 118,
      wins: 82,
    },
    {
      id: '3',
      rank: 3,
      name: 'Sarah Lee',
      points: 2650,
      avatar: '⭐',
      level: 'Diamond',
      matches: 112,
      wins: 78,
    },
  ];

  const allPlayers = [
    {
      id: '4',
      rank: 4,
      name: 'Mike Johnson',
      points: 2510,
      avatar: '👤',
      level: 'Platinum',
      matches: 105,
      wins: 70,
    },
    {
      id: '5',
      rank: 5,
      name: 'Emma Wilson',
      points: 2430,
      avatar: '👩',
      level: 'Platinum',
      matches: 98,
      wins: 65,
    },
    {
      id: '6',
      rank: 6,
      name: 'David Brown',
      points: 2380,
      avatar: '👤',
      level: 'Gold',
      matches: 95,
      wins: 62,
    },
    {
      id: '7',
      rank: 7,
      name: 'Lisa Anderson',
      points: 2290,
      avatar: '👩',
      level: 'Gold',
      matches: 90,
      wins: 58,
    },
    {
      id: '8',
      rank: 8,
      name: 'James Taylor',
      points: 2210,
      avatar: '👤',
      level: 'Silver',
      matches: 87,
      wins: 55,
    },
    {
      id: '9',
      rank: 9,
      name: 'Rachel Green',
      points: 2150,
      avatar: '👩',
      level: 'Silver',
      matches: 83,
      wins: 52,
    },
    {
      id: '10',
      rank: 10,
      name: 'Tom Brady',
      points: 2080,
      avatar: '👤',
      level: 'Bronze',
      matches: 80,
      wins: 48,
    },
    {
      id: '11',
      rank: 11,
      name: 'Natalie Portman',
      points: 1990,
      avatar: '👩',
      level: 'Bronze',
      matches: 76,
      wins: 44,
    },
    {
      id: '12',
      rank: 12,
      name: 'Ryan Gosling',
      points: 1920,
      avatar: '👤',
      level: 'Bronze',
      matches: 72,
      wins: 41,
    },
  ];

  // Rewards History Data
  const rewardsHistory = [
    {
      id: '1',
      type: 'free_match',
      title: 'Free Match Entry',
      date: 'Apr 28, 2026',
      status: 'used',
      icon: '🎫',
    },
    {
      id: '2',
      type: 'xp_boost',
      title: '500 XP Boost',
      date: 'Apr 25, 2026',
      status: 'claimed',
      icon: '⚡',
    },
    {
      id: '3',
      type: 'discount',
      title: '20% Off Entry',
      date: 'Apr 20, 2026',
      status: 'used',
      icon: '💰',
    },
    {
      id: '4',
      type: 'free_match',
      title: 'Free Match Entry',
      date: 'Apr 15, 2026',
      status: 'used',
      icon: '🎫',
    },
    {
      id: '5',
      type: 'badge',
      title: 'Golden Boot Badge',
      date: 'Apr 10, 2026',
      status: 'claimed',
      icon: '👟',
    },
    {
      id: '6',
      type: 'xp_boost',
      title: '1000 XP Boost',
      date: 'Apr 5, 2026',
      status: 'claimed',
      icon: '⚡',
    },
    {
      id: '7',
      type: 'free_match',
      title: 'Free Match Entry',
      date: 'Mar 28, 2026',
      status: 'used',
      icon: '🎫',
    },
  ];

  const getRankIcon = rank => {
    switch (rank) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return `${rank}`;
    }
  };

  const getRankColor = rank => {
    switch (rank) {
      case 1:
        return '#FFD700';
      case 2:
        return '#C0C0C0';
      case 3:
        return '#CD7F32';
      default:
        return '#22C35D';
    }
  };

  const getProgressPercent = () => {
    return (rewardProgress.matchesPlayed / rewardProgress.targetMatches) * 100;
  };

  const handleClaimReward = () => {
    setRewardProgress({
      matchesPlayed: rewardProgress.matchesPlayed + 1,
      targetMatches: 3,
    });
    if (rewardProgress.matchesPlayed + 1 >= rewardProgress.targetMatches) {
      setShowUnlockModal(true);
    } else {
      setSelectedReward({
        title: 'Progress Updated!',
        message: `You've completed ${
          rewardProgress.matchesPlayed + 1
        }/3 matches!`,
      });
      setShowRewardModal(true);
    }
  };

  const handleUseReward = () => {
    setShowUnlockModal(false);
    alert('Free match unlocked! Use it on your next payment.');
  };

  // Top 3 Card Component
  const TopThreeCard = ({ player, position }) => {
    const isFirst = position === 'left';
    const isSecond = position === 'center';
    const isThird = position === 'right';

    let cardStyle = styles.topCardSecond;
    let rankStyle = styles.topRankSecond;
    if (isFirst) {
      cardStyle = styles.topCardFirst;
      rankStyle = styles.topRankFirst;
    } else if (isThird) {
      cardStyle = styles.topCardThird;
      rankStyle = styles.topRankThird;
    }

    return (
      <View style={[styles.topCard, cardStyle]}>
        <View style={[styles.topRankBadge, rankStyle]}>
          <Text style={styles.topRankIcon}>{getRankIcon(player.rank)}</Text>
        </View>
        <View style={styles.topAvatar}>
          <Text style={styles.topAvatarEmoji}>{player.avatar}</Text>
        </View>
        <Text style={styles.topName}>{player.name}</Text>
        <Text style={styles.topPoints}>{player.points} pts</Text>
        <View style={styles.topLevelBadge}>
          <Text style={styles.topLevelText}>{player.level}</Text>
        </View>
      </View>
    );
  };

  // Ranking Item Component
  const RankingItem = ({ item, index }) => (
    <View style={styles.rankingItem}>
      <View style={styles.rankNumber}>
        <Text
          style={[styles.rankNumberText, { color: getRankColor(item.rank) }]}
        >
          {item.rank}
        </Text>
      </View>
      <View style={styles.playerAvatarSmall}>
        <Text style={styles.playerAvatarSmallEmoji}>{item.avatar}</Text>
      </View>
      <View style={styles.playerInfo}>
        <Text style={styles.playerName}>{item.name}</Text>
        <View style={styles.playerStats}>
          <Text style={styles.playerStatText}>{item.matches} matches</Text>
          <Text style={styles.playerStatDot}>•</Text>
          <Text style={styles.playerStatText}>{item.wins} wins</Text>
        </View>
      </View>
      <View style={styles.playerPoints}>
        <Text style={styles.pointsValue}>{item.points}</Text>
        <Text style={styles.pointsLabel}>pts</Text>
      </View>
    </View>
  );

  // Reward History Item
  const RewardHistoryItem = ({ item }) => (
    <View style={styles.rewardHistoryItem}>
      <View style={styles.rewardHistoryIcon}>
        <Text style={styles.rewardHistoryIconText}>{item.icon}</Text>
      </View>
      <View style={styles.rewardHistoryInfo}>
        <Text style={styles.rewardHistoryTitle}>{item.title}</Text>
        <Text style={styles.rewardHistoryDate}>{item.date}</Text>
      </View>
      <View
        style={[
          styles.rewardHistoryStatus,
          item.status === 'used' && styles.rewardStatusUsed,
        ]}
      >
        <Text
          style={[
            styles.rewardHistoryStatusText,
            item.status === 'used' && styles.rewardStatusUsedText,
          ]}
        >
          {item.status === 'used' ? 'Used' : 'Claimed'}
        </Text>
      </View>
    </View>
  );

  // Reward Unlock Modal
  const UnlockModal = () => (
    <Modal
      visible={showUnlockModal}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setShowUnlockModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.unlockModalContainer}>
          <View style={styles.unlockIconContainer}>
            <Text style={styles.unlockIcon}>🎉</Text>
          </View>
          <Text style={styles.unlockTitle}>Congratulations!</Text>
          <Text style={styles.unlockMessage}>
            You earned a free match entry!
          </Text>
          <View style={styles.unlockRewardCard}>
            <Text style={styles.unlockRewardIcon}>🎫</Text>
            <Text style={styles.unlockRewardTitle}>Free Match Entry</Text>
            <Text style={styles.unlockRewardDesc}>Valid for 30 days</Text>
          </View>
          <View style={styles.unlockActions}>
            <TouchableOpacity
              style={styles.unlockLaterButton}
              onPress={() => setShowUnlockModal(false)}
            >
              <Text style={styles.unlockLaterText}>Later</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.unlockUseButton}
              onPress={handleUseReward}
            >
              <Text style={styles.unlockUseText}>Use Now →</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  // Reward Claim Modal
  const RewardModal = () => (
    <Modal
      visible={showRewardModal}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setShowRewardModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.rewardModalContainer}>
          <View style={styles.rewardModalIcon}>
            <Text style={styles.rewardModalIconText}>🎁</Text>
          </View>
          <Text style={styles.rewardModalTitle}>{selectedReward?.title}</Text>
          <Text style={styles.rewardModalMessage}>
            {selectedReward?.message}
          </Text>
          <TouchableOpacity
            style={styles.rewardModalButton}
            onPress={() => setShowRewardModal(false)}
          >
            <Text style={styles.rewardModalButtonText}>Great!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  // Leaderboard Content
  const LeaderboardContent = () => (
    <>
      {/* Top 3 Section */}
      <View style={styles.topThreeContainer}>
        <TopThreeCard player={topPlayers[1]} position="left" />
        <TopThreeCard player={topPlayers[0]} position="center" />
        <TopThreeCard player={topPlayers[2]} position="right" />
      </View>

      {/* Ranking List Header */}
      <View style={styles.rankingHeader}>
        <Text style={styles.rankingHeaderTitle}>🏆 Full Ranking</Text>
        <Text style={styles.rankingHeaderSubtitle}>
          {allPlayers.length} players
        </Text>
      </View>

      {/* Ranking List */}
      <FlatList
        data={allPlayers}
        renderItem={({ item, index }) => (
          <RankingItem item={item} index={index} />
        )}
        keyExtractor={item => item.id}
        scrollEnabled={false}
        contentContainerStyle={styles.rankingList}
      />
    </>
  );

  // Rewards Content
  const RewardsContent = () => (
    <>
      {/* Progress Card */}
      <View style={styles.progressCard}>
        <Text style={styles.progressTitle}>🎯 Reward Progress</Text>
        <View style={styles.progressBarContainer}>
          <View
            style={[
              styles.progressBarFill,
              { width: `${getProgressPercent()}%` },
            ]}
          />
        </View>
        <Text style={styles.progressText}>
          {rewardProgress.matchesPlayed}/{rewardProgress.targetMatches} matches
          completed
        </Text>
        <Text style={styles.progressHint}>
          {rewardProgress.matchesPlayed >= rewardProgress.targetMatches
            ? '✨ You unlocked a free match! ✨'
            : `Play ${
                rewardProgress.targetMatches - rewardProgress.matchesPlayed
              } more match to unlock free entry`}
        </Text>
        {rewardProgress.matchesPlayed < rewardProgress.targetMatches && (
          <TouchableOpacity
            style={styles.claimButton}
            onPress={handleClaimReward}
          >
            <Text style={styles.claimButtonText}>Play Match →</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Rewards History */}
      <View style={styles.historyHeader}>
        <Text style={styles.historyTitle}>📜 Rewards History</Text>
      </View>

      <FlatList
        data={rewardsHistory}
        renderItem={({ item }) => <RewardHistoryItem item={item} />}
        keyExtractor={item => item.id}
        scrollEnabled={false}
        contentContainerStyle={styles.historyList}
      />
    </>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      {/* Header */}
      <View style={styles.header}>
        {/* <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity> */}
        <Text style={styles.headerTitle}>
          {activeTab === 'leaderboard' ? 'Leaderboard' : 'Rewards'}
        </Text>
        {/* <View style={{ width: 50 }} /> */}
      </View>

      {/* Tab Switcher */}
      {/* <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'leaderboard' && styles.tabActive]}
          onPress={() => setActiveTab('leaderboard')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'leaderboard' && styles.tabTextActive,
            ]}
          >
            🏆 Leaderboard
          </Text>
          {activeTab === 'leaderboard' && <View style={styles.tabIndicator} />}
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'rewards' && styles.tabActive]}
          onPress={() => setActiveTab('rewards')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'rewards' && styles.tabTextActive,
            ]}
          >
            🎁 Rewards
          </Text>
          {activeTab === 'rewards' && <View style={styles.tabIndicator} />}
        </TouchableOpacity>
      </View> */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {activeTab === 'leaderboard' ? (
          <LeaderboardContent />
        ) : (
          <RewardsContent />
        )}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      <UnlockModal />
      <RewardModal />
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 40 : 20,
    paddingBottom: 16,
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
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  // Tab Styles
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#1A1A1A',
    borderRadius: 30,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 26,
    position: 'relative',
  },
  tabActive: {
    backgroundColor: '#22C35D20',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#888888',
  },
  tabTextActive: {
    color: '#22C35D',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: -2,
    width: 40,
    height: 2,
    backgroundColor: '#22C35D',
    borderRadius: 1,
  },
  content: {
    paddingHorizontal: 20,
  },
  // Top 3 Styles
  topThreeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: 30,
    gap: 8,
  },
  topCard: {
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingBottom: 20,
    paddingTop: 20,
    borderRadius: 24,
    backgroundColor: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  topCardFirst: {
    paddingTop: 16,
    paddingBottom: 24,
    marginTop: 10,
    backgroundColor: '#22C35D10',
    borderColor: '#FFD700',
    transform: [{ scale: 1.05 }],
  },
  topCardSecond: {
    paddingTop: 12,
    paddingBottom: 16,
  },
  topCardThird: {
    paddingTop: 14,
    paddingBottom: 18,
  },
  topRankBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#0D0D0D',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  topRankFirst: {
    backgroundColor: '#FFD70020',
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  topRankSecond: {
    backgroundColor: '#C0C0C020',
  },
  topRankThird: {
    backgroundColor: '#CD7F3220',
  },
  topRankIcon: {
    fontSize: 20,
  },
  topAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#22C35D20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  topAvatarEmoji: {
    fontSize: 32,
  },
  topName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  topPoints: {
    fontSize: 16,
    fontWeight: '800',
    color: '#22C35D',
    marginBottom: 6,
  },
  topLevelBadge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: '#0D0D0D',
    borderRadius: 12,
  },
  topLevelText: {
    fontSize: 10,
    color: '#888888',
  },
  // Ranking Header
  rankingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 16,
  },
  rankingHeaderTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  rankingHeaderSubtitle: {
    fontSize: 12,
    color: '#888888',
  },
  // Ranking Item
  rankingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  rankNumber: {
    width: 50,
    alignItems: 'center',
  },
  rankNumberText: {
    fontSize: 18,
    fontWeight: '800',
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
  playerAvatarSmallEmoji: {
    fontSize: 24,
  },
  playerInfo: {
    flex: 1,
  },
  playerName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  playerStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playerStatText: {
    fontSize: 11,
    color: '#888888',
  },
  playerStatDot: {
    fontSize: 11,
    color: '#888888',
    marginHorizontal: 4,
  },
  playerPoints: {
    alignItems: 'flex-end',
  },
  pointsValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#22C35D',
  },
  pointsLabel: {
    fontSize: 10,
    color: '#888888',
  },
  rankingList: {
    paddingBottom: 16,
  },
  // Rewards Styles
  progressCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 24,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#22C35D',
    marginBottom: 16,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#2A2A2A',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#22C35D',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  progressHint: {
    fontSize: 12,
    color: '#FFD700',
    marginBottom: 20,
  },
  claimButton: {
    backgroundColor: '#22C35D',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
  },
  claimButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  historyHeader: {
    marginBottom: 16,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  historyList: {
    paddingBottom: 16,
  },
  rewardHistoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  rewardHistoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#22C35D20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  rewardHistoryIconText: {
    fontSize: 24,
  },
  rewardHistoryInfo: {
    flex: 1,
  },
  rewardHistoryTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  rewardHistoryDate: {
    fontSize: 11,
    color: '#888888',
  },
  rewardHistoryStatus: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#22C35D20',
  },
  rewardStatusUsed: {
    backgroundColor: '#2A2A2A',
  },
  rewardHistoryStatusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#22C35D',
  },
  rewardStatusUsedText: {
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
  unlockModalContainer: {
    backgroundColor: '#1A1A1A',
    borderRadius: 32,
    padding: 24,
    width: '100%',
    maxWidth: 340,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#22C35D',
  },
  unlockIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#22C35D20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  unlockIcon: {
    fontSize: 48,
  },
  unlockTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#22C35D',
    marginBottom: 8,
    textAlign: 'center',
  },
  unlockMessage: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  unlockRewardCard: {
    backgroundColor: '#0D0D0D',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    width: '100%',
    marginBottom: 24,
  },
  unlockRewardIcon: {
    fontSize: 40,
    marginBottom: 8,
  },
  unlockRewardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFD700',
    marginBottom: 4,
  },
  unlockRewardDesc: {
    fontSize: 12,
    color: '#888888',
  },
  unlockActions: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  unlockLaterButton: {
    flex: 1,
    backgroundColor: '#2A2A2A',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  unlockLaterText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#888888',
  },
  unlockUseButton: {
    flex: 1,
    backgroundColor: '#22C35D',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  unlockUseText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  rewardModalContainer: {
    backgroundColor: '#1A1A1A',
    borderRadius: 28,
    padding: 24,
    width: '100%',
    maxWidth: 300,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  rewardModalIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FFD70020',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  rewardModalIconText: {
    fontSize: 32,
  },
  rewardModalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#22C35D',
    marginBottom: 8,
    textAlign: 'center',
  },
  rewardModalMessage: {
    fontSize: 14,
    color: '#CCCCCC',
    textAlign: 'center',
    marginBottom: 20,
  },
  rewardModalButton: {
    backgroundColor: '#22C35D',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  rewardModalButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default Reward;
