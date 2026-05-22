// import React from 'react';
// import { Text, View } from 'react-native';

// const Notifications = () => {
//   return (
//     <View>
//       <Text>Hi</Text>
//     </View>
//   );
// };

// export default Notifications;
// NotificationScreen.js
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  FlatList,
  Switch,
  Modal,
  ScrollView,
  TextInput,
  Platform,
} from 'react-native';
import { RootNavigationProp } from '../../../types/navigationType';

const Notifications = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const navigation = useNavigation<RootNavigationProp<'Notifications'>>();
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      type: 'match',
      title: 'Match Reminder',
      message: 'Your match against FC Barcelona starts in 2 hours',
      time: '2 hours ago',
      isRead: false,
      icon: '⚽',
      action: 'View Match',
      priority: 'high',
      detailData: {
        matchId: 'MCH001',
        opponent: 'FC Barcelona',
        location: 'Camp Nou, Barcelona',
        time: 'Today, 6:00 PM',
        entryFee: '$10',
        prize: '$500',
        players: ['You', 'John D.', 'Mike R.', 'Sarah L.'],
        status: 'upcoming',
      },
    },
    {
      id: '2',
      type: 'reward',
      title: 'Reward Unlocked! 🎁',
      message: "You've earned 500 XP for completing 5 matches",
      time: '5 hours ago',
      isRead: false,
      icon: '🏆',
      action: 'Claim Reward',
      priority: 'high',
      detailData: {
        rewardId: 'RWD002',
        title: 'XP Boost Reward',
        rewardType: 'XP Points',
        amount: 500,
        description:
          'You have earned 500 XP for completing 5 matches in the tournament.',
        requirements: 'Play 5 matches in any tournament',
        progress: '5/5 completed',
      },
    },
    {
      id: '3',
      type: 'match',
      title: 'New Match Available',
      message: '5v5 Tournament at Brooklyn Sports Club - 4 spots left!',
      time: 'Yesterday',
      isRead: true,
      icon: '📍',
      action: 'View Match',
      priority: 'medium',
      detailData: {
        matchId: 'MCH003',
        title: '5v5 Tournament',
        location: 'Brooklyn Sports Club',
        time: 'Tomorrow, 4:00 PM',
        entryFee: '$15',
        prize: '$300',
        slotsLeft: 4,
        totalSlots: 12,
        level: 'Intermediate',
      },
    },
    // {
    //   id: '4',
    //   type: 'social',
    //   title: 'New Follower',
    //   message: '@john_doe started following you',
    //   time: 'Yesterday',
    //   isRead: true,
    //   icon: '👤',
    //   action: 'View Profile',
    //   priority: 'low',
    //   detailData: {
    //     userId: 'USR004',
    //     username: '@john_doe',
    //     fullName: 'John Doe',
    //     avatar: '👤',
    //     followers: 234,
    //     matchesPlayed: 45,
    //     winRate: 68,
    //     followBack: true,
    //   },
    // },
    // {
    //   id: '5',
    //   type: 'reward',
    //   title: 'Weekly Challenge',
    //   message: 'Score 10 goals this week to earn double XP',
    //   time: '2 days ago',
    //   isRead: true,
    //   icon: '⚡',
    //   action: 'View Challenge',
    //   priority: 'medium',
    //   detailData: {
    //     challengeId: 'CHL005',
    //     title: 'Goal Scorer Challenge',
    //     description: 'Score 10 goals this week to earn double XP points',
    //     currentProgress: 7,
    //     targetProgress: 10,
    //     reward: 'Double XP for 3 matches',
    //     deadline: '3 days remaining',
    //     difficulty: 'Medium',
    //   },
    // },
    {
      id: '6',
      type: 'match',
      title: 'Match Result',
      message: 'You won against Real Madrid! Final score: 3-1',
      time: '3 days ago',
      isRead: true,
      icon: '✓',
      action: 'View Stats',
      priority: 'low',
      detailData: {
        matchId: 'MCH006',
        opponent: 'Real Madrid',
        result: 'Win',
        score: '3 - 1',
        date: '3 days ago',
        goals: ["12' - You", "45' - You", "78' - Team"],
        assists: ["34' - M. Chen"],
        possession: '52%',
        shots: '14',
        shotsOnTarget: '7',
        manOfTheMatch: true,
      },
    },
    {
      id: '7',
      type: 'social',
      title: 'Achievement Earned',
      message: "Congratulations! You've reached level 10",
      time: '3 days ago',
      isRead: true,
      icon: '⭐',
      action: 'View Badges',
      priority: 'low',
      detailData: {
        badgeId: 'BDG007',
        title: 'Level 10 Achieved',
        description: 'You have reached Level 10 by earning 5000 XP points',
        badges: [
          { name: 'Rookie', icon: '🌱', unlocked: true },
          { name: 'Starter', icon: '⚡', unlocked: true },
          { name: 'Pro', icon: '🏆', unlocked: true },
          { name: 'Legend', icon: '👑', unlocked: false },
          { name: 'MVP', icon: '⭐', unlocked: false },
        ],
        nextLevel: '15',
        xpToNext: '2500',
      },
    },
    {
      id: '8',
      type: 'social',
      title: 'Team Invitation',
      message: 'You\'ve been invited to join "Weekend Warriors" team',
      time: '4 days ago',
      isRead: false,
      icon: '🤝',
      action: 'Respond',
      priority: 'high',
      detailData: {
        teamId: 'TM008',
        teamName: 'Weekend Warriors',
        captain: '@captain_mike',
        members: 8,
        maxMembers: 12,
        description:
          'A competitive team that plays every weekend. Looking for dedicated players.',
        requirements: 'Minimum 50 matches played',
        message:
          'We saw your performance and would love to have you on our team!',
      },
    },
    // {
    //   id: '9',
    //   type: 'reward',
    //   title: 'Special Offer',
    //   message: 'Get 20% off on your next match entry fee',
    //   time: '5 days ago',
    //   isRead: true,
    //   icon: '💰',
    //   action: 'Claim Offer',
    //   priority: 'medium',
    //   detailData: {
    //     offerId: 'OFF009',
    //     title: '20% Off Entry Fee',
    //     discount: '20%',
    //     code: 'SAVE20',
    //     expiryDate: 'Dec 31, 2026',
    //     terms:
    //       'Valid for one match entry. Cannot be combined with other offers.',
    //     minEntryFee: '$10',
    //   },
    // },
    // {
    //   id: '10',
    //   type: 'social',
    //   title: 'Comment on your post',
    //   message: 'Sarah commented: "Great game yesterday!"',
    //   time: '6 days ago',
    //   isRead: true,
    //   icon: '💬',
    //   action: 'Reply',
    //   priority: 'low',
    //   detailData: {
    //     postId: 'PST010',
    //     commenter: 'Sarah Williams',
    //     commenterAvatar: '👩',
    //     comment: 'Great game yesterday! Your hat-trick was amazing!',
    //     postContent: 'Had an amazing match today! Scored 3 goals ⚽⚽⚽',
    //     replies: [],
    //   },
    // },
  ]);

  const [settings, setSettings] = useState({
    matchReminders: true,
    rewardAlerts: true,
    socialUpdates: true,
    promotionalOffers: false,
    emailNotifications: true,
    pushNotifications: true,
  });

  const tabs = [
    { id: 'all', label: 'All', icon: '🔔' },
    { id: 'unread', label: 'Unread', icon: '✨' },
    { id: 'matches', label: 'Matches', icon: '⚽' },
    { id: 'rewards', label: 'Rewards', icon: '🎁' },
    // { id: 'social', label: 'Social', icon: '👥' },
  ];

  const markAsRead = id => {
    setNotifications(prev =>
      prev.map(notif => (notif.id === id ? { ...notif, isRead: true } : notif)),
    );
  };

  const handleNotificationPress = notification => {
    markAsRead(notification.id);
    setSelectedNotification(notification);
    setIsDetailModalVisible(true);
  };

  const handleClaimReward = () => {
    alert(
      `Reward claimed! +${selectedNotification.detailData.amount} ${selectedNotification.detailData.rewardType} added to your account.`,
    );
    setIsDetailModalVisible(false);
  };

  const handleJoinMatch = () => {
    // alert(
    //   `Joined ${
    //     selectedNotification.detailData.title ||
    //     selectedNotification.detailData.opponent
    //   }! Entry fee: ${selectedNotification.detailData.entryFee}`,
    // );
    navigation.navigate('Payment');
    setIsDetailModalVisible(false);
  };

  const handleViewStats = () => {
    alert(
      `Viewing match statistics for ${selectedNotification.detailData.opponent}`,
    );
    setIsDetailModalVisible(false);
  };

  const handleViewChallenge = () => {
    alert(`Challenge: ${selectedNotification.detailData.title}`);
    setIsDetailModalVisible(false);
  };

  const handleViewBadges = () => {
    alert(`Viewing your badge collection`);
    setIsDetailModalVisible(false);
  };

  const handleRespondToInvite = response => {
    alert(`${response} to join ${selectedNotification.detailData.teamName}`);
    setIsDetailModalVisible(false);
  };

  const handleClaimOffer = () => {
    alert(
      `Offer claimed! Use code: ${selectedNotification.detailData.code} at checkout.`,
    );
    setIsDetailModalVisible(false);
  };

  const handleReply = () => {
    if (!responseMessage.trim()) {
      alert('Please enter a reply message');
      return;
    }
    alert(`Reply sent: "${responseMessage}"`);
    setResponseMessage('');
    setIsDetailModalVisible(false);
  };

  const handleFollowBack = () => {
    alert(`You are now following ${selectedNotification.detailData.username}`);
    setIsDetailModalVisible(false);
  };

  const getFilteredNotifications = () => {
    switch (activeTab) {
      case 'unread':
        return notifications.filter(n => !n.isRead);
      case 'matches':
        return notifications.filter(n => n.type === 'match');
      case 'rewards':
        return notifications.filter(n => n.type === 'reward');
      // case 'social':
      //   return notifications.filter(n => n.type === 'social');
      default:
        return notifications;
    }
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

  // Detail Modal Content based on action type
  const renderDetailContent = () => {
    if (!selectedNotification) return null;

    switch (selectedNotification.action) {
      case 'View Match':
        return renderMatchDetail();
      case 'Claim Reward':
        return renderRewardDetail();
      case 'View Challenge':
        return renderChallengeDetail();
      case 'View Stats':
        return renderStatsDetail();
      case 'View Badges':
        return renderBadgesDetail();
      case 'Respond':
        return renderRespondDetail();
      case 'Claim Offer':
        return renderOfferDetail();
      case 'View Profile':
        return renderProfileDetail();
      case 'Reply':
        return renderReplyDetail();
      default:
        return renderDefaultDetail();
    }
  };

  const renderMatchDetail = () => {
    const data = selectedNotification.detailData;
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.detailHero}>
          <Text style={styles.detailHeroIcon}>⚽</Text>
          <Text style={styles.detailHeroTitle}>
            {data.opponent || data.title}
          </Text>
          <View
            style={[
              styles.detailStatusBadge,
              {
                backgroundColor:
                  data.status === 'upcoming' ? '#22C35D20' : '#FFA50020',
              },
            ]}
          >
            <Text
              style={[
                styles.detailStatusText,
                { color: data.status === 'upcoming' ? '#22C35D' : '#FFA500' },
              ]}
            >
              {data.status || 'Available'}
            </Text>
          </View>
        </View>

        <View style={styles.detailInfoGrid}>
          <View style={styles.detailInfoItem}>
            <Text style={styles.detailInfoIcon}>📍</Text>
            <Text style={styles.detailInfoLabel}>Location</Text>
            <Text style={styles.detailInfoValue}>{data.location}</Text>
          </View>
          <View style={styles.detailInfoItem}>
            <Text style={styles.detailInfoIcon}>⏰</Text>
            <Text style={styles.detailInfoLabel}>Time</Text>
            <Text style={styles.detailInfoValue}>{data.time}</Text>
          </View>
          <View style={styles.detailInfoItem}>
            <Text style={styles.detailInfoIcon}>💰</Text>
            <Text style={styles.detailInfoLabel}>Entry Fee</Text>
            <Text style={styles.detailInfoValue}>{data.entryFee}</Text>
          </View>
          <View style={styles.detailInfoItem}>
            <Text style={styles.detailInfoIcon}>🏆</Text>
            <Text style={styles.detailInfoLabel}>Prize</Text>
            <Text style={styles.detailInfoValue}>{data.prize}</Text>
          </View>
        </View>

        {data.slotsLeft && (
          <View style={styles.detailSection}>
            <Text style={styles.detailSectionTitle}>👥 Availability</Text>
            <View style={styles.slotsBar}>
              <View
                style={[
                  styles.slotsFill,
                  { width: `${(data.slotsLeft / data.totalSlots) * 100}%` },
                ]}
              />
            </View>
            <Text style={styles.slotsText}>
              {data.slotsLeft}/{data.totalSlots} spots left
            </Text>
          </View>
        )}

        {data.players && (
          <View style={styles.detailSection}>
            <Text style={styles.detailSectionTitle}>👥 Players</Text>
            <View style={styles.playersList}>
              {data.players.map((player, idx) => (
                <View key={idx} style={styles.playerItem}>
                  <Text style={styles.playerIcon}>⚽</Text>
                  <Text style={styles.playerName}>{player}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        <View style={styles.detailActions}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => setIsDetailModalVisible(false)}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={handleJoinMatch}
          >
            <Text style={styles.confirmButtonText}>Join Match</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  };

  const renderRewardDetail = () => {
    const data = selectedNotification.detailData;
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.detailHero, styles.rewardHero]}>
          <Text style={styles.detailHeroIcon}>🎁</Text>
          <Text style={styles.detailHeroTitle}>{data.title}</Text>
          <Text style={styles.detailHeroSubtitle}>
            +{data.amount} {data.rewardType}
          </Text>
        </View>

        <View style={styles.detailSection}>
          <Text style={styles.detailSectionTitle}>📝 Description</Text>
          <Text style={styles.detailText}>{data.description}</Text>
        </View>

        <View style={styles.detailSection}>
          <Text style={styles.detailSectionTitle}>📋 Requirements</Text>
          <Text style={styles.detailText}>{data.requirements}</Text>
        </View>

        <View style={styles.detailSection}>
          <Text style={styles.detailSectionTitle}>📊 Progress</Text>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBarFill, { width: '100%' }]} />
          </View>
          <Text style={styles.progressText}>{data.progress}</Text>
        </View>

        <View style={styles.detailActions}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => setIsDetailModalVisible(false)}
          >
            <Text style={styles.cancelButtonText}>Later</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={handleClaimReward}
          >
            <Text style={styles.confirmButtonText}>Claim Reward</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  };

  const renderChallengeDetail = () => {
    const data = selectedNotification.detailData;
    const progressPercent = (data.currentProgress / data.targetProgress) * 100;
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.detailHero}>
          <Text style={styles.detailHeroIcon}>⚡</Text>
          <Text style={styles.detailHeroTitle}>{data.title}</Text>
          <View style={styles.detailDifficultyBadge}>
            <Text style={styles.difficultyText}>{data.difficulty}</Text>
          </View>
        </View>

        <View style={styles.detailSection}>
          <Text style={styles.detailSectionTitle}>
            📝 Challenge Description
          </Text>
          <Text style={styles.detailText}>{data.description}</Text>
        </View>

        <View style={styles.detailSection}>
          <Text style={styles.detailSectionTitle}>📊 Progress</Text>
          <View style={styles.progressBarContainer}>
            <View
              style={[styles.progressBarFill, { width: `${progressPercent}%` }]}
            />
          </View>
          <Text style={styles.progressText}>
            {data.currentProgress}/{data.targetProgress} completed
          </Text>
        </View>

        <View style={styles.detailInfoGrid}>
          <View style={styles.detailInfoItem}>
            <Text style={styles.detailInfoIcon}>🎁</Text>
            <Text style={styles.detailInfoLabel}>Reward</Text>
            <Text style={styles.detailInfoValue}>{data.reward}</Text>
          </View>
          <View style={styles.detailInfoItem}>
            <Text style={styles.detailInfoIcon}>⏰</Text>
            <Text style={styles.detailInfoLabel}>Deadline</Text>
            <Text style={styles.detailInfoValue}>{data.deadline}</Text>
          </View>
        </View>

        <View style={styles.detailActions}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => setIsDetailModalVisible(false)}
          >
            <Text style={styles.cancelButtonText}>Close</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={handleViewChallenge}
          >
            <Text style={styles.confirmButtonText}>View Challenge</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  };

  const renderStatsDetail = () => {
    const data = selectedNotification.detailData;
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={[
            styles.detailHero,
            {
              backgroundColor:
                data.result === 'Win' ? '#22C35D20' : '#FF444420',
            },
          ]}
        >
          <Text style={styles.detailHeroIcon}>📊</Text>
          <Text style={styles.detailHeroTitle}>{data.opponent}</Text>
          <Text
            style={[
              styles.detailHeroSubtitle,
              { color: data.result === 'Win' ? '#22C35D' : '#FF4444' },
            ]}
          >
            {data.result} • {data.score}
          </Text>
        </View>

        <View style={styles.detailSection}>
          <Text style={styles.detailSectionTitle}>⚽ Goals</Text>
          {data.goals.map((goal, idx) => (
            <View key={idx} style={styles.statRow}>
              <Text style={styles.statIcon}>⚽</Text>
              <Text style={styles.statText}>{goal}</Text>
            </View>
          ))}
        </View>

        {data.assists && data.assists.length > 0 && (
          <View style={styles.detailSection}>
            <Text style={styles.detailSectionTitle}>🎯 Assists</Text>
            {data.assists.map((assist, idx) => (
              <View key={idx} style={styles.statRow}>
                <Text style={styles.statIcon}>🎯</Text>
                <Text style={styles.statText}>{assist}</Text>
              </View>
            ))}
          </View>
        )}

        <View style={styles.detailSection}>
          <Text style={styles.detailSectionTitle}>📊 Match Statistics</Text>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Possession</Text>
            <View style={styles.statBarContainer}>
              <View style={[styles.statBar, { width: data.possession }]} />
            </View>
            <Text style={styles.statValue}>{data.possession}</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Total Shots</Text>
            <Text style={styles.statValue}>{data.shots}</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Shots on Target</Text>
            <Text style={styles.statValue}>{data.shotsOnTarget}</Text>
          </View>
        </View>

        {data.manOfTheMatch && (
          <View style={styles.motmSection}>
            <Text style={styles.motmIcon}>⭐</Text>
            <Text style={styles.motmText}>Man of the Match</Text>
          </View>
        )}

        <View style={styles.detailActions}>
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={handleViewStats}
          >
            <Text style={styles.confirmButtonText}>View Full Stats</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  };

  const renderBadgesDetail = () => {
    const data = selectedNotification.detailData;
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.detailHero}>
          <Text style={styles.detailHeroIcon}>⭐</Text>
          <Text style={styles.detailHeroTitle}>{data.title}</Text>
          <Text style={styles.detailHeroSubtitle}>{data.description}</Text>
        </View>

        <View style={styles.detailSection}>
          <Text style={styles.detailSectionTitle}>🏅 Your Badges</Text>
          <View style={styles.badgesGrid}>
            {data.badges.map((badge, idx) => (
              <View
                key={idx}
                style={[
                  styles.badgeItem,
                  !badge.unlocked && styles.badgeLocked,
                ]}
              >
                <Text style={styles.badgeIcon}>{badge.icon}</Text>
                <Text
                  style={[
                    styles.badgeName,
                    !badge.unlocked && styles.badgeNameLocked,
                  ]}
                >
                  {badge.name}
                </Text>
                {!badge.unlocked && (
                  <Text style={styles.badgeLockIcon}>🔒</Text>
                )}
              </View>
            ))}
          </View>
        </View>

        <View style={styles.detailSection}>
          <Text style={styles.detailSectionTitle}>📈 Next Level</Text>
          <Text style={styles.detailText}>
            Level {data.nextLevel} requires {data.xpToNext} more XP
          </Text>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBarFill, { width: '65%' }]} />
          </View>
        </View>

        <View style={styles.detailActions}>
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={handleViewBadges}
          >
            <Text style={styles.confirmButtonText}>View All Badges</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  };

  const renderRespondDetail = () => {
    const data = selectedNotification.detailData;
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.detailHero}>
          <Text style={styles.detailHeroIcon}>🤝</Text>
          <Text style={styles.detailHeroTitle}>{data.teamName}</Text>
          <Text style={styles.detailHeroSubtitle}>
            Invitation from {data.captain}
          </Text>
        </View>

        <View style={styles.detailSection}>
          <Text style={styles.detailSectionTitle}>📝 About the Team</Text>
          <Text style={styles.detailText}>{data.description}</Text>
        </View>

        <View style={styles.detailInfoGrid}>
          <View style={styles.detailInfoItem}>
            <Text style={styles.detailInfoIcon}>👥</Text>
            <Text style={styles.detailInfoLabel}>Members</Text>
            <Text style={styles.detailInfoValue}>
              {data.members}/{data.maxMembers}
            </Text>
          </View>
          <View style={styles.detailInfoItem}>
            <Text style={styles.detailInfoIcon}>📋</Text>
            <Text style={styles.detailInfoLabel}>Requirements</Text>
            <Text style={styles.detailInfoValue}>{data.requirements}</Text>
          </View>
        </View>

        <View style={styles.detailSection}>
          <Text style={styles.detailSectionTitle}>💬 Message from Captain</Text>
          <View style={styles.messageBubble}>
            <Text style={styles.messageText}>"{data.message}"</Text>
          </View>
        </View>

        <View style={styles.detailActions}>
          <TouchableOpacity
            style={styles.declineButton}
            onPress={() => handleRespondToInvite('Declined')}
          >
            <Text style={styles.declineButtonText}>Decline</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={() => handleRespondToInvite('Joined')}
          >
            <Text style={styles.confirmButtonText}>Accept Invite</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  };

  const renderOfferDetail = () => {
    const data = selectedNotification.detailData;
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.detailHero, styles.offerHero]}>
          <Text style={styles.detailHeroIcon}>💰</Text>
          <Text style={styles.detailHeroTitle}>{data.title}</Text>
          <Text style={styles.offerDiscount}>{data.discount} OFF</Text>
        </View>

        <View style={styles.detailSection}>
          <Text style={styles.detailSectionTitle}>📋 Offer Details</Text>
          <Text style={styles.detailText}>{data.terms}</Text>
        </View>

        <View style={styles.detailInfoGrid}>
          <View style={styles.detailInfoItem}>
            <Text style={styles.detailInfoIcon}>🎫</Text>
            <Text style={styles.detailInfoLabel}>Promo Code</Text>
            <Text style={styles.promoCode}>{data.code}</Text>
          </View>
          <View style={styles.detailInfoItem}>
            <Text style={styles.detailInfoIcon}>⏰</Text>
            <Text style={styles.detailInfoLabel}>Expires</Text>
            <Text style={styles.detailInfoValue}>{data.expiryDate}</Text>
          </View>
        </View>

        <View style={styles.detailActions}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => setIsDetailModalVisible(false)}
          >
            <Text style={styles.cancelButtonText}>Maybe Later</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={handleClaimOffer}
          >
            <Text style={styles.confirmButtonText}>Claim Offer</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  };

  const renderProfileDetail = () => {
    const data = selectedNotification.detailData;
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.detailHero}>
          <View style={styles.profileAvatar}>
            <Text style={styles.profileAvatarEmoji}>{data.avatar}</Text>
          </View>
          <Text style={styles.detailHeroTitle}>{data.fullName}</Text>
          <Text style={styles.detailHeroSubtitle}>{data.username}</Text>
        </View>

        <View style={styles.detailInfoGrid}>
          <View style={styles.detailInfoItem}>
            <Text style={styles.detailInfoIcon}>👥</Text>
            <Text style={styles.detailInfoLabel}>Followers</Text>
            <Text style={styles.detailInfoValue}>{data.followers}</Text>
          </View>
          <View style={styles.detailInfoItem}>
            <Text style={styles.detailInfoIcon}>⚽</Text>
            <Text style={styles.detailInfoLabel}>Matches</Text>
            <Text style={styles.detailInfoValue}>{data.matchesPlayed}</Text>
          </View>
          <View style={styles.detailInfoItem}>
            <Text style={styles.detailInfoIcon}>📊</Text>
            <Text style={styles.detailInfoLabel}>Win Rate</Text>
            <Text style={styles.detailInfoValue}>{data.winRate}%</Text>
          </View>
        </View>

        <View style={styles.detailActions}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => setIsDetailModalVisible(false)}
          >
            <Text style={styles.cancelButtonText}>View Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={handleFollowBack}
          >
            <Text style={styles.confirmButtonText}>Follow Back</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  };

  const renderReplyDetail = () => {
    const data = selectedNotification.detailData;
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.detailHero}>
          <Text style={styles.detailHeroIcon}>💬</Text>
          <Text style={styles.detailHeroTitle}>Reply to Comment</Text>
        </View>

        <View style={styles.commentSection}>
          <View style={styles.commentHeader}>
            <Text style={styles.commenterAvatar}>{data.commenterAvatar}</Text>
            <View>
              <Text style={styles.commenterName}>{data.commenter}</Text>
              <Text style={styles.commentText}>"{data.comment}"</Text>
            </View>
          </View>
        </View>

        <View style={styles.detailSection}>
          <Text style={styles.detailSectionTitle}>📝 Original Post</Text>
          <View style={styles.postContent}>
            <Text style={styles.postText}>"{data.postContent}"</Text>
          </View>
        </View>

        <View style={styles.detailSection}>
          <Text style={styles.detailSectionTitle}>✏️ Your Reply</Text>
          <View style={styles.replyInputContainer}>
            <TextInput
              style={styles.replyInput}
              placeholder="Write your reply..."
              placeholderTextColor="#666666"
              value={responseMessage}
              onChangeText={setResponseMessage}
              multiline
              numberOfLines={3}
            />
          </View>
        </View>

        <View style={styles.detailActions}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => setIsDetailModalVisible(false)}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.confirmButton} onPress={handleReply}>
            <Text style={styles.confirmButtonText}>Post Reply</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  };

  const renderDefaultDetail = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.detailHero}>
        <Text style={styles.detailHeroIcon}>{selectedNotification.icon}</Text>
        <Text style={styles.detailHeroTitle}>{selectedNotification.title}</Text>
        <Text style={styles.detailHeroSubtitle}>
          {selectedNotification.message}
        </Text>
      </View>
      <View style={styles.detailActions}>
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={() => setIsDetailModalVisible(false)}
        >
          <Text style={styles.confirmButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  const renderNotificationItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.notificationCard,
        !item.isRead && styles.notificationCardUnread,
      ]}
      onPress={() => handleNotificationPress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.notificationIconContainer}>
        <Text style={styles.notificationIcon}>{item.icon}</Text>
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
              {item.priority}
            </Text>
          </View>
        </View>
        <Text style={styles.notificationMessage} numberOfLines={2}>
          {item.message}
        </Text>
        <View style={styles.notificationFooter}>
          <Text style={styles.notificationTime}>🕐 {item.time}</Text>
          <Text style={styles.notificationAction}>{item.action} →</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>🔔</Text>
      <Text style={styles.emptyTitle}>No Notifications</Text>
      <Text style={styles.emptyMessage}>
        You're all caught up! Check back later for updates.
      </Text>
    </View>
  );

  const renderHeader = () => {
    const filteredCount = getFilteredNotifications().length;
    const unreadCount = notifications.filter(n => !n.isRead).length;

    return (
      <View style={styles.headerContainer}>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { marginLeft: 20 }]}>
              {notifications.length}
            </Text>
            <Text style={[styles.statLabel, { marginLeft: 5 }]}>Total</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: '#22C35D' }]}>
              {unreadCount}
            </Text>
            <Text style={[styles.statLabel, { marginLeft: 5 }]}>Unread</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              {notifications.filter(n => n.type === 'match').length}
            </Text>
            <Text style={[styles.statLabel, { marginLeft: 5 }]}>Matches</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              {notifications.filter(n => n.type === 'reward').length}
            </Text>
            <Text style={[styles.statLabel, { marginLeft: 5 }]}>Rewards</Text>
          </View>
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
              {activeTab === tab.id && <View style={styles.tabIndicator} />}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.filterInfo}>
          <Text style={styles.filterInfoText}>
            Showing {filteredCount} notifications
          </Text>
        </View>
      </View>
    );
  };

  // Settings Modal
  const SettingsModal = () => (
    <Modal
      visible={showSettings}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setShowSettings(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Notification Settings</Text>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setShowSettings(false)}
            >
              <Text style={styles.modalCloseText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.settingsSection}>
              <View style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingIcon}>⚽</Text>
                  <View>
                    <Text style={styles.settingLabel}>Match Reminders</Text>
                    <Text style={styles.settingDescription}>
                      Get notified about upcoming matches
                    </Text>
                  </View>
                </View>
                <Switch
                  value={settings.matchReminders}
                  onValueChange={value =>
                    setSettings(prev => ({ ...prev, matchReminders: value }))
                  }
                  trackColor={{ false: '#2A2A2A', true: '#22C35D' }}
                  thumbColor={settings.matchReminders ? '#FFFFFF' : '#f4f3f4'}
                />
              </View>

              <View style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingIcon}>🎁</Text>
                  <View>
                    <Text style={styles.settingLabel}>Reward Alerts</Text>
                    <Text style={styles.settingDescription}>
                      Get notified about rewards and achievements
                    </Text>
                  </View>
                </View>
                <Switch
                  value={settings.rewardAlerts}
                  onValueChange={value =>
                    setSettings(prev => ({ ...prev, rewardAlerts: value }))
                  }
                  trackColor={{ false: '#2A2A2A', true: '#22C35D' }}
                  thumbColor={settings.rewardAlerts ? '#FFFFFF' : '#f4f3f4'}
                />
              </View>

              <View style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingIcon}>👥</Text>
                  <View>
                    <Text style={styles.settingLabel}>Social Updates</Text>
                    <Text style={styles.settingDescription}>
                      Get notified about followers, comments, and likes
                    </Text>
                  </View>
                </View>
                <Switch
                  value={settings.socialUpdates}
                  onValueChange={value =>
                    setSettings(prev => ({ ...prev, socialUpdates: value }))
                  }
                  trackColor={{ false: '#2A2A2A', true: '#22C35D' }}
                  thumbColor={settings.socialUpdates ? '#FFFFFF' : '#f4f3f4'}
                />
              </View>

              <View style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingIcon}>💰</Text>
                  <View>
                    <Text style={styles.settingLabel}>Promotional Offers</Text>
                    <Text style={styles.settingDescription}>
                      Get notified about special deals and offers
                    </Text>
                  </View>
                </View>
                <Switch
                  value={settings.promotionalOffers}
                  onValueChange={value =>
                    setSettings(prev => ({ ...prev, promotionalOffers: value }))
                  }
                  trackColor={{ false: '#2A2A2A', true: '#22C35D' }}
                  thumbColor={
                    settings.promotionalOffers ? '#FFFFFF' : '#f4f3f4'
                  }
                />
              </View>

              <View style={styles.divider} />

              <View style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingIcon}>📧</Text>
                  <View>
                    <Text style={styles.settingLabel}>Email Notifications</Text>
                    <Text style={styles.settingDescription}>
                      Receive notifications via email
                    </Text>
                  </View>
                </View>
                <Switch
                  value={settings.emailNotifications}
                  onValueChange={value =>
                    setSettings(prev => ({
                      ...prev,
                      emailNotifications: value,
                    }))
                  }
                  trackColor={{ false: '#2A2A2A', true: '#22C35D' }}
                  thumbColor={
                    settings.emailNotifications ? '#FFFFFF' : '#f4f3f4'
                  }
                />
              </View>

              <View style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingIcon}>📱</Text>
                  <View>
                    <Text style={styles.settingLabel}>Push Notifications</Text>
                    <Text style={styles.settingDescription}>
                      Receive push notifications on your device
                    </Text>
                  </View>
                </View>
                <Switch
                  value={settings.pushNotifications}
                  onValueChange={value =>
                    setSettings(prev => ({ ...prev, pushNotifications: value }))
                  }
                  trackColor={{ false: '#2A2A2A', true: '#22C35D' }}
                  thumbColor={
                    settings.pushNotifications ? '#FFFFFF' : '#f4f3f4'
                  }
                />
              </View>
            </View>

            <TouchableOpacity
              style={styles.saveSettingsButton}
              onPress={() => {
                setShowSettings(false);
                alert('Settings saved successfully!');
              }}
            >
              <Text style={styles.saveSettingsButtonText}>Save Settings</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  const DetailModal = () => (
    <Modal
      visible={isDetailModalVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setIsDetailModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {selectedNotification?.action}
            </Text>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setIsDetailModalVisible(false)}
            >
              <Text style={styles.modalCloseText}>✕</Text>
            </TouchableOpacity>
          </View>
          {renderDetailContent()}
        </View>
      </View>
    </Modal>
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
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        {/* <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => setShowSettings(true)}
        >
          <Text style={styles.settingsButtonText}>⚙️</Text>
        </TouchableOpacity> */}
        <View style={{ width: 40 }} />
      </View>
      {renderHeader()}
      <FlatList
        data={getFilteredNotifications()}
        renderItem={renderNotificationItem}
        keyExtractor={item => item.id}
        // ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        initialNumToRender={10}
        removeClippedSubviews={true}
      />

      <SettingsModal />
      <DetailModal />
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
  headerContainer: {},
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
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
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1A1A1A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsButtonText: {
    fontSize: 20,
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
    flexDirection: 'row',
    justifyContent: 'center',
    // backgroundColor: 'red',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    marginLeft: 5,
    color: '#888888',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#2A2A2A',
  },
  // Tabs
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
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
  tabIndicator: {
    position: 'absolute',
    bottom: -1,
    left: '20%',
    width: '60%',
    height: 2,
    backgroundColor: '#22C35D',
    borderRadius: 1,
  },
  filterInfo: {
    marginBottom: 16,
  },
  filterInfoText: {
    fontSize: 12,
    color: '#888888',
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
  notificationIcon: {
    fontSize: 32,
  },
  unreadDot: {
    position: 'absolute',
    top: -4,
    right: -4,
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
    fontSize: 16,
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
    marginBottom: 8,
  },
  notificationFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  notificationTime: {
    fontSize: 11,
    color: '#666666',
  },
  notificationAction: {
    fontSize: 12,
    color: '#22C35D',
    fontWeight: '600',
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
  // Detail Modal Components
  detailHero: {
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#0D0D0D',
    margin: 20,
    borderRadius: 20,
  },
  rewardHero: {
    backgroundColor: '#FFD70010',
  },
  offerHero: {
    backgroundColor: '#22C35D10',
  },
  detailHeroIcon: {
    fontSize: 60,
    marginBottom: 12,
  },
  detailHeroTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  detailHeroSubtitle: {
    fontSize: 14,
    color: '#888888',
    textAlign: 'center',
  },
  detailStatusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginTop: 8,
  },
  detailStatusText: {
    fontSize: 12,
    fontWeight: '700',
  },
  detailDifficultyBadge: {
    backgroundColor: '#FFA50020',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginTop: 8,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFA500',
  },
  offerDiscount: {
    fontSize: 28,
    fontWeight: '800',
    color: '#22C35D',
    marginTop: 8,
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
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  promoCode: {
    fontSize: 16,
    fontWeight: '800',
    color: '#22C35D',
    letterSpacing: 1,
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
  detailText: {
    fontSize: 14,
    color: '#CCCCCC',
    lineHeight: 22,
  },
  slotsBar: {
    height: 6,
    backgroundColor: '#2A2A2A',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 8,
  },
  slotsFill: {
    height: '100%',
    backgroundColor: '#22C35D',
    borderRadius: 3,
  },
  slotsText: {
    fontSize: 12,
    color: '#888888',
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
  progressBarContainer: {
    height: 8,
    backgroundColor: '#2A2A2A',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#22C35D',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: '#888888',
    textAlign: 'right',
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  statIcon: {
    fontSize: 14,
    marginRight: 10,
  },
  statText: {
    fontSize: 13,
    color: '#CCCCCC',
  },
  statLabel: {
    width: 100,
    fontSize: 13,
    color: '#888888',
  },
  statBarContainer: {
    flex: 1,
    height: 6,
    backgroundColor: '#2A2A2A',
    borderRadius: 3,
    marginHorizontal: 12,
    overflow: 'hidden',
  },
  statBar: {
    height: '100%',
    backgroundColor: '#22C35D',
    borderRadius: 3,
  },
  statValue: {
    width: 50,
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'right',
  },
  motmSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#FFD70010',
    margin: 20,
    borderRadius: 12,
  },
  motmIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  motmText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFD700',
  },
  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  badgeItem: {
    width: '30%',
    alignItems: 'center',
    backgroundColor: '#0D0D0D',
    padding: 12,
    borderRadius: 12,
    position: 'relative',
  },
  badgeLocked: {
    opacity: 0.5,
  },
  badgeIcon: {
    fontSize: 32,
    marginBottom: 6,
  },
  badgeName: {
    fontSize: 11,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  badgeNameLocked: {
    color: '#888888',
  },
  badgeLockIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    fontSize: 12,
  },
  messageBubble: {
    backgroundColor: '#22C35D20',
    padding: 16,
    borderRadius: 16,
    marginTop: 8,
  },
  messageText: {
    fontSize: 14,
    color: '#CCCCCC',
    fontStyle: 'italic',
  },
  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#22C35D20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  profileAvatarEmoji: {
    fontSize: 40,
  },
  commentSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  commenterAvatar: {
    fontSize: 40,
  },
  commenterName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  commentText: {
    fontSize: 13,
    color: '#CCCCCC',
  },
  postContent: {
    backgroundColor: '#0D0D0D',
    padding: 16,
    borderRadius: 12,
  },
  postText: {
    fontSize: 13,
    color: '#888888',
    fontStyle: 'italic',
  },
  replyInputContainer: {
    backgroundColor: '#0D0D0D',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    padding: 12,
  },
  replyInput: {
    color: '#FFFFFF',
    fontSize: 14,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  detailActions: {
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
  declineButton: {
    flex: 1,
    backgroundColor: '#FF444420',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF4444',
  },
  declineButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FF4444',
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
  // Settings Modal
  settingsSection: {
    padding: 20,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  settingLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 11,
    color: '#888888',
  },
  divider: {
    height: 1,
    backgroundColor: '#2A2A2A',
    marginVertical: 16,
  },
  saveSettingsButton: {
    backgroundColor: '#22C35D',
    margin: 20,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveSettingsButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default Notifications;
