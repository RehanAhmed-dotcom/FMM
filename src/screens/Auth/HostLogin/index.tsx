// LoginScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import Apple from 'react-native-vector-icons/FontAwesome';
import { RootNavigationProp } from '../../../types/navigationType';
import { useNavigation } from '@react-navigation/native';

const HostLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation<RootNavigationProp<'HostLogin'>>();
  const handleLogin = () => {
    // Handle login logic here
    // alert('Login pressed');
    navigation.navigate('MyTabs', { screen: 'Home' });
  };

  const handleForgotPassword = () => {
    // alert('Forgot Password pressed');
    navigation.navigate('EmailAndCode');
  };

  const handleGoogleLogin = () => {
    // alert('Google Login pressed');
  };

  const handleAppleLogin = () => {
    // alert('Apple Login pressed');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <StatusBar barStyle="light-content" backgroundColor="#000000" />

        <View style={styles.content}>
          {/* Header Section */}
          <View style={styles.headerContainer}>
            <View style={styles.logoContainer}>
              <View style={styles.logo}>
                <Text style={styles.logoText}>⚡</Text>
              </View>
            </View>
            <Text style={styles.welcomeText}>Welcome Back</Text>
            <Text style={styles.subtitleText}>
              Sign in to continue your journey
            </Text>
          </View>

          <ScrollView>
            {/* Form Section */}
            <View style={styles.formContainer}>
              {/* Email/Phone Input */}
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Email or Phone</Text>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputIcon}>📧</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your email or phone"
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
                    placeholder="Enter your password"
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
              </View>

              {/* Forgot Password */}
              <TouchableOpacity
                style={styles.forgotPasswordContainer}
                onPress={handleForgotPassword}
              >
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>

              {/* Login Button */}
              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleLogin}
              >
                <Text style={styles.loginButtonText}>Sign In</Text>
              </TouchableOpacity>

              {/* Divider */}
              <View style={styles.dividerContainer}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>OR</Text>
                <View style={styles.dividerLine} />
              </View>

              {/* Social Login Section */}
              <View style={styles.socialContainer}>
                <TouchableOpacity
                  style={[styles.socialButton, styles.googleButton]}
                  onPress={handleGoogleLogin}
                >
                  <View style={styles.socialIconContainer}>
                    <Apple name={'google'} size={20} color={'white'} />
                  </View>
                  <Text style={styles.socialButtonText}>
                    Continue with Google
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.socialButton, styles.appleButton]}
                  onPress={handleAppleLogin}
                >
                  <View style={styles.socialIconContainer}>
                    <Apple name={'apple'} size={20} color={'white'} />
                  </View>
                  <Text style={styles.socialButtonText}>
                    Continue with Apple
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Sign Up Link */}
              <View style={styles.signupContainer}>
                <Text style={styles.signupText}>Don't have an account? </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('HostSignup')}
                >
                  <Text style={styles.signupLink}>Sign Up</Text>
                </TouchableOpacity>
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
    alignItems: 'center',
    marginBottom: 48,
  },
  logoContainer: {
    marginBottom: 24,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#22C35D20',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#22C35D40',
  },
  logoText: {
    fontSize: 40,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitleText: {
    fontSize: 15,
    color: '#888888',
    textAlign: 'center',
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
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: 32,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#22C35D',
    fontWeight: '600',
  },
  loginButton: {
    backgroundColor: '#22C35D',
    borderRadius: 16,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#22C35D',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  // Divider Styles
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
  // Social Login Styles
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
  googleButton: {
    // Specific Google styles if needed
  },
  appleButton: {
    // Specific Apple styles if needed
  },
  socialIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#222222',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  socialIcon: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  socialButtonText: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    marginRight: 32,
  },
  // Sign Up Styles
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  signupText: {
    color: '#888888',
    fontSize: 14,
  },
  signupLink: {
    color: '#22C35D',
    fontSize: 14,
    fontWeight: '700',
  },
});

export default HostLogin;
