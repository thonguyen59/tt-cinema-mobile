import {ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {useState} from "react";

const SignUpPage = ({navigation}) => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [email, setEmail] = useState('')

    const Register = () => {
        if (!username) {
            alert('Please fill Username');
            return;
        }
        if (!password) {
            alert('Please fill Password');
            return;
        }
        if (!(password === passwordConfirm)) {
            alert('password 0 match!');
            return;
        }

        fetch('http://172.16.3.239:8080/user/register', {
            method: 'POST',
            body: JSON.stringify({
                username: username,
                password: password,
                email: email
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {

                if (responseJson.status === 'fail') {
                    alert(responseJson.data);
                    console.log(responseJson.data)
                }
                if (responseJson.status === 'success') {
                    alert("Register success")
                    navigation.navigate('signIn')
                    console.log(responseJson.data);
                }

            })
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <View style={styles.container}>
            <ScrollView style={{height: '70%', marginTop: 80}}>
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
                    <Text style={styles.label}>Username</Text>
                    <TextInput
                        style={styles.input}
                        value={username}
                        onChangeText={setUserName}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        style={styles.input}
                        secureTextEntry={true}
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Confirm Password</Text>
                    <TextInput
                        style={styles.input}
                        secureTextEntry={true}
                        value={passwordConfirm}
                        onChangeText={setPasswordConfirm}
                    />
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={Register} style={styles.button}>
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: 'black',
        paddingHorizontal: 20,
        paddingBottom: 10,
    },
    body: {
        flex: 1, // Takes the available space, pushing the bottomView to the bottom
        justifyContent: 'center',
        paddingBottom: 150
    },
    titleContainer: {
        alignItems: 'left',
        marginVertical: 20,
    },
    title1: {
        fontSize: 16,
        color: 'white'
    },
    title2: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'white',
    },
    inputContainer: {
        alignItems: 'left',
        flexDirection: 'column',
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        marginLeft: 1,
        color: 'white',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingLeft: 10,
        marginBottom: 20,
        borderRadius: 10,
        width: '100%',
        color: 'white',
    },
    buttonContainer: {
        alignItems: 'center',
    },
    button: {
        alignItems: 'center',
        marginTop: 20,
        paddingVertical: 12,
        borderRadius: 10,
        elevation: 2,
        backgroundColor: '#16cc3c',
        width: '70%'
    },
    buttonText: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold'
    },
    signUpLink: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
})

export default SignUpPage