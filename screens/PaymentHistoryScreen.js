import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useNavigation} from "@react-navigation/native";
import {setStatusBarHidden} from "expo-status-bar";

function PaymentHistoryScreen() {
    const navigation = useNavigation()
    const [tickets, setTickets] = useState([])
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')

    const goToTicket = (item) => {
        navigation.navigate('ticket', {ticket: item, date: date, time: time})
    }

    const renderItems = ({item}) => {
        let startDate = new Date(item.showDate)
        let endDate = new Date(item.endTime)
        let date = startDate.getDate() + ' tháng ' + (startDate.getMonth() + 1) + ', ' + startDate.getFullYear()
        let time = (startDate.getHours() < 10 ? '0' : '') + startDate.getHours() + ':' + (endDate.getMinutes() < 10 ? '0' : '') + endDate.getMinutes() + ' - ' + (endDate.getHours() < 10 ? '0' : '') + endDate.getHours() + ':' + (endDate.getMinutes() < 10 ? '0' : '') + endDate.getMinutes()
        setDate(date)
        setTime(time)
        return (
            <View style={styles.item}>
                <TouchableOpacity onPress={() => goToTicket(item)}>
                    <View style={styles.row}>
                        <View style={{width: 100, justifyContent: 'center'}}>
                            <Image  source={{uri: item.posterURL}} style={styles.image}/>
                        </View>
                        <View style={styles.column}>
                            <Text style={styles.title}>{item.movieTitle}</Text>
                            <Text style={styles.text}>{item.cinemaName}</Text>
                            <Text style={styles.text}>{date}</Text>
                            <Text style={styles.text}>{time}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    useEffect(() => {
        getTickets().then(r => {})
    }, []);

    const getTickets = async () => {
        let userID = await AsyncStorage.getItem("userID")
        var url = 'http://172.16.3.239:8080/ticket/history-payment/' + userID;
        axios.get(url).then(function (response) {
            setTickets(response.data);
        }).catch(function (error) {
            console.log(error.message);
        });
    };


    return (
        <View style={styles.container}>
            <Text style={styles.header}>Payment History</Text>
            <FlatList data={tickets} renderItem={renderItems}/>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        flex: 1,
        flexDirection: 'column',
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
        color: '#c0bfbf',
        fontSize: 16,
    },
    item: {
        marginTop: 15,
        marginHorizontal: 15,
        borderRadius: 5,
        backgroundColor: '#282828',
    },
    row: {
        flexDirection: 'row'
    },
    column: {
        justifyContent: 'center',
        flexDirection: 'column',
        marginLeft: 15,
        width: '70%'
    },
    line: {
        marginVertical: 10,
        borderBottomColor: 'white',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    title: {
        color: '#c0bfbf',
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 7
    },
    image: {
        height: undefined,
        aspectRatio: 6 / 9,
    },
})

export default PaymentHistoryScreen
