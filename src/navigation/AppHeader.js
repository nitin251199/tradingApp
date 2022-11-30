import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Color, Dimension} from '../theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function AppHeader({navigation, route}) {
  return (
    <SafeAreaView>
      <StatusBar
        barStyle={'dark-content'}
        translucent
        backgroundColor={Color.secondary}
      />
      <View
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: Dimension.window.width,
          backgroundColor: Color.secondary,
          height: Dimension.window.height * 0.065,
          flexDirection: 'row',
          paddingHorizontal: 10,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            style={{marginHorizontal: 15}}>
            <MaterialCommunityIcons name="menu" color={'#000'} size={25} />
          </TouchableOpacity>
          <Text style={styles.heading}>{route.name}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  heading: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
