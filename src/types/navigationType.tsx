// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { RouteProp } from '@react-navigation/native';
// import { BottomTabNavigationProp as RNBottomTabNavigationProp } from '@react-navigation/bottom-tabs';
// import { BottomTabNavigationProp as RNBottomTabHostNavigationProp } from '@react-navigation/bottom-tabs';
// // 1. Define all screens and their params
// export type RootStackParamList = {
//   OnBoarding: undefined;
//   Selection: undefined;
//   Register: undefined;
//   Login: undefined;
//   EmailAndCode: undefined;
//   Notifications: undefined;
//   NewPassword: undefined;
//   OTPVerify: undefined;
//   Home: undefined;
//   Signup: undefined;
//   ProfileSetup: undefined;
//   MatchDetail: { id: number };
//   Terms: undefined;
//   Privacy: undefined;
//   Profile: { userId: string };
//   Payment: undefined;
//   HostLogin: undefined;
//   HostSignup: undefined;
//   Settings: undefined;
//   EditProfile: undefined;
//   HostProfileSetup: undefined;
//   MyTabs:
//     | {
//         screen: keyof BottomTabParamList;
//       }
//     | undefined;
// };

// export type BottomTabParamList = {
//   Home: undefined;
//   FindMatch: undefined;
//   Leaderboard: undefined;
//   Reward: undefined;
//   Profile: undefined;
// };
// export type BottomHostTabParamList = {
//   HostHome: undefined;
//   HostMatch: undefined;
// };

// // 2. Reusable navigation prop type
// export type RootNavigationProp<T extends keyof RootStackParamList> =
//   NativeStackNavigationProp<RootStackParamList, T>;

// // 3. Reusable route prop type (for reading params)
// export type RootRouteProp<T extends keyof RootStackParamList> = RouteProp<
//   RootStackParamList,
//   T
// >;
// export type BottomTabNavigationProp<T extends keyof BottomTabParamList> =
//   RNBottomTabNavigationProp<BottomTabParamList, T>;

// export type BottomTabRouteProp<T extends keyof BottomTabParamList> = RouteProp<
//   BottomTabParamList,
//   T
// >;
// export type BottomTabNavigationProp<T extends keyof BottomHostTabParamList> =
//   RNBottomTabNavigationProp<BottomHostTabParamList, T>;

// export type BottomTabRouteProp<T extends keyof BottomHostTabParamList> =
//   RouteProp<BottomHostTabParamList, T>;
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { BottomTabNavigationProp as RNBottomTabNavigationProp } from '@react-navigation/bottom-tabs';

// 1. Define all screens and their params
export type RootStackParamList = {
  OnBoarding: undefined;
  Selection: undefined;
  Register: undefined;
  Login: undefined;
  EmailAndCode: undefined;
  Notifications: undefined;
  NewPassword: undefined;
  OTPVerify: undefined;
  Home: undefined;
  Signup: undefined;
  ProfileSetup: undefined;
  MatchDetail: { id: number };
  Terms: undefined;
  Privacy: undefined;
  Profile: { userId: string };
  HostWithdraw: undefined;
  Payment: undefined;
  HostLogin: undefined;
  HostSignup: undefined;
  Settings: undefined;
  EditProfile: undefined;
  HostProfileSetup: undefined;
  HostCreateMatch: undefined;
  HostManageMatch: undefined;
  HostSingleMatchDetail: undefined;
  MyTabs: { screen: keyof BottomTabParamList } | undefined;
  HostTabs: { screen: keyof BottomHostTabParamList } | undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  FindMatch: undefined;
  Leaderboard: undefined;
  Reward: undefined;
  Profile: undefined;
};

export type BottomHostTabParamList = {
  HostHome: undefined;
  HostNotifications: undefined;
  HostCreate: undefined;
  HostProfile: undefined;
  HostMatchList: undefined;
};

// 2. Reusable navigation prop type
export type RootNavigationProp<T extends keyof RootStackParamList> =
  NativeStackNavigationProp<RootStackParamList, T>;

// 3. Reusable route prop type
export type RootRouteProp<T extends keyof RootStackParamList> = RouteProp<
  RootStackParamList,
  T
>;

// --- User bottom tabs ---
export type BottomTabNavigationProp<T extends keyof BottomTabParamList> =
  RNBottomTabNavigationProp<BottomTabParamList, T>;

export type BottomTabRouteProp<T extends keyof BottomTabParamList> = RouteProp<
  BottomTabParamList,
  T
>;

// --- Host bottom tabs ---
export type BottomHostTabNavigationProp<
  T extends keyof BottomHostTabParamList,
> = RNBottomTabNavigationProp<BottomHostTabParamList, T>;

export type BottomHostTabRouteProp<T extends keyof BottomHostTabParamList> =
  RouteProp<BottomHostTabParamList, T>;
