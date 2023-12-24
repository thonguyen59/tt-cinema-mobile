import {StyleSheet, Text, View} from 'react-native';

function StoreScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Tính năng này chưa được phát triển</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    text: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
})

export default StoreScreen
