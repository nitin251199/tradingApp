import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Color} from '../theme';
import AppHeader from './AppHeader';
import DrawerContent from './DrawerContent';
import AuthStack from './AuthStack';
import {useSelector} from 'react-redux';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import PLSummary from '../screens/PLSummary';
import ReferScreen from '../screens/ReferScreen';
import NewsDetails from '../screens/NewsDetails';
import HomeStackScreen from './StackNavigators/HomeStackScreen';
import SubscriptionScreen from '../screens/SubscriptionScreen';

export default function Routes() {
  const Drawer = createDrawerNavigator();

  const isLoggedIn = useSelector(state => state.isLoggedIn) || false;

  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerContent {...props} />}
      initialRouteName={!isLoggedIn ? 'Auth' : null}
      screenOptions={{
        header: props => <AppHeader {...props} />,
        headerStyle: {
          backgroundColor: Color.secondary,
        },
      }}>
      <Drawer.Screen name="Home" component={HomeStackScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="PLSummary" component={PLSummary} />
      <Drawer.Screen name="Subscription" component={SubscriptionScreen} />
      <Drawer.Screen name="Refer" component={ReferScreen} />
      <Drawer.Screen name="NewsDetail" component={NewsDetails} />
      <Drawer.Screen
        name="Auth"
        component={AuthStack}
        options={{
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
}
