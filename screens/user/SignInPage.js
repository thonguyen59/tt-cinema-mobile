import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignInPage = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState({});
  const onSignUp = () => {
    navigation.navigate('signUp');
  };

  const saveUser = async (user) => {
    AsyncStorage.setItem('userID', user.id.toString());
    AsyncStorage.setItem('username', user.username);
    AsyncStorage.setItem('email', user.email);
  };

  const onSignIn = () => {
    if (!username) {
      alert('Please fill Username');
      return;
    }
    if (!password) {
      alert('Please fill Password');
      return;
    }

    fetch('http://10.91.10.85:8080/user/login', {
      method: 'POST',
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json()).then((responseJson) => {
      if (responseJson.status === 'success') {
        saveUser(responseJson.data).then(navigation.navigate('drawer'));

      } else {
        console.log(responseJson.status);
        alert('Please check your user  or password');
      }
    }).catch((error) => {
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
        <TouchableOpacity style={styles.button} onPress={onSignIn}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>


    <View style={styles.signUpLink}>
      <TouchableOpacity>
        <Text style={{color: '#16cc3c'}} onPress={onSignUp}>Sign-up</Text>
      </TouchableOpacity>
    </View>
  </View>);
};

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
    paddingBottom: 150,
  },
  titleContainer: {
    alignItems: 'left',
    marginVertical: 20,
  },
  title1: {
    fontSize: 16,
    color: 'white',
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
    width: '70%',
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  signUpLink: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
});

export default SignInPage;