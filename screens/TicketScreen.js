import {Image, StyleSheet, Text, View} from "react-native";
import React, {useEffect, useState} from "react";

function TicketScreen({route}) {
    const [ticket] = useState(route.params.ticket)

    useEffect(() => {
        console.log(ticket)
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Item Ordered</Text>
            <View style={styles.ticket}>
                <View style={styles.qr}>
                    <Image style={styles.image} source={require('../assets/images/qr.png')}/>
                </View>
                <Text style={[styles.text, {fontWeight: "bold", alignSelf: 'center', marginTop: 10}]}>Scan QR Code To
                    Enter The Theatre</Text>
                <View style={styles.line}>
                    <Text style={{color: 'black', fontSize: 22}}>
                        - - - - - - - - - - - - - - - - - - - - - - - -
                    </Text>
                </View>

                <View style={styles.row}>
                    <View style={styles.column}>
                        <Text style={styles.title}>{ticket.movieTitle}</Text>

                        <Text style={styles.text}>{route.params.date}</Text>
                        <Text style={styles.text}>{route.params.time}</Text>
                        <Text style={styles.text}>{ticket.cinemaName}</Text>

                        <Text style={[styles.title, {marginTop: 10, fontSize: 16}]}>Booking Number: {ticket.bookingNumber}</Text>
                    </View>
                    <View style={styles.column}>
                        <View style={{width: 90, marginLeft: 15}}>
                            <Image source={{uri: ticket.posterURL}} style={styles.poster}/>
                        </View>
                    </View>
                </View>

                <View style={styles.row}>
                    <View style={styles.column}>
                        <Text style={styles.text}>Ghế</Text>
                        <Text style={styles.title}>{ticket.seats}</Text>
                    </View>
                    <View style={[styles.column, {marginLeft: 'auto'}]}>
                        <Text style={styles.text}>Screen</Text>
                        <Text style={styles.title}>{ticket.screen}</Text>
                    </View>
                </View>
                <View style={styles.line1}/>
                <View style={styles.row}>
                    <Text style={styles.text}>Subtotal (including surcharges)</Text>
                    <Text style={[styles.title, {marginTop: 5, fontSize: 16, marginLeft: 'auto'}]}>{ticket.subtotal} đ</Text>
                </View>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        flex: 1,
        backgroundColor: 'black',
    },
    header: {
        color: '#fff',
        fontSize: 20,
        marginTop: '25%',
        marginLeft: 15,
        fontWeight: "bold"
    },
    text: {
        marginTop: 5,
        color: 'rgb(122,122,122)',
        fontSize: 16,
    },
    ticket: {
        marginTop: 15,
        marginHorizontal: 15,
        borderRadius: 15,
        height: '70%',
        backgroundColor: 'white',
    },
    row: {
        flexDirection: 'row',
        marginHorizontal: 10
    },
    column: {
        flexDirection: 'column',
    },
    line: {
        marginHorizontal: -3
    },
    line1: {
        marginVertical: 20,
        borderBottomColor: 'rgb(75,75,75)',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    title: {
        color: 'rgb(75,75,75)',
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10
    },
    image: {
        height: '100%',
        aspectRatio: 6 / 6,
    },
    qr: {
        marginTop: 50,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        height: '25%',
    },
    poster: {
        height: undefined,
        aspectRatio: 6 / 9,
    },
})

export default TicketScreen
