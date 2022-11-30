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
import {SegmentedButtons} from 'react-native-paper';
import {Color, Fonts} from '../theme';
import {marketScreenStyles} from './HomeScreen/RecommendScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {getData} from '../API';
import {useEffect} from 'react';

export default function PLSummary(props) {
  const [data, setData] = React.useState([]);
  const [allData, setAllData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [value, setValue] = React.useState('');

  const fetchData = async () => {
    const response = await getData('api/getPandLsummary');
    if (response.success) {
      let sortedData = response.data.sort(
        (a, b) =>
          new Date(Date.parse(b.created_at)) -
          new Date(Date.parse(a.created_at)),
      );

      setData(sortedData);
      setAllData(sortedData);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onValueChange = value => {
    setValue(value);
    let filterData = allData.filter(item => item.Holding_Period === value);
    setData(filterData);
  };

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

  if (data.length == 0 && !loading) {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }
        style={{
          flex: 1,
          backgroundColor: Color.primary,
        }}>
        <View style={styles.container}>
          <View
            style={{
              marginBottom: 25,
              marginLeft: 2,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontSize: 18,
                fontFamily: Fonts.secondaryBold,
              }}>
              P & L Summary
            </Text>
            <TouchableOpacity
              onPress={() => {
                onRefresh();
                setValue('');
              }}>
              <MaterialCommunityIcons
                name="refresh"
                size={24}
                color={Color.white}
                style={{marginRight: 10}}
              />
            </TouchableOpacity>
          </View>
          <SegmentedButtons
            value={value}
            onValueChange={onValueChange}
            buttons={[
              {
                value: 'INTRADAY',
                label: 'Intraday',
                style: {
                  borderRadius: 5,
                },
              },
              {
                value: 'DELIVERY',
                label: 'Delivery',
                style: {
                  borderRadius: 0,
                },
              },
              {
                value: 'SWING',
                label: 'Swing',
                style: {
                  borderRadius: 0,
                },
              },
              {
                value: 'BTST',
                label: 'BTST',
                style: {
                  borderRadius: 5,
                },
              },
            ]}
            style={{
              marginBottom: 20,
            }}
            density="regular"
          />
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
              No P & L Summary
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }

  const onRefresh = () => {
    setData([]);
    setLoading(true);
    fetchData();
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={onRefresh} />
      }
      showsVerticalScrollIndicator={false}
      style={{flex: 1, backgroundColor: Color.primary}}>
      <View style={styles.container}>
        <View
          style={{
            marginBottom: 25,
            marginLeft: 2,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontSize: 18,
              fontFamily: Fonts.secondaryBold,
            }}>
            P & L Summary
          </Text>
          <TouchableOpacity onPress={() => onRefresh()}>
            <MaterialCommunityIcons
              name="refresh"
              size={24}
              color={Color.white}
              style={{marginRight: 10}}
            />
          </TouchableOpacity>
        </View>
        <SegmentedButtons
          value={value}
          onValueChange={onValueChange}
          buttons={[
            {
              value: 'INTRADAY',
              label: 'Intraday',
              style: {
                borderRadius: 5,
              },
            },
            {
              value: 'DELIVERY',
              label: 'Delivery',
              style: {
                borderRadius: 0,
              },
            },
            {
              value: 'SWING',
              label: 'Swing',
              style: {
                borderRadius: 0,
              },
            },
            {
              value: 'BTST',
              label: 'BTST',
              style: {
                borderRadius: 5,
              },
            },
          ]}
          style={{
            marginBottom: 20,
          }}
          density="regular"
        />
        {data.length > 0 ? (
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        ) : null}
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

const styles = StyleSheet.create({
  ...marketScreenStyles,
});
