import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Routes from './Routes';
import SplashScreen from '../screens/SplashScreen';

const RootNavigator = () => {
  // const isLoggedIn = true

  // useEffect(() => {
  //   requestUserPermission();
  //   notificationListener();
  // }, []);

  const Stack = createNativeStackNavigator();

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Routes" component={Routes} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default RootNavigator;
