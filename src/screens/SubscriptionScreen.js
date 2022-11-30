import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Color, Fonts} from '../theme';

export default function SubscriptionScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Subscribe Us !</Text>
      <View style={styles.box}>
        <Text style={styles.boxText}>Equity Subscription</Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.boxText}>Options Subscription</Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.boxText}>Combo Subscription</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.primary,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: Fonts.secondaryBold,
  },
  box: {
    borderWidth: 1,
    borderColor: Color.secondary,
    borderRadius: 5,
    backgroundColor: Color.primaryDark,
    padding: 20,
    marginTop: 20,
    elevation: 10,
    shadowColor: Color.primaryDark,
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.7,
    shadowRadius: 15,
  },
  boxText: {
    fontSize: 18,
    fontFamily: Fonts.primaryRegular,
    textAlign: 'center',
  },
});
