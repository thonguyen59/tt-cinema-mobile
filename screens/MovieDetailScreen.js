import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTicket} from '@fortawesome/free-solid-svg-icons';
import React, {useEffect, useState} from 'react';
import YoutubePlayer from 'react-native-youtube-iframe';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

function MovieDetailScreen({route}) {
  const navigation = useNavigation();
  const [movie, setMovie] = useState({});
  const [releasedDate, setReleasedDate] = useState('');

  const getMovieDetail = () => {
    let id = route.params.id;
    var url = 'http://10.91.10.85:8080/movies/detail/' + id;
    axios.get(url).then(function(response) {
      setMovie(response.data);
      let date = response.data.releaseDate.split('-');
      date = date[2] + ' tháng ' + date[1] + ' năm ' + date[0];
      setReleasedDate(date);
    }).catch(function(error) {
      console.log(error.message);
    });
  };

  useEffect(() => {
    if (route.params.isBooking) {
      goToBooking();
    }
    getMovieDetail();
    // console.log('Call API Detail Success');
  }, []);

  function goToBooking() {
    navigation.navigate('showtime', {movie: movie});
  }

  return (
      <View style={styles.container}>
        <View style={styles.trailer}>
          <YoutubePlayer
              height={300}
              videoId={movie.trailerURL}
          />
        </View>
        <Text style={styles.title}>{movie.title}</Text>
        <View style={{alignItems: 'flex-end'}}>
          <Text style={{
            fontSize: 18,
            color: 'rgba(255,255,255,0.67)',
          }}>{movie.time} phút</Text>
        </View>

        <Text style={styles.label}>Description</Text>
        <Text style={styles.content}>{movie.description}</Text>

        <View
            style={{
              marginVertical: 10,
              borderBottomColor: 'white',
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
        />

        <Text style={styles.label}>Released Date</Text>
        <Text style={styles.content}>{releasedDate}</Text>

        <Text style={styles.label}>Rating</Text>
        <Text style={styles.content}>{movie.rating}</Text>

        <Text style={styles.label}>Languages</Text>
        <Text style={styles.content}>{movie.description}</Text>

        <View
            style={{
              marginVertical: 10,
              borderBottomColor: 'white',
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
        />

        <Text style={styles.label}>Director</Text>
        <Text style={styles.content}>{movie.director}</Text>

        <Text style={styles.label}>Cast</Text>
        <Text style={styles.content}>{movie.cast}</Text>

        {route.params.enable && <View style={{marginTop: 'auto'}}>
          <TouchableOpacity onPress={goToBooking} style={styles.bookingBtn}>
            <FontAwesomeIcon icon={faTicket} style={styles.bookingIcon}/>
            <Text style={styles.bookingTxt}>Booking</Text>
          </TouchableOpacity>
        </View>}

      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'flex-start',
  },
  trailer: {
    marginTop: 10,
    height: '28%',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center',
  },
  label: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  content: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.67)',
  },
  bookingBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#16cc3c',
    borderRadius: 10,
    paddingVertical: 10,
    width: '95%',
    marginBottom: 15,
  },
  bookingTxt: {
    marginRight: 5,
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  bookingIcon: {
    marginRight: 10,
    color: 'white',
  },
});

export default MovieDetailScreen;
