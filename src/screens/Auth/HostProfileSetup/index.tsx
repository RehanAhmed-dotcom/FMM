// HostProfileSetup.js
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Modal,
  Image,
} from 'react-native';
import { RootNavigationProp } from '../../../types/navigationType';
import ImagePicker from 'react-native-image-crop-picker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// ==================== 2.1 Host Profile Setup Screen ====================
const HostProfileSetupScreen = ({ onSubmit }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [cnic, setCnic] = useState('');
  const [groundName, setGroundName] = useState('');
  const [city, setCity] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [image, setImage] = useState('');
  const formatCNIC = text => {
    let cleaned = text.replace(/[^0-9]/g, '');
    let formatted = '';
    if (cleaned.length <= 5) {
      formatted = cleaned;
    } else if (cleaned.length <= 12) {
      formatted = cleaned.slice(0, 5) + '-' + cleaned.slice(5);
    } else {
      formatted =
        cleaned.slice(0, 5) +
        '-' +
        cleaned.slice(5, 12) +
        '-' +
        cleaned.slice(12, 13);
    }
    setCnic(formatted.slice(0, 15));
  };

  const handleImageUpload = () => {
    // setIsUploading(true);
    // // Simulate image upload
    // setTimeout(() => {
    //   setProfileImage('https://via.placeholder.com/150');
    //   setIsUploading(false);
    // }, 1000);
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      setImage(image.path);
    });
  };
  // const handleImageUpload = () => {
  //   setIsUploading(true);
  //   setTimeout(() => {
  //     setProfileImage('avatar');
  //     setIsUploading(false);
  //   }, 1000);
  // };

  const handleSubmit = () => {
    // if (!profileImage) {
    //   alert('Please upload a profile image');
    //   return;
    // }
    // if (!fullName.trim()) {
    //   // alert('Please enter your full name');
    //   return;
    // }
    // if (!phone.trim()) {
    //   // alert('Please enter your phone number');
    //   return;
    // }
    // if (!cnic.trim() || cnic.replace(/-/g, '').length < 13) {
    //   // alert('Please enter a valid CNIC number (13 digits)');
    //   return;
    // }
    // if (!city.trim()) {
    //   // alert('Please enter your city/location');
    //   return;
    // }

    onSubmit({
      profileImage,
      fullName,
      phone,
      cnic,
      groundName,
      city,
    });
  };
  const { top } = useSafeAreaInsets();
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <StatusBar barStyle="light-content" backgroundColor="#000000" />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={[styles.content, { paddingTop: top }]}>
            {/* Header */}
            <View style={styles.headerContainer}>
              <TouchableOpacity style={styles.backButton}>
                <Text style={styles.backButtonText}>← Back</Text>
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Host Profile Setup</Text>
              <View style={{ width: 50 }} />
            </View>

            {/* Progress Indicator */}
            <View style={styles.progressContainer}>
              <View style={styles.progressStep}>
                <View style={[styles.progressDot, styles.progressDotActive]}>
                  <Text style={styles.progressDotText}>1</Text>
                </View>
                <View style={styles.progressLine} />
                <View style={styles.progressDot}>
                  <Text style={styles.progressDotText}>2</Text>
                </View>
              </View>
              <Text style={styles.progressText}>
                Step 1 of 1: Verification Info
              </Text>
            </View>

            {/* Profile Image Upload */}
            <View style={styles.imageUploadContainer}>
              <TouchableOpacity
                style={styles.imageUploadButton}
                onPress={handleImageUpload}
                disabled={isUploading}
              >
                {image ? (
                  <View style={styles.profileImageContainer}>
                    <View style={styles.profileImagePlaceholder}>
                      <Image
                        source={{ uri: image }}
                        style={{ width: 120, height: 120, borderRadius: 60 }}
                      />
                      {/* <Text style={styles.profileImageEmoji}>🧑‍💼</Text> */}
                    </View>
                    <View style={styles.editBadge}>
                      <Text style={styles.editBadgeText}>✎</Text>
                    </View>
                  </View>
                ) : (
                  <View style={styles.uploadPlaceholder}>
                    <Text style={styles.uploadIcon}>📸</Text>
                    <Text style={styles.uploadText}>
                      {isUploading ? 'Uploading...' : 'Upload Photo'}
                    </Text>
                    <Text style={styles.uploadSubtext}>JPG, PNG </Text>
                  </View>
                )}
              </TouchableOpacity>
              <Text style={styles.imageHint}>
                Profile picture required for verification
              </Text>
            </View>

            {/* Form Fields */}
            <View style={styles.formContainer}>
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Full Name *</Text>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputIcon}>👤</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your full name"
                    placeholderTextColor="#666666"
                    value={fullName}
                    onChangeText={setFullName}
                  />
                </View>
              </View>

              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Phone Number *</Text>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputIcon}>📱</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="+1 234 567 8900"
                    placeholderTextColor="#666666"
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                  />
                </View>
              </View>

              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>CNIC / ID Number *</Text>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputIcon}>🪪</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="12345-1234567-1"
                    placeholderTextColor="#666666"
                    value={cnic}
                    onChangeText={formatCNIC}
                    keyboardType="numeric"
                    maxLength={15}
                  />
                </View>
                <Text style={styles.hintText}>
                  For trust & verification purposes
                </Text>
              </View>

              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Ground Name (Optional)</Text>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputIcon}>🏟️</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="e.g., Central Park Field"
                    placeholderTextColor="#666666"
                    value={groundName}
                    onChangeText={setGroundName}
                  />
                </View>
              </View>

              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>City / Location *</Text>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputIcon}>📍</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your city"
                    placeholderTextColor="#666666"
                    value={city}
                    onChangeText={setCity}
                  />
                </View>
              </View>

              <View style={styles.noteContainer}>
                <Text style={styles.noteIcon}>⚠️</Text>
                <Text style={styles.noteText}>
                  Your information will be verified by our team. This helps
                  maintain trust in our community.
                </Text>
              </View>

              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmit}
              >
                <Text style={styles.submitButtonText}>
                  Submit for Approval →
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

