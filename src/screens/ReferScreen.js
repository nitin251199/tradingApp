import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Color, Fonts} from '../theme';

export default function ReferScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Refer & Earn</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.primary,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontFamily: Fonts.secondaryBold,
  },
});
