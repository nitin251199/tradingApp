import {Animated, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {Color, Dimension, Fonts} from '../theme';
import {Avatar, List} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {postData} from '../API';

export default function ProfileScreen() {
  const user = useSelector(state => state.user) || {};

  const [userInfo, setUserInfo] = React.useState({});

  const animated = new Animated.Value(-50);
  const animatedView = new Animated.Value(100);
  const animatedView2 = new Animated.Value(200);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(animated, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(animatedView, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(animatedView2, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const fetchProfile = async () => {
    let body = {
      user_id: user?.id,
    };
    let result = await postData('api/getProfile', body);
    if (result.success) {
      setUserInfo(result.data[0]);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <ScrollView
      style={styles.mainContainer}
      contentContainerStyle={{
        alignItems: 'center',
        paddingVertical: 10,
      }}>
      <Animated.View
        style={{
          ...styles.card,
          flexDirection: 'row',
          alignItems: 'center',
          transform: [{translateY: animated}],
          opacity: animated.interpolate({
            inputRange: [-100, 0],
            outputRange: [0, 1],
          }),
        }}>
        <Avatar.Image
          size={84}
          source={{
            uri: `https://ui-avatars.com/api/?font-size=0.25&size=512&name=${user?.user_name}`,
          }}
          style={{
            margin: 15,
          }}
        />
        <View>
          <Text
            style={{
              fontSize: 16,
              textTransform: 'uppercase',
              fontFamily: Fonts.secondaryRegular,
              marginBottom: 10,
            }}>
            {user?.user_name}
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: Fonts.secondaryRegular,
              color: Color.grey,
              marginBottom: 5,
            }}>
            {user?.client_code}
          </Text>
          {/* <Text
            style={{
              fontSize: 14,
              fontFamily: Fonts.secondaryRegular,
              color: Color.grey,
              marginBottom: 10,
            }}>
            UCID: 5308508
          </Text> */}
          <Text
            style={{
              fontSize: 14,
              fontFamily: Fonts.secondarySemiBold,
              color: Color.secondary,
              textTransform: 'uppercase',
            }}>
            Change Password
          </Text>
        </View>
      </Animated.View>
      <Animated.View
        style={{
          ...styles.card,
          transform: [{translateY: animatedView}],
          marginTop: 20,
          padding: 0,
          width: Dimension.window.width,
        }}>
        <List.Accordion
          title="Personal Details"
          style={{
            backgroundColor: '#000',
          }}
          titleStyle={{
            fontFamily: Fonts.secondarySemiBold,
            textTransform: 'uppercase',
            fontSize: 14,
            color: '#fff',
          }}>
          <Animated.View
            style={{
              paddingHorizontal: 15,
              borderTopWidth: 1,
              borderTopColor: Color.grey,
              borderStyle: 'dashed',
              opacity: animatedView2.interpolate({
                inputRange: [-100, 0],
                outputRange: [0, 1],
              }),
            }}>
            <View style={styles.listItem}>
              <Text style={{...styles.leftText, ...styles.listText}}>
                Mobile No.
              </Text>
              <Text style={{...styles.listText, textTransform: 'uppercase'}}>
                {userInfo?.phone}
              </Text>
            </View>
            <View style={styles.listItem}>
              <Text style={{...styles.leftText, ...styles.listText}}>
                Email ID.
              </Text>
              <Text style={{...styles.listText, textTransform: 'uppercase'}}>
                {userInfo?.email}
              </Text>
            </View>
            <View style={styles.listItem}>
              <Text style={{...styles.leftText, ...styles.listText}}>
                Date of Birth
              </Text>
              <Text style={{...styles.listText, textTransform: 'uppercase'}}>
                {userInfo?.dob}
              </Text>
            </View>
            <View style={styles.listItem}>
              <Text style={{...styles.leftText, ...styles.listText}}>PAN</Text>
              <Text style={{...styles.listText, textTransform: 'uppercase'}}>
                {userInfo?.pan_card}
              </Text>
            </View>
            <View style={{marginTop: 20}}>
              <Text style={{...styles.leftText, ...styles.listText}}>
                Address
              </Text>
              <Text
                style={{
                  ...styles.listText,
                  textTransform: 'uppercase',
                  marginTop: 10,
                }}>
                {userInfo?.address}
              </Text>
              <Text
                style={{
                  ...styles.listText,
                  textTransform: 'uppercase',
                  marginBottom: 20,
                }}>
                {userInfo?.city && userInfo?.city}
                {userInfo?.state && ',' + userInfo?.state}
                {userInfo?.country && ',' + userInfo?.country}
              </Text>
            </View>
          </Animated.View>
        </List.Accordion>
      </Animated.View>
      <Animated.View
        style={{
          ...styles.card,
          marginTop: 20,
          transform: [{translateY: animatedView2}],
          padding: 0,
          width: Dimension.window.width,
        }}>
        <List.Accordion
          title="Bank Account Details"
          style={{
            backgroundColor: '#000',
          }}
          titleStyle={{
            fontFamily: Fonts.secondarySemiBold,
            textTransform: 'uppercase',
            fontSize: 14,
            color: '#fff',
          }}>
          <View
            style={{
              paddingHorizontal: 20,
              paddingBottom: 20,
            }}>
            <View
              style={{
                paddingHorizontal: 20,
                borderTopWidth: 1,
                borderTopColor: Color.grey,
                borderStyle: 'dashed',
              }}
            />
            <View style={styles.listItem}>
              <Text style={{fontFamily: Fonts.secondarySemiBold}}>
                Bank Details
              </Text>
            </View>
            <View style={styles.listItem}>
              <Text style={{...styles.leftText, ...styles.listText}}>
                Account Number
              </Text>
              <Text style={{...styles.listText}}>
                {userInfo?.account_number}
              </Text>
            </View>
            <View style={styles.listItem}>
              <Text style={{...styles.leftText, ...styles.listText}}>
                Account Type
              </Text>
              <Text style={{...styles.listText}}>{userInfo?.account_type}</Text>
            </View>
            <View style={styles.listItem}>
              <Text style={{...styles.leftText, ...styles.listText}}>
                Bank Name
              </Text>
              <Text style={{...styles.listText, textTransform: 'uppercase'}}>
                {userInfo?.bank_name}
              </Text>
            </View>
            <View style={styles.listItem}>
              <Text style={{...styles.leftText, ...styles.listText}}>IFSC</Text>
              <Text style={{...styles.listText, textTransform: 'uppercase'}}>
                {userInfo?.ifsc}
              </Text>
            </View>
          </View>
        </List.Accordion>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.primary,
  },
  card: {
    backgroundColor: '#000',
    borderRadius: 5,
    padding: 15,
    width: Dimension.window.width - 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  leftText: {
    color: Color.grey,
  },
  listText: {
    fontFamily: Fonts.secondaryRegular,
  },
});
