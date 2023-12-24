import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useNavigation} from "@react-navigation/native";

function PersonalScreen() {
    const [email, setEmail] = useState('')
    const navigation = useNavigation()

    useEffect(() => {
        AsyncStorage.getItem("email").then(
            (value) => {
                setEmail(value)
            }
        )
    }, []);
    const handlePaymentHistory = () => {
        navigation.navigate('history')
    }

    const handleLogOut = () => {
        AsyncStorage.setItem('userID', '');
        AsyncStorage.setItem('username', '');
        AsyncStorage.setItem('email', '');

        navigation.navigate('signIn')
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Account Information</Text>

            <View style={[styles.item, {marginTop: 10}]}>
                <Text style={styles.text}>Email: {email}</Text>
            </View>

            <View style={styles.line}/>
            <TouchableOpacity style={styles.item}>
                <Text style={styles.text}>Details</Text>
                <Text style={styles.arrow}>></Text>
            </TouchableOpacity>

            <View style={styles.line}/>
            <TouchableOpacity style={styles.item}>
                <Text style={styles.text}>Edits / Update</Text>
                <Text style={styles.arrow}>></Text>
            </TouchableOpacity>

            <View style={styles.line}/>
            <TouchableOpacity style={styles.item}>
                <Text style={styles.text}>Change Password</Text>
                <Text style={styles.arrow}>></Text>
            </TouchableOpacity>

            <View style={styles.line}/>
            <TouchableOpacity onPress={handlePaymentHistory} style={styles.item}>
                <Text style={styles.text}>Payment History</Text>
                <Text style={styles.arrow}>></Text>
            </TouchableOpacity>

            <View style={styles.line}/>
            <TouchableOpacity onPress={handleLogOut} style={styles.item}>
                <Text style={styles.text}>Logout</Text>
                <Text style={styles.arrow}>></Text>
            </TouchableOpacity>
            <View style={styles.line}/>
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
    item: {
        marginLeft: 15,
        flexDirection: 'row',
        paddingRight: 15,
    },
    header: {
        color: '#fff',
        fontSize: 20,
        marginTop: '25%',
        marginLeft: 15,
        fontWeight: "bold"
    },
    text: {
        color: '#fff',
        fontSize: 16,
    },
    arrow: {
        marginLeft: 'auto',
        color: '#fff',
        fontSize: 16,
    },
    line: {
        marginVertical: 10,
        borderBottomColor: 'white',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
})

export default PersonalScreen
