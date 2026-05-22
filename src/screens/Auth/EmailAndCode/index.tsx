// // ForgotPasswordScreen.js
// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
//   StatusBar,
//   KeyboardAvoidingView,
//   Platform,
//   TouchableWithoutFeedback,
//   Keyboard,
//   FlatList,
//   ScrollView,
// } from 'react-native';
// import { RootNavigationProp } from '../../../types/navigationType';
// import { useNavigation } from '@react-navigation/native';

// // Screen 1: Request Reset Code
// const RequestResetScreen = ({ onNext, onBackToLogin }) => {
//   const [email, setEmail] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSendCode = () => {
//     if (!email) {
//       alert('Please enter your email or phone number');
//       return;
//     }
//     setIsLoading(true);
//     // Simulate API call
//     setTimeout(() => {
//       setIsLoading(false);
//       onNext(email);
//     }, 1000);
//   };

//   return (
//     <View style={styles.screenContainer}>
//       <TouchableOpacity onPress={onBackToLogin} style={styles.backButton}>
//         <Text style={styles.backButtonText}>← Back</Text>
//       </TouchableOpacity>
//       <ScrollView>
//         <View style={styles.headerContainer}>
//           <View style={styles.iconContainer}>
//             <Text style={styles.lockIcon}>🔐</Text>
//           </View>
//           <Text style={styles.title}>Forgot Password?</Text>
//           <Text style={styles.description}>
//             Don't worry! It happens. Enter your email and we'll send you a
//             verification code.
//           </Text>
//         </View>

//         <View style={styles.formContainer}>
//           <View style={styles.inputWrapper}>
//             <Text style={styles.inputLabel}>Email</Text>
//             <View style={styles.inputContainer}>
//               <Text style={styles.inputIcon}>📧</Text>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Enter your email"
//                 placeholderTextColor="#666666"
//                 value={email}
//                 onChangeText={setEmail}
//                 keyboardType="email-address"
//                 autoCapitalize="none"
//                 autoCorrect={false}
//               />
//             </View>
//           </View>

