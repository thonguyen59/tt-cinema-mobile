import {Image, StyleSheet} from "react-native";

function VIPSeat() {
    return (
        <Image source={require('../../assets/logo/seat_small.png')} style={styles.vipSeat}/>
    )
}

const styles = StyleSheet.create({
    vipSeat: {
        tintColor: '#5A2B4B',
        width: 25,
        aspectRatio: 1
    }
})
export default VIPSeat