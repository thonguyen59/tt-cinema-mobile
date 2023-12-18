import {Image, StyleSheet} from "react-native";

function CoupleSeat({}) {
    return (
        <Image source={require('../../assets/logo/seat_small.png')} style={styles.coupleSeat}></Image>
    )
}

const styles = StyleSheet.create({
    coupleSeat: {
        tintColor: '#3D406A',
        width: 40,
        height: 25,
        resizeMode: 'stretch'
    },
})
export default CoupleSeat