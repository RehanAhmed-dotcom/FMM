// HostProfileScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  TextInput,
  Switch,
  Alert,
  Modal,
  Image,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ImagePicker from 'react-native-image-crop-picker';
import { useNavigation } from '@react-navigation/native';
import { RootNavigationProp } from '../../../types/navigationType';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// ==================== HOST PROFILE SCREEN ====================
const HostProfileScreen = ({ onEditPress, onLogout }) => {
  const { top } = useSafeAreaInsets();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigation = useNavigation<RootNavigationProp<'HostTabs'>>();
  const [profileData] = useState({
    fullName: 'John Doe',
    username: '@johndoe_host',
    email: 'john.doe@example.com',
    phone: '+1 (555) 234-5678',
    cnic: '12345-1234567-1',
    groundName: 'Central Park Field',
    city: 'New York, USA',
    bio: 'Professional football organizer with 5+ years of experience. Passionate about creating amazing match experiences.',
    joinDate: 'Joined March 2024',
    totalMatches: 47,
    totalEarnings: 3840,
    totalPlayers: 312,
    rating: 4.8,
    verified: true,
    avatar: '🧑‍💼',
  });

  const stats = [
    { label: 'Matches', value: profileData.totalMatches, icon: '🏟️' },
    { label: 'Earnings', value: `$${profileData.totalEarnings}`, icon: '💰' },
    { label: 'Players', value: profileData.totalPlayers, icon: '👥' },
    { label: 'Rating', value: `${profileData.rating} ★`, icon: '⭐' },
  ];

  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
    if (onLogout) onLogout();
    navigation.navigate('HostLogin');
    // Alert.alert('Logged Out', 'You have been successfully logged out.');
  };

  const LogoutModal = ({ navigation }) => (
    <Modal
      visible={showLogoutModal}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setShowLogoutModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.logoutModal}>
          <View style={styles.logoutIconContainer}>
            <Text style={styles.logoutIcon}>🚪</Text>
          </View>
          <Text style={styles.logoutTitle}>Logout?</Text>
          <Text style={styles.logoutDescription}>
            Are you sure you want to logout? You will need to login again to
            access your host dashboard.
          </Text>
          <View style={styles.logoutWarning}>
            <Text style={styles.logoutWarningIcon}>⚠️</Text>
            <Text style={styles.logoutWarningText}>
              Unsaved changes will be lost
            </Text>
          </View>
          <View style={styles.logoutActions}>
            <TouchableOpacity
              style={styles.logoutCancelButton}
              onPress={() => {
                setShowLogoutModal(false);
                navigation.navigate('HostLogin');
              }}
            >
              <Text style={styles.logoutCancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.logoutConfirmButton}
              onPress={handleConfirmLogout}
            >
              <Text style={styles.logoutConfirmText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity style={styles.editButton} onPress={onEditPress}>
            <Text style={styles.editButtonText}>✎ Edit</Text>
          </TouchableOpacity>
        </View>

        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <AntDesign name="user" size={36} color={'white'} />
              {/* <Text style={styles.avatarEmoji}>{profileData.avatar}</Text> */}
            </View>
            {profileData.verified && (
              <View style={styles.verifiedBadge}>
                <Text style={styles.verifiedIcon}>✓</Text>
              </View>
            )}
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{profileData.fullName}</Text>
            <Text style={styles.profileUsername}>{profileData.username}</Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingStar}>⭐</Text>
              <Text style={styles.ratingText}>{profileData.rating}</Text>
              <Text style={styles.ratingLabel}>Host Rating</Text>
            </View>
          </View>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <Text style={styles.statIcon}>{stat.icon}</Text>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Info Sections */}
        <View style={styles.infoCard}>
          <Text style={styles.infoCardTitle}>📋 Personal Information</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>📧 Email</Text>
            <Text style={styles.infoValue}>{profileData.email}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>📱 Phone</Text>
            <Text style={styles.infoValue}>{profileData.phone}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>🪪 CNIC/ID</Text>
            <Text style={styles.infoValue}>{profileData.cnic}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>📍 Location</Text>
            <Text style={styles.infoValue}>{profileData.city}</Text>
          </View>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoCardTitle}>🏟️ Host Information</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>🎯 Ground Name</Text>
            <Text style={styles.infoValue}>{profileData.groundName}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>📅 Member Since</Text>
            <Text style={styles.infoValue}>{profileData.joinDate}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>✅ Verified Host</Text>
            <View style={styles.verifiedStatus}>
              <Text style={styles.verifiedStatusIcon}>✓</Text>
              <Text style={styles.verifiedStatusText}>Verified</Text>
            </View>
          </View>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoCardTitle}>📝 Bio</Text>
          <Text style={styles.bioText}>{profileData.bio}</Text>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => setShowLogoutModal(true)}
        >
          <Text style={styles.logoutButtonIcon}>🚪</Text>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>

        <View style={styles.bottomSpacing} />
      </ScrollView>

      <LogoutModal />
    </View>
  );
};

