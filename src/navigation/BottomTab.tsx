import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Home from '../screens/BottomTab/Home/Index';
import FindMatch from '../screens/BottomTab/FindMatch';
import Leaderboard from '../screens/BottomTab/Leaderboard';
import Reward from '../screens/BottomTab/Reward';
import Profile from '../screens/BottomTab/Profile';
import { BottomTabParamList } from '../types/navigationType';

const Tab = createBottomTabNavigator<BottomTabParamList>();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string = '';
          let IconComponent = Ionicons; // Default Icon Component

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
            IconComponent = Ionicons;
          } else if (route.name === 'FindMatch') {
            iconName = focused ? 'map-marker' : 'map-marker-outline';
            IconComponent = MaterialCommunityIcons;
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
            IconComponent = Ionicons;
          } else if (route.name === 'Leaderboard') {
            iconName = focused ? 'trophy' : 'trophy-outline';
            IconComponent = MaterialCommunityIcons;
          } else if (route.name === 'Reward') {
            iconName = focused ? 'card-giftcard' : 'card-giftcard';
            IconComponent = MaterialIcons;
          }

          // You can return any component that you like here!
          return <IconComponent name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#22C35D', // Your primary color
        tabBarInactiveTintColor: 'gray',
        headerStyle: {
          backgroundColor: '#000000', // Dark background
        },
        headerTitleStyle: {
          color: '#FFFFFF',
        },
        tabBarStyle: {
          backgroundColor: '#000000', // Dark background for the tab bar
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="FindMatch" component={FindMatch} />
      <Tab.Screen name="Leaderboard" component={Leaderboard} />
      <Tab.Screen name="Reward" component={Reward} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
export default MyTabs;
