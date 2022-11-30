import {ActivityIndicator, Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Color, Fonts} from '../theme';
import {postData, ServerURL} from '../API';
import {useEffect} from 'react';

export default function NewsDetails({navigation, route}) {
  const {image} = route.params;

  const [newsArticle, setNewsArticle] = React.useState();
  const [loading, setLoading] = React.useState(true);

  const fetchNewsById = async () => {
    const response = await postData('api/getNewsbyid', {id: route.params.id});
    if (response.success) {
      setNewsArticle(response.data[0]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNewsById();
  }, []);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: Color.primary,
          justifyContent: 'center',
        }}>
        <ActivityIndicator size={'large'} color={Color.green} />
      </View>
    );
  }


  return (
    <ScrollView style={styles.container}>
      <Image source={{uri: `${ServerURL}/api/${image}`}} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{newsArticle?.title}</Text>
        <Text style={styles.date}>{newsArticle?.created_at}</Text>
        <Text style={styles.description}>{newsArticle?.description}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.primary,
  },
  image: {
    width: '100%',
    height: 200,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: Fonts.secondaryBold,
  },
  date: {
    fontSize: 14,
    fontFamily: Fonts.primaryRegular,
    color: Color.grey,
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    fontFamily: Fonts.primaryRegular,
  },
});
