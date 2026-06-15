// TermsOfServiceScreen.js
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

const Terms = () => {
  const [agreeChecked, setAgreeChecked] = useState(false);

  const sections = [
    {
      id: '1',
      title: '1. Acceptance of Terms',
      content:
        'By accessing or using our application, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any part of these terms, you may not use our services.',
    },
    {
      id: '2',
      title: '2. User Accounts',
      content:
        'You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.',
    },
    {
      id: '3',
      title: '3. User Conduct',
      content:
        'You agree not to use our services for any unlawful purpose or in any way that could damage, disable, overburden, or impair our services. You must not attempt to gain unauthorized access to any part of our services.',
    },
    {
      id: '4',
      title: '4. Content Ownership',
      content:
        'You retain ownership of any content you submit or upload. By submitting content, you grant us a worldwide, non-exclusive license to use, reproduce, and distribute your content in connection with our services.',
    },
    {
      id: '5',
      title: '5. Privacy Policy',
      content:
        'Your use of our services is also governed by our Privacy Policy, which outlines how we collect, use, and protect your personal information. Please review our Privacy Policy carefully.',
    },
    {
      id: '6',
      title: '6. Prohibited Activities',
      content:
        'You may not: (a) use our services for any illegal purpose; (b) harass, abuse, or harm others; (c) upload viruses or malicious code; (d) collect user data without consent; (e) impersonate others.',
    },
    {
      id: '7',
      title: '7. Termination',
      content:
        'We reserve the right to suspend or terminate your account at our sole discretion, without notice, for conduct that violates these terms or is harmful to other users, us, or third parties.',
    },
    {
      id: '8',
      title: '8. Disclaimer of Warranties',
      content:
        'Our services are provided "as is" without any warranties, expressed or implied. We do not warrant that our services will be uninterrupted, secure, or error-free.',
    },
    {
      id: '9',
      title: '9. Limitation of Liability',
      content:
        'To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services.',
    },
    {
      id: '10',
      title: '10. Changes to Terms',
      content:
        'We may modify these terms at any time. We will notify you of any changes by posting the new terms on this page. Your continued use of our services after changes constitutes acceptance.',
    },
    {
      id: '11',
      title: '11. Governing Law',
      content:
        'These terms shall be governed by and construed in accordance with the laws of your jurisdiction, without regard to its conflict of law provisions.',
    },
    {
      id: '12',
      title: '12. Contact Us',
      content:
        'If you have any questions about these Terms of Service, please contact us at: support@ourapp.com',
    },
  ];

  const renderSection = ({ item, index }) => (
    <View
      style={[
        styles.sectionContainer,
        index === sections.length - 1 && styles.lastSection,
      ]}
    >
      <Text style={styles.sectionTitle}>{item.title}</Text>
      <Text style={styles.sectionContent}>{item.content}</Text>
    </View>
  );

  const handleAgree = () => {
    // if (!agreeChecked) {
    //   alert(
    //     'Please read and agree to the Terms of Service by checking the box above',
    //   );
    //   return;
    // }
    // alert('You have agreed to the Terms of Service');
  };

  const handleDecline = () => {
    // alert('You have declined the Terms of Service');
  };

  const handlePrint = () => {
    // alert('Print functionality would be implemented here');
  };

  const handleDownload = () => {
    // alert('Download functionality would be implemented here');
  };

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <TouchableOpacity style={styles.backButton}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      <View style={styles.iconContainer}>
        <View style={styles.iconCircle}>
          <Text style={styles.documentIcon}>📄</Text>
        </View>
      </View>

      <Text style={styles.title}>Terms of Service</Text>
      <Text style={styles.lastUpdated}>Last Updated: April 30, 2026</Text>
      <Text style={styles.description}>
        Please read these terms carefully before using our services
      </Text>
    </View>
  );

  const renderFooter = () => (
    <View style={styles.footerContainer}>
      {/* Agreement Checkbox */}
      <TouchableOpacity
        style={styles.agreementContainer}
        onPress={() => setAgreeChecked(!agreeChecked)}
      >
        <View style={[styles.checkbox, agreeChecked && styles.checkboxChecked]}>
          {agreeChecked && <Text style={styles.checkmark}>✓</Text>}
        </View>
        <Text style={styles.agreementText}>
          I have read and agree to the{' '}
          <Text style={styles.agreementLink}>Terms of Service</Text> and{' '}
          <Text style={styles.agreementLink}>Privacy Policy</Text>
        </Text>
      </TouchableOpacity>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.declineButton} onPress={handleDecline}>
          <Text style={styles.declineButtonText}>Decline</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.agreeButton,
            !agreeChecked && styles.agreeButtonDisabled,
          ]}
          onPress={handleAgree}
          disabled={!agreeChecked}
        >
          <Text style={styles.agreeButtonText}>I Agree</Text>
        </TouchableOpacity>
      </View>

      {/* Action Icons */}
      <View style={styles.actionIconsContainer}>
        <TouchableOpacity style={styles.actionIcon} onPress={handlePrint}>
          <Text style={styles.actionIconText}>🖨️</Text>
          <Text style={styles.actionIconLabel}>Print</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionIcon} onPress={handleDownload}>
          <Text style={styles.actionIconText}>⬇️</Text>
          <Text style={styles.actionIconLabel}>Download</Text>
        </TouchableOpacity>
      </View>

      {/* Version Info */}
      <View style={styles.versionContainer}>
        <Text style={styles.versionText}>Version 2.4.0</Text>
        <Text style={styles.copyrightText}>
          © 2026 Your App Name. All rights reserved.
        </Text>
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
  documentIcon: {
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
  lastUpdated: {
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
  },
  // Section Styles
  sectionContainer: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#1A1A1A',
  },
  lastSection: {
    borderBottomWidth: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 10,
    letterSpacing: -0.3,
  },
  sectionContent: {
    fontSize: 14,
    color: '#AAAAAA',
    lineHeight: 22,
    textAlign: 'justify',
  },
  // Footer Styles
  footerContainer: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#2A2A2A',
    marginTop: 16,
  },
  agreementContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
    marginBottom: 28,
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
  agreeButton: {
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
  agreeButtonDisabled: {
    opacity: 0.5,
    shadowOpacity: 0,
    elevation: 0,
  },
  agreeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  actionIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 32,
    marginBottom: 28,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#1A1A1A',
    borderBottomWidth: 1,
    borderBottomColor: '#1A1A1A',
  },
  actionIcon: {
    alignItems: 'center',
  },
  actionIconText: {
    fontSize: 28,
    marginBottom: 6,
  },
  actionIconLabel: {
    fontSize: 12,
    color: '#888888',
  },
  versionContainer: {
    alignItems: 'center',
  },
  versionText: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 6,
  },
  copyrightText: {
    fontSize: 11,
    color: '#555555',
    textAlign: 'center',
  },
});

export default Terms;
