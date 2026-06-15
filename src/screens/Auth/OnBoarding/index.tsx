// import { useNavigation } from '@react-navigation/native';
// import React from 'react';
// import { Text, View } from 'react-native';
// import { RootNavigationProp } from '../../../types/navigationType';

// const OnBoarding = () => {
//   const navigation = useNavigation<RootNavigationProp<'OnBoarding'>>();
//   return (
//     <View>
//       <Text>FMM</Text>
//     </View>
//   );
// };
// export default OnBoarding;
// OnboardingScreen.js
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  FlatList,
  Dimensions,
  Platform,
  ScrollView,
} from 'react-native';
import { RootNavigationProp } from '../../../types/navigationType';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

// Onboarding Data
const onboardingData = [
  {
    id: '1',
    title: 'Find & Create Football Matches',
    description:
      'Explore matches near you or create your own and invite players.',
    illustration: 'discover',
    features: [
      { icon: '⚽', label: 'Play Matches' },
      { icon: '🧑‍💼', label: 'Host Matches' },
    ],
  },
  {
    id: '2',
    title: 'Join Easily or Manage Players',
    description:
      'Book your slot as a player or manage teams, slots, and match details as a host.',
    illustration: 'join',
    features: [
      { icon: '👥', label: 'Player bookings' },
      { icon: '📊', label: 'Slot tracking' },
      { icon: '💳', label: 'Easy payments' },
    ],
  },
  {
    id: '3',
    title: 'Compete, Earn & Grow',
    description:
      'Play to win rewards or host matches to earn and build your football community.',
    illustration: 'earn',
    features: [
      { icon: '🏆', label: 'Win Rewards' },
      { icon: '💰', label: 'Earn as Host' },
      { icon: '📈', label: 'Build Community' },
    ],
  },
];

