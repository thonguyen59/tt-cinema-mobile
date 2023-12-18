import {Image, StyleSheet, Text, View} from "react-native";
import SeatsBooking from "../components/SeatsBooking";
import NormalSeat from "../components/seats/NormalSeat";
import SelectedSeat from "../components/seats/SelectedSeat";
import SoldSeat from "../components/seats/SoldSeat";
import VIPSeat from "../components/seats/VIPSeat";
import CoupleSeat from "../components/seats/CoupleSeat";
import PaymentProgress from "../components/PaymentProgress";

function SeatsScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>BHD Star Long Khánh</Text>
            <Text style={styles.subHeader}>Screen 4 - 25 tháng 09, 2023 16:35 - 18:17</Text>
            <View style={styles.line}/>
            <Text style={[styles.text, {alignSelf: 'center', fontWeight: 'bold'}]}>SCREEN</Text>
            <View style={{marginTop: 10}}>
                <View style={styles.seatsTitle}>
                    <SelectedSeat/>
                    <Text style={styles.seatText}>Selected Seat</Text>
                    <SoldSeat/>
                    <Text style={styles.seatText}> Sold</Text>
                </View>
                <View style={styles.seatsTitle}>
                    <NormalSeat/>
                    <Text style={styles.seatText}>Stand</Text>
                    <VIPSeat/>
                    <Text style={styles.seatText}>VIP</Text>
                    <CoupleSeat/>
                    <Text style={styles.seatText}>Couple Pack</Text>
                </View>
            </View>
            <SeatsBooking/>
            <PaymentProgress/>
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
        color: 'white',
        fontSize: 28,
        marginTop: 10,
        marginLeft: 15,
        fontWeight: 'bold'
    },
    subHeader: {
        color: 'rgba(255,255,255,0.67)',
        fontSize: 18,
        marginTop: 10,
        marginLeft: 15,

    },
    text: {
        color: 'rgba(255,255,255,0.67)',
        fontSize: 18,
    },
    seatText: {
        color: 'rgba(255,255,255,0.67)',
        fontSize: 18,
        marginRight: 20,
        marginLeft: 6
    },
    seatsTitle: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginLeft: 30,
        marginTop: 10
    },
    selectedSeat: {
        tintColor: '#6FAA35',
        width: 25,
        aspectRatio: 1
    },
    normalSeat: {
        tintColor: 'rgba(255,255,255,0.31)',
        width: 25,
        aspectRatio: 1
    },
    vipSeat: {
        tintColor: '#5A2B4B',
        width: 25,
        aspectRatio: 1
    },
    soldSeat: {
        tintColor: '#E7574E',
        width: 25,
        aspectRatio: 1
    },
    coupleSeat: {
        tintColor: '#3D406A',
        width: 30,
        aspectRatio: 1
    },
    line: {
        marginTop: 35,
        marginBottom: 12,
        alignSelf: 'center',
        height: 6,
        width: '80%',
        backgroundColor: 'white', // Line color
        borderBottomWidth: 4, // Adjust the height of the higher middle part
        borderBottomColor: 'white', // Adjust the color of the higher middle part
    },
    payment: {
        flex: 0,

    }
})
export default SeatsScreen
