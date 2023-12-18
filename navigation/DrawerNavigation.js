import {createDrawerNavigator} from '@react-navigation/drawer';
import BottomTab from './BottomTab';
import SignInPage from '../screens/user/SignInPage';
import SignUpPage from '../screens/user/SignUpPage';
import React from 'react';
import Test from "./Draft";


const Drawer = createDrawerNavigator();

function DrawerNavigation({navigation}) {
    return (
        <Drawer.Navigator initialRouteName="bottomTab"
                          screenOptions={{
                              headerTransparent: true,
                              headerTintColor: 'white'
                              // position: 'absolute',
                          }}>
            <Drawer.Screen name="bottomTab" component={BottomTab}
                           options={{
                               drawerLabel: 'Home',
                               headerTitle: '',
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
            <Drawer.Screen name="test" component={Test}
                           options={{
                               drawerLabel: 'Test',
                               headerTitle: '',
                           }}/>
        </Drawer.Navigator>
    );
}

export default DrawerNavigation;