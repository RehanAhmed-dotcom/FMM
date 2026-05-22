import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  StatusBar,
} from 'react-native';

const Logout = ({ visible, onClose, onConfirm, navigation }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <StatusBar barStyle="light-content" backgroundColor="rgba(0,0,0,0.95)" />

      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* Icon Section */}
          <View style={styles.iconContainer}>
            <View style={styles.iconCircle}>
              <Text style={styles.logoutIcon}>🚪</Text>
            </View>
            <View style={styles.iconRing1} />
            <View style={styles.iconRing2} />
          </View>

          {/* Title */}
          <Text style={styles.title}>Logout?</Text>

          {/* Description */}
          <Text style={styles.description}>
            Are you sure you want to logout? You will need to login again to
            access your account.
          </Text>

          {/* Warning Note */}
          <View style={styles.warningContainer}>
            <Text style={styles.warningIcon}>⚠️</Text>
            <Text style={styles.warningText}>Unsaved changes will be lost</Text>
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={onClose}
              activeOpacity={0.8}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.logoutButton}
              onPress={onConfirm}
              activeOpacity={0.8}
            >
              <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
          </View>

          {/* Help Text */}
          <Text style={styles.helpText}>
            Your data will be saved. You can login anytime.
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: '#1A1A1A',
    borderRadius: 28,
    padding: 24,
    width: '100%',
    maxWidth: 340,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  // Icon Section
  iconContainer: {
    marginBottom: 20,
    position: 'relative',
  },
  iconCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#FF444420',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  logoutIcon: {
    fontSize: 36,
  },
  iconRing1: {
    position: 'absolute',
    width: 85,
    height: 85,
    borderRadius: 42.5,
    borderWidth: 1,
    borderColor: '#FF444430',
    top: -7.5,
    left: -7.5,
  },
  iconRing2: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#FF444415',
    top: -15,
    left: -15,
  },
  // Title
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 12,
    textAlign: 'center',
  },
  // Description
  description: {
    fontSize: 14,
    color: '#CCCCCC',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  // Warning
  warningContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF444410',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#FF444420',
  },
  warningIcon: {
    fontSize: 14,
    marginRight: 8,
  },
  warningText: {
    flex: 1,
    fontSize: 12,
    color: '#FF8888',
  },
  // Buttons
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
    marginBottom: 16,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#2A2A2A',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3A3A3A',
  },
  cancelButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#CCCCCC',
  },
  logoutButton: {
    flex: 1,
    backgroundColor: '#FF4444',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: '#FF4444',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  logoutButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  // Help Text
  helpText: {
    fontSize: 11,
    color: '#666666',
    textAlign: 'center',
  },
});

export default Logout;
