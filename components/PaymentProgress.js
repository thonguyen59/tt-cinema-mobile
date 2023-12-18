import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useState} from "react";
import {CheckBox} from "react-native-elements";
import {useNavigation} from "@react-navigation/native";

;

function PaymentProgress() {
    const navigation = useNavigation();
    const [step, setStep] = useState(1)
    const [checked, setChecked] = useState(false);

    const handleCheckboxToggle = () => {
        setChecked(!checked);
        console.log(checked)
    };

    const toStep2 = () => {
        navigation.navigate('showTime');
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
                    <Text style={styles.bookingTxt}>Finish Payment (1/3)</Text>
                </TouchableOpacity>
            </View>}

            {step === 2 && <View>
                <View style={styles.line}>
                    <CheckBox
                        value={checked}
                        onPress={handleCheckboxToggle}
                    />

                    <Text style={styles.text2}>Tôi đã đọc, hiểu và đồng ý với
                        <TouchableOpacity>
                            <Text style={styles.link}>các điều khoản</Text>
                        </TouchableOpacity>
                    </Text>


                </View>
                {checked && <TouchableOpacity disabled={true} style={styles.bookingDisableBtn}>
                        <Text style={styles.bookingTxt}>Finish Payment (1/3)</Text>
                    </TouchableOpacity> ||
                    <TouchableOpacity style={styles.bookingBtn}>
                        <Text style={styles.bookingTxt}>Finish Payment (1/3)</Text>
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
        marginTop: 10
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
        marginTop: 10
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
        width: '20%'
    },

})
export default PaymentProgress