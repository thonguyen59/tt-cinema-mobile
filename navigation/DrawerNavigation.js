import {createDrawerNavigator} from '@react-navigation/drawer';
import BottomTab from './BottomTab';
import SignInPage from '../screens/user/SignInPage';
import SignUpPage from '../screens/user/SignUpPage';
import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faFilm} from "@fortawesome/free-solid-svg-icons";


const Drawer = createDrawerNavigator();

function DrawerNavigation({navigation}) {
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
            <Drawer.Screen name="Login" component={SignInPage}
                           options={{
                               drawerLabel: 'Login',
                               headerTitle: '',
                           }}/>
           <Drawer.Screen name="Register" component={SignUpPage}
                           options={{
                               drawerLabel: 'Register',
                               headerTitle: '',
                           }}/>
        </Drawer.Navigator>
    );
}

export default DrawerNavigation;