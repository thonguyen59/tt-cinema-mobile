import {FlatList, StyleSheet, Text, View} from "react-native";
import React from "react";
import NormalSeat from "./seats/NormalSeat";
import VIPSeat from "./seats/VIPSeat";
import CoupleSeat from "./seats/CoupleSeat";
import SoldSeat from "./seats/SoldSeat";

function SeatsBooking() {
    const rowHeader = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K']
    const seatData = [
        {id: '1', type: 'normal'},
        {id: '2', type: 'vip'},
        {id: '3', type: 'normal'},
        {id: '4', type: 'normal'},
        {id: '5', type: 'normal'},
        {id: '6', type: 'normal'},
        {id: '7', type: 'normal'},
        {id: '8', type: 'normal'},
        {id: '9', type: 'vip'},
        {id: '10', type: 'sold'},
        {id: '11', type: 'sold'},
        {id: '12', type: 'sold'},
        {id: '13', type: 'sold'},
        {id: '14', type: 'normal'},
        {id: '1', type: 'sold'},
        {id: '2', type: 'vip'},
        {id: '3', type: 'normal'},
        {id: '4', type: 'normal'},
        {id: '5', type: 'normal'},
        {id: '6', type: 'normal'},
        {id: '7', type: 'normal'},
        {id: '8', type: 'normal'},
        {id: '9', type: 'vip'},
        {id: '10', type: 'sold'},
        {id: '11', type: 'normal'},
        {id: '12', type: 'sold'},
        {id: '13', type: 'sold'},
        {id: '14', type: 'sold'},
        {id: '1', type: 'normal'},
        {id: '2', type: 'vip'},
        {id: '3', type: 'normal'},
        {id: '4', type: 'normal'},
        {id: '5', type: 'normal'},
        {id: '6', type: 'normal'},
        {id: '7', type: 'normal'},
        {id: '8', type: 'normal'},
        {id: '9', type: 'vip'},
        {id: '10', type: 'normal'},
        {id: '11', type: 'normal'},
        {id: '12', type: 'sold'},
        {id: '13', type: 'sold'},
        {id: '14', type: 'normal'},
        {id: '1', type: 'normal'},
        {id: '2', type: 'vip'},
        {id: '3', type: 'normal'},
        {id: '4', type: 'normal'},
        {id: '5', type: 'normal'},
        {id: '6', type: 'normal'},
        {id: '7', type: 'normal'},
        {id: '8', type: 'normal'},
        {id: '9', type: 'vip'},
        {id: '10', type: 'normal'},
        {id: '11', type: 'normal'},
        {id: '12', type: 'normal'},
        {id: '13', type: 'normal'},
        {id: '14', type: 'normal'},
        {id: '1', type: 'normal'},
        {id: '2', type: 'vip'},
        {id: '3', type: 'sold'},
        {id: '4', type: 'sold'},
        {id: '5', type: 'sold'},
        {id: '6', type: 'sold'},
        {id: '7', type: 'sold'},
        {id: '8', type: 'sold'},
        {id: '9', type: 'vip'},
        {id: '10', type: 'normal'},
        {id: '11', type: 'normal'},
        {id: '12', type: 'sold'},
        {id: '13', type: 'sold'},
        {id: '14', type: 'normal'},
        {id: '1', type: 'normal'},
        {id: '2', type: 'vip'},
        {id: '3', type: 'normal'},
        {id: '4', type: 'normal'},
        {id: '5', type: 'normal'},
        {id: '6', type: 'normal'},
        {id: '7', type: 'normal'},
        {id: '8', type: 'normal'},
        {id: '9', type: 'vip'},
        {id: '10', type: 'normal'},
        {id: '11', type: 'normal'},
        {id: '12', type: 'sold'},
        {id: '13', type: 'sold'},
        {id: '14', type: 'normal'},
        {id: '1', type: 'normal'},
        {id: '2', type: 'vip'},
        {id: '3', type: 'normal'},
        {id: '4', type: 'normal'},
        {id: '5', type: 'sold'},
        {id: '6', type: 'normal'},
        {id: '3', type: 'sold'},
        {id: '4', type: 'normal'},
        {id: '5', type: 'normal'},
        {id: '6', type: 'sold'},
        {id: '3', type: 'sold'},
        {id: '4', type: 'normal'},
        {id: '5', type: 'sold'},
        {id: '6', type: 'normal'},
        {id: '3', type: 'normal'},
        {id: '4', type: 'normal'},
        {id: '5', type: 'normal'},
        {id: '6', type: 'normal'},
        {id: '3', type: 'normal'},
        {id: '4', type: 'normal'},
        {id: '5', type: 'normal'},
        {id: '6', type: 'normal'},
        {id: '3', type: 'normal'},
        {id: '4', type: 'normal'},
        {id: '7', type: 'couple'},
        {id: '10', type: 'couple'},
        {id: '11', type: 'couple'},
        {id: '12', type: 'couple'},
        {id: '13', type: 'couple'},
        {id: '13', type: 'couple', isSelected: true},
    ]

    const rowHeaderRender = ({item}) => (
        <Text style={styles.text}>{item}</Text>
    );

    function mapSeat(item) {
        console.log(item)
        if (item.type === 'normal') {
            return <NormalSeat/>
        } else if (item.type === 'vip') {
            return <VIPSeat/>
        } else if (item.type === 'sold') {
            return <SoldSeat/>
        } else if (item.type === 'couple') {
            return (
                <View style={{width: 52, alignItems: "center"}}>
                    <CoupleSeat/>
                </View>)
        }

        if (item.isSelected) {

        }
    }

    const seatsRender = ({item}) => (
        <View style={styles.item}>
            {mapSeat(item)}
        </View>
    );


    return (
        <View style={styles.container}>
            <View style={styles.rowHeader}>
                <FlatList data={rowHeader} renderItem={rowHeaderRender}/>
            </View>

            <View>
                <FlatList
                    numColumns='12'
                    data={seatData}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={seatsRender}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'black',
        marginLeft: 10,
        marginTop: 15
    },
    text: {
        color: 'white',
        fontSize: 18,
        justifyContent: "center",
        alignSelf: "center",
        marginVertical: 3,
        height: 22,
    },
    rowHeader: {
        flexDirection: 'column',
        marginRight: 10,
    },
    seatsBody: {
        flexDirection: 'column',
        marginRight: 10,
    },
    item: {
        justifyContent: "center",
        alignSelf: "center",
        marginVertical: 3,
        marginHorizontal: 2,
        height: 22,
    }
})

export default SeatsBooking