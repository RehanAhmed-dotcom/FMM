// ProfileScreen.js
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
import { RootNavigationProp } from '../../../types/navigationType';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Logout from '../../../component/Logout';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const Profile = () => {
  const [activeTab, setActiveTab] = useState('matches');
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [selectedReward, setSelectedReward] = useState(null);
  const [isMatchModalVisible, setIsMatchModalVisible] = useState(false);
  const [isRewardModalVisible, setIsRewardModalVisible] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    setShowLogoutModal(false);
    navigation.navigate('Login');
    // Clear user session
    // Navigate to login screen
    // alert('Logged out successfully');
  };
  const navigation = useNavigation<RootNavigationProp<'MyTabs'>>();
  // User Data
  const userData = {
    name: 'Alex Morgan',
    username: '@alexmorgan',
    avatar: null,
    joinDate: 'Joined March 2024',
    location: 'New York, USA',
    bio: 'Professional footballer | Passionate about the beautiful game ⚽',
    matchesPlayed: 127,
    wins: 89,
    rank: '#342',
    winRate: 70,
    followers: 1243,
    following: 567,
  };

  // Detailed Matches Data
  const matchesData = [
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

  // Detailed Rewards Data
  const rewardsData = [
    {
      id: '1',
      title: 'Golden Boot',
      description:
        'Awarded to the top scorer of the season with 24 goals in 28 matches',
      icon: '👟',
      date: 'Earned Mar 15, 2026',
      points: 500,
      rarity: 'legendary',
      detailedDescription:
        'The Golden Boot is the most prestigious individual award for goal scorers. This season, you outperformed 127 other players to claim the top spot with an impressive 24 goals.',
      requirements: 'Score the most goals in a season',
      rewardType: 'Achievement',
      progress: '100%',
    },
    {
      id: '2',
      title: 'MVP Award',
      description: 'Most Valuable Player of the tournament',
      icon: '🏆',
      date: 'Earned Feb 20, 2026',
      points: 1000,
      rarity: 'epic',
      detailedDescription:
        'The MVP award recognizes exceptional performance throughout the tournament. You were selected by a panel of 50 judges based on your overall contribution, leadership, and sportsmanship.',
      requirements: 'Outstanding performance across all matches',
      rewardType: 'Tournament',
      progress: '100%',
    },
    {
      id: '3',
      title: 'Hat Trick Hero',
      description: 'Scored 3 or more goals in a single match',
      icon: '⚽',
      date: 'Earned Jan 12, 2026',
      points: 300,
      rarity: 'rare',
      detailedDescription:
        "A hat trick is one of football's most celebrated achievements. You scored 3 goals against Manchester City in an outstanding individual performance.",
      requirements: 'Score 3+ goals in one match',
      rewardType: 'Performance',
      progress: '100%',
    },
    {
      id: '4',
      title: 'Clean Sheet',
      description: 'Complete match without conceding any goals as a defender',
      icon: '🧤',
      date: 'Earned Dec 5, 2025',
      points: 200,
      rarity: 'rare',
      detailedDescription:
        'As a defender, maintaining a clean sheet is crucial. You led your team to a 2-0 victory against Bayern Munich with exceptional defensive performance.',
      requirements: 'Complete a match without conceding a goal',
      rewardType: 'Defensive',
      progress: '100%',
    },
    {
      id: '5',
      title: 'Assist King',
      description: 'Most assists provided in the tournament',
      icon: '🎯',
      date: 'Earned Nov 18, 2025',
      points: 400,
      rarity: 'epic',
      detailedDescription:
        'Your vision and passing accuracy resulted in 12 assists throughout the tournament, making you the top playmaker of the season.',
      requirements: 'Most assists in a tournament',
      rewardType: 'Playmaking',
      progress: '100%',
    },
    {
      id: '6',
      title: 'Fair Play Award',
      description: 'Exemplary sportsmanship and conduct',
      icon: '🤝',
      date: 'Earned Oct 30, 2025',
      points: 150,
      rarity: 'common',
      detailedDescription:
        'The Fair Play Award recognizes players who demonstrate exceptional sportsmanship, respect for opponents, and adherence to the spirit of the game.',
      requirements: 'No cards, clean conduct throughout season',
      rewardType: 'Sportsmanship',
      progress: '100%',
    },
  ];

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

  const getRarityColor = rarity => {
    switch (rarity) {
      case 'legendary':
        return '#FFD700';
      case 'epic':
        return '#9B59B6';
      case 'rare':
        return '#3498DB';
      case 'common':
        return '#95A5A6';
      default:
        return '#888888';
    }
  };

  const getRarityBgColor = rarity => {
    switch (rarity) {
      case 'legendary':
        return '#FFD70020';
      case 'epic':
        return '#9B59B620';
      case 'rare':
        return '#3498DB20';
      case 'common':
        return '#95A5A620';
      default:
        return '#88888820';
    }
  };

  const openMatchDetail = match => {
    // setSelectedMatch(match);
    console.log('Opening reward detail for:', match);
    // setIsMatchModalVisible(true);
    navigation.navigate('MatchDetail', { id: 10 });
  };

  const openRewardDetail = reward => {
    setSelectedReward(reward);
    console.log('Opening reward detail for:', reward);
    setIsRewardModalVisible(true);
  };

  const renderMatchItem = ({ item }) => (
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

  const renderRewardItem = ({ item }) => (
    <TouchableOpacity
      style={styles.rewardCard}
      onPress={() => openRewardDetail(item)}
    >
      <View
        style={[
          styles.rewardIconContainer,
          { backgroundColor: getRarityBgColor(item.rarity) },
        ]}
      >
        <Text style={styles.rewardIcon}>{item.icon}</Text>
      </View>
      <View style={styles.rewardInfo}>
        <View style={styles.rewardHeader}>
          <Text style={styles.rewardTitle}>{item.title}</Text>
          <View
            style={[
              styles.rewardRarity,
              { backgroundColor: getRarityBgColor(item.rarity) },
            ]}
          >
            <Text
              style={[
                styles.rewardRarityText,
                { color: getRarityColor(item.rarity) },
              ]}
            >
              {item.rarity}
            </Text>
          </View>
        </View>
        <Text style={styles.rewardDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.rewardFooter}>
          <View style={styles.rewardDate}>
            <Text style={styles.rewardDateIcon}>🏆</Text>
            <Text style={styles.rewardDateText}>{item.date}</Text>
          </View>
          <View style={styles.rewardPoints}>
            <Text style={styles.rewardPointsIcon}>💰</Text>
            <Text style={styles.rewardPointsText}>+{item.points} XP</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  // Match Detail Modal
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
                    {selectedMatch.result.toUpperCase()} • {selectedMatch.score}
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

  // Reward Detail Modal
  const RewardDetailModal = () => (
    <Modal
      visible={isRewardModalVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setIsRewardModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Reward Details</Text>
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setIsRewardModalVisible(false)}
              >
                <Text style={styles.modalCloseText}>✕</Text>
              </TouchableOpacity>
            </View>

            {selectedReward && (
              <>
                {/* Reward Hero Section */}
                <View
                  style={[
                    styles.rewardHeroSection,
                    {
                      backgroundColor: getRarityBgColor(selectedReward.rarity),
                    },
                  ]}
                >
                  <Text style={styles.rewardHeroIcon}>
                    {selectedReward.icon}
                  </Text>
                  <Text style={styles.rewardHeroTitle}>
                    {selectedReward.title}
                  </Text>
                  <View
                    style={[
                      styles.rewardHeroRarity,
                      {
                        backgroundColor:
                          getRarityColor(selectedReward.rarity) + '20',
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.rewardHeroRarityText,
                        { color: getRarityColor(selectedReward.rarity) },
                      ]}
                    >
                      {selectedReward.rarity.toUpperCase()}
                    </Text>
                  </View>
                </View>

                {/* Reward Info Grid */}
                <View style={styles.modalInfoGrid}>
                  <View style={styles.modalInfoItem}>
                    <Text style={styles.modalInfoIcon}>📅</Text>
                    <Text style={styles.modalInfoLabel}>Earned Date</Text>
                    <Text style={styles.modalInfoValue}>
                      {selectedReward.date}
                    </Text>
                  </View>
                  <View style={styles.modalInfoItem}>
                    <Text style={styles.modalInfoIcon}>💰</Text>
                    <Text style={styles.modalInfoLabel}>XP Points</Text>
                    <Text style={styles.modalInfoValue}>
                      +{selectedReward.points}
                    </Text>
                  </View>
                  <View style={styles.modalInfoItem}>
                    <Text style={styles.modalInfoIcon}>🏷️</Text>
                    <Text style={styles.modalInfoLabel}>Type</Text>
                    <Text style={styles.modalInfoValue}>
                      {selectedReward.rewardType}
                    </Text>
                  </View>
                  <View style={styles.modalInfoItem}>
                    <Text style={styles.modalInfoIcon}>📊</Text>
                    <Text style={styles.modalInfoLabel}>Progress</Text>
                    <Text style={styles.modalInfoValue}>
                      {selectedReward.progress}
                    </Text>
                  </View>
                </View>

                {/* Description Section */}
                <View style={styles.modalDescriptionSection}>
                  <Text style={styles.modalSectionTitle}>📝 Description</Text>
                  <Text style={styles.modalDescriptionText}>
                    {selectedReward.description}
                  </Text>
                </View>

                {/* Detailed Description */}
                <View style={styles.modalDescriptionSection}>
                  <Text style={styles.modalSectionTitle}>✨ Details</Text>
                  <Text style={styles.modalDescriptionText}>
                    {selectedReward.detailedDescription}
                  </Text>
                </View>

                {/* Requirements Section */}
                <View style={styles.modalDescriptionSection}>
                  <Text style={styles.modalSectionTitle}>📋 Requirements</Text>
                  <View style={styles.modalRequirementItem}>
                    <Text style={styles.modalRequirementIcon}>✓</Text>
                    <Text style={styles.modalRequirementText}>
                      {selectedReward.requirements}
                    </Text>
                  </View>
                </View>

                {/* Share Button */}
                <TouchableOpacity style={styles.shareButton}>
                  <Text style={styles.shareButtonIcon}>📤</Text>
                  <Text style={styles.shareButtonText}>Share Achievement</Text>
                </TouchableOpacity>
              </>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      {/* Profile Header */}
      <TouchableOpacity
        onPress={() => setShowLogoutModal(true)}
        style={{ position: 'absolute', zIndex: 1000, top: 20, right: 20 }}
      >
        <AntDesign name={'logout'} size={20} color={'white'} />
      </TouchableOpacity>
      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarEmoji}>⚽</Text>
          </View>
          <TouchableOpacity style={styles.editAvatarButton}>
            <Text style={styles.editAvatarIcon}>📷</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{userData.name}</Text>
          {/* <Text style={styles.profileUsername}>{userData.username}</Text> */}
          <Text style={styles.profileBio}>{userData.bio}</Text>
          <View style={styles.profileMeta}>
            <View style={styles.metaItem}>
              <Text style={styles.metaIcon}>📍</Text>
              <Text style={styles.metaText}>{userData.location}</Text>
            </View>
            <View style={styles.metaDot} />
            <View style={styles.metaItem}>
              <Text style={styles.metaIcon}>📅</Text>
              <Text style={styles.metaText}>{userData.joinDate}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Follow Stats */}
      {/* <View style={styles.followStats}>
        <View style={styles.followStat}>
          <Text style={styles.followStatValue}>{userData.followers}</Text>
          <Text style={styles.followStatLabel}>Followers</Text>
        </View>
        <View style={styles.followDivider} />
        <View style={styles.followStat}>
          <Text style={styles.followStatValue}>{userData.following}</Text>
          <Text style={styles.followStatLabel}>Following</Text>
        </View>
      </View> */}

      {/* Stats Section */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{userData.matchesPlayed}</Text>
          <Text style={styles.statLabel}>Matches</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{userData.wins}</Text>
          <Text style={styles.statLabel}>Wins</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{userData.winRate}%</Text>
          <Text style={styles.statLabel}>Win Rate</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{userData.rank}</Text>
          <Text style={styles.statLabel}>Rank</Text>
        </View>
      </View>

      {/* Edit Profile Button */}
      <TouchableOpacity
        onPress={() => navigation.navigate('EditProfile')}
        style={styles.editProfileButton}
      >
        <Text style={styles.editProfileIcon}>✎</Text>
        <Text style={styles.editProfileText}>Edit Profile</Text>
      </TouchableOpacity>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'matches' && styles.tabActive]}
          onPress={() => setActiveTab('matches')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'matches' && styles.tabTextActive,
            ]}
          >
            My Matches
          </Text>
          {activeTab === 'matches' && <View style={styles.tabIndicator} />}
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
            Rewards
          </Text>
          {activeTab === 'rewards' && <View style={styles.tabIndicator} />}
        </TouchableOpacity>
      </View>
    </View>
  );
  const { top } = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      {renderHeader()}
      <FlatList
        data={activeTab === 'matches' ? matchesData : rewardsData}
        renderItem={
          activeTab === 'matches' ? renderMatchItem : renderRewardItem
        }
        keyExtractor={item => item.id}
        // ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        initialNumToRender={10}
        removeClippedSubviews={true}
      />
      <Logout
        visible={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
        navigation={navigation}
      />
      <MatchDetailModal />
      <RewardDetailModal />
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
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 40 : 20,
  },
  profileHeader: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#22C35D20',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#22C35D',
  },
  avatarEmoji: {
    fontSize: 40,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#22C35D',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#000000',
  },
  editAvatarIcon: {
    fontSize: 12,
    color: '#FFFFFF',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  profileUsername: {
    fontSize: 13,
    color: '#22C35D',
    marginBottom: 6,
  },
  profileBio: {
    fontSize: 13,
    color: '#888888',
    marginBottom: 8,
    lineHeight: 18,
  },
  profileMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaIcon: {
    fontSize: 11,
    marginRight: 4,
  },
  metaText: {
    fontSize: 11,
    color: '#888888',
  },
  metaDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#444444',
    marginHorizontal: 8,
  },
  // Follow Stats
  followStats: {
    flexDirection: 'row',
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    paddingVertical: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  followStat: {
    flex: 1,
    alignItems: 'center',
  },
  followStatValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  followStatLabel: {
    fontSize: 11,
    color: '#888888',
  },
  followDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#2A2A2A',
  },
  // Stats Styles
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#1A1A1A',
    borderRadius: 20,
    paddingVertical: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
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
  // Edit Profile Button
  editProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    paddingVertical: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  editProfileIcon: {
    fontSize: 16,
    marginRight: 8,
    color: '#22C35D',
  },
  editProfileText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#22C35D',
  },
  // Tabs Styles
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    position: 'relative',
  },
  tabText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#888888',
  },
  tabTextActive: {
    color: '#22C35D',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: -1,
    left: '25%',
    width: '50%',
    height: 2,
    backgroundColor: '#22C35D',
    borderRadius: 1,
  },
  // Match Card Styles
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
  // Reward Card Styles
  rewardCard: {
    flexDirection: 'row',
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    marginHorizontal: 24,
    marginBottom: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  rewardIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  rewardIcon: {
    fontSize: 28,
  },
  rewardInfo: {
    flex: 1,
  },
  rewardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  rewardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  rewardRarity: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  rewardRarityText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  rewardDescription: {
    fontSize: 12,
    color: '#888888',
    marginBottom: 8,
    lineHeight: 16,
  },
  rewardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rewardDate: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rewardDateIcon: {
    fontSize: 10,
    marginRight: 4,
  },
  rewardDateText: {
    fontSize: 10,
    color: '#666666',
  },
  rewardPoints: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rewardPointsIcon: {
    fontSize: 10,
    marginRight: 4,
  },
  rewardPointsText: {
    fontSize: 10,
    color: '#22C35D',
    fontWeight: '600',
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
});

export default Profile;
