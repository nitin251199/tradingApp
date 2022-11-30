import {
  Alert,
  Image,
  NativeModules,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {Color} from '../theme';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {postData} from '../API';

export default function SplashScreen({navigation}) {
  const DEVICE_ID =
    Platform.OS === 'android'
      ? NativeModules.PlatformConstants.getAndroidID()
      : NativeModules.SettingsManager.clientUniqueId;

  const dispatch = useDispatch();

  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const user = useSelector(state => state.user);

  const checkDeviceId = async () => {
    if (isLoggedIn) {
      let body = {
        device_id: DEVICE_ID,
        user_id: user?.user_id,
      };
      let res = await postData('api/getCheckdeviceid', body);
      if (res.success == false) {
        Alert.alert(
          'Different Device detected',
          'You have been logged out from this device. Please login again to continue.',
        );
        dispatch({type: 'LOGOUT'});
      }
    }
    setTimeout(() => {
      navigation.replace('Routes');
    }, 3000);
  };

  useEffect(() => {
    checkDeviceId();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} backgroundColor={'#000'} animated />
      <Image
        source={require('../assets/images/splash.png')}
        style={styles.logo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});
