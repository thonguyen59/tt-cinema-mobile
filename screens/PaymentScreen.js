import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from "react";
import PaymentProgress from "../components/PaymentProgress";

function PaymentScreen({route}) {
    const [momo, setMomo] = useState(false);
    const [zaloPay, setZaloPay] = useState(false);
    const [showtime] = useState(route.params.showtime)

    function changePaymentMethod(method) {
        if ('momo' === method) {
            setMomo(true)
            setZaloPay(false)
        } else {
            setMomo(false)
            setZaloPay(true)
        }
    }

    useEffect(() => {
        console.log(route.params.seatsSelected)
    }, []);

    return (<View style={styles.container}>
        <Image source={{uri: route.params.movie.posterURL}} style={styles.trailer}/>
        <Text style={styles.title}>{route.params.movie.title}</Text>

        <ScrollView style={styles.scrollView}>
            <Text style={styles.content}>{showtime.cinema.name} - Screen {showtime.screen}</Text>
            <Text style={styles.content}>25 tháng 9, 2023 15:30 - 16:46</Text>
            <Text style={styles.content}>{route.params.numOfSeats} vé</Text>

            <View style={styles.line}/>

            <Text style={styles.label}>Item Ordered</Text>

            {route.params.seatsSelected.normalSeats !== 0 && <View style={[styles.row, {marginTop: 5}]}>
                <Text style={styles.content}>{route.params.seatsSelected.normalSeats} x Adult-NORMAL: E7</Text>
                <Text
                    style={styles.contentRight}>{route.params.seatsSelected.normal.toLocaleString('en-US')} đ</Text>
            </View>}

            {route.params.seatsSelected.vipSeats !== 0 && <View style={[styles.row, {marginTop: 5}]}>
                <Text style={styles.content}>{route.params.seatsSelected.vipSeats} x Adult-VIP: E7</Text>
                <Text
                    style={styles.contentRight}>{route.params.seatsSelected.vip.toLocaleString('en-US')} đ</Text>
            </View>}

            {route.params.seatsSelected.coupleSeats !== 0 && <View style={[styles.row, {marginTop: 5}]}>
                <Text style={styles.content}>{route.params.seatsSelected.coupleSeats} x Adult-COUPLE: E7</Text>
                <Text
                    style={styles.contentRight}>{route.params.seatsSelected.couple.toLocaleString('en-US')} đ</Text>
            </View>}

            <View style={styles.line}/>
            <View style={[styles.row, {marginTop: 5}]}>
                <Text style={styles.content}>Subtotal (including surcharges)</Text>
                <Text style={styles.contentRight}>{route.params.subtotal.toLocaleString('en-US')} đ</Text>
            </View>

            <View style={styles.line}/>
            <Text style={styles.content}>Payment Methods</Text>

            <View style={styles.row}>
                <Text style={styles.content1}>Ví Momo</Text>
                <TouchableOpacity onPress={() => changePaymentMethod('momo')}
                                  style={momo ? styles.checkedBox : styles.unCheckedBox}><Text></Text></TouchableOpacity>
            </View>

            <View style={styles.row}>
                <Text style={styles.content1}>Ví ZaloPay</Text>
                <TouchableOpacity onPress={() => changePaymentMethod('zaloPay')}
                                  style={zaloPay ? styles.checkedBox : styles.unCheckedBox}><Text></Text></TouchableOpacity>
            </View>
        </ScrollView>

        <View style={styles.footer}>
            <PaymentProgress route={{params: {step: 2}}}/>
        </View>

    </View>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    line: {
        marginTop: 15,
        marginBottom: 5,
        borderBottomColor: 'white',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    row: {
        flexDirection: "row",
        marginRight: 10,
        alignContent: "center"
    },
    trailer: {
        width: '100%',
        height: '30%'
    },
    title: {
        marginTop: 15,
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        alignSelf: 'center'
    },
    label: {
        marginTop: 10,
        marginLeft: 10,
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white'
    },
    content: {
        justifyContent: "center",
        marginLeft: 10,
        marginTop: 5,
        fontSize: 18,
        color: 'rgba(255,255,255,0.67)'
    },
    contentRight: {
        justifyContent: "center",
        marginLeft: 'auto',
        marginTop: 5,
        fontSize: 18,
        color: 'white'
    },
    content1: {
        marginLeft: 10,
        marginTop: 10,
        fontSize: 18,
        color: 'rgba(255,255,255,0.8)'
    },
    footer: {
        marginTop: 'auto'
    },
    checkedBox: {
        marginLeft: 'auto',
        backgroundColor: '#6FAA35',
        width: 20,
        height: 20,
        borderRadius: 30,
        marginTop: 15,
    },
    unCheckedBox: {
        marginLeft: 'auto',
        width: 20,
        height: 20,
        borderRadius: 30,
        marginTop: 15,
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.67)',
    }, scrollView: {
        marginTop: 10,
        marginBottom: 15
    }
});

export default PaymentScreen
