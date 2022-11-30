import {
  ActivityIndicator,
  Animated,
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Color, Fonts} from '../../theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {marketScreenStyles} from './RecommendScreen';

export default function BookingsScreen(props) {
  const renderItem = ({item}) => {
    return (
      <Animated.View
        style={{
          ...styles.portfolioCard,
          // transform: [{translateY: animated}],
        }}>
        <Text
          style={{
            color: '#999',
          }}>
          {item.created_at}
        </Text>
        <View
          style={{
            ...styles.portfolioDetails,
          }}>
          <View style={{...styles.stockIdeas}}>
            <View style={styles.titleContainer}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text style={styles.stockIdeasTitle}>{item.stock_title}</Text>
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
                  ...styles.stockIdeasStatus,
                  color: item.status === 'BUY' ? 'green' : 'red',
                }}>
                {item.Price}
              </Text>
            </View>
            <View style={styles.ideaDetailsContainer}>
              <View style={styles.ideaDetails}>
                <Text
                  style={{
                    ...styles.stockIdeasSubTitle,
                  }}>
                  Holding Period
                </Text>
                <Text style={styles.stockIdeasStat}>{item.Holding_Period}</Text>
              </View>
              <View style={styles.ideaDetails}>
                <Text
                  style={{
                    ...styles.stockIdeasSubTitle,
                  }}>
                  Support Level
                </Text>
                <Text style={styles.stockIdeasStat}>{item.Support_level}</Text>
              </View>
            </View>
            <View style={styles.ideaDetailsContainer}>
              <View style={styles.ideaDetails}>
                <Text
                  style={{
                    ...styles.stockIdeasSubTitle,
                  }}>
                  Resistance
                </Text>
                <Text style={styles.stockIdeasStat}>{item.Resistance}</Text>
              </View>
              <View style={styles.ideaDetails}>
                <Text
                  style={{
                    ...styles.stockIdeasSubTitle,
                  }}>
                  Segment
                </Text>
                <Text style={styles.stockIdeasStat}>{item.Segment}</Text>
              </View>
            </View>
          </View>
        </View>
      </Animated.View>
    );
  };

  if (props?.data.length == 0 && !props?.loading) {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={props?.loading}
            onRefresh={props?.onRefresh}
          />
        }
        style={{
          flex: 1,
          paddingHorizontal: 10,
          backgroundColor: Color.primary,
        }}>
        <View
          style={{
            flexDirection: 'row',
            padding: 15,
          }}>
          <Text
            style={{
              fontSize: 18,
              fontFamily: Fonts.secondaryBold,
            }}>
            Booked Trades
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
            No Bookings
          </Text>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={props?.loading}
          onRefresh={props?.onRefresh}
        />
      }
      showsVerticalScrollIndicator={false}
      style={{flex: 1, backgroundColor: Color.primary}}>
      <View style={styles.container}>
        <View
          style={{
            marginBottom: 25,
            paddingHorizontal: 15,
            flexDirection: 'row',
          }}>
          <Text
            style={{
              fontSize: 18,
              fontFamily: Fonts.secondaryBold,
            }}>
            Booked Trades
          </Text>
        </View>
        {props?.data.length > 0
          ? // <FlatList
            //   data={props?.data}
            //   renderItem={renderItem}
            //   keyExtractor={item => item.id}
            // />
            props?.data.map((item, index) => {
              return <View key={index}>{renderItem({item, index})}</View>;
            })
          : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  ...marketScreenStyles,
});
