// WithdrawEarningsScreen.js
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  FlatList,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { RootNavigationProp } from '../../../../types/navigationType';
import AlertModal from '../../../../component/AlertModal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const HostWithdraw = () => {
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('bank');
  const [isProcessing, setIsProcessing] = useState(false);
  const [alertShow, setAlertShow] = useState(false);
  const close = () => {
    setAlertShow(false);
  };

  const navigation = useNavigation<RootNavigationProp<'HostWithdraw'>>();
  // Earnings Data
  const earningsData = {
    totalEarned: 2840,
    pendingPayout: 450,
    availablePayout: 2390,
    totalMatches: 24,
    totalPlayers: 187,
  };

  // Transaction History
  const transactionHistory = [
    {
      id: '1',
      type: 'withdrawal',
      title: 'Withdrawal to Bank',
      amount: -500,
      date: 'May 15, 2026',
      status: 'completed',
      method: 'Bank Transfer',
      reference: 'WD-20260515-001',
    },
    {
      id: '2',
      type: 'earning',
      title: 'Weekend Warriors Cup',
      amount: 120,
      date: 'May 10, 2026',
      status: 'completed',
      matchId: 'M001',
      slotsFilled: 12,
    },
    {
      id: '3',
      type: 'earning',
      title: '5v5 Tournament',
      amount: 90,
      date: 'May 8, 2026',
      status: 'completed',
      matchId: 'M002',
      slotsFilled: 6,
    },
    {
      id: '4',
      type: 'withdrawal',
      title: 'Withdrawal to JazzCash',
      amount: -300,
      date: 'May 5, 2026',
      status: 'completed',
      method: 'JazzCash',
      reference: 'WD-20260505-002',
    },
    {
      id: '5',
      type: 'earning',
      title: 'Night Football League',
      amount: 96,
      date: 'May 3, 2026',
      status: 'pending',
      matchId: 'M003',
      slotsFilled: 8,
    },
    {
      id: '6',
      type: 'earning',
      title: 'Sunday League',
      amount: 160,
      date: 'Apr 28, 2026',
      status: 'completed',
      matchId: 'M004',
      slotsFilled: 20,
    },
    {
      id: '7',
      type: 'earning',
      title: 'Corporate Cup',
      amount: 280,
      date: 'Apr 25, 2026',
      status: 'completed',
      matchId: 'M005',
      slotsFilled: 14,
    },
    {
      id: '8',
      type: 'withdrawal',
      title: 'Withdrawal to Easypaisa',
      amount: -200,
      date: 'Apr 20, 2026',
      status: 'completed',
      method: 'Easypaisa',
      reference: 'WD-20260420-003',
    },
  ];

  // Earning List (Matches breakdown)
  const earningList = [
    {
      id: '1',
      title: 'Weekend Warriors Cup',
      amount: 120,
      date: 'May 10, 2026',
      players: 12,
      status: 'paid',
    },
    {
      id: '2',
      title: '5v5 Tournament',
      amount: 90,
      date: 'May 8, 2026',
      players: 6,
      status: 'paid',
    },
    {
      id: '3',
      title: 'Night Football League',
      amount: 96,
      date: 'May 3, 2026',
      players: 8,
      status: 'pending',
    },
    {
      id: '4',
      title: 'Sunday League',
      amount: 160,
      date: 'Apr 28, 2026',
      players: 20,
      status: 'paid',
    },
    {
      id: '5',
      title: 'Corporate Cup',
      amount: 280,
      date: 'Apr 25, 2026',
      players: 14,
      status: 'paid',
    },
    {
      id: '6',
      title: 'Friday Night Lights',
      amount: 192,
      date: 'Apr 22, 2026',
      players: 16,
      status: 'paid',
    },
    {
      id: '7',
      title: 'Midweek League',
      amount: 75,
      date: 'Apr 18, 2026',
      players: 5,
      status: 'paid',
    },
    {
      id: '8',
      title: 'Youth Tournament',
      amount: 50,
      date: 'Apr 15, 2026',
      players: 4,
      status: 'paid',
    },
  ];

  const handleWithdraw = () => {
    const amount = parseFloat(withdrawAmount);
    // if (isNaN(amount) || amount <= 0) {
    //   // Alert.alert('Error', 'Please enter a valid amount');
    //   return;
    // }
    // if (amount > earningsData.availablePayout) {
    //   // Alert.alert(
    //   //   'Error',
    //   //   `Insufficient balance. Maximum withdrawable amount is $${earningsData.availablePayout}`,
    //   // );
    //   return;
    // }
    // if (amount < 10) {
    //   // Alert.alert('Error', 'Minimum withdrawal amount is $10');
    //   return;
    // }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowWithdrawModal(false);
      setWithdrawAmount('');
      setAlertShow(true);
      // Alert.alert(
      //   'Withdrawal Request Submitted',
      //   `Your request for $${amount} has been submitted. Funds will be transferred within 2-3 business days.`,
      //   [{ text: 'OK' }],
      // );
    }, 2000);
  };

  const formatAmount = amount => {
    return `${amount >= 0 ? '+' : ''}$${Math.abs(amount)}`;
  };

  const getStatusColor = status => {
    switch (status) {
      case 'completed':
        return '#22C35D';
      case 'pending':
        return '#FFA500';
      case 'failed':
        return '#FF4444';
      default:
        return '#888888';
    }
  };

  const getStatusText = status => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'pending':
        return 'Pending';
      case 'failed':
        return 'Failed';
      default:
        return status;
    }
  };

  const getMethodIcon = method => {
    switch (method) {
      case 'Bank Transfer':
        return '🏦';
      case 'JazzCash':
        return '📱';
      case 'Easypaisa':
        return '💳';
      default:
        return '💰';
    }
  };

  const TransactionItem = ({ item }) => (
    <View style={styles.transactionItem}>
      <View style={styles.transactionIconContainer}>
        <Text style={styles.transactionIcon}>
          {item.type === 'withdrawal' ? '📤' : '💰'}
        </Text>
      </View>
      <View style={styles.transactionInfo}>
        <Text style={styles.transactionTitle}>{item.title}</Text>
        <Text style={styles.transactionDate}>{item.date}</Text>
        {item.reference && (
          <Text style={styles.transactionReference}>Ref: {item.reference}</Text>
        )}
      </View>
      <View style={styles.transactionRight}>
        <Text
          style={[
            styles.transactionAmount,
            item.amount > 0 ? styles.positiveAmount : styles.negativeAmount,
          ]}
        >
          {formatAmount(item.amount)}
        </Text>
        <View
          style={[
            styles.transactionStatus,
            { backgroundColor: getStatusColor(item.status) + '20' },
          ]}
        >
          <Text
            style={[
              styles.transactionStatusText,
              { color: getStatusColor(item.status) },
            ]}
          >
            {getStatusText(item.status)}
          </Text>
        </View>
      </View>
    </View>
  );

  const EarningItem = ({ item }) => (
    <View style={styles.earningItem}>
      <View style={styles.earningLeft}>
        <Text style={styles.earningIcon}>⚽</Text>
        <View>
          <Text style={styles.earningTitle}>{item.title}</Text>
          <Text style={styles.earningDate}>{item.date}</Text>
          <Text style={styles.earningPlayers}>{item.players} players</Text>
        </View>
      </View>
      <View style={styles.earningRight}>
        <Text style={styles.earningAmount}>+${item.amount}</Text>
        <View
          style={[
            styles.earningStatus,
            { backgroundColor: getStatusColor(item.status) + '20' },
          ]}
        >
          <Text
            style={[
              styles.earningStatusText,
              { color: getStatusColor(item.status) },
            ]}
          >
            {getStatusText(item.status)}
          </Text>
        </View>
      </View>
    </View>
  );

  const WithdrawModal = () => (
    <Modal
      visible={showWithdrawModal}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setShowWithdrawModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.withdrawModal}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Withdraw Earnings</Text>
            <TouchableOpacity onPress={() => setShowWithdrawModal(false)}>
              <Text style={styles.modalClose}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.balancePreview}>
            <Text style={styles.balancePreviewLabel}>Available Balance</Text>
            <Text style={styles.balancePreviewAmount}>
              ${earningsData.availablePayout}
            </Text>
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Withdrawal Amount</Text>
            <View style={styles.amountInputContainer}>
              <Text style={styles.currencySymbol}>$</Text>
              <TextInput
                style={styles.amountInput}
                placeholder="0.00"
                placeholderTextColor="#666666"
                value={withdrawAmount}
                onChangeText={text => setWithdrawAmount(text)}
                keyboardType="decimal-pad"
              />
            </View>
          </View>

          <View style={styles.methodContainer}>
            <Text style={styles.methodLabel}>Withdrawal Method</Text>
            <View style={styles.methodOptions}>
              {['bank', 'jazzcash', 'easypaisa'].map(method => (
                <TouchableOpacity
                  key={method}
                  style={[
                    styles.methodOption,
                    selectedMethod === method && styles.methodOptionActive,
                  ]}
                  onPress={() => setSelectedMethod(method)}
                >
                  <Text style={styles.methodIcon}>
                    {method === 'bank'
                      ? '🏦'
                      : method === 'jazzcash'
                      ? '📱'
                      : '💳'}
                  </Text>
                  <Text
                    style={[
                      styles.methodName,
                      selectedMethod === method && styles.methodNameActive,
                    ]}
                  >
                    {method === 'bank'
                      ? 'Bank'
                      : method === 'jazzcash'
                      ? 'JazzCash'
                      : 'Easypaisa'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.withdrawNote}>
            <Text style={styles.withdrawNoteIcon}>ℹ️</Text>
            <Text style={styles.withdrawNoteText}>
              Minimum withdrawal: $10. Funds will be transferred within 2-3
              business days.
            </Text>
          </View>

          <View style={styles.modalActions}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setShowWithdrawModal(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.confirmButton,
                isProcessing && styles.confirmButtonDisabled,
              ]}
              onPress={handleWithdraw}
              disabled={isProcessing}
            >
              <Text style={styles.confirmButtonText}>
                {isProcessing ? 'Processing...' : 'Request Withdrawal'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  const renderHeader = () => (
    <>
      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statIcon}>💰</Text>
          <Text style={styles.statValue}>${earningsData.totalEarned}</Text>
          <Text style={styles.statLabel}>Total Earned</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statCard}>
          <Text style={styles.statIcon}>⏳</Text>
          <Text style={styles.statValue}>${earningsData.pendingPayout}</Text>
          <Text style={styles.statLabel}>Pending Payout</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statCard}>
          <Text style={styles.statIcon}>💵</Text>
          <Text style={styles.statValue}>${earningsData.availablePayout}</Text>
          <Text style={styles.statLabel}>Available</Text>
        </View>
      </View>

      {/* Withdraw Button */}
      <TouchableOpacity
        style={styles.withdrawButton}
        onPress={() => setShowWithdrawModal(true)}
      >
        <Text style={styles.withdrawButtonIcon}>💸</Text>
        <Text style={styles.withdrawButtonText}>Withdraw Funds</Text>
      </TouchableOpacity>

      {/* Quick Stats */}
      <View style={styles.quickStats}>
        <View style={styles.quickStat}>
          <Text style={styles.quickStatValue}>{earningsData.totalMatches}</Text>
          <Text style={styles.quickStatLabel}>Matches Hosted</Text>
        </View>
        <View style={styles.quickStatDivider} />
        <View style={styles.quickStat}>
          <Text style={styles.quickStatValue}>{earningsData.totalPlayers}</Text>
          <Text style={styles.quickStatLabel}>Total Players</Text>
        </View>
        <View style={styles.quickStatDivider} />
        <View style={styles.quickStat}>
          <Text style={styles.quickStatValue}>
            ${Math.round(earningsData.totalEarned / earningsData.totalMatches)}
          </Text>
          <Text style={styles.quickStatLabel}>Avg per Match</Text>
        </View>
      </View>

      {/* Transaction History Header */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>📜 Transaction History</Text>
      </View>
    </>
  );

  const renderEarningListHeader = () => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>📊 Earnings Breakdown</Text>
    </View>
  );
  const { top } = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Earnings</Text>
        <View style={{ width: 50 }} />
      </View>

      <FlatList
        data={transactionHistory}
        renderItem={({ item }) => <TransactionItem item={item} />}
        keyExtractor={item => item.id}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={
          <>
            {renderEarningListHeader()}
            {earningList.map(item => (
              <EarningItem key={item.id} item={item} />
            ))}
            <View style={styles.bottomSpacing} />
          </>
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
      <AlertModal
        value={alertShow}
        close={close}
        bigText={'Withdrawal Request Submitted'}
        text={
          'Your request has been submitted. Funds will be transferred within 2-3 business days.'
        }
      />
      <WithdrawModal />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  listContent: {
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
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
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  // Stats Container
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#1A1A1A',
    borderRadius: 20,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
    paddingVertical: 20,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
  },
  statIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '800',
    color: '#22C35D',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: '#888888',
  },
  statDivider: {
    width: 1,
    height: 50,
    backgroundColor: '#2A2A2A',
  },
  // Withdraw Button
  withdrawButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#22C35D',
    borderRadius: 16,
    marginHorizontal: 20,
    marginBottom: 20,
    paddingVertical: 16,
    gap: 10,
  },
  withdrawButtonIcon: {
    fontSize: 20,
  },
  withdrawButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  // Quick Stats
  quickStats: {
    flexDirection: 'row',
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    marginHorizontal: 20,
    marginBottom: 24,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  quickStat: {
    flex: 1,
    alignItems: 'center',
  },
  quickStatValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  quickStatLabel: {
    fontSize: 10,
    color: '#888888',
  },
  quickStatDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#2A2A2A',
  },
  // Section Header
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  // Transaction Item
  transactionItem: {
    flexDirection: 'row',
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  transactionIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#22C35D20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionIcon: {
    fontSize: 22,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  transactionDate: {
    fontSize: 11,
    color: '#888888',
    marginBottom: 2,
  },
  transactionReference: {
    fontSize: 10,
    color: '#666666',
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  positiveAmount: {
    color: '#22C35D',
  },
  negativeAmount: {
    color: '#FF4444',
  },
  transactionStatus: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  transactionStatusText: {
    fontSize: 9,
    fontWeight: '600',
  },
  // Earning Item
  earningItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    marginHorizontal: 20,
    marginBottom: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  earningLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  earningIcon: {
    fontSize: 28,
  },
  earningTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  earningDate: {
    fontSize: 10,
    color: '#888888',
    marginBottom: 2,
  },
  earningPlayers: {
    fontSize: 9,
    color: '#666666',
  },
  earningRight: {
    alignItems: 'flex-end',
  },
  earningAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#22C35D',
    marginBottom: 4,
  },
  earningStatus: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  earningStatusText: {
    fontSize: 9,
    fontWeight: '600',
  },
  bottomSpacing: {
    height: 30,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  withdrawModal: {
    backgroundColor: '#1A1A1A',
    borderRadius: 24,
    width: '100%',
    maxWidth: 380,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  modalClose: {
    fontSize: 20,
    color: '#888888',
  },
  balancePreview: {
    backgroundColor: '#22C35D10',
    margin: 20,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#22C35D30',
  },
  balancePreviewLabel: {
    fontSize: 12,
    color: '#888888',
    marginBottom: 4,
  },
  balancePreviewAmount: {
    fontSize: 28,
    fontWeight: '800',
    color: '#22C35D',
  },
  inputWrapper: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#CCCCCC',
    marginBottom: 8,
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0D0D0D',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    paddingHorizontal: 16,
    height: 56,
  },
  currencySymbol: {
    fontSize: 20,
    fontWeight: '600',
    color: '#22C35D',
    marginRight: 8,
  },
  amountInput: {
    flex: 1,
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    padding: 0,
  },
  methodContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  methodLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#CCCCCC',
    marginBottom: 12,
  },
  methodOptions: {
    flexDirection: 'row',
    gap: 12,
  },
  methodOption: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#0D0D0D',
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  methodOptionActive: {
    backgroundColor: '#22C35D20',
    borderColor: '#22C35D',
  },
  methodIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  methodName: {
    fontSize: 12,
    color: '#888888',
  },
  methodNameActive: {
    color: '#22C35D',
    fontWeight: '600',
  },
  withdrawNote: {
    flexDirection: 'row',
    backgroundColor: '#22C35D10',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 12,
    borderRadius: 12,
    gap: 10,
  },
  withdrawNoteIcon: {
    fontSize: 14,
  },
  withdrawNoteText: {
    flex: 1,
    fontSize: 11,
    color: '#888888',
    lineHeight: 16,
  },
  modalActions: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#2A2A2A',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#888888',
  },
  confirmButton: {
    flex: 1,
    backgroundColor: '#22C35D',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  confirmButtonDisabled: {
    opacity: 0.6,
  },
  confirmButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default HostWithdraw;
