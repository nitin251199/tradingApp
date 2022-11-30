import {Dimensions} from 'react-native';
const windowHeight = Dimensions.get('window').height;
export function useSwipeRefresh(onSwipe, rangeOffset = 4) {
  let firstTouch = 0;
  // set user touch start position
  function onTouchStart(e) {
    firstTouch = e.nativeEvent.pageY;
  }
  // when touch ends check for swipe directions
  function onTouchEnd(e) {
    // get touch position and screen size
    const positionY = e.nativeEvent.pageY;
    const range = windowHeight / rangeOffset;
    // check if position is growing positively and has reached specified range
    if (positionY - firstTouch > range) {
      console.log('swipe down');
       onSwipe();
    }
    // check if position is growing negatively and has reached specified range
    // else if (firstTouch - positionY > range) {
    //   onSwipeLeft && onSwipeLeft();
    // }
  }
  return {onTouchStart, onTouchEnd};
}
