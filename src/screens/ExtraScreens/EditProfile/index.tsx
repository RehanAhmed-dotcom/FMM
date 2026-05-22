// EditProfileScreen.js
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
  Switch,
  Image,
} from 'react-native';
import { RootNavigationProp } from '../../../types/navigationType';
import ImagePicker from 'react-native-image-crop-picker';
const EditProfile = () => {
  const [formData, setFormData] = useState({
    fullName: 'Alex Morgan',
    username: '@alexmorgan',
    email: 'alex.morgan@example.com',
    phone: '+1 (555) 123-4567',
    bio: 'Professional footballer | Passionate about the beautiful game ⚽',
    location: 'New York, USA',
    website: 'www.alexmorgan.com',
    birthDate: '1995-06-15',
    gender: 'Female',
    skillLevel: 'Pro',
    preferredPosition: 'Striker',
    jerseyNumber: '10',
    isPublicProfile: true,
    showEmail: true,
    showPhone: false,
    receiveNotifications: true,
  });
  const navigation = useNavigation<RootNavigationProp<'EditProfile'>>();
  const [profileImage, setProfileImage] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [activeSection, setActiveSection] = useState('personal');

  const sections = [
    { id: 'personal', label: 'Personal Info', icon: '👤' },
    { id: 'football', label: 'Football Details', icon: '⚽' },
    // { id: 'privacy', label: 'Privacy & Settings', icon: '🔒' },
  ];

  const skillLevels = ['Beginner', 'Intermediate', 'Pro'];
  const positions = [
    'Goalkeeper',
    'Defender',
    'Midfielder',
    'Striker',
    'Winger',
  ];
  const genders = ['Male', 'Female', 'Non-binary', 'Prefer not to say'];

  const handleImageUpload = () => {
    // setIsUploading(true);
    // setTimeout(() => {
    // //   setProfileImage('avatar');
    //   setIsUploading(false);
    // }, 1000);
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      setProfileImage(image.path);
    });
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      navigation.navigate('MyTabs', { screen: 'Profile' });
      //   alert('Profile updated successfully!');
    }, 1500);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const renderPersonalInfo = () => (
    <View style={styles.sectionContent}>
      <View style={styles.inputWrapper}>
        <Text style={styles.inputLabel}>Full Name</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.inputIcon}>👤</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your full name"
            placeholderTextColor="#666666"
            value={formData.fullName}
            onChangeText={value => handleChange('fullName', value)}
          />
        </View>
      </View>

      {/* <View style={styles.inputWrapper}>
        <Text style={styles.inputLabel}>Username</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.inputIcon}>@</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter username"
            placeholderTextColor="#666666"
            value={formData.username}
            onChangeText={value => handleChange('username', value)}
            autoCapitalize="none"
          />
        </View>
      </View> */}

      <View style={styles.inputWrapper}>
        <Text style={styles.inputLabel}>Email</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.inputIcon}>📧</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter email"
            placeholderTextColor="#666666"
            value={formData.email}
            onChangeText={value => handleChange('email', value)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
      </View>

      <View style={styles.inputWrapper}>
        <Text style={styles.inputLabel}>Phone Number</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.inputIcon}>📱</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter phone number"
            placeholderTextColor="#666666"
            value={formData.phone}
            onChangeText={value => handleChange('phone', value)}
            keyboardType="phone-pad"
          />
        </View>
      </View>

      <View style={styles.inputWrapper}>
        <Text style={styles.inputLabel}>Bio</Text>
        <View style={[styles.inputContainer, styles.textAreaContainer]}>
          <Text style={styles.inputIcon}>📝</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Tell us about yourself"
            placeholderTextColor="#666666"
            value={formData.bio}
            onChangeText={value => handleChange('bio', value)}
            multiline
            numberOfLines={4}
            maxLength={150}
          />
        </View>
        <Text style={styles.charCount}>{formData.bio.length}/150</Text>
      </View>

      <View style={styles.inputWrapper}>
        <Text style={styles.inputLabel}>Location</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.inputIcon}>📍</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your location"
            placeholderTextColor="#666666"
            value={formData.location}
            onChangeText={value => handleChange('location', value)}
          />
        </View>
      </View>

      {/* <View style={styles.inputWrapper}>
        <Text style={styles.inputLabel}>Website</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.inputIcon}>🌐</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter website URL"
            placeholderTextColor="#666666"
            value={formData.website}
            onChangeText={value => handleChange('website', value)}
            autoCapitalize="none"
          />
        </View>
      </View> */}

      <View style={styles.rowContainer}>
        <View style={[styles.inputWrapper, { flex: 1, marginRight: 12 }]}>
          <Text style={styles.inputLabel}>Birth Date</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.inputIcon}>🎂</Text>
            <TextInput
              style={styles.input}
              placeholder="YYYY-MM-DD"
              placeholderTextColor="#666666"
              value={formData.birthDate}
              onChangeText={value => handleChange('birthDate', value)}
            />
          </View>
        </View>

        <View style={[styles.inputWrapper, { flex: 1 }]}>
          <Text style={styles.inputLabel}>Gender</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.inputIcon}>⚥</Text>
            <TextInput
              style={styles.input}
              placeholder="Select gender"
              placeholderTextColor="#666666"
              value={formData.gender}
              onChangeText={value => handleChange('gender', value)}
            />
          </View>
        </View>
      </View>
    </View>
  );

  const renderFootballDetails = () => (
    <View style={styles.sectionContent}>
      <View style={styles.inputWrapper}>
        <Text style={styles.inputLabel}>Skill Level</Text>
        <View style={styles.optionsContainer}>
          {skillLevels.map(level => (
            <TouchableOpacity
              key={level}
              style={[
                styles.optionButton,
                formData.skillLevel === level && styles.optionButtonActive,
              ]}
              onPress={() => handleChange('skillLevel', level)}
            >
              <Text
                style={[
                  styles.optionButtonText,
                  formData.skillLevel === level &&
                    styles.optionButtonTextActive,
                ]}
              >
                {level}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.inputWrapper}>
        <Text style={styles.inputLabel}>Preferred Position</Text>
        <View style={styles.optionsContainer}>
          {positions.map(position => (
            <TouchableOpacity
              key={position}
              style={[
                styles.optionButton,
                formData.preferredPosition === position &&
                  styles.optionButtonActive,
              ]}
              onPress={() => handleChange('preferredPosition', position)}
            >
              <Text
                style={[
                  styles.optionButtonText,
                  formData.preferredPosition === position &&
                    styles.optionButtonTextActive,
                ]}
              >
                {position}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.inputWrapper}>
        <Text style={styles.inputLabel}>Jersey Number</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.inputIcon}>🔢</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter jersey number"
            placeholderTextColor="#666666"
            value={formData.jerseyNumber}
            onChangeText={value => handleChange('jerseyNumber', value)}
            keyboardType="number-pad"
            maxLength={2}
          />
        </View>
      </View>

      <View style={styles.statsPreview}>
        <Text style={styles.statsPreviewTitle}>📊 Career Stats</Text>
        <View style={styles.statsPreviewGrid}>
          <View style={styles.statPreviewItem}>
            <Text style={styles.statPreviewValue}>127</Text>
            <Text style={styles.statPreviewLabel}>Matches</Text>
          </View>
          <View style={styles.statPreviewItem}>
            <Text style={styles.statPreviewValue}>89</Text>
            <Text style={styles.statPreviewLabel}>Wins</Text>
          </View>
          <View style={styles.statPreviewItem}>
            <Text style={styles.statPreviewValue}>70%</Text>
            <Text style={styles.statPreviewLabel}>Win Rate</Text>
          </View>
          <View style={styles.statPreviewItem}>
            <Text style={styles.statPreviewValue}>#342</Text>
            <Text style={styles.statPreviewLabel}>Rank</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderPrivacySettings = () => (
    <View style={styles.sectionContent}>
      <View style={styles.settingItem}>
        <View style={styles.settingInfo}>
          <Text style={styles.settingIcon}>🌐</Text>
          <View>
            <Text style={styles.settingLabel}>Public Profile</Text>
            <Text style={styles.settingDescription}>
              Allow others to see your profile
            </Text>
          </View>
        </View>
        <Switch
          value={formData.isPublicProfile}
          onValueChange={value => handleChange('isPublicProfile', value)}
          trackColor={{ false: '#2A2A2A', true: '#22C35D' }}
          thumbColor={formData.isPublicProfile ? '#FFFFFF' : '#f4f3f4'}
        />
      </View>

      <View style={styles.settingItem}>
        <View style={styles.settingInfo}>
          <Text style={styles.settingIcon}>📧</Text>
          <View>
            <Text style={styles.settingLabel}>Show Email</Text>
            <Text style={styles.settingDescription}>
              Display email on your profile
            </Text>
          </View>
        </View>
        <Switch
          value={formData.showEmail}
          onValueChange={value => handleChange('showEmail', value)}
          trackColor={{ false: '#2A2A2A', true: '#22C35D' }}
          thumbColor={formData.showEmail ? '#FFFFFF' : '#f4f3f4'}
        />
      </View>

      <View style={styles.settingItem}>
        <View style={styles.settingInfo}>
          <Text style={styles.settingIcon}>📱</Text>
          <View>
            <Text style={styles.settingLabel}>Show Phone Number</Text>
            <Text style={styles.settingDescription}>
              Display phone number on your profile
            </Text>
          </View>
        </View>
        <Switch
          value={formData.showPhone}
          onValueChange={value => handleChange('showPhone', value)}
          trackColor={{ false: '#2A2A2A', true: '#22C35D' }}
          thumbColor={formData.showPhone ? '#FFFFFF' : '#f4f3f4'}
        />
      </View>

      <View style={styles.settingItem}>
        <View style={styles.settingInfo}>
          <Text style={styles.settingIcon}>🔔</Text>
          <View>
            <Text style={styles.settingLabel}>Push Notifications</Text>
            <Text style={styles.settingDescription}>
              Receive match updates and alerts
            </Text>
          </View>
        </View>
        <Switch
          value={formData.receiveNotifications}
          onValueChange={value => handleChange('receiveNotifications', value)}
          trackColor={{ false: '#2A2A2A', true: '#22C35D' }}
          thumbColor={formData.receiveNotifications ? '#FFFFFF' : '#f4f3f4'}
        />
      </View>

      <View style={styles.dangerZone}>
        <Text style={styles.dangerZoneTitle}>⚠️ Danger Zone</Text>
        <TouchableOpacity style={styles.dangerButton}>
          <Text style={styles.dangerButtonText}>Delete Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderSection = () => {
    switch (activeSection) {
      case 'personal':
        return renderPersonalInfo();
      case 'football':
        return renderFootballDetails();
      case 'privacy':
        return renderPrivacySettings();
      default:
        return renderPersonalInfo();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <StatusBar barStyle="light-content" backgroundColor="#000000" />

        <View style={styles.content}>
          {/* Header */}
          <View style={styles.headerContainer}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <Text style={styles.backButtonText}>← Back</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Edit Profile</Text>
            <TouchableOpacity
              style={[styles.saveButton, isSaving && styles.saveButtonDisabled]}
              onPress={handleSave}
              disabled={isSaving}
            >
              <Text style={styles.saveButtonText}>
                {isSaving ? 'Saving...' : 'Save'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Profile Image Section */}
          <View style={styles.imageSection}>
            <TouchableOpacity
              style={styles.imageUploadContainer}
              onPress={handleImageUpload}
              disabled={isUploading}
            >
              {profileImage ? (
                <View style={styles.profileImageContainer}>
                  <View style={styles.profileImagePlaceholder}>
                    <Image
                      source={{ uri: profileImage }}
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 50,
                      }}
                    />
                  </View>
                  <View style={styles.imageEditBadge}>
                    <Text style={styles.imageEditIcon}>📷</Text>
                  </View>
                </View>
              ) : (
                <View style={styles.imagePlaceholder}>
                  <Text style={styles.imagePlaceholderIcon}>📸</Text>
                  <Text style={styles.imagePlaceholderText}>
                    {isUploading ? 'Uploading...' : 'Change Photo'}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
            <Text style={styles.imageHint}>Tap to change profile picture</Text>
          </View>

          {/* Section Tabs */}
          <View style={styles.sectionTabs}>
            {sections.map(section => (
              <TouchableOpacity
                key={section.id}
                style={[
                  styles.sectionTab,
                  activeSection === section.id && styles.sectionTabActive,
                ]}
                onPress={() => setActiveSection(section.id)}
              >
                <Text style={styles.sectionTabIcon}>{section.icon}</Text>
                <Text
                  style={[
                    styles.sectionTabLabel,
                    activeSection === section.id &&
                      styles.sectionTabLabelActive,
                  ]}
                >
                  {section.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Form Content */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.formContainer}
          >
            {renderSection()}
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  content: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 40 : 20,
  },
  // Header Styles
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
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
  saveButton: {
    backgroundColor: '#22C35D',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  saveButtonDisabled: {
    opacity: 0.5,
  },
  saveButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  // Image Section
  imageSection: {
    alignItems: 'center',
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  imageUploadContainer: {
    alignItems: 'center',
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#1A1A1A',
    borderWidth: 2,
    borderColor: '#22C35D',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholderIcon: {
    fontSize: 30,
    marginBottom: 4,
  },
  imagePlaceholderText: {
    fontSize: 11,
    color: '#22C35D',
  },
  profileImageContainer: {
    position: 'relative',
  },
  profileImagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#22C35D20',
    borderWidth: 2,
    borderColor: '#22C35D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImageEmoji: {
    fontSize: 48,
  },
  imageEditBadge: {
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
  imageEditIcon: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  imageHint: {
    fontSize: 12,
    color: '#666666',
    marginTop: 12,
  },
  // Section Tabs
  sectionTabs: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  sectionTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#1A1A1A',
    marginHorizontal: 4,
  },
  sectionTabActive: {
    backgroundColor: '#22C35D20',
    borderWidth: 1,
    borderColor: '#22C35D',
  },
  sectionTabIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  sectionTabLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#888888',
  },
  sectionTabLabelActive: {
    color: '#22C35D',
  },
  // Form Container
  formContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  sectionContent: {
    paddingTop: 24,
  },
  // Input Styles
  inputWrapper: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#CCCCCC',
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    paddingHorizontal: 16,
    minHeight: 56,
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
    height: '100%',
  },
  textAreaContainer: {
    alignItems: 'flex-start',
    paddingVertical: 12,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  charCount: {
    fontSize: 11,
    color: '#666666',
    textAlign: 'right',
    marginTop: 4,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  // Options Styles
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  optionButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#1A1A1A',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  optionButtonActive: {
    backgroundColor: '#22C35D20',
    borderColor: '#22C35D',
  },
  optionButtonText: {
    fontSize: 14,
    color: '#888888',
    fontWeight: '500',
  },
  optionButtonTextActive: {
    color: '#22C35D',
  },
  // Stats Preview
  statsPreview: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 16,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  statsPreviewTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#22C35D',
    marginBottom: 12,
  },
  statsPreviewGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statPreviewItem: {
    alignItems: 'center',
  },
  statPreviewValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  statPreviewLabel: {
    fontSize: 11,
    color: '#888888',
  },
  // Settings Styles
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#2A2A2A',
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
    fontSize: 12,
    color: '#888888',
  },
  // Danger Zone
  dangerZone: {
    marginTop: 24,
    padding: 16,
    backgroundColor: '#FF444410',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FF4444',
  },
  dangerZoneTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FF4444',
    marginBottom: 12,
  },
  dangerButton: {
    backgroundColor: '#FF4444',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  dangerButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default EditProfile;
