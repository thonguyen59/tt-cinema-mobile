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
  const [normalSeats, setNormalSeats] = useState(0);
  const [vipSeats, setVIPSeats] =  useState(0);
  const [coupleSeats, setCoupleSeats] =  useState(0);


  const getSeats = () => {
    var url = 'http://192.168.9.59:8080/seat/' + showtimeID;
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
    let vip = 0
    let double = 0
    onSeatsSelectedChange({normalSeats: normalSeats, vipSeats: vipSeats, coupleSeats: coupleSeats});
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
          setNormalSeats(normalSeats - 1)
        } else if (item.type === 'COUPLE') {
          setCoupleSeats(coupleSeats - 1)
        } else if (item.type === 'VIP') {
          setVIPSeats(vipSeats - 1)
        }
        return prevSelectedSeats.filter((seatId) => seatId !== item.id);
      } else {
        if (item.type === 'NORMAL') {
          setNormalSeats(normalSeats + 1)
        } else if (item.type === 'COUPLE') {
          setCoupleSeats(coupleSeats + 1)
        } else if (item.type === 'VIP') {
          setVIPSeats(vipSeats + 1)
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