import {createDrawerNavigator} from '@react-navigation/drawer';
import BottomTab from './BottomTab';
import React, {useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faFilm, faHome, faStore} from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StoreScreen from '../screens/StoreScreen';
import PersonalScreen from '../screens/PersonalScreen';
import {faUser} from '@fortawesome/free-regular-svg-icons';

const Drawer = createDrawerNavigator();

function DrawerNavigation({navigation}) {

  useEffect(() => {
    AsyncStorage.getItem('username').then(
        (value) => {
          if (!value) {
            navigation.navigate('signIn');
          }
        },
    );
  }, []);

  return (
      <Drawer.Navigator initialRouteName="bottomTab"
                        screenOptions={{
                          headerTransparent: true,
                          headerTintColor: 'white',
                          drawerStyle: {
                            backgroundColor: 'black',
                            width: 260,
                          },
                          labelStyle: {
                            color: 'white', // Change text color here
                          },
                          drawerInactiveTintColor: 'rgba(255,255,255,0.67)',
                          drawerActiveTintColor: 'rgba(255,255,255,0.67)',
                          drawerActiveBackgroundColor: 'black',
                          drawerItemStyle: {
                            borderBottomWidth: 1,
                            borderRadius: 0,
                            borderBottomColor: 'rgba(255,255,255,0.67)',
                          },
                        }}>
        <Drawer.Screen name="bottomTab" component={BottomTab}
                       options={{
                         drawerLabel: 'Home',
                         headerTitle: '',
                         drawerIcon: ({}) => (
                             <FontAwesomeIcon icon={faHome} color="rgba(255,255,255,0.67)" size={18}/>
                         ),
                       }}/>
        <Drawer.Screen name="showtimeCinema" component={StoreScreen}
                       options={{
                         drawerLabel: 'Showtimes',
                         headerTitle: '',
                         drawerIcon: ({}) => (
                             <FontAwesomeIcon icon={faFilm} color="rgba(255,255,255,0.67)" size={18}/>
                         ),
                       }}/>
        <Drawer.Screen name="store" component={StoreScreen}
                       options={{
                         drawerLabel: 'Store',
                         headerTitle: '',
                         drawerIcon: ({}) => (
                             <FontAwesomeIcon icon={faStore} color="rgba(255,255,255,0.67)" size={18}/>
                         ),
                       }}/>
        <Drawer.Screen name="information" component={PersonalScreen}
                       options={{
                         drawerLabel: 'Account information',
                         headerTitle: '',
                         drawerIcon: ({}) => (
                             <FontAwesomeIcon icon={faUser} color="rgba(255,255,255,0.67)" size={18}/>
                         ),
                       }}/>
      </Drawer.Navigator>
  );
}

export default DrawerNavigation;