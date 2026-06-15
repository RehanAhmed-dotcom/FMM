// RoleSelectionScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
  Platform,
} from 'react-native';

const Selection = () => {
  const [selectedRole, setSelectedRole] = useState(null);

  const roles = [
    {
      id: 'host',
      title: 'Host',
      icon: '🏟️',
      description: 'Create and manage matches, tournaments, and events',
      features: [
        'Create unlimited matches',
        'Set entry fees & prizes',
        'Manage participants',
        'Earn hosting rewards',
        'Track match analytics',
      ],
      color: '#22C35D',
      gradient: '#22C35D20',
    },
    {
      id: 'player',
      title: 'Player',
      icon: '⚽',
      description: 'Discover matches, compete, and climb the leaderboard',
      features: [
        'Find matches near you',
        'Join tournaments',
        'Track your stats',
        'Earn rewards & badges',
        'Compete with pros',
      ],
      color: '#22C35D',
      gradient: '#22C35D20',
    },
  ];

  const handleContinue = () => {
    // if (!selectedRole) {
    //   alert('Please select a role to continue');
    //   return;
    // }
    // alert(
    //   `You selected: ${selectedRole.toUpperCase()} role!\nProceeding to ${selectedRole} dashboard...`,
    // );
  };

  const RoleCard = ({ role, isSelected }) => (
    <TouchableOpacity
      style={[
        styles.roleCard,
        isSelected && styles.roleCardSelected,
        { borderColor: isSelected ? role.color : '#2A2A2A' },
      ]}
      onPress={() => setSelectedRole(role.id)}
      activeOpacity={0.8}
    >
      <View
        style={[styles.roleIconContainer, { backgroundColor: role.gradient }]}
      >
        <Text style={styles.roleIcon}>{role.icon}</Text>
      </View>

      <Text style={styles.roleTitle}>{role.title}</Text>
      <Text style={styles.roleDescription}>{role.description}</Text>

      <View style={styles.featuresList}>
        {role.features.map((feature, index) => (
          <View key={index} style={styles.featureItem}>
            <View
              style={[styles.featureCheck, { backgroundColor: role.color }]}
            >
              <Text style={styles.featureCheckIcon}>✓</Text>
            </View>
            <Text style={styles.featureText}>{feature}</Text>
          </View>
        ))}
      </View>

      {isSelected && (
        <View style={styles.selectedBadge}>
          <Text style={styles.selectedBadgeText}>Selected</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      {/* Background decorative elements */}
      <View style={styles.bgDecoration1} />
      <View style={styles.bgDecoration2} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Choose Your Role</Text>
        <View style={{ width: 50 }} />
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <View style={styles.welcomeSection}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoEmoji}>⚡</Text>
          </View>
          <Text style={styles.welcomeTitle}>Welcome to MatchUp!</Text>
          <Text style={styles.welcomeSubtitle}>
            Choose how you want to experience the platform
          </Text>
        </View>

        {/* Role Cards */}
        <View style={styles.rolesContainer}>
          {roles.map(role => (
            <RoleCard
              key={role.id}
              role={role}
              isSelected={selectedRole === role.id}
            />
          ))}
        </View>

        {/* Continue Button */}
        <TouchableOpacity
          style={[
            styles.continueButton,
            !selectedRole && styles.continueButtonDisabled,
          ]}
          onPress={handleContinue}
          disabled={!selectedRole}
        >
          <Text style={styles.continueButtonText}>
            Continue as {selectedRole ? selectedRole.toUpperCase() : '...'} →
          </Text>
        </TouchableOpacity>

        {/* Skip for now link */}
        <TouchableOpacity style={styles.skipButton}>
          <Text style={styles.skipText}>Skip for now</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Indicator */}
      <View style={styles.bottomIndicator}>
        <View style={styles.indicatorDot} />
        <View style={[styles.indicatorDot, styles.indicatorDotActive]} />
        <View style={styles.indicatorDot} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  // Background Decorations
  bgDecoration1: {
    position: 'absolute',
    top: -100,
    right: -100,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: '#22C35D10',
  },
  bgDecoration2: {
    position: 'absolute',
    bottom: -80,
    left: -80,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#22C35D08',
  },
  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 40 : 20,
    paddingBottom: 20,
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
  // Content
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  welcomeSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#22C35D20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#22C35D40',
  },
  logoEmoji: {
    fontSize: 40,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: '#888888',
    textAlign: 'center',
    lineHeight: 20,
  },
  // Roles Container
  rolesContainer: {
    gap: 20,
    marginBottom: 32,
  },
  roleCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 24,
    padding: 20,
    borderWidth: 2,
    position: 'relative',
    overflow: 'hidden',
  },
  roleCardSelected: {
    backgroundColor: '#22C35D10',
    borderWidth: 2,
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
  },
  roleTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  roleDescription: {
    fontSize: 13,
    color: '#888888',
    marginBottom: 20,
    lineHeight: 18,
  },
  featuresList: {
    gap: 10,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureCheck: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  featureCheckIcon: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  featureText: {
    fontSize: 13,
    color: '#CCCCCC',
  },
  selectedBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#22C35D',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  selectedBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  // Continue Button
  continueButton: {
    backgroundColor: '#22C35D',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#22C35D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  continueButtonDisabled: {
    opacity: 0.5,
    shadowOpacity: 0,
    elevation: 0,
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  skipButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  skipText: {
    fontSize: 14,
    color: '#888888',
    textDecorationLine: 'underline',
  },
  // Bottom Indicator
  bottomIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 30,
    gap: 8,
  },
  indicatorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2A2A2A',
  },
  indicatorDotActive: {
    width: 24,
    backgroundColor: '#22C35D',
  },
});

export default Selection;
