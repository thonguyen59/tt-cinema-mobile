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
    flexDirection: 'column', // Display children vertically
    alignItems: 'center', // Center children horizontally
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'gray',
  },
  time: {
    fontSize: 15,
    color: 'gray',
  }
});

export default TitleMovie;