import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import RotatingBanner from '../components/RotatingBanner';
import MovieShowingCarousel from "../components/MovieShowingCarousel";
import React, {useState} from "react";
import {useFocusEffect} from '@react-navigation/native';

function HomeScreen({navigation}) {
    const [isShowing, setIsShowing] = useState(true)

    const selectShowing = (selectedOption) => {
        setIsShowing(true)
    };

    const selectComing = (selectedOption) => {
        setIsShowing(false)
    };

    const data = [
        {
            image: require('../assets/images/Avengers.jpg'),
        },
        {
            image: require('../assets/images/Black_Window.jpg'),
        },
        {
            image: require('../assets/images/Joker.jpg'),
        },
        {
            image: require('../assets/images/star_war.jpg'),
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