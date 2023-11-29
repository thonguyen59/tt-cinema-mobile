import {StyleSheet, Text, View} from 'react-native';

function ShowTimeScreen() {
  return (
      <View style={styles.container}>
        <View><Image  style={styles.image}/></View>
        <View><Text>Title</Text></View>
        <View></View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    overflow: 'hidden',
    width: '90%',
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 6 / 9,
  },
  title: {
    marginRight: 5,
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
});

export default ShowTimeScreen