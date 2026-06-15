// CreateMatchFlow.js
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Modal,
  Switch,
} from 'react-native';
import { RootNavigationProp } from '../../../types/navigationType';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { RootNavigationProp } from '../../../../types/navigationType';

// ==================== 4.1 Create Match Screen ====================
const CreateMatchScreen = ({ onNext, initialData }) => {
  const [matchData, setMatchData] = useState(
    initialData || {
      title: '',
      date: '',
      time: '',
      location: '',
      totalSlots: '',
      entryFee: '',
      description: '',
      rules: '',
      hasAmenities: false,
    },
  );

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleChange = (field, value) => {
    setMatchData({ ...matchData, [field]: value });
  };

  const handleNext = () => {
    // if (!matchData.title.trim()) {
    //   alert('Please enter match title');
    //   return;
    // }
    // if (!matchData.date) {
    //   alert('Please select match date');
    //   return;
    // }
    // if (!matchData.time) {
    //   alert('Please select match time');
    //   return;
    // }
    // if (!matchData.location.trim()) {
    //   alert('Please enter match location');
    //   return;
    // }
    // if (!matchData.totalSlots || parseInt(matchData.totalSlots) < 2) {
    //   alert('Please enter valid total slots (minimum 2)');
    //   return;
    // }
    // if (!matchData.entryFee || parseInt(matchData.entryFee) < 0) {
    //   alert('Please enter valid entry fee');
    //   return;
    // }
    onNext(matchData);
  };

  // Simple date selector modal
  const DateSelector = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }

    return (
      <Modal
        visible={showDatePicker}
        transparent
        animationType="fade"
        onRequestClose={() => setShowDatePicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.pickerModal}>
            <Text style={styles.pickerTitle}>Select Date</Text>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.pickerList}
            >
              {dates.map((date, idx) => {
                const dateStr = date.toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                });
                return (
                  <TouchableOpacity
                    key={idx}
                    style={styles.pickerItem}
                    onPress={() => {
                      handleChange('date', dateStr);
                      setShowDatePicker(false);
                    }}
                  >
                    <Text style={styles.pickerItemText}>{dateStr}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
            <TouchableOpacity
              style={styles.pickerClose}
              onPress={() => setShowDatePicker(false)}
            >
              <Text style={styles.pickerCloseText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  // Simple time selector modal
  const TimeSelector = () => {
    const times = [];
    for (let hour = 6; hour <= 22; hour++) {
      times.push(`${hour}:00 ${hour < 12 ? 'AM' : 'PM'}`);
      times.push(`${hour}:30 ${hour < 12 ? 'AM' : 'PM'}`);
    }

    return (
      <Modal
        visible={showTimePicker}
        transparent
        animationType="fade"
        onRequestClose={() => setShowTimePicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.pickerModal}>
            <Text style={styles.pickerTitle}>Select Time</Text>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.pickerList}
            >
              {times.map((time, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={styles.pickerItem}
                  onPress={() => {
                    handleChange('time', time);
                    setShowTimePicker(false);
                  }}
                >
                  <Text style={styles.pickerItemText}>{time}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={styles.pickerClose}
              onPress={() => setShowTimePicker(false)}
            >
              <Text style={styles.pickerCloseText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };
  const { top } = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      {/* <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Match</Text>
        <View style={{ width: 50 }} />
      </View> */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.progressContainer}>
          <View style={styles.progressStep}>
            <View style={[styles.progressDot, styles.progressDotActive]}>
              <Text style={styles.progressDotText}>1</Text>
            </View>
            <View style={styles.progressLine} />
            <View style={styles.progressDot}>
              <Text style={styles.progressDotText}>2</Text>
            </View>
          </View>
          <Text style={styles.progressText}>Step 1 of 2: Match Details</Text>
        </View>

        {/* Match Title */}
        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>Match Title *</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.inputIcon}>🏟️</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Weekend Warriors Cup"
              placeholderTextColor="#666666"
              value={matchData.title}
              onChangeText={text => handleChange('title', text)}
            />
          </View>
        </View>

        {/* Date & Time Row */}
        <View style={styles.rowContainer}>
          <View style={[styles.inputWrapper, { flex: 1, marginRight: 8 }]}>
            <Text style={styles.inputLabel}>Date *</Text>
            <TouchableOpacity
              style={styles.pickerButton}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.pickerButtonIcon}>📅</Text>
              <Text
                style={[
                  styles.pickerButtonText,
                  matchData.date && styles.pickerButtonTextFilled,
                ]}
              >
                {matchData.date || 'Select date'}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.inputWrapper, { flex: 1 }]}>
            <Text style={styles.inputLabel}>Time *</Text>
            <TouchableOpacity
              style={styles.pickerButton}
              onPress={() => setShowTimePicker(true)}
            >
              <Text style={styles.pickerButtonIcon}>⏰</Text>
              <Text
                style={[
                  styles.pickerButtonText,
                  matchData.time && styles.pickerButtonTextFilled,
                ]}
              >
                {matchData.time || 'Select time'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Location */}
        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>Location *</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.inputIcon}>📍</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter ground name or address"
              placeholderTextColor="#666666"
              value={matchData.location}
              onChangeText={text => handleChange('location', text)}
            />
          </View>
          <TouchableOpacity style={styles.mapButton}>
            <Text style={styles.mapButtonIcon}>🗺️</Text>
            <Text style={styles.mapButtonText}>Select on Map</Text>
          </TouchableOpacity>
        </View>

        {/* Total Slots & Entry Fee Row */}
        <View style={styles.rowContainer}>
          <View style={[styles.inputWrapper, { flex: 1, marginRight: 8 }]}>
            <Text style={styles.inputLabel}>Total Slots *</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.inputIcon}>👥</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., 10"
                placeholderTextColor="#666666"
                value={matchData.totalSlots}
                onChangeText={text => handleChange('totalSlots', text)}
                keyboardType="numeric"
              />
            </View>
          </View>
          <View style={[styles.inputWrapper, { flex: 1 }]}>
            <Text style={styles.inputLabel}>Entry Fee ($) *</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.inputIcon}>💰</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., 10"
                placeholderTextColor="#666666"
                value={matchData.entryFee}
                onChangeText={text => handleChange('entryFee', text)}
                keyboardType="numeric"
              />
            </View>
          </View>
        </View>

        {/* Description (Optional) */}
        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>Description (Optional)</Text>
          <View style={[styles.inputContainer, styles.textAreaContainer]}>
            <Text style={styles.inputIcon}>📝</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Describe your match, tournament format, etc."
              placeholderTextColor="#666666"
              value={matchData.description}
              onChangeText={text => handleChange('description', text)}
              multiline
              numberOfLines={3}
            />
          </View>
        </View>

        {/* Rules (Optional) */}
        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>Rules (Optional)</Text>
          <View style={[styles.inputContainer, styles.textAreaContainer]}>
            <Text style={styles.inputIcon}>📋</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="List the match rules, format, etc."
              placeholderTextColor="#666666"
              value={matchData.rules}
              onChangeText={text => handleChange('rules', text)}
              multiline
              numberOfLines={3}
            />
          </View>
        </View>

        {/* Amenities Toggle */}
        <View style={styles.toggleContainer}>
          <View style={styles.toggleLeft}>
            <Text style={styles.toggleIcon}>✨</Text>
            <View>
              <Text style={styles.toggleLabel}>Add Amenities</Text>
              <Text style={styles.toggleDesc}>
                Parking, water stations, etc.
              </Text>
            </View>
          </View>
          <Switch
            value={matchData.hasAmenities}
            onValueChange={val => handleChange('hasAmenities', val)}
            trackColor={{ false: '#2A2A2A', true: '#22C35D' }}
            thumbColor={matchData.hasAmenities ? '#FFFFFF' : '#f4f3f4'}
          />
        </View>

        {/* Next Button */}
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Review Match →</Text>
        </TouchableOpacity>
      </ScrollView>

      <DateSelector />
      <TimeSelector />
    </View>
  );
};

