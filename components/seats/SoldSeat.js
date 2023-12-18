import {Image, StyleSheet} from "react-native";

function SoldSeat() {
    return (
        <Image source={require('../../assets/logo/seat_small.png')} style={styles.soldSeat}></Image>
    )
}

const styles = StyleSheet.create({
    soldSeat: {
        tintColor: '#E7574E',
        width: 25,
        aspectRatio: 1
    }
})
export  default SoldSeat