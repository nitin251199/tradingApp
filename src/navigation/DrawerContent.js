//This is an example code for Navigation Drawer with Custom Side bar//
import React, {useEffect} from 'react';
import {CommonActions} from '@react-navigation/native';

import {
  Image,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Color from '../theme/Color';
import Font from '../theme/Fonts';
import {useDispatch, useSelector} from 'react-redux';
import { Drawer} from 'react-native-paper';
import Fonts from '../theme/Fonts';
import {DrawerContentScrollView} from '@react-navigation/drawer';
// import {getUserDetails, logout} from '../utils/LocalStorage';
// import {useDispatch, useSelector} from 'react-redux';

export default DrawerContent = props => {
  var items = [
    {
      navOptionThumb: 'home',
      navOptionName: 'Home',
      screenToNavigate: 'Home',
    },
    {
      navOptionThumb: 'shopping-bag',
      navOptionName: 'Subscription',
      screenToNavigate: 'Subscription',
    },
    {
      navOptionThumb: 'grid',
      navOptionName: 'P & L Summary',
      screenToNavigate: 'PLSummary',
    },
    {
      navOptionThumb: 'gift',
      navOptionName: 'Refer and Earn',
      screenToNavigate: 'Refer',
    },
    {
      navOptionThumb: 'info',
      navOptionName: 'Company Info',
      screenToNavigate: 'Refer',
    },
  ];
  // const [user, setUser] = React.useState(null);
  const [options, setOptions] = React.useState(items);

  const user = useSelector(state => state.user);

  const dispatch = useDispatch();

  const logoutUser = () => {
    // logout();
    // props.navigation.replace('Login');
    dispatch({
      type: 'LOGOUT',
    });
    props.navigation.closeDrawer();
    props.navigation.dispatch(state => {
      const routes = state.routes.filter(r => r.name !== 'Home');

      return CommonActions.reset({
        ...state,
        routes,
        index: routes.length - 1,
      });
    });
  };

  const getActiveRouteState = name => {
    let active = false;
    // if (props.state !== undefined) {
    //   let activeIndex = props.state.index;
    //   let activeRouteName = props.state.routes[activeIndex].name;
    //   if (activeRouteName === name) {
    //     active = true;
    //   }
    // }
    return active;
  };

  return (
    <View style={styles.sideMenuContainer}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => props.navigation.navigate('Profile')}
        style={styles.profileContainer}>
        <Image
          source={require('../assets/images/logo.jpg')}
          style={styles.sideMenuProfileIcon}
        />
        {/* {user !== null ?  */}
        <View>
          <Text style={styles.title}>{user?.user_name}</Text>
          {/* <Text style={styles.subTitle}>User ID: {user?.client_code}</Text> */}
        </View>
        {/* : null} */}
      </TouchableOpacity>

      <ScrollView {...props} style={styles.scrollView}>
        <View style={{width: '100%', flex: 1}}>
          {options.map((item, key) => (
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate(item.screenToNavigate);
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingTop: 15,
                paddingBottom: 15,
                marginTop: 5,
                // marginBottom: 5,
                backgroundColor: getActiveRouteState(item.screenToNavigate)
                  ? '#000'
                  : Color.primary,
              }}
              key={key}>
              <View style={{marginRight: 15, marginLeft: 20}}>
                <Icon
                  name={item.navOptionThumb}
                  size={22}
                  color={
                    getActiveRouteState(item.screenToNavigate)
                      ? Color.secondary
                      : '#fff'
                  }
                />
              </View>
              <Text
                style={{
                  fontSize: 15,
                  color: getActiveRouteState(item.screenToNavigate)
                    ? Color.secondary
                    : 'white',
                }}>
                {item.navOptionName}
              </Text>
            </TouchableOpacity>
          ))}
          {/* <Button
            icon={({size, color}) => (
              <Icon name="message-circle" size={size+5} color={color} />
            )}
            mode="outlined"
            color={Color.secondary}
            onPress={() => {}}
            style={styles.dematContainer}
            labelStyle={{
              color: Color.secondary,
              fontSize: 14,
              fontFamily: Fonts.primaryBold,
            }}
            contentStyle={{
              paddingVertical: 10,
            }}>
            Chat With Us
          </Button> */}
        </View>
      </ScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <TouchableOpacity
          onPress={() => {
            logoutUser();
          }}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 15,
          }}>
          <View style={{marginHorizontal: 10}}>
            <Icon name="log-out" size={24} color="#fff" />
          </View>
          <Text
            style={{
              fontSize: 15,
              color: 'white',
            }}>
            Logout
          </Text>
        </TouchableOpacity>
      </Drawer.Section>
    </View>
  );
};

const BAR_HEIGHT = Platform.OS === 'ios' ? 35 : StatusBar.currentHeight;
const styles = StyleSheet.create({
  sideMenuContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: Color.primary,
  },
  scrollView: {
    flex: 1,
    width: '100%',

    flexDirection: 'column',
  },
  sideMenuProfileIcon: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
  },
  title: {
    fontFamily: Font.secondarySemiBold,
    color: Color.secondary,
    textTransform: 'uppercase',
    fontSize: 16,
    marginLeft: 15,
  },
  subTitle: {
    fontFamily: Font.secondaryRegular,
    color: Color.grey,
    fontSize: 13,
    marginLeft: 15,
  },
  profileContainer: {
    width: '100%',
    height: 100,
    marginTop: BAR_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `#000`,
    paddingHorizontal: 20,
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: Color.secondary,
    display: 'flex',
  },
  dematContainer: {
    borderWidth: 1,
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: Color.secondary,
    borderRadius: 5,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
});
