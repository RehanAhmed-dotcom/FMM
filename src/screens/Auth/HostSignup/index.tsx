// HostSignupScreen.js
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
} from 'react-native';
import { RootNavigationProp } from '../../../types/navigationType';

const HostSignup = () => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
const navigation = useNavigation<RootNavigationProp<"HostSignup">>();
  const handleSignup = () => {
    if (!fullName.trim()) {
      alert('Please enter your full name');
      return;
    }
    if (!phone.trim()) {
      alert('Please enter your phone number');
      return;
    }
    if (!email.trim()) {
      alert('Please enter your email address');
      return;
    }
    if (!password) {
      alert('Please create a password');
      return;
    }
    if (password.length < 8) {
      alert('Password must be at least 8 characters');
      return;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    if (!agreeToTerms) {
      alert('Please agree to the Terms & Conditions');
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate('HostProfileSetup')
      // if (onSignup) onSignup('host');
    }, 1500);
  };

  const handleGoogleSignup = () => {
    alert('Google Sign Up - Redirecting...');
    // if (onSocialSignup) onSocialSignup('google');
  };

  const handleAppleSignup = () => {
    alert('Apple Sign Up - Redirecting...');
    // if (onSocialSignup) onSocialSignup('apple');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <StatusBar barStyle="light-content" backgroundColor="#000000" />

        {/* Background decorative elements */}
        <View style={styles.bgDecoration1} />
        <View style={styles.bgDecoration2} />
        <View style={styles.bgDecoration3} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.content}>
            {/* Header Section */}
            <View style={styles.headerContainer}>
              <TouchableOpacity style={styles.backButton}>
                <Text style={styles.backButtonText}>← Back</Text>
              </TouchableOpacity>

              <View style={styles.logoContainer}>
                <View style={styles.logoInner}>
                  <Text style={styles.logoEmoji}>🧑‍💼</Text>
                </View>
                <View style={styles.logoRing} />
                <View style={styles.logoBadge}>
                  <Text style={styles.logoBadgeText}>HOST</Text>
                </View>
              </View>

              <Text style={styles.title}>Create Host Account</Text>
              <Text style={styles.subtitle}>
                Join as a host to create matches, manage events, and earn
                rewards
              </Text>
            </View>

            {/* Form Section */}
            <View style={styles.formContainer}>
              {/* Full Name Input */}
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Full Name</Text>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputIcon}>👤</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="John Doe"
                    placeholderTextColor="#666666"
                    value={fullName}
                    onChangeText={setFullName}
                    autoCapitalize="words"
                    autoCorrect={false}
                  />
                </View>
              </View>

              {/* Phone Input */}
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Phone Number</Text>
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

              {/* Email Input */}
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Email Address</Text>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputIcon}>📧</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="host@example.com"
                    placeholderTextColor="#666666"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>
              </View>

              {/* Password Input */}
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Password</Text>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputIcon}>🔒</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Create a password"
                    placeholderTextColor="#666666"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.eyeIcon}
                  >
                    <Text style={styles.eyeIconText}>
                      {showPassword ? '👁️' : '👁️‍🗨️'}
                    </Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.passwordHint}>
                  Must be at least 8 characters
                </Text>
              </View>

              {/* Confirm Password Input */}
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Confirm Password</Text>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputIcon}>✓</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Confirm your password"
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
              </View>

              {/* Terms & Conditions */}
              <TouchableOpacity
                style={styles.termsContainer}
                onPress={() => setAgreeToTerms(!agreeToTerms)}
              >
                <View
                  style={[
                    styles.checkbox,
                    agreeToTerms && styles.checkboxChecked,
                  ]}
                >
                  {agreeToTerms && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text style={styles.termsText}>
                  I agree to the{' '}
                  <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
                  <Text style={styles.termsLink}>Privacy Policy</Text>
                </Text>
              </TouchableOpacity>

              {/* Register Button */}
              <TouchableOpacity
                style={[
                  styles.registerButton,
                  isLoading && styles.registerButtonDisabled,
                ]}
                onPress={handleSignup}
                disabled={isLoading}
              >
                <Text style={styles.registerButtonText}>
                  {isLoading ? 'Creating Account...' : 'Register as Host'}
                </Text>
              </TouchableOpacity>

              {/* Divider */}
              <View style={styles.dividerContainer}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>OR</Text>
                <View style={styles.dividerLine} />
              </View>

              {/* Social Signup Section */}
              <View style={styles.socialContainer}>
                <TouchableOpacity
                  style={[styles.socialButton, styles.googleButton]}
                  onPress={handleGoogleSignup}
                >
                  <View style={styles.socialIconContainer}>
                    <Text style={styles.googleIcon}>G</Text>
                  </View>
                  <Text style={styles.socialButtonText}>
                    Sign up with Google
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.socialButton, styles.appleButton]}
                  onPress={handleAppleSignup}
                >
                  <View style={styles.socialIconContainer}>
                    <Text style={styles.appleIcon}></Text>
                  </View>
                  <Text style={styles.socialButtonText}>
                    Sign up with Apple
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Host Benefits Preview */}
              <View style={styles.hostBenefits}>
                <Text style={styles.hostBenefitsTitle}>
                  🎯 What you get as a Host
                </Text>
                <View style={styles.hostBenefitsList}>
                  <View style={styles.hostBenefit}>
                    <Text style={styles.hostBenefitIcon}>🏟️</Text>
                    <Text style={styles.hostBenefitText}>
                      Create unlimited matches & tournaments
                    </Text>
                  </View>
                  <View style={styles.hostBenefit}>
                    <Text style={styles.hostBenefitIcon}>💰</Text>
                    <Text style={styles.hostBenefitText}>
                      Earn commission from entry fees
                    </Text>
                  </View>
                  <View style={styles.hostBenefit}>
                    <Text style={styles.hostBenefitIcon}>📊</Text>
                    <Text style={styles.hostBenefitText}>
                      Advanced analytics & insights
                    </Text>
                  </View>
                  <View style={styles.hostBenefit}>
                    <Text style={styles.hostBenefitIcon}>⭐</Text>
                    <Text style={styles.hostBenefitText}>
                      Build your reputation & grow community
                    </Text>
                  </View>
                </View>
              </View>

              {/* Login Link */}
              <View style={styles.loginContainer}>
                <Text style={styles.loginText}>
                  Already have a host account?{' '}
                </Text>
                <TouchableOpacity onPress={() => alert('Switch to Login')}>
                  <Text style={styles.loginLink}>Sign In</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollContent: {
    flexGrow: 1,
  },
  // Background Decorations
  bgDecoration1: {
    position: 'absolute',
    top: -100,
    right: -80,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: '#22C35D08',
  },
  bgDecoration2: {
    position: 'absolute',
    bottom: -50,
    left: -50,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#22C35D05',
  },
  bgDecoration3: {
    position: 'absolute',
    top: '30%',
    right: -40,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#22C35D08',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 30,
  },
  // Header Styles
  headerContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 16,
    color: '#22C35D',
    fontWeight: '600',
  },
  logoContainer: {
    marginBottom: 20,
    position: 'relative',
  },
  logoInner: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#22C35D20',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#22C35D',
  },
  logoEmoji: {
    fontSize: 46,
  },
  logoRing: {
    position: 'absolute',
    top: -8,
    left: -8,
    right: -8,
    bottom: -8,
    borderRadius: 53,
    borderWidth: 1,
    borderColor: '#22C35D40',
  },
  logoBadge: {
    position: 'absolute',
    bottom: -8,
    right: -8,
    backgroundColor: '#22C35D',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  logoBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: '#888888',
    textAlign: 'center',
    lineHeight: 20,
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
  eyeIcon: {
    padding: 8,
  },
  eyeIconText: {
    fontSize: 18,
    color: '#888888',
  },
  passwordHint: {
    fontSize: 11,
    color: '#666666',
    marginTop: 6,
    marginLeft: 4,
  },
  // Terms Container
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
    marginTop: 4,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#22C35D',
    backgroundColor: 'transparent',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#22C35D',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  termsText: {
    flex: 1,
    fontSize: 13,
    color: '#888888',
    lineHeight: 18,
  },
  termsLink: {
    color: '#22C35D',
    fontWeight: '600',
  },
  // Register Button
  registerButton: {
    backgroundColor: '#22C35D',
    borderRadius: 16,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#22C35D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  registerButtonDisabled: {
    opacity: 0.6,
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  // Divider
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#2A2A2A',
  },
  dividerText: {
    color: '#666666',
    paddingHorizontal: 16,
    fontSize: 14,
    fontWeight: '500',
  },
  // Social Login
  socialContainer: {
    gap: 12,
    marginBottom: 24,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    height: 56,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  socialIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#222222',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  googleIcon: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  appleIcon: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  socialButtonText: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    marginRight: 48,
  },
  // Host Benefits
  hostBenefits: {
    backgroundColor: '#1A1A1A',
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#22C35D20',
  },
  hostBenefitsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#22C35D',
    marginBottom: 16,
  },
  hostBenefitsList: {
    gap: 14,
  },
  hostBenefit: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  hostBenefitIcon: {
    fontSize: 18,
  },
  hostBenefitText: {
    flex: 1,
    fontSize: 13,
    color: '#CCCCCC',
    lineHeight: 18,
  },
  // Login Link
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 20,
  },
  loginText: {
    color: '#888888',
    fontSize: 14,
  },
  loginLink: {
    color: '#22C35D',
    fontSize: 14,
    fontWeight: '700',
  },
});

export default HostSignup;
