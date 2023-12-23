import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import {CheckBox} from "react-native-elements";
import {useNavigation} from "@react-navigation/native";

function PaymentProgress({route, showtime, movie, seatsSelected}) {
    const navigation = useNavigation();
    const [step, setStep] = useState(1)
    const [checked, setChecked] = useState(false);
    const [subtotal, setSubtotal] = useState(0);
    const [numOfSeats, setNumOfSeats] = useState(0);

    const handleCheckboxToggle = () => {
        setChecked(!checked);
    };

    useEffect(() => {
        if (showtime) {
            let normal = showtime.price * seatsSelected.normalSeats
            let vip = (showtime.price + 15000) * seatsSelected.vipSeats
            let couple = (showtime.price * 2 + 10000) * seatsSelected.coupleSeats
            setSubtotal(normal + vip + couple)
            seatsSelected.normal = normal
            seatsSelected.vip = vip
            seatsSelected.couple = couple
            setNumOfSeats(seatsSelected.normalSeats + seatsSelected.vipSeats + seatsSelected.coupleSeats)
        }
    }, [seatsSelected]);

    useEffect(() => {
        if (route && route.params.step) {
            setStep(route.params.step)
        }
    }, []);

    const toStep2 = () => {
        navigation.navigate('payment', {movie: movie, showtime: showtime, seatsSelected: seatsSelected, subtotal: subtotal, numOfSeats: numOfSeats});
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

                <TouchableOpacity disabled={!checked} style={!checked ? styles.bookingDisableBtn : styles.bookingBtn}>
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