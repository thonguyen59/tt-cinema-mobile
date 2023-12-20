import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import RotatingBanner from '../components/RotatingBanner';
import MovieShowingCarousel from "../components/MovieShowingCarousel";
import React, {useEffect, useState} from "react";
import axios from 'axios';

function HomeScreen({navigation}) {
    const [isShowing, setIsShowing] = useState(true)
    const [moviesShowing, setMoviesShowing] = useState([])
    const [idShowing, setIdShowing] = useState([])
    const [moviesComing, setMoviesComing] = useState([])
    const [postersComing, setPostersComing] = useState([])

    const getDataUsingSimpleGetCall = () => {
        axios
            .get('http://192.168.1.9:8080/movies/enable')
            .then(function (response) {
                setMoviesShowing(response.data)
                let arr = []
                response.data.forEach(e => {
                    arr.push({id: e.id, posterURL: e.posterURL})
                })
                setIdShowing(arr)
            })
            .catch(function (error) {
                console.log(error.message)
            })
    };


    useEffect(() => {
        getDataUsingSimpleGetCall()
    }, []);

    const selectShowing = (selectedOption) => {
        setIsShowing(true)
    };

    const selectComing = (selectedOption) => {
        setIsShowing(false)
    };

    const data = [
        {
            image: require('../assets/images/Avengers.jpg'),
            id : 1
        },
        {
            image: require('../assets/images/Black_Window.jpg'),
            id : 1
        },
        {
            image: require('../assets/images/Joker.jpg'),
            id : 1
        },
        {
            image: require('../assets/images/star_war.jpg'),
            id : 1
        },
    ];

    // const data = [
    //     {
    //         image: require('../assets/images/Avengers.jpg'),
    //     },
    //     {
    //         image: require('../assets/images/Black_Window.jpg'),
    //     },
    //     {
    //         image: require('../assets/images/Joker.jpg'),
    //     },
    //     {
    //         image: require('../assets/images/star_war.jpg'),
    //     },
    // ];

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

            {isShowing && <View>
                <MovieShowingCarousel isShowing={true} data={idShowing} autoPlay={false} pagination={true}/>
            </View>}

            {!isShowing && <View>
                <MovieShowingCarousel data={data} autoPlay={false} pagination={true}/>
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