// ==================== EDIT PROFILE SCREEN ====================
const EditProfileScreen = ({ profileData, onSave, onBack }) => {
  const [formData, setFormData] = useState({
    fullName: profileData.fullName,
    username: profileData.username,
    email: profileData.email,
    phone: profileData.phone,
    cnic: profileData.cnic,
    groundName: profileData.groundName,
    city: profileData.city,
    bio: profileData.bio,
  });
  const [userImage, setUserImage] = useState('');
  console.log('userImage', userImage);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

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
    handleChange('cnic', formatted.slice(0, 15));
  };

  const handleSave = () => {
    // if (!formData.fullName.trim()) {
    //   // Alert.alert('Error', 'Please enter your full name');
    //   return;
    // }
    // if (!formData.email.trim()) {
    //   Alert.alert('Error', 'Please enter your email');
    //   return;
    // }
    // if (!formData.phone.trim()) {
    //   Alert.alert('Error', 'Please enter your phone number');
    //   return;
    // }
    // if (!formData.cnic.trim() || formData.cnic.replace(/-/g, '').length < 13) {
    //   Alert.alert('Error', 'Please enter a valid CNIC number');
    //   return;
    // }

    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      onSave(formData);
      // Alert.alert('Success', 'Profile updated successfully!');
    }, 1500);
  };
  const picker = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setUserImage(image.path);
      // console.log(image);
    });
  };
  const { top } = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      <View style={[styles.header, { paddingHorizontal: 10 }]}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <TouchableOpacity
          style={styles.saveHeaderButton}
          onPress={handleSave}
          disabled={isSaving}
        >
          <Text style={styles.saveHeaderButtonText}>
            {isSaving ? 'Saving...' : 'Save'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.editContent}
      >
        {/* Avatar Section */}
        <View style={styles.avatarEditSection}>
          <View style={styles.avatarEditContainer}>
            <View style={styles.avatarEdit}>
              {userImage ? (
                <Image
                  source={{ uri: userImage }}
                  style={{ height: 100, width: 100, borderRadius: 50 }}
                />
              ) : (
                <AntDesign name="user" size={48} color={'white'} />
              )}

              {/* <Text style={styles.avatarEditEmoji}>🧑‍💼</Text> */}
            </View>
            <TouchableOpacity
              onPress={() => picker()}
              style={styles.changePhotoButton}
            >
              <Text style={styles.changePhotoText}>📷 Change Photo</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Personal Information */}
        <Text style={styles.sectionTitle}>Personal Information</Text>

        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>Full Name *</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.inputIcon}>👤</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your full name"
              placeholderTextColor="#666666"
              value={formData.fullName}
              onChangeText={text => handleChange('fullName', text)}
            />
          </View>
        </View>

        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>Username</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.inputIcon}>@</Text>
            <TextInput
              style={styles.input}
              placeholder="username"
              placeholderTextColor="#666666"
              value={formData.username}
              onChangeText={text => handleChange('username', text)}
              autoCapitalize="none"
            />
          </View>
        </View>

        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>Email *</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.inputIcon}>📧</Text>
            <TextInput
              style={styles.input}
              placeholder="email@example.com"
              placeholderTextColor="#666666"
              value={formData.email}
              onChangeText={text => handleChange('email', text)}
              keyboardType="email-address"
              autoCapitalize="none"
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
              value={formData.phone}
              onChangeText={text => handleChange('phone', text)}
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
              value={formData.cnic}
              onChangeText={formatCNIC}
              keyboardType="numeric"
              maxLength={15}
            />
          </View>
          <Text style={styles.hintText}>For verification purposes</Text>
        </View>

        {/* Host Information */}
        <Text style={[styles.sectionTitle, styles.sectionTitleMargin]}>
          Host Information
        </Text>

        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>Ground Name</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.inputIcon}>🏟️</Text>
            <TextInput
              style={styles.input}
              placeholder="Your ground or venue name"
              placeholderTextColor="#666666"
              value={formData.groundName}
              onChangeText={text => handleChange('groundName', text)}
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
              value={formData.city}
              onChangeText={text => handleChange('city', text)}
            />
          </View>
        </View>

        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>Bio</Text>
          <View style={[styles.inputContainer, styles.textAreaContainer]}>
            <Text style={styles.inputIcon}>📝</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Tell players about yourself and your hosting experience"
              placeholderTextColor="#666666"
              value={formData.bio}
              onChangeText={text => handleChange('bio', text)}
              multiline
              numberOfLines={4}
              maxLength={200}
            />
          </View>
          <Text style={styles.charCount}>{formData.bio.length}/200</Text>
        </View>

        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
          disabled={isSaving}
        >
          <Text style={styles.saveButtonText}>
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Text>
        </TouchableOpacity>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );
};

