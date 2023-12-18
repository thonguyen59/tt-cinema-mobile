import {Image, StyleSheet} from "react-native";

function NormalSeat() {
    return (
        <Image source={require('../../assets/logo/seat_small.png')} style={styles.normalSeat}></Image>
    )
}

const styles = StyleSheet.create({
    normalSeat: {
        tintColor: 'rgba(255,255,255,0.31)',
        width: 25,
        aspectRatio: 1
    }
})
export  default NormalSeat