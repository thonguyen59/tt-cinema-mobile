import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {useState} from "react";

const SignInPage = ({navigation}) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const onSignUp =()=>{
        navigation.navigate('Register')
    }
    const onSignIn = () => {
        if (!username) {
            alert('Please fill Username');
            return;
          }
          if (!password) {
            alert('Please fill Password');
            return;
          }
          
          fetch('http://192.168.163.1:8080/user/login', {
            method: 'POST',
            body: JSON.stringify({
              username: username,
              password: password
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          }) 
            .then((response) => response.json())
            .then((responseJson) => {        
              if (responseJson.status === 'success') {
                navigation.navigate('bottomTab') 
              } else {
                console.log(responseJson.status );
                alert('Please check your user  or password');
              }
            })
            .catch((error) => {
              console.error(error);
            });

    };


    return (<View style={styles.container}>

        <View style={styles.body}>
            <View style={styles.titleContainer}>
                <Text style={styles.title1}>Welcome</Text>
                <Text style={styles.title2}>Sign In</Text>
            </View>


            <View style={styles.inputContainer}>
                <Text style={styles.label}>Username</Text>
                <TextInput
                    style={styles.input}
                    value={username}
                    onChangeText={setUsername}
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

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button}  onPress={onSignIn}>
                    <Text style={{color: 'white'}}>Sign In</Text>
                </TouchableOpacity>
            </View>
        </View>


        <View style={styles.signUpLink}>
            <TouchableOpacity>
                <Text style={{color: '#f159d8'}} onPress={onSignUp}>Sign-up</Text>
            </TouchableOpacity>
        </View>
    </View>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'stretch',
        backgroundColor: '#fff',
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
    signUpLink: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
})

export default SignInPage