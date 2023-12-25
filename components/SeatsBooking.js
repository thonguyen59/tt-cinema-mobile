import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import NormalSeat from './seats/NormalSeat';
import VIPSeat from './seats/VIPSeat';
import CoupleSeat from './seats/CoupleSeat';
import SoldSeat from './seats/SoldSeat';
import axios from 'axios';
import normalSeat from "./seats/NormalSeat";

function SeatsBooking({ showtimeID, onSeatsSelectedChange}) {
  const rowHeader = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K'];
  const [seats, setSeats] = useState([]);
  const [seatIDsSelected, setSeatIDsSelected] = useState([]);
  const [seatsNameSelected, setSeatsNameSelected] = useState('');
  const [normalSeats, setNormalSeats] = useState([]);
  const [vipSeats, setVIPSeats] =  useState([]);
  const [coupleSeats, setCoupleSeats] =  useState([]);


  const getSeats = () => {
    var url = 'http://192.168.1.6:8080/seat/' + showtimeID;
    axios.get(url).then(function(response) {
      setSeats(response.data);
      // console.log(response.data);
    }).catch(function(error) {
      console.log(error.message);
    });
  };

  useEffect(() => {
    getSeats();
  }, []);

  useEffect(() => {
    let filteredArray = seats.filter(item => seatIDsSelected.includes(item.id));
    let seatNames = filteredArray.join(",")

    onSeatsSelectedChange({normalSeats: normalSeats, vipSeats: vipSeats, coupleSeats: coupleSeats, seatIDArr: seatIDsSelected, seatNames: seatNames});
  }, [seatIDsSelected]);

  const rowHeaderRender = ({item}) => (
      <Text style={styles.text}>{item}</Text>
  );

  function mapSeat(item) {
    if (item.isBooked) {
      return <Image source={require('../assets/logo/seat_small.png')} style={styles.soldSeat}></Image>
    } else if (item.type === 'NORMAL') {
      return <Image source={require('../assets/logo/seat_small.png')} style={[styles.normalSeat, seatIDsSelected.includes(item.id) && styles.selectedSeat]}></Image>
    } else if (item.type === 'VIP') {
      return <Image source={require('../assets/logo/seat_small.png')} style={[styles.vipSeat, seatIDsSelected.includes(item.id) && styles.selectedSeat]}></Image>
    }
  }

  function handleSelectSeat(item) {
    setSeatIDsSelected((prevSelectedSeats) => {
      if (prevSelectedSeats.includes(item.id)) {
        if (item.type === 'NORMAL') {
          const index = normalSeats.indexOf(item.row + item.number);
          if (index > -1) { // only splice array when item is found
            normalSeats.splice(index, 1); // 2nd parameter means remove one item only
          }
        } else if (item.type === 'VIP') {
          const index = vipSeats.indexOf(item.row + item.number);
          if (index > -1) { // only splice array when item is found
            vipSeats.splice(index, 1); // 2nd parameter means remove one item only
          }
        } else if (item.type === 'COUPLE') {
          const index = coupleSeats.indexOf(item.row + item.number);
          if (index > -1) { // only splice array when item is found
            coupleSeats.splice(index, 1); // 2nd parameter means remove one item only
          }
        }
        return prevSelectedSeats.filter((seatId) => seatId !== item.id);
      } else {
        if (item.type === 'NORMAL') {
          normalSeats.push(item.row + item.number)
        } else if (item.type === 'VIP') {
          vipSeats.push(item.row + item.number)
        } else if (item.type === 'COUPLE') {
          coupleSeats.push(item.row + item.number)
        }
        return [...prevSelectedSeats, item.id];
      }
    });
  }

  const seatsRender = ({ item }) => (
      <View style={styles.item}>
        <TouchableOpacity disabled={item.isBooked} onPress={() => handleSelectSeat(item)}>
          {item.type === 'COUPLE' && (
              <View style={{width: 52, alignItems: 'center'}}>
                <Image source={require('../assets/logo/seat_small.png')} style={[styles.coupleSeat, seatIDsSelected.includes(item.id) && styles.selectedCoupleSeat]}></Image>
              </View>
          )}
          {item.type !== 'COUPLE' && mapSeat(item)}
        </TouchableOpacity>
      </View>
  );

  return (
      <View style={styles.container}>
        <View style={styles.rowHeader}>
          <FlatList data={rowHeader} renderItem={rowHeaderRender}/>
        </View>

        <View>
          <FlatList
              numColumns="12"
              data={seats}
              keyExtractor={(item) => item.id}
              renderItem={seatsRender}/>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'black',
    marginLeft: 10,
    marginTop: 15,
  },
  text: {
    color: 'white',
    fontSize: 18,
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 3,
    height: 22,
  },
  rowHeader: {
    flexDirection: 'column',
    marginRight: 10,
  },
  seatsBody: {
    flexDirection: 'column',
    marginRight: 10,
  },
  item: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 3,
    marginHorizontal: 2,
    height: 22,
  },
  normalSeat: {
    tintColor: 'rgba(255,255,255,0.31)',
    width: 25,
    aspectRatio: 1,
  },
  vipSeat: {
    tintColor: '#5A2B4B',
    width: 25,
    aspectRatio: 1,
  },
  soldSeat: {
    tintColor: '#E7574E',
    width: 25,
    aspectRatio: 1,
  },
  coupleSeat: {
    tintColor: '#3D406A',
    width: 40,
    height: 25,
    resizeMode: 'stretch',
  },
  selectedSeat: {
    tintColor: '#6FAA35',
    width: 25,
    aspectRatio: 1,
  },
  selectedCoupleSeat: {
    tintColor: '#6FAA35',
    width: 40,
    height: 25,
    resizeMode: 'stretch',
  },
});

export default SeatsBooking;