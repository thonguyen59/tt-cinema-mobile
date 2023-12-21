import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import RotatingBanner from '../components/RotatingBanner';
import MovieShowingCarousel from "../components/MovieShowingCarousel";
import React, {useEffect, useState} from "react";
import axios from 'axios';
import MovieComingCarousel from "../components/MovieComingCarousel";

function HomeScreen({navigation}) {
    const [isShowing, setIsShowing] = useState(true)
    const [moviesShowing, setMoviesShowing] = useState([])
    const [moviesComing, setMoviesComing] = useState([])
    const getMoviesShowing = () => {
        axios.get('http://10.91.10.85:8080/movies/enable').then(function(response) {
            let arr = [];
            response.data.forEach(e => {
                arr.push({id: e.id, posterURL: e.posterURL, title: e.posterURL, time: e.time});
            });
            setMoviesShowing(arr);
        }).catch(function(error) {
            console.log(error.message);
        });
    };

    const getMoviesComing = () => {
        axios.get('http://10.91.10.85:8080/movies/coming-soon').then(function(response) {
            let arr = [];
            response.data.forEach(e => {
                arr.push({id: e.id, posterURL: e.posterURL, title: e.posterURL, time: e.time});
            });
            setMoviesComing(arr);
        }).catch(function(error) {
            console.log(error.message);
        });
    };


    useEffect(() => {
        console.log("Call API getMovies")
        getMoviesShowing()
        getMoviesComing()
    }, []);

    const selectShowing = (selectedOption) => {
        setIsShowing(true)
    };

    const selectComing = (selectedOption) => {
        setIsShowing(false)
    }

    return (
        <View style={styles.container}>
            <View><RotatingBanner/></View>
            <View style={styles.btnContainer}>
                <TouchableOpacity style={[styles.button, isShowing ? styles.button_chosen : null]}
                                  onPress={selectShowing}>
                    <Text style={styles.buttonText}>Now Showing</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, !isShowing ? styles.button_chosen : null]}
                                  onPress={selectComing}>
                    <Text style={styles.buttonText}>Coming Soon</Text>
                </TouchableOpacity>
            </View>

            {isShowing && moviesShowing.length > 0 && <View>
                <MovieShowingCarousel data={moviesShowing} autoPlay={false} pagination={true}/>
            </View>}

            {!isShowing && moviesComing.length > 0 && <View>
                <MovieComingCarousel data={moviesComing} autoPlay={false} pagination={true}/>
            </View>}

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'center',
        backgroundColor: '#4A4A4A',
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 10,
        paddingHorizontal: 5
    },
    button: {
        paddingVertical: 9,
        paddingHorizontal: 25,
        borderRadius: 10,
        marginVertical: 4,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
    button_chosen: {
        backgroundColor: '#282828',
    },
});

export default HomeScreen;