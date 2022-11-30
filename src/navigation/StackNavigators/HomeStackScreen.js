import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../../screens/HomeScreen';
import NewsDetails from '../../screens/NewsDetails';
import EnquireScreen from '../../screens/EnquireScreen';

const Stack = createNativeStackNavigator();

const HomeStackScreen = ({navigation}) => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      // unmountOnBlur: true,
    }}>
    <Stack.Screen
      name="HomeScreen"
      component={HomeScreen}
      options={{
        title: 'Home',
      }}
    />
    <Stack.Screen
      name="NewsDetail"
      component={NewsDetails}
      options={{
        title: 'News Detail',
      }}
    />
    <Stack.Screen
      name="Enquire"
      component={EnquireScreen}
      options={{
        title: 'Enquire',
      }}
    />
  </Stack.Navigator>
);

export default HomeStackScreen;
