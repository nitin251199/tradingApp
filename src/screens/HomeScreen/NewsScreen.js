import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Color, Fonts} from '../../theme';
import {getData, ServerURL} from '../../API';
import {useDispatch, useSelector} from 'react-redux';

export default function NewsScreen(props) {
  const fakeNews = [
    {
      id: 1,
      title:
        'Sensex atop 60K, but over 240 stocks still 68% away from 52-week highs',
      description:
        'According to the data from Ace Equity, as many as 240 stocks or 48 per cent shares of the index are down more than 20 per cent from the 52-week highs. BSE500 index constitutes about 95 per cent market cap of all BSE-listed companies.',
      date: '5 min ago',
      image:
        'https://economictimes.indiatimes.com/thumb/msid-90536739,quality-100,width-190,height-145,imglength-765180,resizemode-1/markets/stocks/news/bank-stocks-that-can-rally-at-least-20-in-the-near-term.jpg',
    },
    {
      id: 2,
      title: 'Bharat Electronics trades ex-bonus, shares hit 52-week high',
      description:
        'BEL is a largecap scrip commanding a market capitalisation of nearly Rs 82,000 crore. It is a Navratna company under the Ministry of Defence, Government of India. It manufactures state-of-the-art electronic products and systems for the Army, Navy and Air Force.',
      date: '10 min ago',
      image:
        'https://economictimes.indiatimes.com/thumb/msid-90493489,quality-100,width-190,height-145,imglength-455926,resizemode-1/markets/stocks/news/check-out-which-nifty50-stocks-analysts-recommend-buying-this-week.jpg',
    },
    {
      id: 3,
      title:
        'Tata Motors, HDFC Bank among 8 stocks that can rally in near term',
      description:
        'Domestic equity markets staged a smart recovery on Wednesday thanks to strong buying action in banking and financial counters. Amid rising volatility, analysts believe that technicals suggest some solid action in select counters in the near term. Based on analysts recommendations, here are some stocks to look at',
      date: '20 min ago',
      image:
        'https://images.livemint.com/img/2022/09/15/600x338/PTI01-28-2022-000035B-0_1645859283821_1663203595515_1663203595515.jpg',
    },
    {
      id: 4,
      title:
        'Stocks to buy or sell today: 9 short-term trading ideas by experts for 15 September 2022',
      description:
        'On the technical front, the key resistance level for Nifty50 is 18,100 and on the downside, 17,900 can act as strong support, he said, adding that key resistance and support levels for Bank Nifty are 41,900 and 40,800 respectively.',
      date: '1 hr ago',
      image:
        'https://img.etimg.com/thumb/msid-94215401,width-160,height-120,imgsize-858681/stocks-to-buy-or-sell-today-9-short-term-trading-ideas-by-experts-for-15-september-2022.jpg',
    },
    {
      id: 5,
      title:
        'Chart Check: After 30% in a month, this smallcap stock may take out October 2021 highs in 6 month',
      description:
        "DCW has generated great success to emerge as one of India's fastest-growing multi-product multi-location chemical companies. It is an industry pioneer with a strong presence in the Chlor-Akali, Synthetic Rutile, and PVC business segments, the company website said.",
      date: '12 hrs ago',
      image:
        'https://img.etimg.com/thumb/msid-94215164,width-160,height-120,imgsize-27020/chart-check-after-30-in-a-month-this-smallcap-stock-may-take-out-october-2021-highs-in-6-months.jpg',
    },
    {
      id: 6,
      title:
        'Chart Check: After 30% in a month, this smallcap stock may take out October 2021 highs in 6 month',
      description:
        "DCW has generated great success to emerge as one of India's fastest-growing multi-product multi-location chemical companies. It is an industry pioneer with a strong presence in the Chlor-Akali, Synthetic Rutile, and PVC business segments, the company website said.",
      date: '12 hrs ago',
      image:
        'https://img.etimg.com/thumb/msid-94215164,width-160,height-120,imgsize-27020/chart-check-after-30-in-a-month-this-smallcap-stock-may-take-out-october-2021-highs-in-6-months.jpg',
    },
    {
      id: 7,
      title:
        'Chart Check: After 30% in a month, this smallcap stock may take out October 2021 highs in 6 month',
      description:
        "DCW has generated great success to emerge as one of India's fastest-growing multi-product multi-location chemical companies. It is an industry pioneer with a strong presence in the Chlor-Akali, Synthetic Rutile, and PVC business segments, the company website said.",
      date: '12 hrs ago',
      image:
        'https://img.etimg.com/thumb/msid-94215164,width-160,height-120,imgsize-27020/chart-check-after-30-in-a-month-this-smallcap-stock-may-take-out-october-2021-highs-in-6-months.jpg',
    },
    {
      id: 8,
      title:
        'Chart Check: After 30% in a month, this smallcap stock may take out October 2021 highs in 6 month',
      description:
        "DCW has generated great success to emerge as one of India's fastest-growing multi-product multi-location chemical companies. It is an industry pioneer with a strong presence in the Chlor-Akali, Synthetic Rutile, and PVC business segments, the company website said.",
      date: '12 hrs ago',
      image:
        'https://img.etimg.com/thumb/msid-94215164,width-160,height-120,imgsize-27020/chart-check-after-30-in-a-month-this-smallcap-stock-may-take-out-october-2021-highs-in-6-months.jpg',
    },
  ];

  const [news, setNews] = React.useState(props?.data);

  const newsCount = useSelector(state => state.newsCount);
  const dispatch = useDispatch();

  if (props?.data.length == 0 && !props?.loading) {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={props?.loading}
            onRefresh={props.onRefresh}
          />
        }
        style={{
          flex: 1,
          backgroundColor: Color.primary,
          alignItems: 'center',
        }}>
        <View
          style={{
            paddingHorizontal: 20,
            paddingTop: 20,
            width: '100%',
          }}>
          <Text
            style={{
              fontSize: 18,
              fontFamily: Fonts.secondaryBold,
            }}>
            News
          </Text>
        </View>
        <Text
          style={{
            fontSize: 18,
            color: Color.grey,
          }}>
          No News to show
        </Text>
      </ScrollView>
    );
  }

  const newsItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.newsItem}
        onPress={() => {
          props.navigation.navigate('NewsDetail', {
            id: item.id,
            image: item.image,
          });
          dispatch({
            type: 'SET_NEWS_COUNT',
            payload: newsCount - 1,
          });
        }}>
        <View
          style={{
            width: '70%',
          }}>
          <Text style={styles.newsDate}>{item.created_at}</Text>
          <Text style={styles.newsTitle}>{item.title}</Text>
        </View>
        <Image
          style={styles.newsImage}
          source={{
            uri: `${ServerURL}/api/${item?.image}`,
          }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          paddingHorizontal: 20,
          paddingTop: 20,
          width: '100%',
        }}>
        <Text
          style={{
            fontSize: 18,
            fontFamily: Fonts.secondaryBold,
          }}>
          News ({newsCount})
        </Text>
      </View>

      <FlatList
        data={news}
        refreshControl={
          <RefreshControl
            refreshing={props?.loading}
            onRefresh={props.onRefresh}
          />
        }
        renderItem={newsItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Color.primary,
  },
  newsItem: {
    padding: 10,
    // marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Color.white,
  },
  newsDescription: {
    fontSize: 14,
    color: Color.grey,
  },
  newsDate: {
    fontSize: 12,
    color: Color.gray,
  },
  newsImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    margin: 10,
  },
});
