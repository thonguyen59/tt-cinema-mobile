import {StyleSheet, View, Text} from 'react-native';

function TitleMovie(props) {

  return (
      <View style={styles.container}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.time}>{props.time}</Text>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    flexDirection: 'column', // Display children vertically
    alignItems: 'center', // Center children horizontally
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  time: {
    fontSize: 16,
    color: 'gray',
  }
});

export default TitleMovie;