// ==================== 2.2 Approval Pending Screen ====================
const ApprovalPendingScreen = ({ onEditProfile, onContactSupport }) => (
  <View style={styles.container}>
    <StatusBar barStyle="light-content" backgroundColor="#000000" />
    <View style={styles.statusContainer}>
      <View style={styles.statusIconContainer}>
        <View style={styles.pendingIconBg}>
          <Text style={styles.pendingIcon}>⏳</Text>
        </View>
      </View>
      <Text style={styles.statusTitle}>Your account is under review</Text>
      <Text style={styles.statusDescription}>
        Admin will approve your account before you can create matches. This
        usually takes 24-48 hours.
      </Text>

      <View style={styles.statusTimeline}>
        <View style={styles.timelineItem}>
          <View style={[styles.timelineDot, styles.timelineDotCompleted]}>
            <Text style={styles.timelineDotText}>✓</Text>
          </View>
          <View>
            <Text style={styles.timelineTitle}>Profile Submitted</Text>
            <Text style={styles.timelineDesc}>
              Your information has been received
            </Text>
          </View>
        </View>
        <View style={styles.timelineLine} />
        <View style={styles.timelineItem}>
          <View style={[styles.timelineDot, styles.timelineDotActive]}>
            <Text style={styles.timelineDotText}>⏳</Text>
          </View>
          <View>
            <Text style={styles.timelineTitle}>Under Review</Text>
            <Text style={styles.timelineDesc}>
              Admin is verifying your details
            </Text>
          </View>
        </View>
        <View style={styles.timelineLine} />
        <View style={styles.timelineItem}>
          <View style={styles.timelineDot}>
            <Text style={styles.timelineDotText}>🔒</Text>
          </View>
          <View>
            <Text style={styles.timelineTitle}>Approval</Text>
            <Text style={styles.timelineDesc}>
              You'll be notified once approved
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.statusActions}>
        <TouchableOpacity style={styles.editButton} onPress={onEditProfile}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.supportButton}
          onPress={onContactSupport}
        >
          <Text style={styles.supportButtonText}>Contact Support</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

