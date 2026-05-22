// NewPasswordScreen.js
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
  ScrollView,
} from 'react-native';
import { RootNavigationProp } from '../../../types/navigationType';

const NewPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation<RootNavigationProp<'NewPassword'>>();
  // Password strength criteria
  const [hasMinLength, setHasMinLength] = useState(false);
  const [hasUppercase, setHasUppercase] = useState(false);
  const [hasLowercase, setHasLowercase] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);

  const checkPasswordStrength = password => {
    setHasMinLength(password.length >= 8);
    setHasUppercase(/[A-Z]/.test(password));
    setHasLowercase(/[a-z]/.test(password));
    setHasNumber(/[0-9]/.test(password));
    setHasSpecialChar(/[!@#$%^&*(),.?":{}|<>]/.test(password));
  };

  const handleNewPasswordChange = text => {
    setNewPassword(text);
    checkPasswordStrength(text);
  };

  const calculateStrength = () => {
    const strength = [
      hasMinLength,
      hasUppercase,
      hasLowercase,
      hasNumber,
      hasSpecialChar,
    ].filter(Boolean).length;
    if (strength <= 2) return { text: 'Weak', color: '#FF4444', width: '20%' };
    if (strength <= 3) return { text: 'Fair', color: '#FFA500', width: '40%' };
    if (strength <= 4) return { text: 'Good', color: '#22C35D', width: '70%' };
    return { text: 'Strong', color: '#22C35D', width: '100%' };
  };

  const handleResetPassword = () => {
    if (!newPassword) {
      alert('Please enter a new password');
      return;
    }
    if (newPassword.length < 8) {
      alert('Password must be at least 8 characters');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate('Login');
    }, 1500);
  };

  const renderStrengthBar = () => {
    const strength = calculateStrength();
    return (
      <View style={styles.strengthBarContainer}>
        <View
          style={[
            styles.strengthBarFill,
            { width: strength.width, backgroundColor: strength.color },
          ]}
        />
      </View>
    );
  };

  const renderCriteriaItem = ({ item, index }) => (
    <View style={styles.criteriaItem}>
      <Text style={[styles.criteriaIcon, item.met && styles.criteriaIconMet]}>
        {item.met ? '✓' : '○'}
      </Text>
      <Text style={[styles.criteriaText, item.met && styles.criteriaTextMet]}>
        {item.text}
      </Text>
    </View>
  );

  const criteriaData = [
    { id: '1', text: 'At least 8 characters', met: hasMinLength },
    { id: '2', text: 'At least 1 uppercase letter', met: hasUppercase },
    { id: '3', text: 'At least 1 lowercase letter', met: hasLowercase },
    { id: '4', text: 'At least 1 number', met: hasNumber },
    { id: '5', text: 'At least 1 special character', met: hasSpecialChar },
  ];

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <StatusBar barStyle="light-content" backgroundColor="#000000" />

        <View style={styles.content}>
          {/* Header Section */}
          <TouchableOpacity style={styles.backButton}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <ScrollView>
            <View style={styles.headerContainer}>
              <View style={styles.iconContainer}>
                <View style={styles.iconCircle}>
                  <Text style={styles.lockIcon}>🔒</Text>
                </View>
              </View>

              <Text style={styles.title}>Create New Password</Text>
              <Text style={styles.description}>
                Your new password must be different from previously used
                passwords
              </Text>
            </View>

            {/* Form Section */}
            <View style={styles.formContainer}>
              {/* New Password Input */}
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>New Password</Text>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputIcon}>🔐</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter new password"
                    placeholderTextColor="#666666"
                    value={newPassword}
                    onChangeText={handleNewPasswordChange}
                    secureTextEntry={!showNewPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <TouchableOpacity
                    onPress={() => setShowNewPassword(!showNewPassword)}
                    style={styles.eyeIcon}
                  >
                    <Text style={styles.eyeIconText}>
                      {showNewPassword ? '👁️' : '👁️‍🗨️'}
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Password Strength Indicator */}
                {newPassword.length > 0 && (
                  <View style={styles.strengthContainer}>
                    <View style={styles.strengthHeader}>
                      <Text style={styles.strengthLabel}>
                        Password Strength
                      </Text>
                      <Text
                        style={[
                          styles.strengthText,
                          { color: calculateStrength().color },
                        ]}
                      >
                        {calculateStrength().text}
                      </Text>
                    </View>
                    {renderStrengthBar()}

                    {/* Password Criteria */}
                    <FlatList
                      data={criteriaData}
                      renderItem={renderCriteriaItem}
                      keyExtractor={item => item.id}
                      scrollEnabled={false}
                      contentContainerStyle={styles.criteriaList}
                    />
                  </View>
                )}
              </View>

              {/* Confirm Password Input */}
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Confirm Password</Text>
                <View
                  style={[
                    styles.inputContainer,
                    confirmPassword.length > 0 &&
                      newPassword !== confirmPassword &&
                      styles.inputContainerError,
                    confirmPassword.length > 0 &&
                      newPassword === confirmPassword &&
                      styles.inputContainerSuccess,
                  ]}
                >
                  <Text style={styles.inputIcon}>✓</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Confirm your new password"
                    placeholderTextColor="#666666"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={!showConfirmPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <TouchableOpacity
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={styles.eyeIcon}
                  >
                    <Text style={styles.eyeIconText}>
                      {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Password Match Indicator */}
                {confirmPassword.length > 0 && (
                  <View style={styles.matchContainer}>
                    <Text
                      style={[
                        styles.matchText,
                        newPassword === confirmPassword
                          ? styles.matchSuccess
                          : styles.matchError,
                      ]}
                    >
                      {newPassword === confirmPassword
                        ? '✓ Passwords match'
                        : '✗ Passwords do not match'}
                    </Text>
                  </View>
                )}
              </View>

              {/* Reset Password Button */}
              <TouchableOpacity
                style={[
                  styles.resetButton,
                  (isLoading ||
                    !newPassword ||
                    !confirmPassword ||
                    newPassword !== confirmPassword) &&
                    styles.resetButtonDisabled,
                ]}
                onPress={handleResetPassword}
                disabled={
                  isLoading ||
                  !newPassword ||
                  !confirmPassword ||
                  newPassword !== confirmPassword
                }
              >
                <Text style={styles.resetButtonText}>
                  {isLoading ? 'Resetting Password...' : 'Reset Password'}
                </Text>
              </TouchableOpacity>

              {/* Info Note */}
              <View style={styles.infoContainer}>
                <Text style={styles.infoIcon}>ℹ️</Text>
                <Text style={styles.infoText}>
                  After resetting your password, you'll be able to login with
                  your new credentials
                </Text>
              </View>
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
    marginBottom: 40,
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
    marginBottom: 24,
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
  lockIcon: {
    fontSize: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 12,
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  description: {
    fontSize: 15,
    color: '#888888',
    textAlign: 'center',
    lineHeight: 22,
  },
  // Form Styles
  formContainer: {
    flex: 1,
  },
  inputWrapper: {
    marginBottom: 24,
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
  inputContainerError: {
    borderColor: '#FF4444',
    borderWidth: 1,
  },
  inputContainerSuccess: {
    borderColor: '#22C35D',
    borderWidth: 1,
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
  eyeIcon: {
    padding: 8,
  },
  eyeIconText: {
    fontSize: 18,
    color: '#888888',
  },
  // Password Strength Styles
  strengthContainer: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  strengthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  strengthLabel: {
    fontSize: 12,
    color: '#888888',
    fontWeight: '600',
  },
  strengthText: {
    fontSize: 12,
    fontWeight: '700',
  },
  strengthBarContainer: {
    height: 4,
    backgroundColor: '#2A2A2A',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 12,
  },
  strengthBarFill: {
    height: '100%',
    borderRadius: 2,
  },
  criteriaList: {
    marginTop: 8,
  },
  criteriaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  criteriaIcon: {
    fontSize: 12,
    color: '#666666',
    marginRight: 8,
    width: 16,
  },
  criteriaIconMet: {
    color: '#22C35D',
  },
  criteriaText: {
    fontSize: 11,
    color: '#666666',
  },
  criteriaTextMet: {
    color: '#22C35D',
  },
  // Password Match Styles
  matchContainer: {
    marginTop: 8,
    paddingLeft: 4,
  },
  matchText: {
    fontSize: 12,
    fontWeight: '500',
  },
  matchSuccess: {
    color: '#22C35D',
  },
  matchError: {
    color: '#FF4444',
  },
  // Reset Button Styles
  resetButton: {
    backgroundColor: '#22C35D',
    borderRadius: 16,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 20,
    shadowColor: '#22C35D',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  resetButtonDisabled: {
    opacity: 0.5,
    shadowOpacity: 0,
    elevation: 0,
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  // Info Styles
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  infoIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  infoText: {
    flex: 1,
    fontSize: 12,
    color: '#888888',
    lineHeight: 18,
  },
});

export default NewPassword;
