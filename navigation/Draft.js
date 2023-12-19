import React, {useState} from 'react';
import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import PaymentScreen from "../screens/PaymentScreen";

const Test = () => {
    return (
        <View style={styles.container}>
            <PaymentScreen route={{ params: { movieName: 'Alibaba' } }}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'pink'
    },
    dropdownContainer: {
        marginVertical: 10,
    },
    button: {
        backgroundColor: 'lightblue',
        padding: 10,
        borderRadius: 5,
    },
    dropdown: {
        marginTop: 10,
        flexDirection: 'row',
    },
    item: {
        padding: 15,
        marginRight: 10,
        backgroundColor: 'white',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
    },
});

export default Test;
