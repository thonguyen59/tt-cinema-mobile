import {Image, StyleSheet} from "react-native";

function SelectedSeat() {
    return (
        <Image source={require('../../assets/logo/seat_small.png')} style={styles.selectedSeat}></Image>
    )
}

const styles = StyleSheet.create({
    selectedSeat: {
        tintColor: '#6FAA35',
        width: 25,
        aspectRatio: 1
    }
})
export  default SelectedSeat