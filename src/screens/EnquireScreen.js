import {
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {Color, Fonts} from '../theme';
import {IconButton} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {postData} from '../API';
import { getSyncData } from '../storage/AsyncStorage';

export default function EnquireScreen() {
  const _chatRef = React.useRef(null);

  const [chats, setChats] = React.useState([]);
  const [message, setMessage] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const user = useSelector(state => state.user);

  const fetchChats = async () => {
    setLoading(true);
    let body = {
      user_id: user?.id,
    };
    let chats = await postData('api/getShowmsg', body);
    if (chats.success) {
      setChats(chats.data);
    }
    setLoading(false);
  };

  const onRefresh = async () => {
    let body = {
      user_id: user?.id,
    };
    let chats = await postData('api/getShowmsg', body);
    if (chats.success) {
      setChats(chats.data);
    }
  };

  let chatInterval;

  useEffect(() => {
    fetchChats();
    chatInterval = setInterval(() => {
      onRefresh();
    }, 1000);
    return () => {
      clearInterval(chatInterval);
    };
  }, []);

  const renderItem = ({item,index}) => {
    return (
      <View
        key={index}
        style={
          item.admin == '0'
            ? {...styles.chat, ...styles.right}
            : {...styles.chat, ...styles.left}
        }>
        <Text
          style={{
            ...styles.chatText,
            textAlign: item.admin == '1' ? 'left' : 'right',
            fontSize: 13,
            fontFamily: Fonts.primaryRegular,
          }}>
          {item.admin == '1' ? 'Admin' : 'You'}
        </Text>
        <Text
          style={{
            ...styles.chatText,
            textAlign: item.admin == '1' ? 'left' : 'right',
          }}>
          {item.msg}
        </Text>
        <Text
          style={{
            ...styles.chatDetail,
            textAlign: item.admin == '1' ? 'left' : 'right',
          }}>
          {item.created_at}
        </Text>
      </View>
    );
  };

  const sendMessage = async () => {
    if (message !== '') {
       let fcmToken = await getSyncData('fcmToken');
      // setChats(prev => [
      //   ...prev,
      //   {msg: message, admin: '0', created_at: getDate()},
      // ]);
      let body = {
        user_id: user?.id,
        message,
        token_no: fcmToken,
      };
      let result = await postData('api/getInsertmsg', body);
      if (result.success) {
        setMessage('');
        onRefresh();
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* <FlatList
        ref={_chatRef}
        data={chats}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
        onContentSizeChange={() =>
          _chatRef.current.scrollToEnd({animated: true})
        }
        style={styles.chatContainer}
      /> */}
      <ScrollView
        ref={_chatRef}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={fetchChats} />
        }
        onContentSizeChange={() =>
          _chatRef.current.scrollToEnd({animated: true})
        }
        style={styles.chatContainer}>
        {chats.map((item, index) => {
          return renderItem({item, index});
        })}
        <View
          style={{
            height: 30,
          }}></View>
      </ScrollView>
      <View style={styles.bottomInput}>
        <TextInput
          style={styles.input}
          placeholder="Enter your query..."
          value={message}
          onChangeText={text => setMessage(text)}
        />
        <IconButton
          icon="send"
          iconColor={Color.secondary}
          size={30}
          onPress={sendMessage}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.primary,
  },
  chatContainer: {
    // flex: 1,
    padding: 10,
    paddingVertical: 30,
    marginBottom: 65,
  },
  chat: {
    backgroundColor: Color.secondary,
    padding: 10,
    elevation: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginBottom: 20,
    flexShrink: 1,
  },
  chatText: {
    color: Color.primaryDark,
    fontFamily: Fonts.secondarySemiBold,
    fontSize: 17,
    paddingBottom: 10,
  },
  chatDetail: {
    color: Color.gray,
    fontSize: 12,
  },
  left: {
    alignSelf: 'flex-start',
    borderBottomRightRadius: 10,
  },
  right: {
    alignSelf: 'flex-end',
    borderBottomLeftRadius: 10,
  },
  bottomInput: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 65,
    position: 'absolute',
    bottom: 0,
    padding: 10,
    backgroundColor: Color.primaryDark,
  },
  input: {
    backgroundColor: Color.primary,
    width: '87%',
    borderRadius: 25,
    paddingHorizontal: 20,
  },
});
