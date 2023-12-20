import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import RotatingBanner from '../components/RotatingBanner';
import MovieShowingCarousel from "../components/MovieShowingCarousel";
import React, {useEffect, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';

function HomeScreen({navigation}) {
    const [isShowing, setIsShowing] = useState(true)

    const selectShowing = (selectedOption) => {
        setIsShowing(true)
    };

    const selectComing = (selectedOption) => {
        setIsShowing(false)
    };

    useEffect(() => {
        moviesIsShowing()
    }, []);

    const moviesIsShowing = () => {
        fetch('http://172.17.224.1:8080/movies/enable', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
        .then((responseJson) => {
            if (responseJson) {
                console.log(responseJson)
            }
        })
        .catch((error) => {
            console.error(error);
        });

    };

    const data = [
        {
            image: require('https://d1csarkz8obe9u.cloudfront.net/posterpreviews/adventure-movie-poster-template-design-7b13ea2ab6f64c1ec9e1bb473f345547_screen.jpg?ts=1636999411'),
        },
        {
            image: require('https://d1csarkz8obe9u.cloudfront.net/posterpreviews/adventure-movie-poster-template-design-7b13ea2ab6f64c1ec9e1bb473f345547_screen.jpg?ts=1636999411'),
        },
        {
            image: require('https://d1csarkz8obe9u.cloudfront.net/posterpreviews/adventure-movie-poster-template-design-7b13ea2ab6f64c1ec9e1bb473f345547_screen.jpg?ts=1636999411'),
        },
        {
            image: require('https://d1csarkz8obe9u.cloudfront.net/posterpreviews/adventure-movie-poster-template-design-7b13ea2ab6f64c1ec9e1bb473f345547_screen.jpg?ts=1636999411'),
        },
    ];

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
                <MovieShowingCarousel isShowing={true} data={data} autoPlay={false} pagination={true}/>
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
        marginVertical: 12,
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