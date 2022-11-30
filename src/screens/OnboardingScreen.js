import React from 'react';
import {Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {Color, Dimension} from '../theme';

import Onboarding from 'react-native-onboarding-swiper';

const Skip = ({...props}) => (
  <TouchableOpacity style={{marginHorizontal: 20}} {...props}>
    <Text style={{fontSize: 16, color: Color.black}}>Skip</Text>
  </TouchableOpacity>
);

const Next = ({...props}) => (
  <TouchableOpacity style={{marginHorizontal: 20}} {...props}>
    <Text style={{fontSize: 16, color: Color.black}}>Next</Text>
  </TouchableOpacity>
);

const Done = ({...props}) => (
  <TouchableOpacity style={{marginHorizontal: 20}} {...props}>
    <Text style={{fontSize: 16, color: Color.black}}>Done</Text>
  </TouchableOpacity>
);

const OnboardingScreen = ({navigation}) => {
  return (
    <Onboarding
      SkipButtonComponent={Skip}
      NextButtonComponent={Next}
      DoneButtonComponent={Done}
      imageContainerStyles={{
        padding: 120,
      }}
      // bottomBarHighlight={false}
      // bottomBarHeight={0}
      // showPagination={false}
      onSkip={() => navigation.replace('Login')}
      onDone={() => navigation.navigate('Login')}
      pages={[
        {
          backgroundColor: '#FFCB42',
          image: (
            <Image
              source={require('../assets/images/logo.jpg')}
              style={{
                resizeMode: 'stretch',
                width: Dimension.window.width,
                height: Dimension.window.height,
              }}
            />
          ),
          title: 'Connect to the World',
          subtitle: 'A New Way To Connect With The World',
        },
        {
          backgroundColor: '#FFCB42',
          image: (
            <Image
              source={require('../assets/images/onboarding-img2.png')}
              style={{
                resizeMode: 'stretch',
                width: Dimension.window.width,
                height: Dimension.window.height,
              }}
            />
          ),
          title: 'Info',
          subtitle: 'Info',
        },
      ]}
    />
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
