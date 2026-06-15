// OTPVerificationScreen.js
import React, { useState, useEffect, useRef } from 'react';
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
  Modal,
  ScrollView,
} from 'react-native';
import { RootNavigationProp } from '../../../types/navigationType';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const OTPVerify = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');

  const inputRefs = useRef([]);
  const navigation = useNavigation<RootNavigationProp<'OTPVerify'>>();
  // Timer effect
  //   useEffect(() => {
  //     let timer;
  //     if (timeLeft > 0 && !canResend) {
  //       timer = setTimeout(() => {
  //         setTimeLeft(timeLeft - 1);
  //       }, 1000);
  //     } else if (timeLeft === 0 && !canResend) {
  //       setCanResend(true);
  //     }
  //     return () => clearTimeout(timer);
  //   }, [timeLeft, canResend]);

  const formatTime = seconds => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  const handleOtpChange = (text, index) => {
    if (text.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    setError('');

    // Auto-focus next input
    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all digits are filled
    if (text && index === 5 && newOtp.every(digit => digit !== '')) {
      //   handleVerify(newOtp.join(''));
    }
  };

  const handleKeyPress = (e, index) => {
    // Handle backspace to go to previous input
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async code => {
    if (code.length < 6) {
      setError('Please enter the complete 6-digit code');
      return;
    }

    setIsVerifying(true);
    // Simulate API verification
    setTimeout(() => {
      setIsVerifying(false);
      if (code === '123456') {
        // alert('OTP Verified Successfully!');
        setIsModalVisible(false);
        setOtp(['', '', '', '', '', '']);
        setTimeLeft(60);
        setCanResend(false);
      } else {
        setError('Invalid verification code. Please try again.');
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      }
    }, 1500);
  };

  const handleResendCode = () => {
    if (!canResend) return;

    // Simulate resend API call
    // alert('Verification code resent to your mobile number!');
    setTimeLeft(60);
    setCanResend(false);
    setOtp(['', '', '', '', '', '']);
    setError('');
    inputRefs.current[0]?.focus();
  };

  const handleEditNumber = () => {
    setIsModalVisible(false);
    // alert('Edit phone number functionality');
  };

  const renderOtpInputs = () => {
    return (
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={ref => (inputRefs.current[index] = ref)}
            style={[
              styles.otpInput,
              digit && styles.otpInputFilled,
              error && styles.otpInputError,
            ]}
            value={digit}
            onChangeText={text => handleOtpChange(text, index)}
            onKeyPress={e => handleKeyPress(e, index)}
            keyboardType="number-pad"
            maxLength={1}
            placeholder="•"
            placeholderTextColor="#444444"
            textAlign="center"
            selectionColor="#22C35D"
          />
        ))}
      </View>
    );
  };

  // OTP Modal Component
  const OTPModal = () => (
    <Modal
      visible={isModalVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setIsModalVisible(false)}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <View style={styles.modalIconContainer}>
                <Text style={styles.modalIcon}>📱</Text>
              </View>
              <Text style={styles.modalTitle}>Verify Your Number</Text>
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={styles.modalCloseText}>✕</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.modalDescription}>
              We've sent a 6-digit verification code to
            </Text>
            <Text style={styles.phoneNumber}>+1 234 567 8900</Text>

            <TouchableOpacity onPress={handleEditNumber}>
              <Text style={styles.editNumberText}>Wrong number? Edit</Text>
            </TouchableOpacity>

            {/* OTP Inputs */}

            {/* Error Message */}
            {error ? (
              <View style={styles.errorContainer}>
                <Text style={styles.errorIcon}>⚠️</Text>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}

            {/* Timer & Resend */}
            {/* <View style={styles.timerContainer}>
              {!canResend ? (
                <View style={styles.timerWrapper}>
                  <Text style={styles.timerIcon}>⏱️</Text>
                  <Text style={styles.timerText}>
                    Code expires in {formatTime(timeLeft)}
                  </Text>
                </View>
              ) : (
                <TouchableOpacity onPress={handleResendCode}>
                  <Text style={styles.resendText}>Resend Code</Text>
                </TouchableOpacity>
              )}
            </View> */}

            {/* Verify Button */}
            <TouchableOpacity
              style={[
                styles.verifyButton,
                (isVerifying || otp.some(digit => digit === '')) &&
                  styles.verifyButtonDisabled,
              ]}
              onPress={() => handleVerify(otp.join(''))}
              disabled={isVerifying || otp.some(digit => digit === '')}
            >
              <Text style={styles.verifyButtonText}>
                {isVerifying ? 'Verifying...' : 'Verify'}
              </Text>
            </TouchableOpacity>

            {/* Help Text */}
            <Text style={styles.helpText}>
              Didn't receive the code? Check your spam folder or request a new
              one
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
  const { top } = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      {/* Main Screen Content */}
      <ScrollView>
        <View style={styles.mainContent}>
          <View style={styles.headerContainer}>
            <View style={styles.iconCircle}>
              <Text style={styles.lockIcon}>🔐</Text>
            </View>
            <Text style={styles.title}>Two-Factor Authentication</Text>
            <Text style={styles.description}>
              Add an extra layer of security to your account
            </Text>
          </View>

          {/* <View style={styles.infoBox}>
          <Text style={styles.infoIcon}>ℹ️</Text>
          <Text style={styles.infoText}>
            We'll send a verification code to your registered mobile number
          </Text>
        </View> */}
          {renderOtpInputs()}
          <TouchableOpacity
            style={[styles.verifyNowButton, { marginTop: 100 }]}
            onPress={() => navigation.navigate('ProfileSetup')}
          >
            <Text style={styles.verifyNowButtonText}>Verify Now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {/* OTP Modal */}
      <OTPModal />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 40 : 20,
    paddingBottom: 30,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  iconCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#22C35D20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#22C35D40',
  },
  lockIcon: {
    fontSize: 44,
  },
  title: {
    fontSize: 28,
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
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    marginBottom: 32,
  },
  infoIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#CCCCCC',
    lineHeight: 20,
  },
  verifyNowButton: {
    backgroundColor: '#22C35D',
    borderRadius: 16,
    height: 56,
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
  verifyNowButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: '#1A1A1A',
    borderRadius: 24,
    width: '100%',
    maxWidth: 400,
    padding: 24,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  modalIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#22C35D20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalIcon: {
    fontSize: 30,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  modalCloseButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#2A2A2A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCloseText: {
    fontSize: 18,
    color: '#888888',
  },
  modalDescription: {
    fontSize: 14,
    color: '#888888',
    textAlign: 'center',
    marginBottom: 8,
  },
  phoneNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: '#22C35D',
    textAlign: 'center',
    marginBottom: 8,
  },
  editNumberText: {
    fontSize: 13,
    color: '#22C35D',
    textAlign: 'center',
    marginBottom: 24,
    textDecorationLine: 'underline',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 24,
  },
  otpInput: {
    flex: 1,
    height: 60,
    backgroundColor: '#0D0D0D',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  otpInputFilled: {
    borderColor: '#22C35D',
    backgroundColor: '#1A1A1A',
  },
  otpInputError: {
    borderColor: '#FF4444',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF444420',
    padding: 12,
    borderRadius: 12,
    marginBottom: 20,
  },
  errorIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  errorText: {
    flex: 1,
    fontSize: 13,
    color: '#FF4444',
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  timerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0D0D0D',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  timerIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  timerText: {
    fontSize: 14,
    color: '#22C35D',
    fontWeight: '600',
  },
  resendText: {
    fontSize: 16,
    color: '#22C35D',
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  verifyButton: {
    backgroundColor: '#22C35D',
    borderRadius: 16,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  verifyButtonDisabled: {
    opacity: 0.5,
  },
  verifyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  helpText: {
    fontSize: 11,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 16,
  },
});

export default OTPVerify;
