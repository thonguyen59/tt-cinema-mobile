import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faTicket} from "@fortawesome/free-solid-svg-icons";
import React from "react";

function MovieDetailScreen({route}) {
    return (
        <View style={styles.container}>
            <Image source={require('../assets/images/Avengers.jpg')} style={styles.trailer}/>
            <Text style={styles.title}>{route.params.movieName}</Text>
            <View style={{alignItems: "flex-end"}}>
                <Text style={{
                    fontSize: 18,
                    color: 'rgba(255,255,255,0.67)'
                }}>150 phút</Text>
            </View>

            <Text style={styles.label}>Description</Text>
            <Text style={styles.content}>Đắm chiềm trong thế giới</Text>

            <View
                style={{
                    marginVertical: 10,
                    borderBottomColor: 'white',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                }}
            />

            <Text style={styles.label}>Released Date</Text>
            <Text style={styles.content}>Đắm chiềm trong thế giới</Text>

            <Text style={styles.label}>Rating</Text>
            <Text style={styles.content}>Đắm chiềm trong thế giới</Text>

            <Text style={styles.label}>Languages</Text>
            <Text style={styles.content}>Đắm chiềm trong thế giới</Text>

            <Text style={styles.label}>Director</Text>
            <Text style={styles.content}>Đắm chiềm trong thế giới</Text>

            <Text style={styles.label}>Cast</Text>
            <Text style={styles.content}>Đắm chiềm trong thế giới</Text>

            <TouchableOpacity style={styles.bookingBtn}>
                <FontAwesomeIcon icon={faTicket} style={styles.bookingIcon}/>
                <Text style={styles.bookingTxt}>Booking</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    trailer: {
        width: '100%',
        height: '30%'
    },
    title: {
        marginTop: 15,
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white',
        alignSelf: 'center'
    },
    label: {
        marginTop: 10,
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },
    content: {
        fontSize: 18,
        color: 'rgba(255,255,255,0.67)'
    },
    bookingBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: '#16cc3c',
        borderRadius: 10,
        paddingVertical: 7,
        width: '95%',
        marginTop: 15
    },
    bookingTxt: {
        marginRight: 5,
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    },
    bookingIcon: {
        marginRight: 10,
        color: 'white',
    },
});

export default MovieDetailScreen
