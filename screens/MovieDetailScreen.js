import {Image, StyleSheet, Text, View} from 'react-native';

function MovieDetailScreen() {
    return (
        <View style={styles.container}>
            <Image source={require('../assets/images/Avengers.jpg')} style={styles.trailer}/>
            <Text style={styles.title}>THE ERAS TOUR</Text>

            <Text style={styles.label}>Description</Text>
            <Text style={styles.content}>Đắm chiềm trong thế giới</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column'
    },
    trailer: {
        width: '100%',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold'
    },
    label: {
        fontSize: 22,
        fontWeight: 'bold'
    },
    content: {
        fontSize: 22,
        fontWeight: 'bold'
    }
});

export default MovieDetailScreen