// ==================== 2.3 Approval Rejected Screen ====================
const ApprovalRejectedScreen = ({ rejectionReason, onResubmit }) => {
  const [reason] = useState(
    rejectionReason ||
      'Incomplete information provided. Please check your CNIC and contact details.',
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <View style={styles.statusContainer}>
        <View style={styles.statusIconContainer}>
          <View style={styles.rejectedIconBg}>
            <Text style={styles.rejectedIcon}>❌</Text>
          </View>
        </View>
        <Text style={[styles.statusTitle, styles.rejectedTitle]}>
          Your request was rejected
        </Text>
        <Text style={styles.statusDescription}>
          Unfortunately, your host application could not be approved at this
          time.
        </Text>

        <View style={styles.reasonContainer}>
          <Text style={styles.reasonTitle}>Reason for rejection:</Text>
          <View style={styles.reasonBox}>
            <Text style={styles.reasonText}>{reason}</Text>
          </View>
        </View>

        <View style={styles.suggestionsContainer}>
          <Text style={styles.suggestionsTitle}>📋 Suggestions to fix:</Text>
          <View style={styles.suggestionItem}>
            <Text style={styles.suggestionBullet}>•</Text>
            <Text style={styles.suggestionText}>
              Ensure CNIC is clear and valid (13 digits)
            </Text>
          </View>
          <View style={styles.suggestionItem}>
            <Text style={styles.suggestionBullet}>•</Text>
            <Text style={styles.suggestionText}>
              Provide accurate phone number for verification
            </Text>
          </View>
          <View style={styles.suggestionItem}>
            <Text style={styles.suggestionBullet}>•</Text>
            <Text style={styles.suggestionText}>
              Upload a clear profile picture
            </Text>
          </View>
          <View style={styles.suggestionItem}>
            <Text style={styles.suggestionBullet}>•</Text>
            <Text style={styles.suggestionText}>
              Enter valid city/location information
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.resubmitButton} onPress={onResubmit}>
          <Text style={styles.resubmitButtonText}>Resubmit Application →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

type Props = {
  navigation: RootNavigationProp<'HostProfileSetup'>; // or whichever screen this is
  onCreateFirstMatch?: () => void;
};
// ==================== 2.4 Approval Success Screen ====================
const ApprovalSuccessScreen = ({ onCreateFirstMatch, navigation }: Props) => (
  <View style={styles.container}>
    <StatusBar barStyle="light-content" backgroundColor="#000000" />
    <View style={styles.statusContainer}>
      <View style={styles.statusIconContainer}>
        <View style={styles.successIconBg}>
          <Text style={styles.successIcon}>✅</Text>
        </View>
      </View>
      <Text style={[styles.statusTitle, styles.successTitle]}>
        You're now a verified host!
      </Text>
      <Text style={styles.statusDescription}>
        Congratulations! Your host account has been approved. You can now create
        matches and start earning.
      </Text>

      <View style={styles.successCard}>
        <View style={styles.successCardHeader}>
          <Text style={styles.successCardIcon}>🎉</Text>
          <Text style={styles.successCardTitle}>Host Benefits Unlocked</Text>
        </View>
        <View style={styles.successCardList}>
          <View style={styles.successCardItem}>
            <Text style={styles.successCardCheck}>✓</Text>
            <Text style={styles.successCardText}>Create unlimited matches</Text>
          </View>
          <View style={styles.successCardItem}>
            <Text style={styles.successCardCheck}>✓</Text>
            <Text style={styles.successCardText}>Set entry fees & prizes</Text>
          </View>
          <View style={styles.successCardItem}>
            <Text style={styles.successCardCheck}>✓</Text>
            <Text style={styles.successCardText}>Manage players & teams</Text>
          </View>
          <View style={styles.successCardItem}>
            <Text style={styles.successCardCheck}>✓</Text>
            <Text style={styles.successCardText}>
              Earn commission & rewards
            </Text>
          </View>
        </View>
      </View>

      {/* <TouchableOpacity
        style={styles.createMatchButton}
        onPress={onCreateFirstMatch}
      >
        <Text style={styles.createMatchButtonText}>Create First Match →</Text>
      </TouchableOpacity> */}

      <TouchableOpacity
        onPress={() => navigation.navigate('HostTabs', { screen: 'HostHome' })}
        style={styles.goHomeButton}
      >
        <Text style={styles.goHomeButtonText}>Go to Dashboard</Text>
      </TouchableOpacity>
    </View>
  </View>
);

// ==================== Main Component ====================
const HostProfileSetup = () => {
  const [step, setStep] = useState('setup'); // setup, pending, rejected, success
  const [submittedData, setSubmittedData] = useState(null);
  const navigation = useNavigation<RootNavigationProp<'HostProfileSetup'>>();
  const handleSubmit = data => {
    setSubmittedData(data);
    // Simulate API call for approval
    // For demo: randomly show success or rejected
    // In real app, this would be based on API response
    setTimeout(() => {
      // Demo: Show pending first, then can be changed
      setStep('success');
    }, 1500);
  };

  const handleEditProfile = () => {
    setStep('setup');
  };

  const handleContactSupport = () => {
    // alert('Contacting support: support@matchup.com\n+1 (555) 123-4567');
  };

  const handleResubmit = () => {
    setStep('setup');
  };

  const handleCreateFirstMatch = () => {
    // alert('Navigate to Create Match Screen');
  };

  // For demo purposes - show different states
  // You can change this to test different states
  const showRejected = false; // Set to true to test rejected state
  const showSuccess = false; // Set to true to test success state

  if (showRejected) {
    return <ApprovalRejectedScreen onResubmit={handleResubmit} />;
  }

  if (showSuccess) {
    return (
      <ApprovalSuccessScreen onCreateFirstMatch={handleCreateFirstMatch} />
    );
  }

  if (step === 'pending') {
    return (
      <ApprovalPendingScreen
        onEditProfile={handleEditProfile}
        onContactSupport={handleContactSupport}
      />
    );
  }

  if (step === 'rejected') {
    return <ApprovalRejectedScreen onResubmit={handleResubmit} />;
  }

  if (step === 'success') {
    return (
      <ApprovalSuccessScreen
        onCreateFirstMatch={handleCreateFirstMatch}
        navigation={navigation}
      />
    );
  }

  return <HostProfileSetupScreen onSubmit={handleSubmit} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 30,
  },
  // Header
  headerContainer: {
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
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  // Progress
  progressContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  progressStep: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#2A2A2A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressDotActive: {
    backgroundColor: '#22C35D',
    borderColor: '#22C35D',
  },
  progressDotText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  progressLine: {
    width: 60,
    height: 2,
    backgroundColor: '#2A2A2A',
    marginHorizontal: 8,
  },
  progressText: {
    fontSize: 12,
    color: '#888888',
  },
  // Image Upload
  imageUploadContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  imageUploadButton: {
    alignItems: 'center',
  },
  uploadPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#1A1A1A',
    borderWidth: 2,
    borderColor: '#22C35D',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadIcon: {
    fontSize: 32,
    marginBottom: 6,
  },
  uploadText: {
    fontSize: 12,
    color: '#22C35D',
    fontWeight: '600',
  },
  uploadSubtext: {
    fontSize: 10,
    color: '#666666',
  },
  profileImageContainer: {
    position: 'relative',
  },
  profileImagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#22C35D20',
    borderWidth: 2,
    borderColor: '#22C35D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImageEmoji: {
    fontSize: 56,
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#22C35D',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#000000',
  },
  editBadgeText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  imageHint: {
    fontSize: 11,
    color: '#888888',
    marginTop: 8,
  },
  // Form
  formContainer: {
    flex: 1,
  },
  inputWrapper: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#CCCCCC',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    paddingHorizontal: 16,
    height: 56,
  },
  inputIcon: {
    fontSize: 18,
    marginRight: 12,
    color: '#888888',
  },
  input: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
    padding: 0,
  },
  hintText: {
    fontSize: 10,
    color: '#666666',
    marginTop: 4,
    marginLeft: 4,
  },
  noteContainer: {
    flexDirection: 'row',
    backgroundColor: '#22C35D10',
    borderRadius: 12,
    padding: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#22C35D20',
  },
  noteIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  noteText: {
    flex: 1,
    fontSize: 12,
    color: '#888888',
    lineHeight: 18,
  },
  submitButton: {
    backgroundColor: '#22C35D',
    borderRadius: 16,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  // Status Screens
  statusContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  statusIconContainer: {
    marginBottom: 24,
  },
  pendingIconBg: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FFA50020',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pendingIcon: {
    fontSize: 54,
  },
  rejectedIconBg: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FF444420',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rejectedIcon: {
    fontSize: 54,
  },
  successIconBg: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#22C35D20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successIcon: {
    fontSize: 54,
  },
  statusTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
  },
  rejectedTitle: {
    color: '#FF4444',
  },
  successTitle: {
    color: '#22C35D',
  },
  statusDescription: {
    fontSize: 15,
    color: '#888888',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
  },
  // Timeline
  statusTimeline: {
    width: '100%',
    marginBottom: 32,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  timelineDot: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#2A2A2A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timelineDotCompleted: {
    backgroundColor: '#22C35D',
    borderColor: '#22C35D',
  },
  timelineDotActive: {
    backgroundColor: '#FFA500',
    borderColor: '#FFA500',
  },
  timelineDotText: {
    fontSize: 18,
  },
  timelineTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  timelineDesc: {
    fontSize: 12,
    color: '#888888',
  },
  timelineLine: {
    width: 2,
    height: 30,
    backgroundColor: '#2A2A2A',
    marginLeft: 21,
    marginVertical: 4,
  },
  // Actions
  statusActions: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  editButton: {
    flex: 1,
    backgroundColor: '#2A2A2A',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
  },
  editButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  supportButton: {
    flex: 1,
    backgroundColor: '#22C35D',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
  },
  supportButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  // Rejected Screen
  reasonContainer: {
    width: '100%',
    marginBottom: 24,
  },
  reasonTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF4444',
    marginBottom: 8,
  },
  reasonBox: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#FF4444',
  },
  reasonText: {
    fontSize: 14,
    color: '#CCCCCC',
    lineHeight: 20,
  },
  suggestionsContainer: {
    width: '100%',
    marginBottom: 32,
  },
  suggestionsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#22C35D',
    marginBottom: 12,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  suggestionBullet: {
    fontSize: 14,
    color: '#22C35D',
    marginRight: 10,
  },
  suggestionText: {
    fontSize: 13,
    color: '#BBBBBB',
  },
  resubmitButton: {
    backgroundColor: '#22C35D',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  resubmitButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  // Success Screen
  successCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 20,
    padding: 20,
    width: '100%',
    marginBottom: 32,
    borderWidth: 1,
    borderColor: '#22C35D30',
  },
  successCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  successCardIcon: {
    fontSize: 28,
  },
  successCardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#22C35D',
  },
  successCardList: {
    gap: 12,
  },
  successCardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  successCardCheck: {
    fontSize: 16,
    color: '#22C35D',
    fontWeight: '700',
  },
  successCardText: {
    fontSize: 14,
    color: '#CCCCCC',
  },
  createMatchButton: {
    backgroundColor: '#22C35D',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    width: '100%',
    marginBottom: 12,
  },
  createMatchButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  goHomeButton: {
    backgroundColor: '#2A2A2A',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    width: '100%',
  },
  goHomeButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default HostProfileSetup;
