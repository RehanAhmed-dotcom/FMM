// PrivacyPolicyScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  FlatList,
  Linking,
  Platform,
} from 'react-native';

const Privacy = () => {
  const [agreeChecked, setAgreeChecked] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = id => {
    setExpandedSections(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const sections = [
    {
      id: '1',
      title: '1. Information We Collect',
      icon: '📊',
      subsections: [
        'Personal Information: Name, email address, phone number',
        'Account Information: Username, profile data, preferences',
        'Usage Data: App interactions, features used, time spent',
        'Device Information: Device model, OS version, unique identifiers',
        'Location Data: Approximate location based on IP address',
      ],
    },
    {
      id: '2',
      title: '2. How We Use Your Information',
      icon: '⚙️',
      subsections: [
        'Provide and maintain our services',
        'Improve and personalize your experience',
        'Process transactions and send notifications',
        'Analyze usage patterns and optimize performance',
        'Communicate updates, promotions, and support messages',
      ],
    },
    {
      id: '3',
      title: '3. Data Storage & Security',
      icon: '🔒',
      subsections: [
        'Data encrypted using industry-standard protocols',
        'Regular security audits and vulnerability assessments',
        'Access restricted to authorized personnel only',
        'Data retained only as long as necessary',
        'Automatic logout after periods of inactivity',
      ],
    },
    {
      id: '4',
      title: '4. Information Sharing',
      icon: '🤝',
      subsections: [
        'We never sell your personal information',
        'Data shared with trusted service providers',
        'Anonymous analytics shared for app improvement',
        'Legal compliance when required by law',
        'Business transfers (merger, acquisition, or sale)',
      ],
    },
    {
      id: '5',
      title: '5. Your Rights & Choices',
      icon: '⚖️',
      subsections: [
        'Access, update, or delete your personal data',
        'Opt-out of marketing communications',
        'Disable location tracking in device settings',
        'Request data portability',
        'Withdraw consent at any time',
      ],
    },
    {
      id: '6',
      title: '6. Cookies & Tracking',
      icon: '🍪',
      subsections: [
        'Essential cookies for app functionality',
        'Analytics cookies to improve performance',
        'Preference cookies to remember settings',
        'You can manage cookie preferences',
        'Third-party tracking limited to essential services',
      ],
    },
    {
      id: '7',
      title: "7. Children's Privacy",
      icon: '👶',
      subsections: [
        'Services not directed to children under 13',
        'We do not knowingly collect child data',
        'Parental consent required for minors',
        'Immediate deletion of discovered child data',
        'Contact us for parental concerns',
      ],
    },
    {
      id: '8',
      title: '8. International Data Transfers',
      icon: '🌍',
      subsections: [
        'Data may be stored on servers worldwide',
        'Compliance with international data laws',
        'Standard contractual clauses implemented',
        'Privacy Shield framework adherence',
        'Your data protected regardless of location',
      ],
    },
    {
      id: '9',
      title: '9. Data Breach Procedures',
      icon: '🚨',
      subsections: [
        'Immediate internal breach response team activation',
        'User notification within 72 hours if affected',
        'Law enforcement notification as required',
        'Remediation and prevention measures implemented',
        'Regular breach response drills conducted',
      ],
    },
    {
      id: '10',
      title: '10. Third-Party Services',
      icon: '🔗',
      subsections: [
        'Social media login integration',
        'Payment processing partners',
        'Analytics and crash reporting tools',
        'Push notification services',
        'We review third-party privacy practices',
      ],
    },
    {
      id: '11',
      title: '11. Policy Updates',
      icon: '📝',
      subsections: [
        'We notify users of material changes',
        'Continued use constitutes acceptance',
        'Previous versions archived and available',
        'Effective date displayed at top of policy',
        'Regular policy reviews conducted annually',
      ],
    },
    {
      id: '12',
      title: '12. Contact Us',
      icon: '📧',
      subsections: [
        'Email: privacy@ourapp.com',
        'Phone: +1 (555) 123-4567',
        'Address: 123 Privacy Street, Tech City, 12345',
        'Response time: Within 48 hours',
        'Data Protection Officer available',
      ],
    },
  ];

  const renderSection = ({ item, index }) => {
    const isExpanded = expandedSections[item.id];

    return (
      <View
        style={[
          styles.sectionContainer,
          index === sections.length - 1 && styles.lastSection,
        ]}
      >
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() => toggleSection(item.id)}
          activeOpacity={0.7}
        >
          <View style={styles.sectionHeaderLeft}>
            <Text style={styles.sectionIcon}>{item.icon}</Text>
            <Text style={styles.sectionTitle}>{item.title}</Text>
          </View>
          <Text style={styles.expandIcon}>{isExpanded ? '−' : '+'}</Text>
        </TouchableOpacity>

        {isExpanded && (
          <View style={styles.subsectionContainer}>
            {item.subsections.map((subitem, idx) => (
              <View key={idx} style={styles.subsectionItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.subsectionText}>{subitem}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    );
  };

  const handleAgree = () => {
    // if (!agreeChecked) {
    //   // alert('Please acknowledge that you have read the Privacy Policy');
    //   return;
    // }
    // alert('Privacy policy acknowledged');
  };

  const handleDecline = () => {
    alert('You have declined the Privacy Policy');
  };

  const handleExpandAll = () => {
    const allExpanded = {};
    sections.forEach(section => {
      allExpanded[section.id] = true;
    });
    setExpandedSections(allExpanded);
  };

  const handleCollapseAll = () => {
    setExpandedSections({});
  };

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <TouchableOpacity style={styles.backButton}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      <View style={styles.iconContainer}>
        <View style={styles.iconCircle}>
          <Text style={styles.shieldIcon}>🛡️</Text>
        </View>
      </View>

      <Text style={styles.title}>Privacy Policy</Text>
      <Text style={styles.effectiveDate}>Effective: April 30, 2026</Text>
      <Text style={styles.description}>
        Your privacy matters to us. We are committed to protecting your personal
        information and being transparent about our data practices.
      </Text>

      {/* Expand/Collapse Controls */}
      <View style={styles.controlsContainer}>
        <TouchableOpacity
          style={styles.controlButton}
          onPress={handleExpandAll}
        >
          <Text style={styles.controlButtonText}>Expand All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.controlButton}
          onPress={handleCollapseAll}
        >
          <Text style={styles.controlButtonText}>Collapse All</Text>
        </TouchableOpacity>
      </View>

      {/* Summary Badge */}
      <View style={styles.summaryBadge}>
        <Text style={styles.summaryIcon}>✓</Text>
        <Text style={styles.summaryText}>GDPR & CCPA Compliant</Text>
      </View>
    </View>
  );

  const renderFooter = () => (
    <View style={styles.footerContainer}>
      {/* Data Rights Notice */}
      <View style={styles.rightsNotice}>
        <Text style={styles.rightsTitle}>🔐 Your Data Rights</Text>
        <Text style={styles.rightsText}>
          Under GDPR and CCPA, you have the right to access, correct, delete,
          and port your data. You can also restrict or object to certain
          processing activities.
        </Text>
      </View>

      {/* Agreement Checkbox */}
      <TouchableOpacity
        style={styles.agreementContainer}
        onPress={() => setAgreeChecked(!agreeChecked)}
      >
        <View style={[styles.checkbox, agreeChecked && styles.checkboxChecked]}>
          {agreeChecked && <Text style={styles.checkmark}>✓</Text>}
        </View>
        <Text style={styles.agreementText}>
          I have read and understood the{' '}
          <Text style={styles.agreementLink}>Privacy Policy</Text> and consent
          to the collection and use of my information as described.
        </Text>
      </TouchableOpacity>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.declineButton} onPress={handleDecline}>
          <Text style={styles.declineButtonText}>Decline</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.acceptButton,
            !agreeChecked && styles.acceptButtonDisabled,
          ]}
          onPress={handleAgree}
          disabled={!agreeChecked}
        >
          <Text style={styles.acceptButtonText}>Accept</Text>
        </TouchableOpacity>
      </View>

      {/* Last Updated & Version */}
      <View style={styles.versionContainer}>
        <Text style={styles.versionText}>Version 3.1.0</Text>
        <Text style={styles.reviewDate}>Last reviewed: April 2026</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      <FlatList
        data={sections}
        renderItem={renderSection}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        contentContainerStyle={styles.listContent}
        initialNumToRender={12}
        removeClippedSubviews={true}
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
  // Header Styles
  headerContainer: {
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 40 : 20,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
    marginBottom: 8,
  },
  backButton: {
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  backButtonText: {
    fontSize: 16,
    color: '#22C35D',
    fontWeight: '600',
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#22C35D20',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#22C35D40',
  },
  shieldIcon: {
    fontSize: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  effectiveDate: {
    fontSize: 13,
    color: '#22C35D',
    textAlign: 'center',
    marginBottom: 12,
    fontWeight: '500',
  },
  description: {
    fontSize: 15,
    color: '#888888',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 16,
  },
  controlButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#1A1A1A',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  controlButtonText: {
    fontSize: 13,
    color: '#22C35D',
    fontWeight: '500',
  },
  summaryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#22C35D20',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'center',
  },
  summaryIcon: {
    fontSize: 14,
    color: '#22C35D',
    marginRight: 6,
    fontWeight: 'bold',
  },
  summaryText: {
    fontSize: 13,
    color: '#22C35D',
    fontWeight: '600',
  },
  // Section Styles
  sectionContainer: {
    marginHorizontal: 24,
    marginBottom: 12,
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    overflow: 'hidden',
  },
  lastSection: {
    marginBottom: 0,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 16,
    backgroundColor: '#1A1A1A',
  },
  sectionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  sectionIcon: {
    fontSize: 22,
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    flex: 1,
  },
  expandIcon: {
    fontSize: 24,
    color: '#22C35D',
    fontWeight: '600',
  },
  subsectionContainer: {
    paddingHorizontal: 18,
    paddingBottom: 16,
    backgroundColor: '#0D0D0D',
    borderTopWidth: 1,
    borderTopColor: '#2A2A2A',
  },
  subsectionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 12,
  },
  bulletPoint: {
    fontSize: 14,
    color: '#22C35D',
    marginRight: 10,
    marginTop: 2,
  },
  subsectionText: {
    flex: 1,
    fontSize: 13,
    color: '#BBBBBB',
    lineHeight: 20,
  },
  // Footer Styles
  footerContainer: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 20,
    marginTop: 16,
  },
  rightsNotice: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    marginBottom: 24,
  },
  rightsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#22C35D',
    marginBottom: 10,
  },
  rightsText: {
    fontSize: 13,
    color: '#BBBBBB',
    lineHeight: 20,
  },
  agreementContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 28,
    padding: 8,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#22C35D',
    backgroundColor: 'transparent',
    marginRight: 14,
    marginTop: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#22C35D',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 'bold',
  },
  agreementText: {
    flex: 1,
    fontSize: 14,
    color: '#CCCCCC',
    lineHeight: 20,
  },
  agreementLink: {
    color: '#22C35D',
    fontWeight: '600',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  declineButton: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  declineButtonText: {
    color: '#888888',
    fontSize: 16,
    fontWeight: '600',
  },
  acceptButton: {
    flex: 1,
    backgroundColor: '#22C35D',
    borderRadius: 16,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#22C35D',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  acceptButtonDisabled: {
    opacity: 0.5,
    shadowOpacity: 0,
    elevation: 0,
  },
  acceptButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  versionContainer: {
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#1A1A1A',
  },
  versionText: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 6,
  },
  reviewDate: {
    fontSize: 11,
    color: '#555555',
  },
});

export default Privacy;