const OnboardingScreen = ({ onFinish }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
      setCurrentIndex(currentIndex + 1);
    } else {
      onFinish();
    }
  };

  const handleSkip = () => {
    onFinish();
  };

  const handleScroll = event => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const renderIllustration = type => {
    switch (type) {
      case 'discover':
        return (
          <View style={styles.illustrationContainer}>
            {/* Background Field */}
            <View style={styles.fieldBackground}>
              <View style={styles.fieldLines}>
                <View style={styles.fieldCenterCircle} />
                <View style={styles.fieldCenterLine} />
                <View style={styles.fieldPenaltyLeft} />
                <View style={styles.fieldPenaltyRight} />
              </View>
            </View>
            {/* Player Section */}
            <View style={styles.illustrationHalfLeft}>
              <View style={styles.illustrationCard}>
                <View style={styles.playerIconContainer}>
                  <Text style={styles.playerIcon}>⚽</Text>
                </View>
                <Text style={styles.illustrationLabel}>Play Matches</Text>
                <View style={styles.illustrationBadge}>
                  <Text style={styles.illustrationBadgeText}>
                    Join & Compete
                  </Text>
                </View>
              </View>
            </View>
            {/* Host Section */}
            <View style={styles.illustrationHalfRight}>
              <View style={[styles.illustrationCard, styles.hostCard]}>
                <View style={styles.hostIconContainer}>
                  <Text style={styles.hostIcon}>🧑‍💼</Text>
                </View>
                <Text style={styles.illustrationLabel}>Host Matches</Text>
                <View style={[styles.illustrationBadge, styles.hostBadge]}>
                  <Text style={styles.illustrationBadgeText}>
                    Create & Manage
                  </Text>
                </View>
              </View>
            </View>
            {/* Decorative elements */}
            <View style={styles.particle1}>⚡</View>
            <View style={styles.particle2}>🏆</View>
            <View style={styles.particle3}>🎯</View>
          </View>
        );
      case 'join':
        return (
          <View style={styles.illustrationContainer}>
            {/* Dashboard Background */}
            <View style={styles.dashboardBackground}>
              <View style={styles.dashboardGrid}>
                <View style={styles.dashboardRow}>
                  <View style={styles.dashboardCard}>
                    <Text style={styles.dashboardCardIcon}>👥</Text>
                    <Text style={styles.dashboardCardText}>12 Players</Text>
                  </View>
                  <View style={styles.dashboardCard}>
                    <Text style={styles.dashboardCardIcon}>📊</Text>
                    <Text style={styles.dashboardCardText}>8 Slots</Text>
                  </View>
                </View>
                <View style={styles.dashboardRow}>
                  <View style={styles.dashboardCard}>
                    <Text style={styles.dashboardCardIcon}>⏰</Text>
                    <Text style={styles.dashboardCardText}>6:00 PM</Text>
                  </View>
                  <View style={styles.dashboardCard}>
                    <Text style={styles.dashboardCardIcon}>📍</Text>
                    <Text style={styles.dashboardCardText}>Central Park</Text>
                  </View>
                </View>
              </View>
            </View>
            {/* Floating elements */}
            {/* <View style={styles.floatingChip1}>
              <Text style={styles.floatingChipText}>👥 Player bookings</Text>
            </View> */}
            {/* <View style={styles.floatingChip2}>
              <Text style={styles.floatingChipText}>📊 Slot tracking</Text>
            </View> */}
            {/* <View style={styles.floatingChip3}>
              <Text style={styles.floatingChipText}>💳 Easy payments</Text>
            </View> */}
            <View style={styles.particle4}>⚡</View>
            <View style={styles.particle5}>🎯</View>
          </View>
        );
      case 'earn':
        return (
          <View style={styles.illustrationContainer}>
            {/* Trophy + Money + Leaderboard */}
            <View style={styles.rewardsBackground}>
              <View style={styles.trophyContainer}>
                <View style={styles.trophyIconContainer}>
                  <Text style={styles.trophyIcon}>🏆</Text>
                </View>
                <Text style={[styles.trophyLabel, { marginBottom: 10 }]}>
                  Champion
                </Text>
              </View>
              <View style={styles.moneyContainer}>
                <View style={styles.moneyIconContainer}>
                  <Text style={styles.moneyIcon}>💰</Text>
                </View>
                <Text style={[styles.moneyLabel, { marginBottom: 10 }]}>
                  Earn Rewards
                </Text>
              </View>
              <View style={styles.leaderboardPreview}>
                <View style={styles.leaderboardItem}>
                  <Text style={styles.leaderboardRank}>1</Text>
                  <Text style={styles.leaderboardName}>Alex</Text>
                  <Text style={styles.leaderboardPoints}>2840</Text>
                </View>
                <View style={styles.leaderboardItem}>
                  <Text style={styles.leaderboardRank}>2</Text>
                  <Text style={styles.leaderboardName}>Chris</Text>
                  <Text style={styles.leaderboardPoints}>2720</Text>
                </View>
                <View style={styles.leaderboardItem}>
                  <Text style={styles.leaderboardRank}>3</Text>
                  <Text style={styles.leaderboardName}>Sarah</Text>
                  <Text style={styles.leaderboardPoints}>2650</Text>
                </View>
              </View>
            </View>
            <View style={styles.particle6}>⭐</View>
            <View style={styles.particle7}>🎁</View>
            <View style={styles.particle8}>💎</View>
          </View>
        );
      default:
        return null;
    }
  };

  const renderFeatures = features => {
    if (!features) return null;
    return (
      <View style={styles.featuresContainer}>
        {features.map((feature, index) => (
          <View key={index} style={styles.featureChip}>
            <Text style={styles.featureChipIcon}>{feature.icon}</Text>
            <Text style={styles.featureChipText}>{feature.label}</Text>
          </View>
        ))}
      </View>
    );
  };

  const OnboardingItem = ({ item }) => (
    <View style={[styles.slide, { width }]}>
      {/* Top 60% - Illustration */}
      <View style={styles.illustrationWrapper}>
        {renderIllustration(item.illustration)}
      </View>

      {/* Middle - Title & Description */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        {renderFeatures(item.features)}
      </View>
    </View>
  );

  const renderPagination = () => {
    return (
      <View style={styles.paginationContainer}>
        {onboardingData.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              currentIndex === index && styles.paginationDotActive,
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      <FlatList
        ref={flatListRef}
        data={onboardingData}
        renderItem={({ item }) => <OnboardingItem item={item} />}
        keyExtractor={item => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />

      {/* Bottom Controls */}
      <View style={styles.bottomContainer}>
        {renderPagination()}

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextText}>
              {currentIndex === onboardingData.length - 1
                ? 'Get Started'
                : 'Next'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// Role Selection Screen
const RoleSelectionScreen = ({ onSelectRole, navigation }) => {
  const [selectedRole, setSelectedRole] = useState(null);
  console.log('role', selectedRole);
  const roles = [
    {
      id: 'player',
      title: 'Player',
      icon: '⚽',
      description: 'Join matches, compete & win rewards',
      features: ['Join matches', 'Compete & win rewards', 'Track your stats'],
      color: '#22C35D',
    },
    {
      id: 'host',
      title: 'Host',
      icon: '🧑‍💼',
      description: 'Create matches, manage players & earn',
      features: ['Create matches', 'Manage players & earn', 'Build community'],
      color: '#22C35D',
    },
  ];

  const handleContinue = () => {
    if (!selectedRole) {
      // alert('Please select a role to continue');
      return;
    }
    if (selectedRole == 'host') {
      navigation.navigate('HostLogin');
    } else {
      navigation.navigate('Login');
    }
  };

  const RoleCard = ({ role, isSelected }) => (
    <TouchableOpacity
      style={[styles.roleCard, isSelected && styles.roleCardSelected]}
      onPress={() => setSelectedRole(role.id)}
      activeOpacity={0.8}
    >
      <View
        style={[styles.roleIconContainer, { backgroundColor: '#22C35D20' }]}
      >
        <Text style={styles.roleIcon}>{role.icon}</Text>
      </View>
      <Text style={styles.roleTitle}>{role.title}</Text>
      <Text style={styles.roleDescription}>{role.description}</Text>
      <View style={styles.roleFeatures}>
        {role.features.map((feature, idx) => (
          <View key={idx} style={styles.roleFeatureItem}>
            <View style={styles.roleFeatureCheck} />
            <Text style={styles.roleFeatureText}>{feature}</Text>
          </View>
        ))}
      </View>
      {isSelected && (
        <View style={styles.roleSelectedBadge}>
          <Text style={styles.roleSelectedText}>✓ Selected</Text>
        </View>
      )}
    </TouchableOpacity>
  );
  const { top } = useSafeAreaInsets();
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <ScrollView>
        <View style={[styles.roleHeader, { marginTop: top }]}>
          <Text style={styles.roleHeaderTitle}>
            How do you want to continue?
          </Text>
          <Text style={styles.roleHeaderSubtitle}>
            Choose your role to get started
          </Text>
        </View>

        <View style={styles.rolesContainer}>
          {roles.map(role => (
            <RoleCard
              key={role.id}
              role={role}
              isSelected={selectedRole === role.id}
            />
          ))}
        </View>

        <TouchableOpacity
          style={[
            styles.roleContinueButton,
            !selectedRole && styles.roleContinueButtonDisabled,
          ]}
          onPress={handleContinue}
          disabled={!selectedRole}
        >
          <Text style={styles.roleContinueButtonText}>
            Continue as{' '}
            {selectedRole === 'player'
              ? 'Player'
              : selectedRole === 'host'
              ? 'Host'
              : '...'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

// Main App Component
const OnBoarding = () => {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [showRoleSelection, setShowRoleSelection] = useState(true);
  const navigation = useNavigation<RootNavigationProp<'OnBoarding'>>();
  const [alertShow, setAlertShow] = useState(false);
  const close = () => {
    setAlertShow(false);
  };
  const handleOnboardingFinish = () => {
    setShowOnboarding(false);
  };

  const handleRoleSelect = role => {
    // alert(
    //   `Selected role: ${role.toUpperCase()}\nNavigating to ${role} dashboard...`,
    // );
    setShowRoleSelection(false);
  };

  if (showOnboarding) {
    return <OnboardingScreen onFinish={handleOnboardingFinish} />;
  }

  if (showRoleSelection) {
    return (
      <RoleSelectionScreen
        onSelectRole={handleRoleSelect}
        navigation={navigation}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Main App</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0E110F',
  },
  // Onboarding Styles
  slide: {
    flex: 1,
  },
  illustrationWrapper: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 40 : 20,
  },
  illustrationContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  // Screen 1 Illustration
  fieldBackground: {
    position: 'absolute',
    width: '90%',
    height: '80%',
    backgroundColor: '#1A3A1A',
    borderRadius: 30,
    overflow: 'hidden',
  },
  fieldLines: {
    flex: 1,
    position: 'relative',
  },
  fieldCenterCircle: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    transform: [{ translateX: -30 }, { translateY: -30 }],
  },
  fieldCenterLine: {
    position: 'absolute',
    left: '50%',
    top: 0,
    bottom: 0,
    width: 2,
    backgroundColor: '#FFFFFF',
  },
  fieldPenaltyLeft: {
    position: 'absolute',
    left: 0,
    top: '30%',
    width: 40,
    height: '40%',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderLeftWidth: 0,
  },
  fieldPenaltyRight: {
    position: 'absolute',
    right: 0,
    top: '30%',
    width: 40,
    height: '40%',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderRightWidth: 0,
  },
  illustrationHalfLeft: {
    position: 'absolute',
    left: 10,
    top: '20%',
    width: '45%',
  },
  illustrationHalfRight: {
    position: 'absolute',
    right: 10,
    bottom: '20%',
    width: '45%',
  },
  illustrationCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  hostCard: {
    backgroundColor: '#22C35D10',
    borderColor: '#22C35D30',
  },
  playerIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#22C35D20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  playerIcon: {
    fontSize: 28,
  },
  hostIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#22C35D20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  hostIcon: {
    fontSize: 28,
    textAlign: 'center',
    marginTop: 5,
  },
  illustrationLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  illustrationBadge: {
    backgroundColor: '#22C35D',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  hostBadge: {
    backgroundColor: '#22C35D',
  },
  illustrationBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  particle1: {
    position: 'absolute',
    top: 10,
    right: 20,
    fontSize: 20,
    opacity: 0.6,
  },
  particle2: {
    position: 'absolute',
    bottom: 20,
    left: 15,
    fontSize: 24,
    opacity: 0.5,
  },
  particle3: {
    position: 'absolute',
    top: 40,
    left: 30,
    fontSize: 18,
    opacity: 0.7,
  },
  // Screen 2 Illustration
  dashboardBackground: {
    width: '85%',
    height: '70%',
    backgroundColor: '#1A1A1A',
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  dashboardGrid: {
    flex: 1,
    gap: 12,
  },
  dashboardRow: {
    flexDirection: 'row',
    gap: 12,
    flex: 1,
  },
  dashboardCard: {
    flex: 1,
    backgroundColor: '#0D0D0D',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  dashboardCardIcon: {
    fontSize: 28,
  },
  dashboardCardText: {
    fontSize: 12,
    color: '#888888',
  },
  floatingChip1: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#22C35D',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  floatingChip2: {
    position: 'absolute',
    bottom: 30,
    left: 10,
    backgroundColor: '#22C35D',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  floatingChip3: {
    position: 'absolute',
    top: '40%',
    right: 5,
    backgroundColor: '#22C35D',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  floatingChipText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  particle4: {
    position: 'absolute',
    bottom: 50,
    right: 30,
    fontSize: 22,
    opacity: 0.6,
  },
  particle5: {
    position: 'absolute',
    top: 60,
    left: 20,
    fontSize: 18,
    opacity: 0.5,
  },
  // Screen 3 Illustration
  rewardsBackground: {
    width: '85%',
    height: '70%',
    backgroundColor: '#1A1A1A',
    borderRadius: 24,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  trophyContainer: {
    alignItems: 'center',
  },
  trophyIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFD70020',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  trophyIcon: {
    fontSize: 32,
  },
  trophyLabel: {
    fontSize: 12,
    color: '#FFD700',
    fontWeight: '600',
  },
  moneyContainer: {
    alignItems: 'center',
  },
  moneyIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#22C35D20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  moneyIcon: {
    fontSize: 32,
  },
  moneyLabel: {
    fontSize: 12,
    color: '#22C35D',
    fontWeight: '600',
  },
  leaderboardPreview: {
    width: '100%',
    backgroundColor: '#0D0D0D',
    borderRadius: 16,
    padding: 12,
    gap: 8,
  },
  leaderboardItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  leaderboardRank: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFD700',
    width: 30,
  },
  leaderboardName: {
    fontSize: 13,
    color: '#FFFFFF',
    flex: 1,
  },
  leaderboardPoints: {
    fontSize: 13,
    fontWeight: '600',
    color: '#22C35D',
  },
  particle6: {
    position: 'absolute',
    top: 15,
    right: 25,
    fontSize: 20,
    opacity: 0.7,
  },
  particle7: {
    position: 'absolute',
    bottom: 25,
    left: 20,
    fontSize: 22,
    opacity: 0.6,
  },
  particle8: {
    position: 'absolute',
    top: 50,
    left: 35,
    fontSize: 18,
    opacity: 0.5,
  },
  // Text Container
  textContainer: {
    flex: 0.4,
    alignItems: 'center',
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  description: {
    fontSize: 15,
    color: '#888888',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
    marginTop: 8,
  },
  featureChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    gap: 8,
  },
  featureChipIcon: {
    fontSize: 16,
    // backgroundColor: 'red',
    // height: 20,
    // width: 15,
  },
  featureChipText: {
    fontSize: 13,
    color: '#CCCCCC',
  },
  // Bottom Controls
  bottomContainer: {
    paddingHorizontal: 24,
    paddingBottom: Platform.OS === 'ios' ? 40 : 30,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2A2A2A',
    marginHorizontal: 6,
  },
  paginationDotActive: {
    width: 24,
    backgroundColor: '#22C35D',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skipButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: 'transparent',
  },
  skipText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#888888',
  },
  nextButton: {
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 12,
    backgroundColor: '#22C35D',
  },
  nextText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  // Role Selection Styles
  roleHeader: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 40 : 20,
    marginBottom: 32,
  },
  roleHeaderTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  roleHeaderSubtitle: {
    fontSize: 14,
    color: '#888888',
    textAlign: 'center',
  },
  rolesContainer: {
    paddingHorizontal: 20,
    gap: 20,
    marginBottom: 32,
  },
  roleCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 24,
    padding: 20,
    borderWidth: 2,
    borderColor: '#2A2A2A',
    position: 'relative',
  },
  roleCardSelected: {
    backgroundColor: '#22C35D10',
    borderColor: '#22C35D',
  },
  roleIconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  roleIcon: {
    fontSize: 36,
    textAlign: 'center',
    marginBottom: 5,
  },
  roleTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  roleDescription: {
    fontSize: 13,
    color: '#888888',
    marginBottom: 16,
  },
  roleFeatures: {
    gap: 10,
  },
  roleFeatureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  roleFeatureCheck: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#22C35D',
  },
  roleFeatureText: {
    fontSize: 13,
    color: '#CCCCCC',
  },
  roleSelectedBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#22C35D',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  roleSelectedText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  roleContinueButton: {
    backgroundColor: '#22C35D',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 30,
  },
  roleContinueButtonDisabled: {
    opacity: 0.5,
  },
  roleContinueButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default OnBoarding;
