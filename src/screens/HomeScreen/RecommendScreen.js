import {
  ActivityIndicator,
  Animated,
  Easing,
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Color, Dimension, Fonts} from '../../theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useEffect} from 'react';
import {useSwipeRefresh} from '../../hooks/useSwipeRefresh';

export default function RecommendScreen(props) {
  const animated = new Animated.Value(100);
  const duration = 300;

  useEffect(() => {
    Animated.sequence([
      Animated.delay(300),
      Animated.timing(animated, {
        toValue: 0,
        duration: duration,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const renderItem = ({item}) => {
    return (
      <Animated.View
        style={{
          ...marketScreenStyles.portfolioCard,
          // transform: [{translateY: animated}],
        }}>
        <View
          style={{
            ...marketScreenStyles.portfolioDetails,
          }}>
          <View style={{...marketScreenStyles.stockIdeas}}>
            <View style={marketScreenStyles.titleContainer}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text style={marketScreenStyles.stockIdeasTitle}>
                  {item.stock_title}
                </Text>
                <Text
                  style={{
                    paddingHorizontal: 10,
                    marginHorizontal: 10,
                    lineHeight: 14 * 1.5,
                    backgroundColor: item.status === 'BUY' ? 'green' : 'red',
                    borderRadius: 5,
                  }}>
                  {item.status}
                </Text>
              </View>
              <Text
                style={{
                  ...marketScreenStyles.stockIdeasStatus,
                  color: item.status === 'BUY' ? 'green' : 'red',
                }}>
                {item.Price}
              </Text>
            </View>
            <View style={marketScreenStyles.ideaDetailsContainer}>
              <View style={marketScreenStyles.ideaDetails}>
                <Text
                  style={{
                    ...marketScreenStyles.stockIdeasSubTitle,
                  }}>
                  Holding Period
                </Text>
                <Text style={marketScreenStyles.stockIdeasStat}>
                  {item.Holding_Period}
                </Text>
              </View>
              <View style={marketScreenStyles.ideaDetails}>
                <Text
                  style={{
                    ...marketScreenStyles.stockIdeasSubTitle,
                  }}>
                  Support Level
                </Text>
                <Text style={marketScreenStyles.stockIdeasStat}>
                  {item.Support_level}
                </Text>
              </View>
            </View>
            <View style={marketScreenStyles.ideaDetailsContainer}>
              <View style={marketScreenStyles.ideaDetails}>
                <Text
                  style={{
                    ...marketScreenStyles.stockIdeasSubTitle,
                  }}>
                  Resistance
                </Text>
                <Text style={marketScreenStyles.stockIdeasStat}>
                  {item.Resistance}
                </Text>
              </View>
              <View style={marketScreenStyles.ideaDetails}>
                <Text
                  style={{
                    ...marketScreenStyles.stockIdeasSubTitle,
                  }}>
                  Segment
                </Text>
                <Text style={marketScreenStyles.stockIdeasStat}>
                  {item.Segment}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Animated.View>
    );
  };

  // const {onTouchStart, onTouchEnd} = useSwipeRefresh(onSwipe, 4);

  // function onSwipe() {
  //   console.log('swipe down>>>>>>>>>>>');
  //   props.onRefresh();
  // }

  if (props?.data.length == 0 && !props?.loading) {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={props?.loading} onRefresh={props.onRefresh} />
        }
        style={{
          flex: 1,
          backgroundColor: Color.primary,
        }}>
        <View style={marketScreenStyles.container}>
          <View
            style={{
              marginBottom: 25,
              marginLeft: 2,
            }}>
            <Text
              style={{
                fontSize: 18,
                fontFamily: Fonts.secondaryBold,
              }}>
              Today's Recommendations
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: 300,
            }}>
            <Text
              style={{
                fontSize: 18,
                color: Color.grey,
              }}>
              No Recommendations
            </Text>
          </View>
        </View>
        {/* <Image
          source={require('../../assets/images/banner.jpg')}
          style={{
            width: Dimension.window.width,
            height: 150,
            marginVertical: 30,
          }}
        /> */}
      </ScrollView>
    );
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={props?.loading}
          onRefresh={props.onRefresh}
        />
      }
      showsVerticalScrollIndicator={false}
      style={{flex: 1, backgroundColor: Color.primary}}>
      <View
        style={marketScreenStyles.container}
        // onTouchStart={onTouchStart}
        // onTouchEnd={onTouchEnd}
      >
        <View
          style={{
            marginBottom: 25,
            marginLeft: 2,
            flexDirection: 'row',
          }}>
          <Text
            style={{
              fontSize: 18,
              fontFamily: Fonts.secondaryBold,
            }}>
            Today's Recommendations
          </Text>
        </View>
        {props?.data.length > 0 ? (
          // <FlatList
          //   data={props?.data}
          //   renderItem={renderItem}
          //   keyExtractor={item => item.id}
          // />
          props?.data.map((item, index) => {
            return <View key={index}>{renderItem({item, index})}</View>;
          })
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              height: 300,
            }}>
            {/* <ActivityIndicator size={'large'} color={Color.green} /> */}
          </View>
        )}
      </View>
      {/* <Image
        source={require('../../assets/images/banner.jpg')}
        style={{
          width: Dimension.window.width,
          height: 150,
          marginVertical: 30,
        }}
      /> */}
    </ScrollView>
  );
}

export const marketScreenStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginVertical: 15,
  },
  portfolioCard: {
    backgroundColor: '#000',
    marginBottom: 20,
    borderRadius: 5,
    padding: 15,
    width: Dimension.window.width - 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
  },
  portfolioDetails: {
    paddingHorizontal: 5,
    marginVertical: 5,
  },
  stockIdeas: {
    flexDirection: 'column',
  },
  stockIdeasTitle: {
    textTransform: 'uppercase',
    fontSize: 17,
    fontFamily: Fonts.secondaryMedium,
    color: Color.white,
  },
  stockIdeasSubTitle: {
    color: Color.grey,
    fontSize: 14,
  },
  ideaDetailsContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    paddingTop: 10,
  },
  ideaDetails: {
    flexDirection: 'column',
    width: '60%',
  },
  stockIdeasStat: {
    fontFamily: Fonts.secondaryMedium,
    fontSize: 17,
  },
  stockIdeasStatus: {
    color: Color.white,
    fontWeight: '700',
    fontSize: 18,
    // lineHeight: 16 * 1.5,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
