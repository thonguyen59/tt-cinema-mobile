import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import {CheckBox} from "react-native-elements";
import {useNavigation} from "@react-navigation/native";

function PaymentProgress({route}) {
    const navigation = useNavigation();
    const [step, setStep] = useState(1)
    const [checked, setChecked] = useState(false);

    const handleCheckboxToggle = () => {
        setChecked(!checked);
        console.log(checked)
    };

    useEffect(() => {
        if (route && route.params.step) {
            setStep(route.params.step)
        }
    }, []);

    const toStep2 = () => {
        navigation.navigate('payment', {movieName: 'The Eras rour'});
    };

    return (
        <View style={styles.container}>
            {step === 1 && <View>
                <View style={styles.line}>
                    <Text style={styles.text}>Subtotal (including surcharges)</Text>
                </View>
                <View style={styles.line}>
                    <Text style={styles.text}>2 Seats</Text>
                    <Text style={[styles.text, {color: 'white', marginLeft: 'auto'}]}>110,000đ</Text>
                </View>
                <TouchableOpacity onPress={toStep2} style={styles.bookingBtn}>
                    <Text style={styles.bookingTxt}>Finish Payment (1/2)</Text>
                </TouchableOpacity>
            </View>}

            {step === 2 && <View>
                <View style={styles.line}>
                    <CheckBox
                        value={checked}
                        onPress={handleCheckboxToggle}
                    />

                    <Text style={styles.text2}>Tôi đã đọc, hiểu và đồng ý với <Text onPress={handleCheckboxToggle}
                                                                                    style={styles.link}>các điều
                        khoản</Text>
                    </Text>

                </View>
                {!checked && <TouchableOpacity disabled={true} style={styles.bookingDisableBtn}>
                        <Text style={styles.bookingTxt}>Finish Payment (2/2)</Text>
                    </TouchableOpacity> ||
                    <TouchableOpacity style={styles.bookingBtn}>
                        <Text style={styles.bookingTxt}>Finish Payment (2/2)</Text>
                    </TouchableOpacity>
                }
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