import React from 'react';
import {Color, Dimension} from '../../theme';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import RecommendScreen from './RecommendScreen';
import NewsScreen from './NewsScreen';
import {getData} from '../../API';
import WatchlistScreen from './WatchlistScreen';
import BookingsScreen from './BookingsScreen';
import {useDispatch, useSelector} from 'react-redux';
import {StyleSheet, View} from 'react-native';
import {FAB} from 'react-native-paper';

export default function HomeScreen({navigation}) {
  const [index, setIndex] = React.useState(0);
  const [routes, setRoutes] = React.useState([
    {key: 'first', title: 'Today Recommendations'},
    {key: 'second', title: 'Watchlist'},
    {key: 'third', title: 'Bookings'},
    {key: 'fourth', title: 'News'},
  ]);

  const [today, setToday] = React.useState([]);
  const [todayLoading, setTodayLoading] = React.useState(true);
  const [watchlist, setWatchlist] = React.useState([]);
  const [watchlistLoading, setWatchlistLoading] = React.useState(true);
  const [bookings, setBookings] = React.useState([]);
  const [bookingsLoading, setBookingsLoading] = React.useState(true);
  const [news, setNews] = React.useState([]);
  const [newsLoading, setNewsLoading] = React.useState(true);

  const dispatch = useDispatch();
  const newsCount = useSelector(state => state.newsCount);
  const prevNewsCount = useSelector(state => state.prevNewsCount);

  const fetchNews = async () => {
    const response = await getData('api/getNews');
    if (response.success) {
      setNews(response.data.reverse());
      if (prevNewsCount !== response.data.length) {
        dispatch({
          type: 'SET_NEWS_COUNT',
          payload: response.data.length - prevNewsCount + newsCount,
        });
        dispatch({
          type: 'SET_PREV_NEWS_COUNT',
          payload: response.data.length,
        });
      }
    }
    setNewsLoading(false);
  };

  const onNewsRefresh = () => {
    setNews([]);
    setNewsLoading(true);
    fetchNews();
  };

  const fetchToday = async () => {
    let res = await getData('api/getToday');
    if (res.success) {
      setToday(res.data.reverse());
      setRoutes(prev => [
        {
          key: 'first',
          title: `Today Recommendations (${res.data.length})`,
        },
        ...prev.filter(item => item.key !== 'first'),
      ]);
    }
    setTodayLoading(false);
  };

  const onTodayRefresh = () => {
    setToday([]);
    setTodayLoading(true);
    fetchToday();
  };

  const fetchWatchlist = async () => {
    let res = await getData('api/getWatch');
    if (res.success) {
      setWatchlist(res.data.reverse());
    }
    setWatchlistLoading(false);
  };

  const onWatchlistRefresh = () => {
    setWatchlist([]);
    setWatchlistLoading(true);
    fetchWatchlist();
  };

  const fetchBookings = async () => {
    let res = await getData('api/getBookedtrade');
    if (res.success) {
      setBookings(res.data.reverse());
    }
    setBookingsLoading(false);
  };

  const onBookingsRefresh = () => {
    setBookings([]);
    setBookingsLoading(true);
    fetchBookings();
  };

  React.useEffect(() => {
    fetchToday();
    fetchWatchlist();
    fetchBookings();
    fetchNews();
  }, []);

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: Color.secondary}}
      style={{backgroundColor: Color.primary}}
      labelStyle={{
        fontSize: 14,
        textTransform: 'none',
        textAlign: 'center',
      }}
    />
  );

  return (
    <View
      style={{
        flex: 1,
      }}>
      <TabView
        navigationState={{index, routes}}
        renderScene={SceneMap({
          first: () => (
            <RecommendScreen
              data={today}
              loading={todayLoading}
              onRefresh={onTodayRefresh}
            />
          ),
          second: () => (
            <WatchlistScreen
              data={watchlist}
              loading={watchlistLoading}
              onRefresh={onWatchlistRefresh}
            />
          ),
          third: () => (
            <BookingsScreen
              data={bookings}
              loading={bookingsLoading}
              onRefresh={onBookingsRefresh}
            />
          ),
          fourth: () => (
            <NewsScreen
              data={news}
              loading={newsLoading}
              onRefresh={onNewsRefresh}
              navigation={navigation}
            />
          ),
        })}
        // swipeEnabled={false}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={{width: Dimension.window.width}}
      />
      <FAB
        icon="chat-question"
        label="Enquire"
        uppercase
        color={Color.black}
        style={styles.fab}
        onPress={() => navigation.navigate('Enquire')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 32,
    right: 0,
    bottom: 0,
    backgroundColor: Color.secondary,
  },
});
