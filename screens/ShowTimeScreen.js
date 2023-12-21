import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  ScrollView,
  TouchableOpacity,
  SectionList,
  FlatList,
  SafeAreaView,
} from 'react-native';
import React, {useState, useCallback, useRef, useEffect} from 'react';
import CinemaShowtimeDropdown from '../components/CinemaShowtimeDropdown';
import YoutubePlayer from 'react-native-youtube-iframe';
import axios from 'axios';

function ShowTimeScreen({route}) {
  const [dateSelected, setDateSelected] = useState(1);
  const [locationSelected, setLocationSelected] = useState(1);
  const [showTime, setShowTimes] = useState([]);
  const [seats, setSeats] = useState([]);

  const data = [
    {id: '1', title: 'BHD Star Quang Trung', isShowing: false},
    {id: '2', title: 'BHD Start Bitexco', isShowing: false},
    {id: '3', title: 'BHD Star Lê Văn Việt', isShowing: false},
  ];

  const data2 = [
    {id: 4, time: '01:30'},
    {id: 5, time: '02:15'},
    {id: 6, time: '03:00'},
    {id: 7, time: '04:30'},
    {id: 8, time: '05:15'},
    {id: 9, time: '06:00'},
  ];

  const data3 = [
    {day: '25', weekday: 'Mo'},
    {day: '26', weekday: 'Tu'},
    // {day: '26', weekday: 'We'},
  ];

  const getShowTimes = () => {
    let movieID = route.params.movie.id;
    var url = 'http://10.91.10.85:8080/showtime/movie/' + movieID;
    axios.get(url).then(function(response) {
      setShowTimes(response.data);
      console.log('Call API get show times successful.');
    }).catch(function(error) {
      console.log(error.message);
    });
  };

  const getSeats = (showTimeID) => {
    var url = 'http://10.91.10.85:8080/seat/' + showTimeID;
    axios.get(url).then(function(response) {
      setSeats(response.data);
      console.log('Call API get seats successful.');
    }).catch(function(error) {
      console.log(error.message);
    });
  };

  useEffect(() => {
    getShowTimes();
  }, []);

  const renderDates = ({item}) => {
    return (
        <View >
          <TouchableOpacity style={[styles.date, dateSelected === 1 && styles.dateSelected]}>
            <Text style={[styles.text, dateSelected === 1 && styles.textSelected]}>{item.day}</Text>
            <Text style={[styles.text, dateSelected === 1 && styles.textSelected, {fontSize: 19}]}>
              {item.weekday}
            </Text>
          </TouchableOpacity>
        </View>
    );
  };

  const handleDateSelection = (date) => {
    setDateSelected(date);
  };

  const handleLocationSelection = (location) => {
    setLocationSelected(location);
  };

  const renderShowTime = ({item}) => (
      <View>
        <CinemaShowtimeDropdown title={item.title} data={data2}/>
      </View>
  );
  return (
      <View style={styles.container}>
        <Image source={{uri: route.params.movie.posterURL}} style={styles.poster}/>
        <View style={styles.bodyContainer}>
          <Text style={styles.title}>{route.params.movie.title}</Text>
          <Text style={{color: 'rgba(255,255,255,0.67)', fontSize: 16}}>{route.params.movie.time} phút</Text>
        </View>

        <View>

            <FlatList
                data={data3}
                renderItem={renderDates}
                keyExtractor={item => item.id}
                horizontal={true}
            />


          {/*<ScrollView horizontal={true} style={{ marginTop: 20, marginLeft: 12 }}>*/}
          {/*    <View style={[styles.date, dateSelected === 1 && styles.dateSelected]}>*/}
          {/*        <TouchableOpacity>*/}
          {/*            <Text style={[styles.text, dateSelected === 1 && styles.textSelected]}>25</Text>*/}
          {/*            <Text style={[styles.text, dateSelected === 1 && styles.textSelected, { fontSize: 19 }]}>*/}
          {/*                Mo*/}
          {/*            </Text>*/}
          {/*        </TouchableOpacity>*/}
          {/*    </View>*/}
          {/*    <View style={styles.date}>*/}
          {/*        <TouchableOpacity>*/}
          {/*            <Text style={styles.text}>26</Text>*/}
          {/*            <Text style={[styles.text, { fontSize: 19 }]}>Tu</Text>*/}
          {/*        </TouchableOpacity>*/}
          {/*    </View>*/}
          {/*    <View style={styles.date}>*/}
          {/*        <TouchableOpacity>*/}
          {/*            <Text style={styles.text}>27</Text>*/}
          {/*            <Text style={[styles.text, { fontSize: 19 }]}>We</Text>*/}
          {/*        </TouchableOpacity>*/}
          {/*    </View>*/}
          {/*</ScrollView>*/}
        </View>

        <View>
          <ScrollView horizontal={true} style={{marginTop: 20, marginLeft: 12}}>
            <View style={[styles.location, locationSelected === 1 && styles.locationSelected]}>
              <TouchableOpacity>
                <Text style={[styles.text, dateSelected === 1 && styles.textSelected]}>TPHCM</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.location}>
              <TouchableOpacity>
                <Text style={styles.text}>Long Khánh </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.location}>
              <TouchableOpacity>
                <Text style={styles.text}>Huế</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>


        <View style={{marginTop: 15}}>
          <FlatList
              data={data}
              renderItem={renderShowTime}
          />
        </View>

      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'flex-start',
  },
  bodyContainer: {
    marginHorizontal: 12,
  },
  poster: {
    width: '100%',
    height: '25%',
  },
  title: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 15,
  },
  text: {
    color: 'rgba(255,255,255,0.67)',
    fontSize: 18,
  },
  textSelected: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  date: {
    width: 50,
    height: 60,
    marginRight: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateSelected: {
    width: 50,
    height: 60,
    marginRight: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6FAA35',
  },
  location: {
    width: 'auto',
    height: 40,
    marginRight: 15,
    borderRadius: 5,
    paddingHorizontal: 15,
    justifyContent: 'center',
    borderColor: 'rgba(255,255,255,0.67)',
    borderWidth: 1,
  },
  locationSelected: {
    width: 'auto',
    height: 40,
    marginRight: 15,
    borderRadius: 5,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
    backgroundColor: '#6FAA35',
  },
  cinema: {
    borderWidth: 1,
    marginLeft: -1,
    marginRight: -1,
    borderColor: 'rgba(255,255,255,0.67)',
    paddingStart: 10,
    paddingVertical: 10,
  },
  cinemaText: {
    color: 'white',
    fontSize: 20,
  },
});

export default ShowTimeScreen;