// MatchListingScreen.js
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
  FlatList,
  Modal,
  ScrollView,
  Platform,
} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { RootNavigationProp } from '../../../types/navigationType';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const FindMatch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);

  const navigation = useNavigation<RootNavigationProp<'MyTabs'>>();

  // Filter States
  const [filters, setFilters] = useState({
    date: 'all',
    distance: 'all',
    price: 'all',
    level: 'all',
  });

  const [tempFilters, setTempFilters] = useState({
    date: 'all',
    distance: 'all',
    price: 'all',
    level: 'all',
  });

  // Mock Matches Data
  const matches = [
    {
      id: '1',
      title: 'Weekend Warriors Cup',
      groundName: 'Central Park Field',
      distance: '0.8 km',
      date: 'Today',
      fullDate: 'April 30, 2026',
      time: '6:00 PM',
      entryFee: 10,
      slotsLeft: 8,
      totalSlots: 16,
      prize: 500,
      level: 'Intermediate',
      levelColor: '#FFA500',
      image: '🏟️',
      description:
        'Join the intense weekend tournament! Open to all intermediate players.',
      coordinates: { lat: 40.7812, lng: -73.9665 },
      players: [
        'John D.',
        'Mike R.',
        'Sarah L.',
        'Alex M.',
        'Chris P.',
        'Emma W.',
        'Tom H.',
        'Jerry M.',
      ],
      rules: [
        '5v5 format',
        '20 min halves',
        'No slide tackles',
        'Offside rules apply',
      ],
      amenities: [
        'Parking available',
        'Water stations',
        'Locker rooms',
        'First aid',
      ],
    },
    {
      id: '2',
      title: '5v5 Tournament',
      groundName: 'Brooklyn Sports Club',
      distance: '2.3 km',
      date: 'Tomorrow',
      fullDate: 'May 1, 2026',
      time: '4:00 PM',
      entryFee: 15,
      slotsLeft: 4,
      totalSlots: 12,
      prize: 300,
      level: 'Pro',
      levelColor: '#22C35D',
      image: '⚽',
      description: 'Professional level tournament with high competition.',
      coordinates: { lat: 40.6782, lng: -73.9442 },
      players: [
        'Pro Player 1',
        'Pro Player 2',
        'Pro Player 3',
        'Pro Player 4',
        'Pro Player 5',
        'Pro Player 6',
        'Pro Player 7',
        'Pro Player 8',
      ],
      rules: [
        '5v5 format',
        '25 min halves',
        'Professional referees',
        'VAR available',
      ],
      amenities: ['Indoor field', 'AC', 'Showers', 'Cafeteria'],
    },
    {
      id: '3',
      title: 'Sunday League',
      groundName: 'Queens Bridge Park',
      distance: '3.1 km',
      date: 'Sun',
      fullDate: 'May 3, 2026',
      time: '10:00 AM',
      entryFee: 8,
      slotsLeft: 12,
      totalSlots: 20,
      prize: 200,
      level: 'Beginner',
      levelColor: '#3498DB',
      image: '🏆',
      description: 'Fun and friendly matches for beginners.',
      coordinates: { lat: 40.7489, lng: -73.968 },
      players: [
        'Beginner 1',
        'Beginner 2',
        'Beginner 3',
        'Beginner 4',
        'Beginner 5',
        'Beginner 6',
        'Beginner 7',
        'Beginner 8',
      ],
      rules: [
        '11v11 format',
        '35 min halves',
        'Friendly environment',
        'All skill levels welcome',
      ],
      amenities: ['Free parking', 'Benches', 'Restrooms'],
    },
    {
      id: '4',
      title: 'Night Football',
      groundName: 'Stadium Lights Arena',
      distance: '4.5 km',
      date: 'Today',
      fullDate: 'April 30, 2026',
      time: '8:00 PM',
      entryFee: 12,
      slotsLeft: 2,
      totalSlots: 10,
      prize: 400,
      level: 'All Levels',
      levelColor: '#9B59B6',
      image: '🌙',
      description: 'Night matches under floodlights!',
      coordinates: { lat: 40.758, lng: -73.9855 },
      players: [
        'Night Player 1',
        'Night Player 2',
        'Night Player 3',
        'Night Player 4',
        'Night Player 5',
        'Night Player 6',
        'Night Player 7',
        'Night Player 8',
      ],
      rules: [
        '7v7 format',
        '15 min halves',
        'Floodlights',
        'Night rules apply',
      ],
      amenities: ['Floodlights', 'Music', 'Snacks', 'Parking'],
    },
    {
      id: '5',
      title: 'Corporate Cup',
      groundName: 'Downtown Field',
      distance: '1.5 km',
      date: 'Mon',
      fullDate: 'May 4, 2026',
      time: '7:00 PM',
      entryFee: 20,
      slotsLeft: 6,
      totalSlots: 14,
      prize: 1000,
      level: 'Pro',
      levelColor: '#22C35D',
      image: '💼',
      description: 'Corporate teams competition. High stakes!',
      coordinates: { lat: 40.7128, lng: -74.006 },
      players: [
        'Corporate 1',
        'Corporate 2',
        'Corporate 3',
        'Corporate 4',
        'Corporate 5',
        'Corporate 6',
      ],
      rules: [
        '8v8 format',
        '20 min halves',
        'Business casual attire optional',
        'Professional referees',
      ],
      amenities: ['VIP lounge', 'Free drinks', 'WiFi', 'Meeting rooms'],
    },
    {
      id: '6',
      title: 'Friday Night Lights',
      groundName: 'Eastside Arena',
      distance: '2.8 km',
      date: 'Fri',
      fullDate: 'May 1, 2026',
      time: '8:30 PM',
      entryFee: 12,
      slotsLeft: 3,
      totalSlots: 16,
      prize: 450,
      level: 'Intermediate',
      levelColor: '#FFA500',
      image: '🌟',
      description: 'Friday night special tournament with music and fun!',
      coordinates: { lat: 40.735, lng: -73.984 },
      players: [
        'Friday 1',
        'Friday 2',
        'Friday 3',
        'Friday 4',
        'Friday 5',
        'Friday 6',
        'Friday 7',
        'Friday 8',
        'Friday 9',
        'Friday 10',
        'Friday 11',
        'Friday 12',
        'Friday 13',
      ],
      rules: [
        '6v6 format',
        '15 min halves',
        'Music during breaks',
        'Fun atmosphere',
      ],
      amenities: ['Music system', 'Food trucks', 'Lighting', 'Seating'],
    },
  ];

  const dateOptions = [
    { id: 'all', label: 'All Dates' },
    { id: 'today', label: 'Today' },
    { id: 'tomorrow', label: 'Tomorrow' },
    { id: 'weekend', label: 'This Weekend' },
  ];

  const distanceOptions = [
    { id: 'all', label: 'Any Distance' },
    { id: '1', label: 'Within 1 km' },
    { id: '3', label: 'Within 3 km' },
    { id: '5', label: 'Within 5 km' },
  ];

  const priceOptions = [
    { id: 'all', label: 'Any Price' },
    { id: 'free', label: 'Free' },
    { id: 'under10', label: 'Under $10' },
    { id: 'under20', label: '$10 - $20' },
  ];

  const levelOptions = [
    { id: 'all', label: 'All Levels' },
    { id: 'Beginner', label: 'Beginner' },
    { id: 'Intermediate', label: 'Intermediate' },
    { id: 'Pro', label: 'Pro' },
    { id: 'All Levels', label: 'All Levels' },
  ];

  const applyFilters = () => {
    setFilters({ ...tempFilters });
    setIsFilterModalVisible(false);
  };

  const resetFilters = () => {
    const resetState = {
      date: 'all',
      distance: 'all',
      price: 'all',
      level: 'all',
    };
    setTempFilters(resetState);
    setFilters(resetState);
    setIsFilterModalVisible(false);
  };

  const getFilteredMatches = () => {
    let filtered = [...matches];

    // Date filter
    if (filters.date !== 'all') {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      filtered = filtered.filter(match => {
        if (filters.date === 'today') return match.date === 'Today';
        if (filters.date === 'tomorrow') return match.date === 'Tomorrow';
        if (filters.date === 'weekend')
          return ['Sat', 'Sun'].includes(match.date);
        return true;
      });
    }

    // Distance filter
    if (filters.distance !== 'all') {
      const maxDistance = parseInt(filters.distance);
      filtered = filtered.filter(match => {
        const distanceNum = parseFloat(match.distance);
        return distanceNum <= maxDistance;
      });
    }

    // Price filter
    if (filters.price !== 'all') {
      filtered = filtered.filter(match => {
        if (filters.price === 'free') return match.entryFee === 0;
        if (filters.price === 'under10') return match.entryFee < 10;
        if (filters.price === 'under20')
          return match.entryFee >= 10 && match.entryFee <= 20;
        return true;
      });
    }

    // Level filter
    if (filters.level !== 'all') {
      filtered = filtered.filter(match => match.level === filters.level);
    }

    // Search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        match =>
          match.title.toLowerCase().includes(query) ||
          match.groundName.toLowerCase().includes(query),
      );
    }

    return filtered;
  };

  const openMatchDetail = match => {
    setSelectedMatch(match);
    setIsDetailModalVisible(true);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.date !== 'all') count++;
    if (filters.distance !== 'all') count++;
    if (filters.price !== 'all') count++;
    if (filters.level !== 'all') count++;
    return count;
  };

  const MatchCard = ({ item, navigation }) => (
    <TouchableOpacity
      style={styles.matchCard}
      // onPress={() => openMatchDetail(item)}
      onPress={() => navigation.navigate('MatchDetail', { id: 10 })}
    >
      <View style={styles.matchCardHeader}>
        <View style={styles.matchImageContainer}>
          <Text style={styles.matchImage}>{item.image}</Text>
        </View>
        <View style={styles.matchHeaderInfo}>
          <Text style={styles.matchTitle}>{item.title}</Text>
          <View style={styles.matchGround}>
            <Text style={styles.matchGroundIcon}>📍</Text>
            <Text style={styles.matchGroundText}>{item.groundName}</Text>
          </View>
        </View>
        <View
          style={[
            styles.levelBadge,
            { backgroundColor: item.levelColor + '20' },
          ]}
        >
          <Text style={[styles.levelText, { color: item.levelColor }]}>
            {item.level}
          </Text>
        </View>
      </View>

      <View style={styles.matchDetails}>
        <View style={styles.matchDetailItem}>
          <Text style={styles.matchDetailIcon}>📅</Text>
          <Text style={styles.matchDetailText}>
            {item.date} • {item.time}
          </Text>
        </View>
        <View style={styles.matchDetailItem}>
          <Text style={styles.matchDetailIcon}>📍</Text>
          <Text style={styles.matchDetailText}>{item.distance}</Text>
        </View>
      </View>

      <View style={styles.matchFooter}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Entry Fee</Text>
          <Text style={styles.priceValue}>${item.entryFee}</Text>
        </View>
        <View style={styles.slotsContainer}>
          <View style={styles.slotsBar}>
            <View
              style={[
                styles.slotsFill,
                { width: `${(item.slotsLeft / item.totalSlots) * 100}%` },
              ]}
            />
          </View>
          <Text style={styles.slotsText}>
            {item.slotsLeft}/{item.totalSlots} spots
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('MatchDetail', { id: 10 })}
          style={styles.detailsButton}
        >
          <Text style={styles.detailsButtonText}>View Details →</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      {/* Search Bar */}
      <View
        style={[
          styles.searchContainer,
          { flexDirection: 'row', justifyContent: 'space-between' },
        ]}
      >
        <View style={styles.searchBar}>
          <Fontisto name="search" size={20} color={'white'} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by title or ground..."
            placeholderTextColor="#666666"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {/* {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Text style={styles.clearIcon}>✕</Text>
            </TouchableOpacity>
          )} */}
        </View>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => {
            setTempFilters({ ...filters });
            setIsFilterModalVisible(true);
          }}
        >
          <Fontisto name={'player-settings'} size={20} color={'white'} />
          {/* <Text style={[styles.filterIcon, { textAlign: 'center' }]}>⚙️</Text> */}
          {/* <Text style={styles.filterText}>Filters</Text>
          {getActiveFilterCount() > 0 && (
            <View style={styles.filterBadge}>
              <Text style={styles.filterBadgeText}>
                {getActiveFilterCount()}
              </Text>
            </View>
          )} */}
        </TouchableOpacity>
      </View>

      {/* Filter Bar */}
      {/* <View style={styles.filterBar}>
        {/* <TouchableOpacity style={styles.sortButton}>
          <Text style={styles.sortIcon}>📊</Text>
          <Text style={styles.sortText}>Sort by: Date</Text>
        </TouchableOpacity> 
      </View> */}

      {/* Results Count */}
      <View style={styles.resultsContainer}>
        <Text style={styles.resultsText}>
          {getFilteredMatches().length} matches found
        </Text>
      </View>
    </View>
  );

  const FilterModal = () => (
    <Modal
      visible={isFilterModalVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setIsFilterModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Filter Matches</Text>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setIsFilterModalVisible(false)}
            >
              <Text style={styles.modalCloseText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Date Filter */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>📅 Date</Text>
              <View style={styles.filterOptions}>
                {dateOptions.map(option => (
                  <TouchableOpacity
                    key={option.id}
                    style={[
                      styles.filterChip,
                      tempFilters.date === option.id && styles.filterChipActive,
                    ]}
                    onPress={() =>
                      setTempFilters({ ...tempFilters, date: option.id })
                    }
                  >
                    <Text
                      style={[
                        styles.filterChipText,
                        tempFilters.date === option.id &&
                          styles.filterChipTextActive,
                      ]}
                    >
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Distance Filter */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>📍 Distance</Text>
              <View style={styles.filterOptions}>
                {distanceOptions.map(option => (
                  <TouchableOpacity
                    key={option.id}
                    style={[
                      styles.filterChip,
                      tempFilters.distance === option.id &&
                        styles.filterChipActive,
                    ]}
                    onPress={() =>
                      setTempFilters({ ...tempFilters, distance: option.id })
                    }
                  >
                    <Text
                      style={[
                        styles.filterChipText,
                        tempFilters.distance === option.id &&
                          styles.filterChipTextActive,
                      ]}
                    >
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Price Filter */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>💰 Price Range</Text>
              <View style={styles.filterOptions}>
                {priceOptions.map(option => (
                  <TouchableOpacity
                    key={option.id}
                    style={[
                      styles.filterChip,
                      tempFilters.price === option.id &&
                        styles.filterChipActive,
                    ]}
                    onPress={() =>
                      setTempFilters({ ...tempFilters, price: option.id })
                    }
                  >
                    <Text
                      style={[
                        styles.filterChipText,
                        tempFilters.price === option.id &&
                          styles.filterChipTextActive,
                      ]}
                    >
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Level Filter */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>⚽ Skill Level</Text>
              <View style={styles.filterOptions}>
                {levelOptions.map(option => (
                  <TouchableOpacity
                    key={option.id}
                    style={[
                      styles.filterChip,
                      tempFilters.level === option.id &&
                        styles.filterChipActive,
                    ]}
                    onPress={() =>
                      setTempFilters({ ...tempFilters, level: option.id })
                    }
                  >
                    <Text
                      style={[
                        styles.filterChipText,
                        tempFilters.level === option.id &&
                          styles.filterChipTextActive,
                      ]}
                    >
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>

          <View style={styles.modalActions}>
            <TouchableOpacity style={styles.resetButton} onPress={resetFilters}>
              <Text style={styles.resetButtonText}>Reset All</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
              <Text style={styles.applyButtonText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  const MatchDetailModal = () => (
    <Modal
      visible={isDetailModalVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setIsDetailModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.detailModalContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {selectedMatch && (
              <>
                <View style={styles.detailHeader}>
                  <TouchableOpacity
                    style={styles.detailBackButton}
                    onPress={() => setIsDetailModalVisible(false)}
                  >
                    <Text style={styles.detailBackText}>← Back</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.detailShareButton}>
                    <Text style={styles.detailShareText}>📤</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.detailHero}>
                  <Text style={styles.detailHeroIcon}>
                    {selectedMatch.image}
                  </Text>
                  <Text style={styles.detailHeroTitle}>
                    {selectedMatch.title}
                  </Text>
                  <View
                    style={[
                      styles.detailLevelBadge,
                      { backgroundColor: selectedMatch.levelColor + '20' },
                    ]}
                  >
                    <Text
                      style={[
                        styles.detailLevelText,
                        { color: selectedMatch.levelColor },
                      ]}
                    >
                      {selectedMatch.level}
                    </Text>
                  </View>
                </View>

                <View style={styles.detailInfoGrid}>
                  <View style={styles.detailInfoItem}>
                    <Text style={styles.detailInfoIcon}>🏟️</Text>
                    <Text style={styles.detailInfoLabel}>Ground</Text>
                    <Text style={styles.detailInfoValue}>
                      {selectedMatch.groundName}
                    </Text>
                  </View>
                  <View style={styles.detailInfoItem}>
                    <Text style={styles.detailInfoIcon}>📍</Text>
                    <Text style={styles.detailInfoLabel}>Distance</Text>
                    <Text style={styles.detailInfoValue}>
                      {selectedMatch.distance}
                    </Text>
                  </View>
                  <View style={styles.detailInfoItem}>
                    <Text style={styles.detailInfoIcon}>📅</Text>
                    <Text style={styles.detailInfoLabel}>Date</Text>
                    <Text style={styles.detailInfoValue}>
                      {selectedMatch.fullDate}
                    </Text>
                  </View>
                  <View style={styles.detailInfoItem}>
                    <Text style={styles.detailInfoIcon}>⏰</Text>
                    <Text style={styles.detailInfoLabel}>Time</Text>
                    <Text style={styles.detailInfoValue}>
                      {selectedMatch.time}
                    </Text>
                  </View>
                </View>

                <View style={styles.detailSection}>
                  <Text style={styles.detailSectionTitle}>📝 Description</Text>
                  <Text style={styles.detailText}>
                    {selectedMatch.description}
                  </Text>
                </View>

                <View style={styles.detailSection}>
                  <Text style={styles.detailSectionTitle}>
                    💰 Match Details
                  </Text>
                  <View style={styles.pricingRow}>
                    <View style={styles.pricingItem}>
                      <Text style={styles.pricingLabel}>Entry Fee</Text>
                      <Text style={styles.pricingValue}>
                        ${selectedMatch.entryFee}
                      </Text>
                    </View>
                    <View style={styles.pricingItem}>
                      <Text style={styles.pricingLabel}>Prize Pool</Text>
                      <Text style={styles.pricingValue}>
                        ${selectedMatch.prize}
                      </Text>
                    </View>
                    <View style={styles.pricingItem}>
                      <Text style={styles.pricingLabel}>Slots Left</Text>
                      <Text style={styles.pricingValue}>
                        {selectedMatch.slotsLeft}/{selectedMatch.totalSlots}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.slotsDetailBar}>
                    <View
                      style={[
                        styles.slotsDetailFill,
                        {
                          width: `${
                            (selectedMatch.slotsLeft /
                              selectedMatch.totalSlots) *
                            100
                          }%`,
                        },
                      ]}
                    />
                  </View>
                </View>

                <View style={styles.detailSection}>
                  <Text style={styles.detailSectionTitle}>
                    👥 Current Players
                  </Text>
                  <View style={styles.playersGrid}>
                    {selectedMatch.players.slice(0, 8).map((player, idx) => (
                      <View key={idx} style={styles.playerCard}>
                        <Text style={styles.playerCardIcon}>⚽</Text>
                        <Text style={styles.playerCardName}>{player}</Text>
                      </View>
                    ))}
                    {selectedMatch.slotsLeft > 0 && (
                      <View
                        style={[styles.playerCard, styles.playerCardAvailable]}
                      >
                        <Text style={styles.playerCardIcon}>➕</Text>
                        <Text style={styles.playerCardName}>You?</Text>
                      </View>
                    )}
                  </View>
                </View>

                <View style={styles.detailSection}>
                  <Text style={styles.detailSectionTitle}>
                    📋 Rules & Format
                  </Text>
                  {selectedMatch.rules.map((rule, idx) => (
                    <View key={idx} style={styles.ruleItem}>
                      <Text style={styles.ruleBullet}>•</Text>
                      <Text style={styles.ruleText}>{rule}</Text>
                    </View>
                  ))}
                </View>

                <View style={styles.detailSection}>
                  <Text style={styles.detailSectionTitle}>✨ Amenities</Text>
                  <View style={styles.amenitiesList}>
                    {selectedMatch.amenities.map((amenity, idx) => (
                      <View key={idx} style={styles.amenityChip}>
                        <Text style={styles.amenityText}>{amenity}</Text>
                      </View>
                    ))}
                  </View>
                </View>

                <View style={styles.detailActions}>
                  <TouchableOpacity style={styles.saveMatchButton}>
                    <Text style={styles.saveMatchButtonText}>❤️ Save</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.joinNowButton}>
                    <Text style={styles.joinNowButtonText}>Join Now →</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>🔍</Text>
      <Text style={styles.emptyTitle}>No Matches Found</Text>
      <Text style={styles.emptyMessage}>
        Try adjusting your filters or search criteria
      </Text>
      <TouchableOpacity
        style={styles.clearFiltersButton}
        onPress={resetFilters}
      >
        <Text style={styles.clearFiltersButtonText}>Clear All Filters</Text>
      </TouchableOpacity>
    </View>
  );

  const filteredMatches = getFilteredMatches();
  const { top } = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <View
        style={[
          styles.topBar,
          {
            // paddingHorizontal: 20,
            paddingTop: Platform.OS === 'ios' ? 40 : 20,
          },
        ]}
      >
        {/* <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity> */}
        <Text style={styles.headerTitle}>Find Matches</Text>
        {/* <View style={styles.placeholder} /> */}
      </View>
      <FlatList
        data={filteredMatches}
        renderItem={({ item }) => (
          <MatchCard item={item} navigation={navigation} />
        )}
        keyExtractor={item => item.id}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        initialNumToRender={6}
        removeClippedSubviews={true}
      />

      <FilterModal />
      <MatchDetailModal />
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
  // Header Styles
  headerContainer: {
    paddingHorizontal: 20,
    // paddingTop: Platform.OS === 'ios' ? 60 : 40,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
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
  placeholder: {
    width: 50,
  },
  // Search Bar
  searchContainer: {
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    paddingHorizontal: 16,
    height: 52,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 12,
    color: '#888888',
  },
  searchInput: {
    // flex: 1,
    width: '75%',
    color: '#FFFFFF',
    paddingLeft: 10,
    fontSize: 16,
  },
  clearIcon: {
    fontSize: 16,
    color: '#888888',
  },
  // Filter Bar
  filterBar: {
    flexDirection: 'row',
    gap: 12,
    // marginBottom: 16,
  },
  filterButton: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    position: 'relative',
  },
  filterIcon: {
    fontSize: 20,
    // marginRight: 8,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  filterBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#22C35D',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  filterBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  sortButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  sortIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  sortText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  resultsContainer: {
    marginBottom: 16,
  },
  resultsText: {
    fontSize: 13,
    color: '#888888',
  },
  // Match Card
  matchCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 20,
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  matchCardHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  matchImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: '#22C35D20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  matchImage: {
    fontSize: 32,
  },
  matchHeaderInfo: {
    flex: 1,
  },
  matchTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  matchGround: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  matchGroundIcon: {
    fontSize: 12,
    marginRight: 4,
    color: '#888888',
  },
  matchGroundText: {
    fontSize: 12,
    color: '#888888',
  },
  levelBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  levelText: {
    fontSize: 11,
    fontWeight: '600',
  },
  matchDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#2A2A2A',
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
    marginBottom: 12,
  },
  matchDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  matchDetailIcon: {
    fontSize: 12,
    marginRight: 6,
  },
  matchDetailText: {
    fontSize: 12,
    color: '#CCCCCC',
  },
  matchFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceContainer: {
    alignItems: 'center',
  },
  priceLabel: {
    fontSize: 10,
    color: '#888888',
    marginBottom: 2,
  },
  priceValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#22C35D',
  },
  slotsContainer: {
    flex: 1,
    marginHorizontal: 12,
  },
  slotsBar: {
    height: 4,
    backgroundColor: '#2A2A2A',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 6,
  },
  slotsFill: {
    height: '100%',
    backgroundColor: '#22C35D',
    borderRadius: 2,
  },
  slotsText: {
    fontSize: 10,
    color: '#888888',
  },
  detailsButton: {
    backgroundColor: '#22C35D20',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
  },
  detailsButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#22C35D',
  },
  // Empty State
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  emptyMessage: {
    fontSize: 14,
    color: '#888888',
    textAlign: 'center',
    marginBottom: 20,
  },
  clearFiltersButton: {
    backgroundColor: '#22C35D',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  clearFiltersButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  // Filter Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: '#1A1A1A',
    borderRadius: 24,
    width: '100%',
    maxWidth: 400,
    maxHeight: '80%',
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
  modalCloseButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#2A2A2A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCloseText: {
    fontSize: 16,
    color: '#888888',
  },
  filterSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  filterSectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#22C35D',
    marginBottom: 12,
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#0D0D0D',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  filterChipActive: {
    backgroundColor: '#22C35D20',
    borderColor: '#22C35D',
  },
  filterChipText: {
    fontSize: 13,
    color: '#888888',
  },
  filterChipTextActive: {
    color: '#22C35D',
  },
  modalActions: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  resetButton: {
    flex: 1,
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  resetButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#888888',
  },
  applyButton: {
    flex: 1,
    backgroundColor: '#22C35D',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  applyButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  // Detail Modal
  detailModalContainer: {
    backgroundColor: '#1A1A1A',
    borderRadius: 24,
    width: '100%',
    maxWidth: 400,
    maxHeight: '90%',
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  detailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  detailBackButton: {
    paddingVertical: 8,
    paddingRight: 16,
  },
  detailBackText: {
    fontSize: 16,
    color: '#22C35D',
    fontWeight: '600',
  },
  detailShareButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2A2A2A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailShareText: {
    fontSize: 18,
  },
  detailHero: {
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#0D0D0D',
    margin: 20,
    borderRadius: 20,
  },
  detailHeroIcon: {
    fontSize: 60,
    marginBottom: 12,
  },
  detailHeroTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  detailLevelBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  detailLevelText: {
    fontSize: 12,
    fontWeight: '600',
  },
  detailInfoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  detailInfoItem: {
    width: '50%',
    marginBottom: 16,
  },
  detailInfoIcon: {
    fontSize: 20,
    marginBottom: 6,
  },
  detailInfoLabel: {
    fontSize: 11,
    color: '#888888',
    marginBottom: 4,
  },
  detailInfoValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  detailSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  detailSectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#22C35D',
    marginBottom: 12,
  },
  detailText: {
    fontSize: 14,
    color: '#CCCCCC',
    lineHeight: 22,
  },
  pricingRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  pricingItem: {
    alignItems: 'center',
  },
  pricingLabel: {
    fontSize: 11,
    color: '#888888',
    marginBottom: 4,
  },
  pricingValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#22C35D',
  },
  slotsDetailBar: {
    height: 6,
    backgroundColor: '#2A2A2A',
    borderRadius: 3,
    overflow: 'hidden',
  },
  slotsDetailFill: {
    height: '100%',
    backgroundColor: '#22C35D',
    borderRadius: 3,
  },
  playersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  playerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0D0D0D',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  playerCardAvailable: {
    backgroundColor: '#22C35D20',
    borderWidth: 1,
    borderColor: '#22C35D',
    borderStyle: 'dashed',
  },
  playerCardIcon: {
    fontSize: 14,
  },
  playerCardName: {
    fontSize: 12,
    color: '#CCCCCC',
  },
  ruleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ruleBullet: {
    fontSize: 14,
    color: '#22C35D',
    marginRight: 10,
  },
  ruleText: {
    fontSize: 13,
    color: '#CCCCCC',
  },
  amenitiesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  amenityChip: {
    backgroundColor: '#0D0D0D',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  amenityText: {
    fontSize: 12,
    color: '#888888',
  },
  detailActions: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  saveMatchButton: {
    flex: 1,
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  saveMatchButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#888888',
  },
  joinNowButton: {
    flex: 2,
    backgroundColor: '#22C35D',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  joinNowButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default FindMatch;
