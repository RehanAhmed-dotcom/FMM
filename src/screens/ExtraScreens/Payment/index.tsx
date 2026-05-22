// PaymentScreen.js
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  TextInput,
  ScrollView,
  Modal,
  Platform,
} from 'react-native';
import { RootNavigationProp } from '../../../types/navigationType';

const Payment = () => {
  // Mock match data (would come from route params in real app)
  const matchData = {
    id: '1',
    title: 'Weekend Warriors Cup',
    groundName: 'Central Park Field',
    date: 'Saturday, May 3, 2026',
    time: '6:00 PM',
    entryFee: 10,
    selectedSlots: 2,
    totalAmount: 20,
  };
  const navigation = useNavigation<RootNavigationProp<'Payment'>>();
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Card form state
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  // Wallet state
  const [walletBalance] = useState(250);
  const [useWallet, setUseWallet] = useState(true);

  const formatCardNumber = text => {
    let cleaned = text.replace(/\s/g, '');
    let formatted = '';
    for (let i = 0; i < cleaned.length; i++) {
      if (i > 0 && i % 4 === 0) formatted += ' ';
      formatted += cleaned[i];
    }
    setCardNumber(formatted.slice(0, 19));
  };

  const formatExpiry = text => {
    let cleaned = text.replace('/', '');
    if (cleaned.length >= 2) {
      setExpiryDate(cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4));
    } else {
      setExpiryDate(cleaned);
    }
  };

  const handlePayment = () => {
    if (selectedMethod === 'card') {
      if (!cardNumber || cardNumber.replace(/\s/g, '').length < 16) {
        alert('Please enter a valid card number');
        return;
      }
      if (!cardName) {
        alert('Please enter cardholder name');
        return;
      }
      if (!expiryDate || expiryDate.length < 5) {
        alert('Please enter valid expiry date');
        return;
      }
      if (!cvv || cvv.length < 3) {
        alert('Please enter valid CVV');
        return;
      }
    }

    if (
      selectedMethod === 'wallet' &&
      useWallet &&
      walletBalance < matchData.totalAmount
    ) {
      alert('Insufficient wallet balance');
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);
    }, 1500);
  };

  const handleViewMatch = () => {
    setShowSuccess(false);
    // alert('Navigating to Match Details');
    navigation.navigate('MatchDetail', { id: 10 });
  };

  const handleBackToHome = () => {
    setShowSuccess(false);
    navigation.navigate('MyTabs', { screen: 'Home' });
    // alert('Navigating to Home');
  };

  // Success Screen Component
  const SuccessScreen = () => (
    <Modal
      visible={showSuccess}
      transparent={false}
      animationType="fade"
      onRequestClose={() => setShowSuccess(false)}
    >
      <View style={styles.successContainer}>
        <StatusBar barStyle="light-content" backgroundColor="#000000" />

        <View style={styles.successContent}>
          <View style={styles.successIconWrapper}>
            <View style={styles.successIconCircle}>
              <Text style={styles.successIcon}>✓</Text>
            </View>
          </View>

          <Text style={styles.successTitle}>Payment Successful!</Text>
          <Text style={styles.successMessage}>
            Your match has been confirmed
          </Text>

          <View style={styles.successDetailsCard}>
            <View style={styles.successDetailRow}>
              <Text style={styles.successDetailLabel}>Match</Text>
              <Text style={styles.successDetailValue}>{matchData.title}</Text>
            </View>
            <View style={styles.successDetailRow}>
              <Text style={styles.successDetailLabel}>Ground</Text>
              <Text style={styles.successDetailValue}>
                {matchData.groundName}
              </Text>
            </View>
            <View style={styles.successDetailRow}>
              <Text style={styles.successDetailLabel}>Date & Time</Text>
              <Text style={styles.successDetailValue}>
                {matchData.date} • {matchData.time}
              </Text>
            </View>
            <View style={styles.successDetailRow}>
              <Text style={styles.successDetailLabel}>Players</Text>
              <Text style={styles.successDetailValue}>
                {matchData.selectedSlots} player(s)
              </Text>
            </View>
            <View style={styles.successDetailRow}>
              <Text style={styles.successDetailLabel}>Amount Paid</Text>
              <Text style={styles.successDetailValueGreen}>
                ${matchData.totalAmount}
              </Text>
            </View>
          </View>

          <View style={styles.successActions}>
            <TouchableOpacity
              style={styles.viewMatchButton}
              onPress={handleViewMatch}
            >
              <Text style={styles.viewMatchButtonText}>View Match</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.homeButton}
              onPress={handleBackToHome}
            >
              <Text style={styles.homeButtonText}>Back to Home</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment</Text>
        <View style={{ width: 50 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Order Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>📋 Order Summary</Text>

          <View style={styles.summaryItem}>
            <View style={styles.summaryItemLeft}>
              <Text style={styles.summaryItemIcon}>⚽</Text>
              <View>
                <Text style={styles.summaryItemLabel}>{matchData.title}</Text>
                <Text style={styles.summaryItemSubtext}>
                  {matchData.groundName}
                </Text>
              </View>
            </View>
            <Text style={styles.summaryItemPrice}>
              ${matchData.entryFee} × {matchData.selectedSlots}
            </Text>
          </View>

          <View style={styles.summaryDivider} />

          <View style={styles.summaryRow}>
            <Text style={styles.summaryRowLabel}>Subtotal</Text>
            <Text style={styles.summaryRowValue}>${matchData.totalAmount}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryRowLabel}>Platform Fee</Text>
            <Text style={styles.summaryRowValue}>$0.00</Text>
          </View>

          <View style={styles.summaryTotal}>
            <Text style={styles.summaryTotalLabel}>Total Amount</Text>
            <Text style={styles.summaryTotalValue}>
              ${matchData.totalAmount}
            </Text>
          </View>
        </View>

        {/* Payment Methods */}
        <Text style={styles.sectionTitle}>Select Payment Method</Text>

        {/* Card Payment */}
        <TouchableOpacity
          style={[
            styles.paymentMethodCard,
            selectedMethod === 'card' && styles.paymentMethodActive,
          ]}
          onPress={() => setSelectedMethod('card')}
          activeOpacity={0.7}
        >
          <View style={styles.paymentMethodHeader}>
            <View style={styles.paymentMethodLeft}>
              <View
                style={[
                  styles.paymentMethodIcon,
                  selectedMethod === 'card' && styles.paymentMethodIconActive,
                ]}
              >
                <Text style={styles.paymentMethodIconText}>💳</Text>
              </View>
              <View>
                <Text style={styles.paymentMethodName}>
                  Credit / Debit Card
                </Text>
                <Text style={styles.paymentMethodDesc}>
                  Visa, Mastercard, Amex
                </Text>
              </View>
            </View>
            <View
              style={[
                styles.radioCircle,
                selectedMethod === 'card' && styles.radioCircleSelected,
              ]}
            >
              {selectedMethod === 'card' && <View style={styles.radioInner} />}
            </View>
          </View>

          {selectedMethod === 'card' && (
            <View style={styles.cardForm}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Card Number</Text>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputIcon}>💳</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="1234 5678 9012 3456"
                    placeholderTextColor="#666666"
                    value={cardNumber}
                    onChangeText={formatCardNumber}
                    keyboardType="numeric"
                    maxLength={19}
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Cardholder Name</Text>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputIcon}>👤</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="JOHN DOE"
                    placeholderTextColor="#666666"
                    value={cardName}
                    onChangeText={setCardName}
                    autoCapitalize="characters"
                  />
                </View>
              </View>

              <View style={styles.rowInputs}>
                <View style={[styles.inputGroup, { flex: 1, marginRight: 12 }]}>
                  <Text style={styles.inputLabel}>Expiry Date</Text>
                  <View style={styles.inputContainer}>
                    <Text style={styles.inputIcon}>📅</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="MM/YY"
                      placeholderTextColor="#666666"
                      value={expiryDate}
                      onChangeText={formatExpiry}
                      keyboardType="numeric"
                      maxLength={5}
                    />
                  </View>
                </View>

                <View style={[styles.inputGroup, { flex: 1 }]}>
                  <Text style={styles.inputLabel}>CVV</Text>
                  <View style={styles.inputContainer}>
                    <Text style={styles.inputIcon}>🔒</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="123"
                      placeholderTextColor="#666666"
                      value={cvv}
                      onChangeText={setCvv}
                      keyboardType="numeric"
                      maxLength={4}
                      secureTextEntry
                    />
                  </View>
                </View>
              </View>
            </View>
          )}
        </TouchableOpacity>

        {/* Wallet Payment */}
        {/* <TouchableOpacity
          style={[
            styles.paymentMethodCard,
            selectedMethod === 'wallet' && styles.paymentMethodActive,
          ]}
          onPress={() => setSelectedMethod('wallet')}
          activeOpacity={0.7}
        >
          <View style={styles.paymentMethodHeader}>
            <View style={styles.paymentMethodLeft}>
              <View
                style={[
                  styles.paymentMethodIcon,
                  selectedMethod === 'wallet' && styles.paymentMethodIconActive,
                ]}
              >
                <Text style={styles.paymentMethodIconText}>👛</Text>
              </View>
              <View>
                <Text style={styles.paymentMethodName}>Wallet Balance</Text>
                <Text style={styles.paymentMethodDesc}>
                  Available: ${walletBalance}.00
                </Text>
              </View>
            </View>
            <View
              style={[
                styles.radioCircle,
                selectedMethod === 'wallet' && styles.radioCircleSelected,
              ]}
            >
              {selectedMethod === 'wallet' && (
                <View style={styles.radioInner} />
              )}
            </View>
          </View>

          {selectedMethod === 'wallet' && (
            <View style={styles.walletInfo}>
              <View style={styles.walletBalanceCard}>
                <Text style={styles.walletBalanceLabel}>Current Balance</Text>
                <Text style={styles.walletBalanceValue}>
                  ${walletBalance}.00
                </Text>
              </View>
              {walletBalance < matchData.totalAmount && (
                <View style={styles.insufficientWarning}>
                  <Text style={styles.warningIcon}>⚠️</Text>
                  <Text style={styles.warningText}>
                    Insufficient balance. Please add funds or use card.
                  </Text>
                </View>
              )}
              <TouchableOpacity style={styles.addFundsButton}>
                <Text style={styles.addFundsButtonText}>+ Add Funds</Text>
              </TouchableOpacity>
            </View>
          )}
        </TouchableOpacity> */}

        {/* Secure Payment Note */}
        {/* <View style={styles.secureNote}>
          <Text style={styles.secureIcon}>🔒</Text>
          <Text style={styles.secureText}>
            Secure payment encrypted with SSL
          </Text>
        </View> */}

        {/* Pay Button */}
        <TouchableOpacity
          style={[styles.payButton, isProcessing && styles.payButtonDisabled]}
          onPress={handlePayment}
          disabled={isProcessing}
        >
          <Text style={styles.payButtonText}>
            {isProcessing ? 'Processing...' : `Pay $${matchData.totalAmount}`}
          </Text>
        </TouchableOpacity>

        <View style={styles.bottomSpacing} />
      </ScrollView>

      <SuccessScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 40 : 20,
    paddingBottom: 20,
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
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  // Summary Card
  summaryCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#22C35D',
    marginBottom: 16,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  summaryItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  summaryItemIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  summaryItemLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  summaryItemSubtext: {
    fontSize: 11,
    color: '#888888',
  },
  summaryItemPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#22C35D',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: '#2A2A2A',
    marginVertical: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryRowLabel: {
    fontSize: 13,
    color: '#888888',
  },
  summaryRowValue: {
    fontSize: 13,
    color: '#FFFFFF',
  },
  summaryTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#2A2A2A',
  },
  summaryTotalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  summaryTotalValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#22C35D',
  },
  // Section Title
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  // Payment Method Card
  paymentMethodCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  paymentMethodActive: {
    borderColor: '#22C35D',
    backgroundColor: '#22C35D10',
  },
  paymentMethodHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentMethodLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  paymentMethodIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#0D0D0D',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  paymentMethodIconActive: {
    backgroundColor: '#22C35D20',
  },
  paymentMethodIconText: {
    fontSize: 24,
  },
  paymentMethodName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  paymentMethodDesc: {
    fontSize: 11,
    color: '#888888',
  },
  radioCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#888888',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioCircleSelected: {
    borderColor: '#22C35D',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#22C35D',
  },
  // Card Form
  cardForm: {
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#2A2A2A',
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#CCCCCC',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0D0D0D',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    paddingHorizontal: 16,
    height: 52,
  },
  inputIcon: {
    fontSize: 18,
    marginRight: 12,
    color: '#888888',
  },
  input: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 15,
    padding: 0,
  },
  rowInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  // Wallet Info
  walletInfo: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#2A2A2A',
  },
  walletBalanceCard: {
    backgroundColor: '#0D0D0D',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  walletBalanceLabel: {
    fontSize: 12,
    color: '#888888',
    marginBottom: 6,
  },
  walletBalanceValue: {
    fontSize: 28,
    fontWeight: '800',
    color: '#22C35D',
  },
  insufficientWarning: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF444420',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  warningIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  warningText: {
    flex: 1,
    fontSize: 12,
    color: '#FF4444',
  },
  addFundsButton: {
    backgroundColor: '#2A2A2A',
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
  },
  addFundsButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#22C35D',
  },
  // Secure Note
  secureNote: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  secureIcon: {
    fontSize: 14,
    marginRight: 8,
  },
  secureText: {
    fontSize: 12,
    color: '#888888',
  },
  // Pay Button
  payButton: {
    backgroundColor: '#22C35D',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#22C35D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  payButtonDisabled: {
    opacity: 0.6,
  },
  payButtonText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  bottomSpacing: {
    height: 30,
  },
  // Success Screen Styles
  successContainer: {
    flex: 1,
    backgroundColor: '#000000',
  },
  successContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  successIconWrapper: {
    marginBottom: 24,
  },
  successIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#22C35D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successIcon: {
    fontSize: 48,
    color: '#FFFFFF',
    fontWeight: '800',
  },
  successTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  successMessage: {
    fontSize: 16,
    color: '#888888',
    marginBottom: 32,
    textAlign: 'center',
  },
  successDetailsCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 20,
    padding: 20,
    width: '100%',
    marginBottom: 32,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  successDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  successDetailLabel: {
    fontSize: 13,
    color: '#888888',
  },
  successDetailValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  successDetailValueGreen: {
    fontSize: 16,
    fontWeight: '700',
    color: '#22C35D',
  },
  successActions: {
    width: '100%',
    gap: 12,
  },
  viewMatchButton: {
    backgroundColor: '#22C35D',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  viewMatchButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  homeButton: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  homeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default Payment;
