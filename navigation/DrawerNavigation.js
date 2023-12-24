import {createDrawerNavigator} from '@react-navigation/drawer';
import BottomTab from './BottomTab';
import SignInPage from '../screens/user/SignInPage';
import SignUpPage from '../screens/user/SignUpPage';
import React, {useEffect} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faFilm} from "@fortawesome/free-solid-svg-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Drawer = createDrawerNavigator();

function DrawerNavigation({navigation}) {

    useEffect(() => {
        AsyncStorage.getItem("username").then(
            (value) => {
                navigation.navigate('signIn')
            }
        )
    }, []);

    return (
        <Drawer.Navigator initialRouteName="bottomTab"
                          screenOptions={{
                              headerTransparent: true,
                              headerTintColor: 'white',
                          }}>
            <Drawer.Screen name="bottomTab" component={BottomTab}
                           options={{
                               drawerLabel: 'Home',
                               headerTitle: '',
                               drawerIcon: ({ color }) => (
                                   <FontAwesomeIcon icon={faFilm} color={color} size={26} />
                               )
                           }}/>
        </Drawer.Navigator>
    );
}

export default DrawerNavigation;