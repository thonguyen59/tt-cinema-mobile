import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {useState} from "react";

const SignUpPage = () => {
    const [email, setEmail] = useState("")
    const [number, setNumber] = useState("")
    const [address, setAddress] = useState("")

    const saveUserInfo = () => {
        alert('username: ' + email + ' - number: ' + number + ' - address: ' + address )

    }

    return (<View style={styles.container}>
        <View style={styles.titleContainer}>
            <Text style={styles.title1}>Welcome</Text>
            <Text style={styles.title2}>Sign Up</Text>
        </View>


        <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
            />
        </View>

        <View style={styles.inputContainer}>
            <Text style={styles.label}>Number</Text>
            <TextInput
                style={styles.input}
                value={number}
                onChangeText={setNumber}
            />
        </View>

        <View style={styles.inputContainer}>
            <Text style={styles.label}>Address</Text>
            <TextInput
                style={styles.input}
                value={address}
                onChangeText={setAddress}
            />
        </View>

        <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={saveUserInfo} style={styles.button}>
                <Text style={{color: 'white'}}>Sign Up</Text>
            </TouchableOpacity>
        </View>

    </View>)
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingBottom: 250
    },
    titleContainer: {
        alignItems: 'left',
        marginVertical: 20,
    },
    title1: {
        fontSize: 16,
    },
    title2: {
        fontSize: 40,
        fontWeight: 'bold',
    },
    inputContainer: {
        alignItems: 'left',
        flexDirection: 'column',
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        marginLeft: 1
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingLeft: 10,
        marginBottom: 20,
        borderRadius: 20,
        width: '100%'
    },
    buttonContainer: {
        alignItems: 'center',
    },
    button: {
        alignItems: 'center',
        marginTop: 20,
        paddingVertical: 12,
        borderRadius: 20,
        elevation: 2,
        backgroundColor: '#f159d8',
        width: '70%'
    },

})

export default SignUpPage