// ==================== 4.2 Review Match Screen ====================
const ReviewMatchScreen = ({ matchData, onBack, onPublish }) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handlePublish = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmPublish = () => {
    setShowConfirmModal(false);
    onPublish(matchData);
  };

  const ReviewSection = ({ title, icon, children }) => (
    <View style={styles.reviewSection}>
      <View style={styles.reviewSectionHeader}>
        <Text style={styles.reviewSectionIcon}>{icon}</Text>
        <Text style={styles.reviewSectionTitle}>{title}</Text>
      </View>
      {children}
    </View>
  );

  const ReviewRow = ({ label, value, multiline }) => (
    <View style={[styles.reviewRow, multiline && styles.reviewRowMultiline]}>
      <Text style={styles.reviewLabel}>{label}</Text>
      <Text
        style={[styles.reviewValue, multiline && styles.reviewValueMultiline]}
      >
        {value || '—'}
      </Text>
    </View>
  );
  const { top } = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Review Match</Text>
        <View style={{ width: 50 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.progressContainer}>
          <View style={styles.progressStep}>
            <View style={[styles.progressDot, styles.progressDotActive]}>
              <Text style={styles.progressDotText}>✓</Text>
            </View>
            <View style={styles.progressLine} />
            <View style={[styles.progressDot, styles.progressDotActive]}>
              <Text style={styles.progressDotText}>2</Text>
            </View>
          </View>
          <Text style={styles.progressText}>Step 2 of 2: Review Details</Text>
        </View>

        {/* Basic Information */}
        <ReviewSection title="Basic Information" icon="📋">
          <ReviewRow label="Match Title" value={matchData.title} />
          <ReviewRow label="Date" value={matchData.date} />
          <ReviewRow label="Time" value={matchData.time} />
          <ReviewRow label="Location" value={matchData.location} />
        </ReviewSection>

        {/* Match Details */}
        <ReviewSection title="Match Details" icon="⚽">
          <ReviewRow
            label="Total Slots"
            value={`${matchData.totalSlots} players`}
          />
          <ReviewRow label="Entry Fee" value={`$${matchData.entryFee}`} />
          <ReviewRow
            label="Total Revenue"
            value={`$${
              parseInt(matchData.totalSlots) * parseInt(matchData.entryFee)
            }`}
          />
        </ReviewSection>

        {/* Description */}
        {matchData.description && (
          <ReviewSection title="Description" icon="📝">
            <ReviewRow label="" value={matchData.description} multiline />
          </ReviewSection>
        )}

        {/* Rules */}
        {matchData.rules && (
          <ReviewSection title="Rules" icon="📋">
            <ReviewRow label="" value={matchData.rules} multiline />
          </ReviewSection>
        )}

        {/* Amenities */}
        <ReviewSection title="Amenities" icon="✨">
          <ReviewRow
            label="Status"
            value={matchData.hasAmenities ? 'Enabled' : 'Disabled'}
          />
        </ReviewSection>

        {/* Edit Button */}
        <TouchableOpacity style={styles.editButton} onPress={onBack}>
          <Text style={styles.editButtonText}>✏️ Edit Details</Text>
        </TouchableOpacity>

        {/* Publish Button */}
        <TouchableOpacity style={styles.publishButton} onPress={handlePublish}>
          <Text style={styles.publishButtonText}>Publish Match →</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Publish Confirmation Modal */}
      <Modal
        visible={showConfirmModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowConfirmModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.confirmModal}>
            <View style={styles.confirmIconContainer}>
              <Text style={styles.confirmIcon}>❓</Text>
            </View>
            <Text style={styles.confirmTitle}>Publish Match?</Text>
            <Text style={styles.confirmDescription}>
              Are you sure you want to publish "{matchData.title}"? Players will
              be able to see and join this match.
            </Text>
            <View style={styles.confirmActions}>
              <TouchableOpacity
                style={styles.cancelConfirmButton}
                onPress={() => setShowConfirmModal(false)}
              >
                <Text style={styles.cancelConfirmText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.confirmConfirmButton}
                onPress={handleConfirmPublish}
              >
                <Text style={styles.confirmConfirmText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// ==================== 4.4 Success Screen ====================
const SuccessScreen = ({ matchData, onViewMatch, onCreateAnother }) => (
  <View style={styles.container}>
    <StatusBar barStyle="light-content" backgroundColor="#000000" />

    <View style={styles.successContainer}>
      <View style={styles.successIconWrapper}>
        <View style={styles.successIconCircle}>
          <Text style={styles.successIcon}>✅</Text>
        </View>
        <View style={styles.successRing1} />
        <View style={styles.successRing2} />
      </View>

      <Text style={styles.successTitle}>Match Created!</Text>
      <Text style={styles.successMessage}>
        Your match "{matchData.title}" has been successfully published.
      </Text>

      <View style={styles.successDetails}>
        <View style={styles.successDetailItem}>
          <Text style={styles.successDetailIcon}>🏟️</Text>
          <View>
            <Text style={styles.successDetailLabel}>Match Title</Text>
            <Text style={styles.successDetailValue}>{matchData.title}</Text>
          </View>
        </View>
        <View style={styles.successDetailItem}>
          <Text style={styles.successDetailIcon}>📅</Text>
          <View>
            <Text style={styles.successDetailLabel}>Date & Time</Text>
            <Text style={styles.successDetailValue}>
              {matchData.date} • {matchData.time}
            </Text>
          </View>
        </View>
        <View style={styles.successDetailItem}>
          <Text style={styles.successDetailIcon}>📍</Text>
          <View>
            <Text style={styles.successDetailLabel}>Location</Text>
            <Text style={styles.successDetailValue}>{matchData.location}</Text>
          </View>
        </View>
        <View style={styles.successDetailItem}>
          <Text style={styles.successDetailIcon}>💰</Text>
          <View>
            <Text style={styles.successDetailLabel}>Entry Fee</Text>
            <Text style={styles.successDetailValue}>${matchData.entryFee}</Text>
          </View>
        </View>
      </View>

      <View style={styles.successActions}>
        <TouchableOpacity style={styles.viewMatchButton} onPress={onViewMatch}>
          <Text style={styles.viewMatchButtonText}>View Match →</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.createAnotherButton}
          onPress={onCreateAnother}
        >
          <Text style={styles.createAnotherButtonText}>
            + Create Another Match
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

// ==================== Main Component ====================
const HostCreate = () => {
  const [step, setStep] = useState('create'); // create, review, success
  const [matchData, setMatchData] = useState(null);
  const navigation = useNavigation<RootNavigationProp<'HostTabs'>>();

  const handleNext = data => {
    setMatchData(data);
    setStep('review');
  };

  const handleBack = () => {
    setStep('create');
  };

  const handlePublish = data => {
    setMatchData(data);
    setStep('success');
  };

  const handleViewMatch = () => {
    navigation.navigate('HostSingleMatchDetail');
  };

  const handleCreateAnother = () => {
    setMatchData(null);
    setStep('create');
  };

  if (step === 'create') {
    return <CreateMatchScreen onNext={handleNext} initialData={matchData} />;
  }

  if (step === 'review') {
    return (
      <ReviewMatchScreen
        matchData={matchData}
        onBack={handleBack}
        onPublish={handlePublish}
      />
    );
  }

  if (step === 'success') {
    return (
      <SuccessScreen
        matchData={matchData}
        onViewMatch={handleViewMatch}
        onCreateAnother={handleCreateAnother}
      />
    );
  }

  return null;
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
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  progressContainer: {
    alignItems: 'center',
    marginVertical: 24,
  },
  progressStep: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressDot: {
    width: 36,
    height: 36,
    borderRadius: 18,
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
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  progressLine: {
    width: 60,
    height: 2,
    backgroundColor: '#2A2A2A',
    marginHorizontal: 8,
  },
  progressText: {
    fontSize: 12,
    color: '#888888',
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
    height: 80,
    textAlignVertical: 'top',
  },
  rowContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  pickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    paddingHorizontal: 16,
    height: 56,
  },
  pickerButtonIcon: {
    fontSize: 18,
    marginRight: 12,
  },
  pickerButtonText: {
    flex: 1,
    fontSize: 16,
    color: '#666666',
  },
  pickerButtonTextFilled: {
    color: '#FFFFFF',
  },
  mapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#22C35D20',
    borderRadius: 12,
    paddingVertical: 10,
    marginTop: 8,
    gap: 8,
  },
  mapButtonIcon: {
    fontSize: 14,
  },
  mapButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#22C35D',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  toggleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  toggleIcon: {
    fontSize: 24,
  },
  toggleLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  toggleDesc: {
    fontSize: 11,
    color: '#888888',
  },
  nextButton: {
    backgroundColor: '#22C35D',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  // Review Screen Styles
  reviewSection: {
    backgroundColor: '#1A1A1A',
    borderRadius: 20,
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  reviewSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  reviewSectionIcon: {
    fontSize: 20,
  },
  reviewSectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#22C35D',
  },
  reviewRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  reviewRowMultiline: {
    flexDirection: 'column',
    gap: 6,
  },
  reviewLabel: {
    width: 100,
    fontSize: 13,
    color: '#888888',
  },
  reviewValue: {
    flex: 1,
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  reviewValueMultiline: {
    lineHeight: 20,
  },
  editButton: {
    backgroundColor: '#2A2A2A',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 12,
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  publishButton: {
    backgroundColor: '#22C35D',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  publishButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  pickerModal: {
    backgroundColor: '#1A1A1A',
    borderRadius: 24,
    width: '100%',
    maxWidth: 350,
    maxHeight: '80%',
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  pickerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#22C35D',
    textAlign: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  pickerList: {
    maxHeight: 300,
  },
  pickerItem: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  pickerItemText: {
    fontSize: 15,
    color: '#FFFFFF',
  },
  pickerClose: {
    paddingVertical: 14,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#2A2A2A',
  },
  pickerCloseText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#888888',
  },
  confirmModal: {
    backgroundColor: '#1A1A1A',
    borderRadius: 24,
    padding: 24,
    width: '100%',
    maxWidth: 340,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#22C35D',
  },
  confirmIconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#22C35D20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  confirmIcon: {
    fontSize: 36,
  },
  confirmTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 12,
    textAlign: 'center',
  },
  confirmDescription: {
    fontSize: 14,
    color: '#CCCCCC',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  confirmActions: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  cancelConfirmButton: {
    flex: 1,
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  cancelConfirmText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#888888',
  },
  confirmConfirmButton: {
    flex: 1,
    backgroundColor: '#22C35D',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  confirmConfirmText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  // Success Screen Styles
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  successIconWrapper: {
    marginBottom: 24,
    position: 'relative',
  },
  successIconCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#22C35D20',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  successIcon: {
    fontSize: 48,
  },
  successRing1: {
    position: 'absolute',
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 1,
    borderColor: '#22C35D40',
    top: -10,
    left: -10,
  },
  successRing2: {
    position: 'absolute',
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 1,
    borderColor: '#22C35D20',
    top: -20,
    left: -20,
  },
  successTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#22C35D',
    marginBottom: 8,
    textAlign: 'center',
  },
  successMessage: {
    fontSize: 15,
    color: '#888888',
    textAlign: 'center',
    marginBottom: 32,
  },
  successDetails: {
    backgroundColor: '#1A1A1A',
    borderRadius: 20,
    padding: 20,
    width: '100%',
    marginBottom: 32,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  successDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 16,
  },
  successDetailIcon: {
    fontSize: 24,
    width: 40,
  },
  successDetailLabel: {
    fontSize: 11,
    color: '#888888',
    marginBottom: 2,
  },
  successDetailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
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
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  createAnotherButton: {
    backgroundColor: '#2A2A2A',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3A3A3A',
  },
  createAnotherButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default HostCreate;
