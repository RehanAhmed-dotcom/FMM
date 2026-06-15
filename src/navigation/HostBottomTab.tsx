import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { BottomHostTabParamList } from '../types/navigationType';
import HostHome from '../screens/BottomTab/Host/HostHome';
import HostMatchList from '../screens/BottomTab/Host/HostMatchList';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HostProfile from '../screens/BottomTab/Host/HostProfile';
import AntDesign from 'react-native-vector-icons/AntDesign';
import HostCreate from '../screens/BottomTab/Host/HostCreate';
import HostNotifications from '../screens/BottomTab/Host/HostNotifications';
const Tab = createBottomTabNavigator<BottomHostTabParamList>();

function HostTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string = '';
          let IconComponent = Ionicons; // Default Icon Component

          if (route.name === 'HostHome') {
            iconName = focused ? 'home' : 'home-outline';
            IconComponent = Ionicons;
          } else if (route.name === 'HostMatchList') {
            iconName = focused ? 'soccer' : 'soccer';
            IconComponent = MaterialCommunityIcons;
          } else if (route.name === 'HostProfile') {
            iconName = focused ? 'person' : 'person-outline';
            IconComponent = Ionicons;
          } else if (route.name === 'HostCreate') {
            iconName = focused ? 'plus' : 'plus';
            IconComponent = AntDesign;
          } else if (route.name === 'HostNotifications') {
            iconName = focused ? 'notifications' : 'notifications-outline';
            IconComponent = Ionicons;
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
      <Tab.Screen
        name="HostHome"
        component={HostHome}
        options={{ tabBarLabel: 'Home' }}
      />
      <Tab.Screen
        name="HostMatchList"
        component={HostMatchList}
        options={{ tabBarLabel: 'Matches' }}
      />
      <Tab.Screen
        name="HostCreate"
        component={HostCreate}
        options={{ tabBarLabel: 'Create' }}
      />
      <Tab.Screen
        name="HostProfile"
        component={HostProfile}
        options={{ tabBarLabel: 'Profile' }}
      />
      <Tab.Screen
        name="HostNotifications"
        component={HostNotifications}
        options={{ tabBarLabel: 'Notifications' }}
      />

      {/* <Tab.Screen name="FindMatch" component={FindMatch} />
      <Tab.Screen name="Leaderboard" component={Leaderboard} />
      <Tab.Screen name="Reward" component={Reward} />
      <Tab.Screen name="Profile" component={Profile} /> */}
    </Tab.Navigator>
  );
}
export default HostTabs;
