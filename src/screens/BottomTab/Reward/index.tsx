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
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Reward = () => {
  const [activeTab, setActiveTab] = useState('leaderboards');
  const [selectedReward, setSelectedReward] = useState(null);
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [isMatchModalVisible, setIsMatchModalVisible] = useState(false);
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

  // const rewardsHistory = [
  //   {
  //     id: '1',
  //     title: 'Golden Boot',
  //     description:
  //       'Awarded to the top scorer of the season with 24 goals in 28 matches',
  //     icon: '👟',
  //     date: 'Earned Mar 15, 2026',
  //     points: 500,
  //     rarity: 'legendary',
  //     detailedDescription:
  //       'The Golden Boot is the most prestigious individual award for goal scorers. This season, you outperformed 127 other players to claim the top spot with an impressive 24 goals.',
  //     requirements: 'Score the most goals in a season',
  //     rewardType: 'Achievement',
  //     progress: '100%',
  //   },
  //   {
  //     id: '2',
  //     title: 'MVP Award',
  //     description: 'Most Valuable Player of the tournament',
  //     icon: '🏆',
  //     date: 'Earned Feb 20, 2026',
  //     points: 1000,
  //     rarity: 'epic',
  //     detailedDescription:
  //       'The MVP award recognizes exceptional performance throughout the tournament. You were selected by a panel of 50 judges based on your overall contribution, leadership, and sportsmanship.',
  //     requirements: 'Outstanding performance across all matches',
  //     rewardType: 'Tournament',
  //     progress: '100%',
  //   },
  //   {
  //     id: '3',
  //     title: 'Hat Trick Hero',
  //     description: 'Scored 3 or more goals in a single match',
  //     icon: '⚽',
  //     date: 'Earned Jan 12, 2026',
  //     points: 300,
  //     rarity: 'rare',
  //     detailedDescription:
  //       "A hat trick is one of football's most celebrated achievements. You scored 3 goals against Manchester City in an outstanding individual performance.",
  //     requirements: 'Score 3+ goals in one match',
  //     rewardType: 'Performance',
  //     progress: '100%',
  //   },
  //   {
  //     id: '4',
  //     title: 'Clean Sheet',
  //     description: 'Complete match without conceding any goals as a defender',
  //     icon: '🧤',
  //     date: 'Earned Dec 5, 2025',
  //     points: 200,
  //     rarity: 'rare',
  //     detailedDescription:
  //       'As a defender, maintaining a clean sheet is crucial. You led your team to a 2-0 victory against Bayern Munich with exceptional defensive performance.',
  //     requirements: 'Complete a match without conceding a goal',
  //     rewardType: 'Defensive',
  //     progress: '100%',
  //   },
  //   {
  //     id: '5',
  //     title: 'Assist King',
  //     description: 'Most assists provided in the tournament',
  //     icon: '🎯',
  //     date: 'Earned Nov 18, 2025',
  //     points: 400,
  //     rarity: 'epic',
  //     detailedDescription:
  //       'Your vision and passing accuracy resulted in 12 assists throughout the tournament, making you the top playmaker of the season.',
  //     requirements: 'Most assists in a tournament',
  //     rewardType: 'Playmaking',
  //     progress: '100%',
  //   },
  //   {
  //     id: '6',
  //     title: 'Fair Play Award',
  //     description: 'Exemplary sportsmanship and conduct',
  //     icon: '🤝',
  //     date: 'Earned Oct 30, 2025',
  //     points: 150,
  //     rarity: 'common',
  //     detailedDescription:
  //       'The Fair Play Award recognizes players who demonstrate exceptional sportsmanship, respect for opponents, and adherence to the spirit of the game.',
  //     requirements: 'No cards, clean conduct throughout season',
  //     rewardType: 'Sportsmanship',
  //     progress: '100%',
  //   },
  // ];
  const rewardsHistory = [
    {
      id: '1',
      opponent: 'FC Barcelona',
      opponentLogo: '🔴🔵',
      date: 'Apr 28, 2026',
      time: '20:00',
      score: '3 - 2',
      result: 'win',
      location: 'Camp Nou, Barcelona',
      competition: 'Champions League',
      goals: ["12' - A. Morgan", "45+2' - A. Morgan", "78' - P. Rodriguez"],
      assists: ["34' - M. Chen", "67' - L. Santos"],
      cards: [],
      possession: '52%',
      shots: '14',
      shotsOnTarget: '7',
      manOfTheMatch: true,
    },
    {
      id: '2',
      opponent: 'Real Madrid',
      opponentLogo: '⚪',
      date: 'Apr 21, 2026',
      time: '18:30',
      score: '1 - 1',
      result: 'draw',
      location: 'Santiago Bernabéu, Madrid',
      competition: 'La Liga',
      goals: ["67' - A. Morgan"],
      assists: [],
      cards: ["YELLOW - 45'"],
      possession: '48%',
      shots: '9',
      shotsOnTarget: '3',
      manOfTheMatch: false,
    },
    {
      id: '3',
      opponent: 'Bayern Munich',
      opponentLogo: '🔴⚪',
      date: 'Apr 15, 2026',
      time: '21:00',
      score: '2 - 0',
      result: 'win',
      location: 'Allianz Arena, Munich',
      competition: 'Champions League',
      goals: ["23' - A. Morgan", "56' - A. Morgan"],
      assists: ["23' - J. Hernandez"],
      cards: [],
      possession: '55%',
      shots: '12',
      shotsOnTarget: '6',
      manOfTheMatch: true,
    },
    {
      id: '4',
      opponent: 'Paris SG',
      opponentLogo: '🔵🔴',
      date: 'Apr 8, 2026',
      time: '19:45',
      score: '1 - 2',
      result: 'loss',
      location: 'Parc des Princes, Paris',
      competition: 'UEFA Cup',
      goals: ["89' - A. Morgan"],
      assists: [],
      cards: ["YELLOW - 34'", "YELLOW - 78'"],
      possession: '45%',
      shots: '8',
      shotsOnTarget: '2',
      manOfTheMatch: false,
    },
    {
      id: '5',
      opponent: 'Manchester City',
      opponentLogo: '💙',
      date: 'Apr 1, 2026',
      time: '16:00',
      score: '3 - 1',
      result: 'win',
      location: 'Etihad Stadium, Manchester',
      competition: 'Premier League',
      goals: ["12' - A. Morgan", "34' - A. Morgan", "67' - A. Morgan"],
      assists: ["12' - S. Chen", "67' - M. Rodriguez"],
      cards: [],
      possession: '50%',
      shots: '15',
      shotsOnTarget: '8',
      manOfTheMatch: true,
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
    // alert('Free match unlocked! Use it on your next payment.');
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
  // const getResultColor = result => {
  //   switch (result) {
  //     case 'win':
  //       return '#22C35D';
  //     case 'loss':
  //       return '#FF4444';
  //     case 'draw':
  //       return '#FFA500';
  //     default:
  //       return '#888888';
  //   }
  // };
  const MatchDetailModal = () => (
    <Modal
      visible={isMatchModalVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setIsMatchModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Match Details</Text>
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setIsMatchModalVisible(false)}
              >
                <Text style={styles.modalCloseText}>✕</Text>
              </TouchableOpacity>
            </View>

            {selectedMatch && (
              <>
                {/* Match Result Banner */}
                <View
                  style={[
                    styles.matchResultBanner,
                    {
                      backgroundColor:
                        getResultColor(selectedMatch.result) + '20',
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.matchResultBannerText,
                      { color: getResultColor(selectedMatch.result) },
                    ]}
                  >
                    {selectedMatch?.result?.toUpperCase()} •{' '}
                    {selectedMatch.score}
                  </Text>
                </View>

                {/* Teams Section */}
                <View style={styles.modalTeamsSection}>
                  <View style={styles.modalTeam}>
                    <Text style={styles.modalTeamLogo}>
                      {selectedMatch.opponentLogo}
                    </Text>
                    <Text style={styles.modalTeamName}>
                      {selectedMatch.opponent}
                    </Text>
                  </View>
                  <Text style={styles.modalVs}>VS</Text>
                  <View style={styles.modalTeam}>
                    <Text style={styles.modalTeamLogo}>⚽</Text>
                    <Text style={styles.modalTeamName}>Your Team</Text>
                  </View>
                </View>

                {/* Match Info Grid */}
                <View style={styles.modalInfoGrid}>
                  <View style={styles.modalInfoItem}>
                    <Text style={styles.modalInfoIcon}>📅</Text>
                    <Text style={styles.modalInfoLabel}>Date</Text>
                    <Text style={styles.modalInfoValue}>
                      {selectedMatch.date}
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
                    <Text style={styles.modalInfoIcon}>🏟️</Text>
                    <Text style={styles.modalInfoLabel}>Location</Text>
                    <Text style={styles.modalInfoValue}>
                      {selectedMatch.location}
                    </Text>
                  </View>
                  <View style={styles.modalInfoItem}>
                    <Text style={styles.modalInfoIcon}>🏆</Text>
                    <Text style={styles.modalInfoLabel}>Competition</Text>
                    <Text style={styles.modalInfoValue}>
                      {selectedMatch.competition}
                    </Text>
                  </View>
                </View>

                {/* Match Stats */}
                <View style={styles.modalStatsSection}>
                  <Text style={styles.modalSectionTitle}>
                    📊 Match Statistics
                  </Text>
                  <View style={styles.modalStatRow}>
                    <Text style={styles.modalStatLabel}>Possession</Text>
                    <View style={styles.modalStatBarContainer}>
                      <View
                        style={[
                          styles.modalStatBar,
                          { width: selectedMatch.possession },
                        ]}
                      />
                    </View>
                    <Text style={styles.modalStatValue}>
                      {selectedMatch.possession}
                    </Text>
                  </View>
                  <View style={styles.modalStatRow}>
                    <Text style={styles.modalStatLabel}>Total Shots</Text>
                    <Text style={styles.modalStatValue}>
                      {selectedMatch.shots}
                    </Text>
                  </View>
                  <View style={styles.modalStatRow}>
                    <Text style={styles.modalStatLabel}>Shots on Target</Text>
                    <Text style={styles.modalStatValue}>
                      {selectedMatch.shotsOnTarget}
                    </Text>
                  </View>
                </View>

                {/* Goals Section */}
                {selectedMatch.goals && selectedMatch.goals.length > 0 && (
                  <View style={styles.modalActionsSection}>
                    <Text style={styles.modalSectionTitle}>⚽ Goals</Text>
                    {selectedMatch.goals.map((goal, idx) => (
                      <View key={idx} style={styles.modalActionItem}>
                        <Text style={styles.modalActionIcon}>⚽</Text>
                        <Text style={styles.modalActionText}>{goal}</Text>
                      </View>
                    ))}
                  </View>
                )}

                {/* Assists Section */}
                {selectedMatch.assists && selectedMatch.assists.length > 0 && (
                  <View style={styles.modalActionsSection}>
                    <Text style={styles.modalSectionTitle}>🎯 Assists</Text>
                    {selectedMatch.assists.map((assist, idx) => (
                      <View key={idx} style={styles.modalActionItem}>
                        <Text style={styles.modalActionIcon}>🎯</Text>
                        <Text style={styles.modalActionText}>{assist}</Text>
                      </View>
                    ))}
                  </View>
                )}

                {/* Cards Section */}
                {selectedMatch.cards && selectedMatch.cards.length > 0 && (
                  <View style={styles.modalActionsSection}>
                    <Text style={styles.modalSectionTitle}>🟨 Cards</Text>
                    {selectedMatch.cards.map((card, idx) => (
                      <View key={idx} style={styles.modalActionItem}>
                        <Text style={styles.modalActionIcon}>🟨</Text>
                        <Text style={styles.modalActionText}>{card}</Text>
                      </View>
                    ))}
                  </View>
                )}

                {/* MOTM Badge */}
                {selectedMatch.manOfTheMatch && (
                  <View style={styles.motmSection}>
                    <Text style={styles.motmSectionIcon}>⭐</Text>
                    <Text style={styles.motmSectionText}>Man of the Match</Text>
                  </View>
                )}
              </>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
  const openMatchDetail = match => {
    setSelectedMatch(match);
    // console.log('Opening match detail for:', match);
    setIsMatchModalVisible(true);
  };
  const getResultColor = result => {
    switch (result) {
      case 'win':
        return '#22C35D';
      case 'loss':
        return '#FF4444';
      case 'draw':
        return '#FFA500';
      default:
        return '#888888';
    }
  };
  // Reward History Item
  const getResultIcon = result => {
    switch (result) {
      case 'win':
        return '✓';
      case 'loss':
        return '✗';
      case 'draw':
        return '=';
      default:
        return '?';
    }
  };
  const RewardHistoryItem = ({ item }) => (
    // <TouchableOpacity
    //   onPress={() => openMatchDetail(item)}
    //   style={styles.rewardHistoryItem}
    // >
    //   <View style={styles.rewardHistoryIcon}>
    //     <Text style={styles.rewardHistoryIconText}>{item.icon}</Text>
    //   </View>
    //   <View style={styles.rewardHistoryInfo}>
    //     <Text style={styles.rewardHistoryTitle}>{item.title}</Text>
    //     <Text style={styles.rewardHistoryDate}>{item.date}</Text>
    //   </View>
    //   <View
    //     style={[
    //       styles.rewardHistoryStatus,
    //       item.status === 'used' && styles.rewardStatusUsed,
    //     ]}
    //   >
    //     <Text
    //       style={[
    //         styles.rewardHistoryStatusText,
    //         item.status === 'used' && styles.rewardStatusUsedText,
    //       ]}
    //     >
    //       {item.status === 'used' ? 'Used' : 'Claimed'}
    //     </Text>
    //   </View>
    // </TouchableOpacity>
    <TouchableOpacity
      style={styles.matchCard}
      onPress={() => openMatchDetail(item)}
    >
      <View style={styles.matchHeader}>
        <View style={styles.matchCompetition}>
          <Text style={styles.matchCompetitionText}>{item.competition}</Text>
        </View>
        <View
          style={[
            styles.matchResult,
            { backgroundColor: getResultColor(item.result) + '20' },
          ]}
        >
          <Text
            style={[
              styles.matchResultText,
              { color: getResultColor(item.result) },
            ]}
          >
            {getResultIcon(item.result)} {item.result.toUpperCase()}
          </Text>
        </View>
      </View>

      <View style={styles.matchBody}>
        <View style={styles.matchTeams}>
          <Text style={styles.matchOpponent}>{item.opponent}</Text>
          <Text style={styles.matchVs}>vs</Text>
          <Text style={styles.matchUser}>You</Text>
        </View>
        <Text style={styles.matchScore}>{item.score}</Text>
      </View>

      <View style={styles.matchFooter}>
        <View style={styles.matchInfo}>
          <Text style={styles.matchInfoIcon}>📅</Text>
          <Text style={styles.matchInfoText}>{item.date}</Text>
        </View>
        <View style={styles.matchInfo}>
          <Text style={styles.matchInfoIcon}>📍</Text>
          <Text style={styles.matchInfoText}>
            {item.location.split(',')[0]}
          </Text>
        </View>
        {item.manOfTheMatch && (
          <View style={styles.motmBadge}>
            <Text style={styles.motmIcon}>⭐</Text>
            <Text style={styles.motmText}>MOTM</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
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
  const { top } = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: top }]}>
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
      <MatchDetailModal />
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
  matchCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    marginHorizontal: 24,
    marginBottom: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  matchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  matchCompetition: {
    backgroundColor: '#0D0D0D',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  matchCompetitionText: {
    fontSize: 11,
    color: '#888888',
    fontWeight: '600',
  },
  matchResult: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  matchResultText: {
    fontSize: 11,
    fontWeight: '700',
  },
  matchBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  matchTeams: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  matchOpponent: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  matchVs: {
    fontSize: 12,
    color: '#666666',
  },
  matchUser: {
    fontSize: 16,
    fontWeight: '700',
    color: '#22C35D',
  },
  matchScore: {
    fontSize: 18,
    fontWeight: '800',
    color: '#22C35D',
  },
  matchFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#2A2A2A',
  },
  matchInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  matchInfoIcon: {
    fontSize: 11,
    marginRight: 4,
  },
  matchInfoText: {
    fontSize: 11,
    color: '#888888',
  },
  motmBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFD70020',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  motmIcon: {
    fontSize: 10,
    marginRight: 4,
  },
  motmText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFD700',
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
  // Match Modal Styles
  matchResultBanner: {
    margin: 20,
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  matchResultBannerText: {
    fontSize: 18,
    fontWeight: '800',
  },
  modalTeamsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  modalTeam: {
    alignItems: 'center',
    flex: 1,
  },
  modalTeamLogo: {
    fontSize: 40,
    marginBottom: 8,
  },
  modalTeamName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  modalVs: {
    fontSize: 14,
    fontWeight: '700',
    color: '#666666',
    marginHorizontal: 16,
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
  modalStatsSection: {
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
  modalStatRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalStatLabel: {
    width: 90,
    fontSize: 13,
    color: '#888888',
  },
  modalStatBarContainer: {
    flex: 1,
    height: 6,
    backgroundColor: '#2A2A2A',
    borderRadius: 3,
    marginHorizontal: 12,
    overflow: 'hidden',
  },
  modalStatBar: {
    height: '100%',
    backgroundColor: '#22C35D',
    borderRadius: 3,
  },
  modalStatValue: {
    width: 45,
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'right',
  },
  modalActionsSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  modalActionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  modalActionIcon: {
    fontSize: 14,
    marginRight: 10,
  },
  modalActionText: {
    fontSize: 13,
    color: '#CCCCCC',
  },
  motmSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#FFD70010',
    margin: 20,
    borderRadius: 12,
  },
  motmSectionIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  motmSectionText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFD700',
  },
  // Reward Modal Styles
  rewardHeroSection: {
    alignItems: 'center',
    padding: 30,
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
    color: '#FFFFFF',
    marginBottom: 8,
  },
  rewardHeroRarity: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  rewardHeroRarityText: {
    fontSize: 12,
    fontWeight: '700',
  },
  modalDescriptionSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  modalDescriptionText: {
    fontSize: 14,
    color: '#CCCCCC',
    lineHeight: 22,
  },
  modalRequirementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  modalRequirementIcon: {
    fontSize: 14,
    color: '#22C35D',
    marginRight: 10,
    fontWeight: '700',
  },
  modalRequirementText: {
    flex: 1,
    fontSize: 13,
    color: '#CCCCCC',
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#22C35D',
    margin: 20,
    padding: 14,
    borderRadius: 12,
  },
  shareButtonIcon: {
    fontSize: 16,
    marginRight: 8,
    color: '#FFFFFF',
  },
  shareButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
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
