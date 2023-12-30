import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import {CheckBox} from "react-native-elements";
import {useNavigation} from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

function PaymentProgress({route, showtime, movie, seatsSelected, paymentMethod}) {
    const navigation = useNavigation();
    const [step, setStep] = useState(1)
    const [checked, setChecked] = useState(false);
    const [subtotal, setSubtotal] = useState(0);
    const [numOfSeats, setNumOfSeats] = useState(0);

    const handleCheckboxToggle = () => {
        setChecked(!checked);
        console.log(paymentMethod)
        console.log(!checked && paymentMethod)
    };

    const handleBooking = async () => {
        let userID = await AsyncStorage.getItem("userID")
        const seatIDArr = seatsSelected.seatIDArr.map(str => Number(str));
        seatsSelected.seatIDArr.forEach(e => {
            Number(e)
        })
        var url = 'http://172.16.4.238:8080/seat/booking';
        axios.patch(url, {
            showtimeID: Number(showtime.id),
            userID: Number(userID),
            seatIDs: seatIDArr,
            subtotal: subtotal
        }).then(function (response) {
            alert("booking successful.")
            navigation.navigate('drawer')
        }).catch(function (error) {
            console.log(error.message);
        });
    };

    useEffect(() => {
        if (showtime) {
            let numOfNormal = seatsSelected.normalSeats !== undefined ? seatsSelected.normalSeats.length : 0
            let numOfVip = seatsSelected.vipSeats !== undefined ? seatsSelected.vipSeats.length : 0
            let numOfCouple = seatsSelected.coupleSeats !== undefined ? seatsSelected.coupleSeats.length : 0

            let normal = showtime.price * numOfNormal
            let vip = (showtime.price + 15000) * numOfVip
            let couple = (showtime.price * 2 + 10000) * numOfCouple
            setSubtotal(normal + vip + couple)
            seatsSelected.normal = normal
            seatsSelected.vip = vip
            seatsSelected.couple = couple

            setNumOfSeats(numOfNormal + numOfVip + numOfCouple)
        }
    }, [seatsSelected]);

    useEffect(() => {
        if (route && route.params.step) {
            setStep(route.params.step)
        }
    }, []);

    const toStep2 = () => {
        navigation.navigate('payment', {
            movie: movie,
            showtime: showtime,
            seatsSelected: seatsSelected,
            subtotal: subtotal,
            numOfSeats: numOfSeats,
        });
    };

    return (
        <View style={styles.container}>
            {step === 1 && <View>
                <View style={styles.line}>
                    <Text style={styles.text}>Subtotal (including surcharges)</Text>
                </View>
                <View style={styles.line}>
                    <Text style={styles.text}>{numOfSeats} Seats</Text>
                    <Text style={[styles.text, {
                        color: 'white',
                        marginLeft: 'auto'
                    }]}>{subtotal.toLocaleString('en-US')}đ</Text>
                </View>
                <TouchableOpacity disabled={numOfSeats === 0} onPress={toStep2}
                                  style={numOfSeats !== 0 ? styles.bookingBtn : styles.bookingDisableBtn}>
                    <Text style={styles.bookingTxt}>Finish Payment (1/2)</Text>
                </TouchableOpacity>
            </View>}

            {step === 2 && <View>
                <View style={styles.line}>
                    <CheckBox
                        checked={checked}
                        onPress={handleCheckboxToggle}
                    />

                    <Text style={styles.text2}>Tôi đã đọc, hiểu và đồng ý với <Text onPress={handleCheckboxToggle}
                                                                                    style={styles.link}>các điều
                        khoản</Text>
                    </Text>

                </View>

                <TouchableOpacity onPress={handleBooking} disabled={!checked && !paymentMethod}
                                  style={(checked && paymentMethod) ? styles.bookingBtn : styles.bookingDisableBtn}>
                    <Text style={styles.bookingTxt}>Finish Payment (2/2)</Text>
                </TouchableOpacity>
            </View>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: '#4A4A4A',
        width: '100%',
        paddingHorizontal: 30,
        paddingTop: 10,
        paddingBottom: 20,
    },
    container1: {
        borderRadius: 10
    },
    line: {
        flexDirection: 'row',
    },
    bookingBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: '#6FAA35',
        borderRadius: 5,
        paddingVertical: 12,
        width: '100%',
    },
    bookingDisableBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: 'rgba(255,255,255,0.67)',
        borderRadius: 5,
        paddingVertical: 12,
        width: '100%',
    },
    bookingTxt: {
        marginRight: 5,
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },
    text: {
        color: 'rgba(255,255,255,0.67)',
        fontSize: 18,
    },
    text2: {
        color: 'white',
        fontSize: 16,
        width: '80%'
    },
    link: {
        color: 'blue',
        textDecorationLine: "underline",
        fontSize: 16,
        alignItems: "stretch",
        marginTop: 5
    },

})
export default PaymentProgress