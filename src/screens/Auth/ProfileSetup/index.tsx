// ProfileSetupScreen.js
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
  FlatList,
  Image,
  ScrollView,
} from 'react-native';
import { RootNavigationProp } from '../../../types/navigationType';
import ImagePicker from 'react-native-image-crop-picker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const ProfileSetup = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const navigation = useNavigation<RootNavigationProp<'ProfileSetup'>>();
  const [skillLevel, setSkillLevel] = useState('');
  const [preferredPosition, setPreferredPosition] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [image, setImage] = useState('');
  const skillLevels = [
    { id: '1', label: 'Beginner', value: 'beginner', icon: '🌱' },
    { id: '2', label: 'Intermediate', value: 'intermediate', icon: '⚡' },
    { id: '3', label: 'Pro', value: 'pro', icon: '🏆' },
  ];

  const positions = [
    { id: '1', label: 'Goalkeeper', value: 'goalkeeper', icon: '🧤' },
    { id: '2', label: 'Defender', value: 'defender', icon: '🛡️' },
    { id: '3', label: 'Midfielder', value: 'midfielder', icon: '⚙️' },
    { id: '4', label: 'Striker', value: 'striker', icon: '⚽' },
    { id: '5', label: 'Winger', value: 'winger', icon: '💨' },
  ];

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

  const handleContinue = () => {
    // if (!profileImage) {
    //   alert('Please upload a profile image');
    //   return;
    // }
    // if (!name.trim()) {
    //   alert('Please enter your name');
    //   return;
    // }
    // if (!age) {
    //   alert('Please enter your age');
    //   return;
    // }
    // if (!skillLevel) {
    //   alert('Please select your skill level');
    //   return;
    // }
    // if (!preferredPosition) {
    //   alert('Please select your preferred position');
    //   return;
    // }
    // alert('Profile setup complete!');
    navigation.navigate('MyTabs', { screen: 'Home' });
  };

  const renderSkillItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.skillCard,
        skillLevel === item.value && styles.skillCardActive,
      ]}
      onPress={() => setSkillLevel(item.value)}
    >
      <Text style={styles.skillIcon}>{item.icon}</Text>
      <Text
        style={[
          styles.skillLabel,
          skillLevel === item.value && styles.skillLabelActive,
        ]}
      >
        {item.label}
      </Text>
    </TouchableOpacity>
  );

  const renderPositionItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.positionCard,
        preferredPosition === item.value && styles.positionCardActive,
      ]}
      onPress={() => setPreferredPosition(item.value)}
    >
      <Text style={styles.positionIcon}>{item.icon}</Text>
      <Text
        style={[
          styles.positionLabel,
          preferredPosition === item.value && styles.positionLabelActive,
        ]}
      >
        {item.label}
      </Text>
    </TouchableOpacity>
  );
  const { top } = useSafeAreaInsets();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <StatusBar barStyle="light-content" backgroundColor="#000000" />

        <View style={[styles.content, { paddingTop: top }]}>
          {/* Header Section */}
          <TouchableOpacity style={styles.backButton}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <ScrollView>
            <View style={styles.headerContainer}>
              {/* <View style={styles.progressContainer}>
              <View style={styles.progressStep}>
                <View style={[styles.progressDot, styles.progressDotActive]}>
                  <Text style={styles.progressDotText}>1</Text>
                </View>
                <View
                  style={[styles.progressLine, styles.progressLineActive]}
                />
                <View style={styles.progressDot}>
                  <Text style={styles.progressDotText}>2</Text>
                </View>
                <View style={styles.progressLine} />
                <View style={styles.progressDot}>
                  <Text style={styles.progressDotText}>3</Text>
                </View>
              </View>
              <Text style={styles.progressText}>Step 1 of 3: Basic Info</Text>
            </View> */}

              <Text style={styles.title}>Complete Your Profile</Text>
              <Text style={styles.description}>
                Tell us about yourself to connect with the right matches
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
                        style={{ width: 100, height: 100, borderRadius: 50 }}
                      />
                      {/* <Text style={styles.profileImageEmoji}>👤</Text> */}
                    </View>
                    <TouchableOpacity
                      onPress={handleImageUpload}
                      style={styles.editBadge}
                    >
                      <Text style={styles.editBadgeText}>✎</Text>
                    </TouchableOpacity>
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
            </View>

            {/* Form Fields */}
            <View style={styles.formContainer}>
              {/* Name Input */}
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Full Name</Text>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputIcon}>👤</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your full name"
                    placeholderTextColor="#666666"
                    value={name}
                    onChangeText={setName}
                    autoCapitalize="words"
                    autoCorrect={false}
                  />
                </View>
              </View>

              {/* Age Input */}
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Age</Text>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputIcon}>🎂</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your age"
                    placeholderTextColor="#666666"
                    value={age}
                    onChangeText={setAge}
                    keyboardType="number-pad"
                    maxLength={3}
                  />
                </View>
              </View>

              {/* Skill Level Selection */}
              <View style={styles.selectionWrapper}>
                <Text style={styles.inputLabel}>Skill Level</Text>
                <FlatList
                  data={skillLevels}
                  renderItem={renderSkillItem}
                  keyExtractor={item => item.id}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.skillsList}
                />
              </View>

              {/* Preferred Position Selection */}
              <View style={styles.selectionWrapper}>
                <Text style={styles.inputLabel}>Preferred Position</Text>
                <FlatList
                  data={positions}
                  renderItem={renderPositionItem}
                  keyExtractor={item => item.id}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.positionsList}
                />
              </View>

              {/* Continue Button */}
              <TouchableOpacity
                style={styles.continueButton}
                onPress={handleContinue}
              >
                <Text style={styles.continueButtonText}>Continue →</Text>
              </TouchableOpacity>
            </View>
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
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 40 : 20,
    paddingBottom: 30,
  },
  // Header Styles
  headerContainer: {
    marginBottom: 32,
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
  progressContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  progressStep: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
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
    width: 40,
    height: 2,
    backgroundColor: '#2A2A2A',
    marginHorizontal: 8,
  },
  progressLineActive: {
    backgroundColor: '#22C35D',
  },
  progressText: {
    fontSize: 12,
    color: '#888888',
    textAlign: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  description: {
    fontSize: 14,
    color: '#888888',
    lineHeight: 20,
  },
  // Image Upload Styles
  imageUploadContainer: {
    alignItems: 'center',
    marginBottom: 32,
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
    borderColor: '#2A2A2A',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
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
    fontSize: 48,
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
  uploadIcon: {
    fontSize: 36,
    marginBottom: 8,
  },
  uploadText: {
    fontSize: 12,
    color: '#22C35D',
    fontWeight: '600',
    marginBottom: 4,
  },
  uploadSubtext: {
    fontSize: 10,
    color: '#666666',
  },
  // Form Styles
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
    height: '100%',
  },
  selectionWrapper: {
    marginBottom: 24,
  },
  skillsList: {
    gap: 12,
  },
  skillCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    marginRight: 12,
  },
  skillCardActive: {
    backgroundColor: '#22C35D20',
    borderColor: '#22C35D',
  },
  skillIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  skillLabel: {
    fontSize: 14,
    color: '#CCCCCC',
    fontWeight: '500',
  },
  skillLabelActive: {
    color: '#22C35D',
  },
  positionsList: {
    gap: 12,
  },
  positionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    marginRight: 12,
  },
  positionCardActive: {
    backgroundColor: '#22C35D20',
    borderColor: '#22C35D',
  },
  positionIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  positionLabel: {
    fontSize: 14,
    color: '#CCCCCC',
    fontWeight: '500',
  },
  positionLabelActive: {
    color: '#22C35D',
  },
  // Continue Button
  continueButton: {
    backgroundColor: '#22C35D',
    borderRadius: 16,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    shadowColor: '#22C35D',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});

export default ProfileSetup;
