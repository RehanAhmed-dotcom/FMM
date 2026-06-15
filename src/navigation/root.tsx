import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnBoarding from '../screens/Auth/OnBoarding';
import { RootStackParamList } from '../types/navigationType';
import Selection from '../screens/Auth/Selection';
import Login from '../screens/Auth/Login';
import EmailAndCode from '../screens/Auth/EmailAndCode';
import NewPassword from '../screens/Auth/NewPassword';
import Signup from '../screens/Auth/Signup';
import Privacy from '../screens/Auth/Privacy';
import Terms from '../screens/Auth/Terms';
import OTPVerify from '../screens/Auth/OTPVerify';
import ProfileSetup from '../screens/Auth/ProfileSetup';
import Home from '../screens/BottomTab/Home/Index';
import MyTabs from './BottomTab';
import Notifications from '../screens/ExtraScreens/Notifications';
import MatchDetail from '../screens/ExtraScreens/MatchDetail';
import Payment from '../screens/ExtraScreens/Payment';
import EditProfile from '../screens/ExtraScreens/EditProfile';
import HostLogin from '../screens/Auth/HostLogin';
import HostSignup from '../screens/Auth/HostSignup';
import HostProfileSetup from '../screens/Auth/HostProfileSetup';
import HostTabs from './HostBottomTab';
import HostCreateMatch from '../screens/ExtraScreens/Host/HostCreateMatch';
import HostSingleMatchDetail from '../screens/ExtraScreens/Host/HostSingleMatchDetail';
import HostManageMatch from '../screens/ExtraScreens/Host/HostManageMatch';
import HostWithdraw from '../screens/ExtraScreens/Host/HostWithdraw';
// export type RootStackParamList = {
//   OnBoarding: undefined;
// };

const Stack = createNativeStackNavigator<RootStackParamList>();

const Root = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="OnBoarding" component={OnBoarding} />
        <Stack.Screen name="Selection" component={Selection} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="EmailAndCode" component={EmailAndCode} />
        <Stack.Screen name="NewPassword" component={NewPassword} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Privacy" component={Privacy} />
        <Stack.Screen name="Terms" component={Terms} />
        <Stack.Screen name="OTPVerify" component={OTPVerify} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ProfileSetup" component={ProfileSetup} />
        <Stack.Screen name="MyTabs" component={MyTabs} />
        <Stack.Screen name="HostTabs" component={HostTabs} />
        <Stack.Screen name="MatchDetail" component={MatchDetail} />
        <Stack.Screen name="Notifications" component={Notifications} />
        <Stack.Screen name="Payment" component={Payment} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="HostLogin" component={HostLogin} />
        <Stack.Screen name="HostSignup" component={HostSignup} />
        <Stack.Screen name="HostProfileSetup" component={HostProfileSetup} />
        <Stack.Screen name="HostCreateMatch" component={HostCreateMatch} />
        <Stack.Screen name="HostManageMatch" component={HostManageMatch} />
        <Stack.Screen name="HostWithdraw" component={HostWithdraw} />
        <Stack.Screen
          name="HostSingleMatchDetail"
          component={HostSingleMatchDetail}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Root;