//           <TouchableOpacity
//             style={[styles.sendButton, isLoading && styles.sendButtonDisabled]}
//             onPress={handleSendCode}
//             disabled={isLoading}
//           >
//             <Text style={styles.sendButtonText}>
//               {isLoading ? 'Sending...' : 'Send Reset Code'}
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// // Screen 2: Verify Code & Reset Password
// const VerifyResetScreen = ({ email, onComplete, onBack }) => {
//   const [code, setCode] = useState(['', '', '', '', '', '']);
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [showNewPassword, setShowNewPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleCodeChange = (text, index) => {
//     const newCode = [...code];
//     newCode[index] = text;
//     setCode(newCode);

//     // Auto-focus next input
//     if (text && index < 5) {
//       const nextInput = document?.getElementById?.(`code-input-${index + 1}`);
//       if (nextInput) nextInput.focus();
//     }
//   };

//   const handleResetPassword = () => {
//     const verificationCode = code.join('');
//     if (verificationCode.length !== 6) {
//       alert('Please enter the 6-digit verification code');
//       return;
//     }
//     if (!newPassword || newPassword.length < 8) {
//       alert('Password must be at least 8 characters');
//       return;
//     }
//     if (newPassword !== confirmPassword) {
//       alert('Passwords do not match');
//       return;
//     }

//     setIsLoading(true);
//     // Simulate API call
//     setTimeout(() => {
//       setIsLoading(false);
//       alert(
//         'Password reset successfully! Please login with your new password.',
//       );
//       onComplete();
//     }, 1000);
//   };

//   const renderCodeInput = ({ item, index }) => (
//     <TextInput
//       id={`code-input-${index}`}
//       style={styles.codeInput}
//       value={code[index]}
//       onChangeText={text => handleCodeChange(text, index)}
//       keyboardType="number-pad"
//       maxLength={1}
//       placeholder="•"
//       placeholderTextColor="#444444"
//       textAlign="center"
//     />
//   );

//   return (
//     <View style={styles.screenContainer}>
//       <TouchableOpacity onPress={onBack} style={styles.backButton}>
//         <Text style={styles.backButtonText}>← Back</Text>
//       </TouchableOpacity>
//       <ScrollView>
//         <View style={styles.headerContainer}>
//           <View style={styles.iconContainer}>
//             <Text style={styles.mailIcon}>✉️</Text>
//           </View>
//           <Text style={styles.title}>Verify Code</Text>
//           <Text style={styles.description}>
//             We've sent a 6-digit verification code to {'\n'}
//             <Text style={styles.emailHighlight}>{email}</Text>
//           </Text>
//         </View>

//         <View style={styles.formContainer}>
//           <View style={styles.codeInputWrapper}>
//             <Text style={styles.inputLabel}>Verification Code</Text>
//             <FlatList
//               data={[0, 1, 2, 3, 4, 5]}
//               renderItem={renderCodeInput}
//               keyExtractor={item => item.toString()}
//               horizontal
//               showsHorizontalScrollIndicator={false}
//               contentContainerStyle={styles.codeInputsContainer}
//             />
//           </View>

//           {/* <View style={styles.inputWrapper}>
//           <Text style={styles.inputLabel}>New Password</Text>
//           <View style={styles.inputContainer}>
//             <Text style={styles.inputIcon}>🔒</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Enter new password"
//               placeholderTextColor="#666666"
//               value={newPassword}
//               onChangeText={setNewPassword}
//               secureTextEntry={!showNewPassword}
//               autoCapitalize="none"
//             />
//             <TouchableOpacity
//               onPress={() => setShowNewPassword(!showNewPassword)}
//               style={styles.eyeIcon}
//             >
//               <Text style={styles.eyeIconText}>
//                 {showNewPassword ? '👁️' : '👁️‍🗨️'}
//               </Text>
//             </TouchableOpacity>
//           </View>
//           <Text style={styles.passwordHint}>Must be at least 8 characters</Text>
//         </View>

//         <View style={styles.inputWrapper}>
//           <Text style={styles.inputLabel}>Confirm Password</Text>
//           <View style={styles.inputContainer}>
//             <Text style={styles.inputIcon}>✓</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Confirm new password"
//               placeholderTextColor="#666666"
//               value={confirmPassword}
//               onChangeText={setConfirmPassword}
//               secureTextEntry={!showConfirmPassword}
//               autoCapitalize="none"
//             />
//             <TouchableOpacity
//               onPress={() => setShowConfirmPassword(!showConfirmPassword)}
//               style={styles.eyeIcon}
//             >
//               <Text style={styles.eyeIconText}>
//                 {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View> */}

//           <TouchableOpacity
//             style={[
//               styles.resetButton,
//               isLoading && styles.resetButtonDisabled,
//             ]}
//             onPress={handleResetPassword}
//             disabled={isLoading}
//           >
//             <Text style={styles.resetButtonText}>
//               {isLoading ? 'Resetting...' : 'Reset Password'}
//             </Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={styles.resendContainer}
//             onPress={() => alert('Code resent!')}
//           >
//             <Text style={styles.resendText}>
//               Didn't receive the code?{' '}
//               <Text style={styles.resendLink}>Resend</Text>
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// // Main Forgot Password Component
// const EmailAndCode = () => {
//   const [step, setStep] = useState(1);
//   const [userEmail, setUserEmail] = useState('');
//   const navigation = useNavigation<RootNavigationProp<'EmailAndCode'>>();
//   const handleSendCode = email => {
//     setUserEmail(email);
//     setStep(2);
//   };

//   const handleComplete = () => {
//     // Navigate back to login screen
//     alert('Returning to Login');
//   };

//   const handleBackToLogin = () => {
//     alert('Back to Login');
//   };

//   return (
//     <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//       <KeyboardAvoidingView
//         style={styles.container}
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       >
//         <StatusBar barStyle="light-content" backgroundColor="#000000" />

//         {step === 1 ? (
//           <RequestResetScreen
//             onNext={handleSendCode}
//             onBackToLogin={handleBackToLogin}
//           />
//         ) : (
//           <VerifyResetScreen
//             email={userEmail}
//             onComplete={handleComplete}
//             onBack={() => setStep(1)}
//           />
//         )}
//       </KeyboardAvoidingView>
//     </TouchableWithoutFeedback>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#000000',
//   },
//   screenContainer: {
//     flex: 1,
//     paddingHorizontal: 24,
//     paddingTop: Platform.OS === 'ios' ? 60 : 40,
//     paddingBottom: 30,
//   },
//   backButton: {
//     marginBottom: 20,
//     alignSelf: 'flex-start',
//   },
//   backButtonText: {
//     fontSize: 16,
//     color: '#22C35D',
//     fontWeight: '600',
//   },
//   headerContainer: {
//     alignItems: 'center',
//     marginBottom: 48,
//   },
//   iconContainer: {
//     width: 90,
//     height: 90,
//     borderRadius: 45,
//     backgroundColor: '#22C35D20',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 24,
//     borderWidth: 1,
//     borderColor: '#22C35D40',
//   },
//   lockIcon: {
//     fontSize: 44,
//   },
//   mailIcon: {
//     fontSize: 44,
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: '700',
//     color: '#FFFFFF',
//     marginBottom: 12,
//     letterSpacing: -0.5,
//   },
//   description: {
//     fontSize: 15,
//     color: '#888888',
//     textAlign: 'center',
//     lineHeight: 22,
//   },
//   emailHighlight: {
//     color: '#22C35D',
//     fontWeight: '600',
//   },
//   formContainer: {
//     flex: 1,
//   },
//   inputWrapper: {
//     marginBottom: 24,
//   },
//   inputLabel: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#CCCCCC',
//     marginBottom: 8,
//     letterSpacing: 0.3,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#1A1A1A',
//     borderRadius: 16,
//     borderWidth: 1,
//     borderColor: '#2A2A2A',
//     paddingHorizontal: 16,
//     height: 56,
//   },
//   inputIcon: {
//     fontSize: 18,
//     marginRight: 12,
//     color: '#888888',
//   },
//   input: {
//     flex: 1,
//     color: '#FFFFFF',
//     fontSize: 16,
//     padding: 0,
//     height: '100%',
//   },
//   eyeIcon: {
//     padding: 8,
//   },
//   eyeIconText: {
//     fontSize: 18,
//     color: '#888888',
//   },
//   passwordHint: {
//     fontSize: 12,
//     color: '#666666',
//     marginTop: 6,
//     marginLeft: 4,
//   },
//   sendButton: {
//     backgroundColor: '#22C35D',
//     borderRadius: 16,
//     height: 56,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 16,
//     shadowColor: '#22C35D',
//     shadowOffset: {
//       width: 0,
//       height: 4,
//     },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     elevation: 5,
//   },
//   sendButtonDisabled: {
//     opacity: 0.6,
//   },
//   sendButtonText: {
//     color: '#FFFFFF',
//     fontSize: 18,
//     fontWeight: '700',
//     letterSpacing: 0.5,
//   },
//   resetButton: {
//     backgroundColor: '#22C35D',
//     borderRadius: 16,
//     height: 56,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 16,
//     shadowColor: '#22C35D',
//     shadowOffset: {
//       width: 0,
//       height: 4,
//     },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     elevation: 5,
//   },
//   resetButtonDisabled: {
//     opacity: 0.6,
//   },
//   resetButtonText: {
//     color: '#FFFFFF',
//     fontSize: 18,
//     fontWeight: '700',
//     letterSpacing: 0.5,
//   },
//   codeInputWrapper: {
//     marginBottom: 28,
//   },
//   codeInputsContainer: {
//     justifyContent: 'space-between',
//     marginTop: 8,
//   },
//   codeInput: {
//     width: 50,
//     height: 56,
//     backgroundColor: '#1A1A1A',
//     borderRadius: 16,
//     borderWidth: 1,
//     borderColor: '#2A2A2A',
//     fontSize: 24,
//     fontWeight: '700',
//     color: '#FFFFFF',
//     textAlign: 'center',
//     marginHorizontal: 6,
//   },
//   resendContainer: {
//     alignItems: 'center',
//     marginTop: 24,
//   },
//   resendText: {
//     fontSize: 14,
//     color: '#888888',
//   },
//   resendLink: {
//     color: '#22C35D',
//     fontWeight: '600',
//   },
// });

// export default EmailAndCode;
// ForgotPasswordScreen.js
import React, { useState, useRef } from 'react';
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
import { useNavigation } from '@react-navigation/native';

// Screen 1: Request Reset Code
const RequestResetScreen = ({ onNext, onBackToLogin }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendCode = () => {
    if (!email) {
      alert('Please enter your email or phone number');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onNext(email);
    }, 1000);
  };

  return (
    <View style={styles.screenContainer}>
      <TouchableOpacity onPress={onBackToLogin} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>
      <ScrollView>
        <View style={styles.headerContainer}>
          <View style={styles.iconContainer}>
            <Text style={styles.lockIcon}>🔐</Text>
          </View>
          <Text style={styles.title}>Forgot Password?</Text>
          <Text style={styles.description}>
            Don't worry! It happens. Enter your email and we'll send you a
            verification code.
          </Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Email</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.inputIcon}>📧</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="#666666"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          </View>

          <TouchableOpacity
            style={[styles.sendButton, isLoading && styles.sendButtonDisabled]}
            onPress={handleSendCode}
            disabled={isLoading}
          >
            <Text style={styles.sendButtonText}>
              {isLoading ? 'Sending...' : 'Send Reset Code'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

// Screen 2: Verify Code & Reset Password
const VerifyResetScreen = ({ email, onComplete, onBack, navigation }) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // ✅ Refs array to manage focus between code inputs
  const inputRefs = useRef<Array<TextInput | null>>([]);

  const handleCodeChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    // ✅ Auto-focus next input using refs (no document API)
    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    // ✅ Go back to previous input on backspace if current is empty
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResetPassword = () => {
    const verificationCode = code.join('');
    if (verificationCode.length !== 6) {
      alert('Please enter the 6-digit verification code');
      return;
    }
    navigation.navigate('NewPassword');
    // if (!newPassword || newPassword.length < 8) {
    //   alert('Password must be at least 8 characters');
    //   return;
    // }
    // if (newPassword !== confirmPassword) {
    //   alert('Passwords do not match');
    //   return;
    // }

    // setIsLoading(true);
    // setTimeout(() => {
    //   setIsLoading(false);
    //   alert(
    //     'Password reset successfully! Please login with your new password.',
    //   );
    //   onComplete();
    // }, 1000);
  };

  const renderCodeInput = ({ item }: { item: number }) => (
    <TextInput
      ref={ref => (inputRefs.current[item] = ref)} // ✅ attach ref by item index
      style={styles.codeInput}
      value={code[item]}
      onChangeText={text => handleCodeChange(text, item)}
      onKeyPress={e => handleKeyPress(e, item)}
      keyboardType="number-pad"
      maxLength={1}
      placeholder="•"
      placeholderTextColor="#444444"
      textAlign="center"
    />
  );
  const maskEmail = (email: string) => {
    const [user, domain] = email.split('@');
    const masked = '*'.repeat(user?.length - 3) + user?.slice(-3);
    return `${masked}@${domain}`;
  };
  return (
    <View style={styles.screenContainer}>
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>
      <ScrollView>
        <View style={styles.headerContainer}>
          <View style={styles.iconContainer}>
            <Text style={styles.mailIcon}>✉️</Text>
          </View>
          <Text style={styles.title}>Verify Code</Text>
          <Text style={styles.description}>
            We've sent a 6-digit verification code to {'\n'}
            <Text style={styles.emailHighlight}>{maskEmail(email)}</Text>
          </Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.codeInputWrapper}>
            <Text style={styles.inputLabel}>Verification Code</Text>
            <FlatList
              data={[0, 1, 2, 3, 4, 5]}
              renderItem={renderCodeInput}
              keyExtractor={item => item.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.codeInputsContainer}
            />
          </View>

          <TouchableOpacity
            style={[
              styles.resetButton,
              isLoading && styles.resetButtonDisabled,
            ]}
            onPress={handleResetPassword}
            disabled={isLoading}
          >
            <Text style={styles.resetButtonText}>
              {isLoading ? 'Resetting...' : 'Reset Password'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.resendContainer}
            onPress={() => alert('Code resent!')}
          >
            <Text style={styles.resendText}>
              Didn't receive the code?{' '}
              <Text style={styles.resendLink}>Resend</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

// Main Forgot Password Component
const EmailAndCode = () => {
  const [step, setStep] = useState(1);
  const [userEmail, setUserEmail] = useState('');
  const navigation = useNavigation<RootNavigationProp<'EmailAndCode'>>();

  const handleSendCode = (email: string) => {
    setUserEmail(email);
    setStep(2);
  };

  const handleComplete = () => {
    alert('Returning to Login');
  };

  const handleBackToLogin = () => {
    alert('Back to Login');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <StatusBar barStyle="light-content" backgroundColor="#000000" />

        {step === 1 ? (
          <RequestResetScreen
            onNext={handleSendCode}
            onBackToLogin={handleBackToLogin}
          />
        ) : (
          <VerifyResetScreen
            email={userEmail}
            onComplete={handleComplete}
            onBack={() => setStep(1)}
            navigation={navigation}
          />
        )}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  screenContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 40 : 20,
    paddingBottom: 30,
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
  headerContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  iconContainer: {
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
  mailIcon: {
    fontSize: 44,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  description: {
    fontSize: 15,
    color: '#888888',
    textAlign: 'center',
    lineHeight: 22,
  },
  emailHighlight: {
    color: '#22C35D',
    fontWeight: '600',
  },
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
  passwordHint: {
    fontSize: 12,
    color: '#666666',
    marginTop: 6,
    marginLeft: 4,
  },
  sendButton: {
    backgroundColor: '#22C35D',
    borderRadius: 16,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    shadowColor: '#22C35D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  sendButtonDisabled: {
    opacity: 0.6,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  resetButton: {
    backgroundColor: '#22C35D',
    borderRadius: 16,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    shadowColor: '#22C35D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  resetButtonDisabled: {
    opacity: 0.6,
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  codeInputWrapper: {
    marginBottom: 28,
  },
  codeInputsContainer: {
    justifyContent: 'space-between',
    marginTop: 8,
  },
  codeInput: {
    width: 50,
    height: 56,
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginHorizontal: 6,
  },
  resendContainer: {
    alignItems: 'center',
    marginTop: 24,
  },
  resendText: {
    fontSize: 14,
    color: '#888888',
  },
  resendLink: {
    color: '#22C35D',
    fontWeight: '600',
  },
});

export default EmailAndCode;