// ==================== MAIN COMPONENT ====================
const HostProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: 'John Doe',
    username: '@johndoe_host',
    email: 'john.doe@example.com',
    phone: '+1 (555) 234-5678',
    cnic: '12345-1234567-1',
    groundName: 'Central Park Field',
    city: 'New York, USA',
    bio: 'Professional football organizer with 5+ years of experience. Passionate about creating amazing match experiences.',
    joinDate: 'Joined March 2024',
    totalMatches: 47,
    totalEarnings: 3840,
    totalPlayers: 312,
    rating: 4.8,
    verified: true,
    avatar: '🧑‍💼',
  });

  const handleEditPress = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = updatedData => {
    setProfileData(prev => ({ ...prev, ...updatedData }));
    setIsEditing(false);
  };

  const handleBack = () => {
    setIsEditing(false);
  };

  const handleLogout = () => {
    // Navigate to login screen
  };

  if (isEditing) {
    return (
      <EditProfileScreen
        profileData={profileData}
        onSave={handleSaveProfile}
        onBack={handleBack}
      />
    );
  }

  return (
    <HostProfileScreen onEditPress={handleEditPress} onLogout={handleLogout} />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 30,
  },
  editContent: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 20 : 20,
    paddingBottom: 30,
  },
  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  editButton: {
    backgroundColor: '#22C35D20',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#22C35D',
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
  saveHeaderButton: {
    backgroundColor: '#22C35D',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
  },
  saveHeaderButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  // Profile Header
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
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
    fontSize: 42,
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#22C35D',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#000000',
  },
  verifiedIcon: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  profileUsername: {
    fontSize: 13,
    color: '#22C35D',
    marginBottom: 6,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  ratingStar: {
    fontSize: 12,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFD700',
  },
  ratingLabel: {
    fontSize: 11,
    color: '#888888',
  },
  // Stats Grid
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    minWidth: '22%',
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  statIcon: {
    fontSize: 22,
    marginBottom: 6,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#22C35D',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 10,
    color: '#888888',
  },
  // Info Cards
  infoCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  infoCardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#22C35D',
    marginBottom: 14,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 13,
    color: '#888888',
  },
  infoValue: {
    fontSize: 13,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  verifiedStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#22C35D20',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  verifiedStatusIcon: {
    fontSize: 10,
    color: '#22C35D',
  },
  verifiedStatusText: {
    fontSize: 11,
    color: '#22C35D',
    fontWeight: '600',
  },
  bioText: {
    fontSize: 14,
    color: '#CCCCCC',
    lineHeight: 22,
  },
  // Logout Button
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF444410',
    borderRadius: 16,
    paddingVertical: 14,
    marginTop: 16,
    gap: 10,
    borderWidth: 1,
    borderColor: '#FF444430',
  },
  logoutButtonIcon: {
    fontSize: 18,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF4444',
  },
  // Edit Form Styles
  avatarEditSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarEditContainer: {
    alignItems: 'center',
  },
  avatarEdit: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#22C35D20',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#22C35D',
    marginBottom: 12,
  },
  avatarEditEmoji: {
    fontSize: 52,
  },
  changePhotoButton: {
    backgroundColor: '#1A1A1A',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  changePhotoText: {
    fontSize: 12,
    color: '#22C35D',
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  sectionTitleMargin: {
    marginTop: 8,
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
  },
  textAreaContainer: {
    alignItems: 'flex-start',
    paddingVertical: 12,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  hintText: {
    fontSize: 10,
    color: '#666666',
    marginTop: 4,
    marginLeft: 4,
  },
  charCount: {
    fontSize: 11,
    color: '#888888',
    textAlign: 'right',
    marginTop: 4,
  },
  saveButton: {
    backgroundColor: '#22C35D',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  bottomSpacing: {
    height: 30,
  },
  // Logout Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logoutModal: {
    backgroundColor: '#1A1A1A',
    borderRadius: 24,
    padding: 24,
    width: '100%',
    maxWidth: 340,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF4444',
  },
  logoutIconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#FF444420',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoutIcon: {
    fontSize: 36,
  },
  logoutTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FF4444',
    marginBottom: 12,
    textAlign: 'center',
  },
  logoutDescription: {
    fontSize: 14,
    color: '#CCCCCC',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
  },
  logoutWarning: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF444410',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    marginBottom: 24,
  },
  logoutWarningIcon: {
    fontSize: 12,
    marginRight: 8,
  },
  logoutWarningText: {
    fontSize: 11,
    color: '#FF8888',
  },
  logoutActions: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  logoutCancelButton: {
    flex: 1,
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  logoutCancelText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#888888',
  },
  logoutConfirmButton: {
    flex: 1,
    backgroundColor: '#FF4444',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  logoutConfirmText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default HostProfile;
