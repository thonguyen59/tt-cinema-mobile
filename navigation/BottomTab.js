import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ShowtimeScreen from '../screens/ShowtimeScreen';
import StoreScreen from '../screens/StoreScreen';
import PersonalScreen from '../screens/PersonalScreen';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHome, faFilm, faStore} from '@fortawesome/free-solid-svg-icons';
import {faUser} from '@fortawesome/free-regular-svg-icons';
import {CommonActions, useFocusEffect, useIsFocused} from '@react-navigation/native';

const Tab = createBottomTabNavigator();

function BottomTab({ route, navigation }) {
  const isFocused = useIsFocused();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const type = route.params?.type;

      if (isFocused && type === 'GO_TO_TAB_SCREEN_1') {
        navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'TabScreen1' }],
            })
        );
      }
    });

    return unsubscribe;
  }, [navigation, route, isFocused]);

  return (
      <Tab.Navigator initialRouteName="home"
                     screenOptions={{
                       tabBarActiveTintColor: '#008000',
                       tabBarStyle: {
                         paddingHorizontal: 5,
                         backgroundColor: 'rgba(34,36,40,1)',
                         borderTopWidth: 0,
                       },
                     }}>

        <Tab.Screen name="home" component={HomeScreen}
                    listeners={({navigation}) => ({
                      tabPress: (e) => {
                        navigation.navigate('home');
                      },
                    })}
                    options={{
                      headerShown: false,
                      tabBarLabel: 'HOME',
                      tabBarIcon: ({color}) => (
                          <FontAwesomeIcon icon={faHome} color={color} size={26}/>
                      ),

                    }}
        />

        <Tab.Screen name="showtimeCinema" component={StoreScreen}
                    options={{
                      headerShown: false,
                      tabBarLabel: 'SHOWTIME',
                      tabBarIcon: ({color}) => (
                          <FontAwesomeIcon icon={faFilm} color={color} size={26}/>
                      ),
                    }}/>

        <Tab.Screen name="store" component={StoreScreen}
                    options={{
                      headerShown: false,
                      tabBarLabel: 'STORE',
                      tabBarIcon: ({color}) => (
                          <FontAwesomeIcon icon={faStore} color={color} size={26}/>
                      ),
                    }}/>

        <Tab.Screen name="personal" component={PersonalScreen}
                    options={{
                      headerShown: false,
                      tabBarLabel: 'PERSONAL',
                      tabBarIcon: ({color}) => (
                          <FontAwesomeIcon icon={faUser} color={color} size={22}/>
                      ),
                    }}/>
      </Tab.Navigator>
  );
}

export default BottomTab;