import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import ViewSlider from './ViewSlider';
import Dimension from '../theme/Dimension';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Color from '../theme/Color';
const {width, height} = Dimension.window;

function BannerSlider() {
  return (
    <ViewSlider
      renderSlides={
        <>
          <View style={styles.viewBox}>
            <TouchableOpacity>
              <Image
                style={{...styles.bannerImage, ...styles.moreStyles}}
                source={require('../assets/images/logo.jpg')}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.viewBox}>
            <TouchableOpacity>
              <Image
                style={{...styles.bannerImage, ...styles.moreStyles}}
                source={require('../assets/images/onboarding-img2.png')}
              />
            </TouchableOpacity>
          </View>
        </>
      }
      style={styles.slider} //Main slider container style
      height={230} //Height of your slider
      slideCount={2} //How many views you are adding to slide
      dots={true} // Pagination dots visibility true for visibile
      dotActiveColor={Color.primary} //Pagination dot active color
      dotInactiveColor={Color.gray} // Pagination do inactive color
      dotsContainerStyle={styles.dotContainer} // Container style of the pagination dots
      autoSlide={true} //The views will slide automatically
      slideInterval={3000} //In Miliseconds
    />
  );
}
const styles = StyleSheet.create({
  viewBox: {
    // paddingHorizontal: 20,
    justifyContent: 'center',
    backgroundColor:'#fff',
    // width: width,
    alignItems: 'center',
    height: '100%',
  },
  slider: {
    // alignSelf: 'center',
    // justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  dotContainer: {
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 0,
  },
  moreStyles: {
    height: 230,
    width,
    resizeMode: 'contain',
  },
});

export default BannerSlider;
