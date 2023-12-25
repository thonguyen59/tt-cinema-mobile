import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const CinemaShowtimeDropdown = ({movie, title, showtime}) => {
  const navigation = useNavigation();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleSelect = (item) => {
    navigation.navigate('bookingSeats', {title: title, showtime: item, movie: movie});
  };

  const renderItem = ({item}) => (
      <TouchableOpacity style={styles.item} onPress={() => handleSelect(item)}>
        <Text style={styles.text}>{item.time}</Text>
      </TouchableOpacity>
  );

  return (
      <View>
        <TouchableOpacity style={styles.cinema} onPress={() => setDropdownVisible(!dropdownVisible)}>
          <Text style={styles.cinemaText}>{title}</Text>
        </TouchableOpacity>

        {dropdownVisible && (
            <View style={styles.dropdown}>
              <FlatList
                  data={showtime}
                  numColumns="5"
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={renderItem}
              />
            </View>
        )}
      </View>
  );
};

const styles = StyleSheet.create({
  cinema: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(255,255,255,0.67)',
    paddingStart: 10,
    paddingVertical: 10,
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
  cinemaText: {
    color: 'white',
    fontSize: 18,
  },
  dropdown: {
    marginTop: 10,
    marginLeft: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  item: {
    padding: 10,
    marginRight: 10,
    backgroundColor: '#4A4A4A',
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default CinemaShowtimeDropdown;