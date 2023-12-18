import {createDrawerNavigator} from '@react-navigation/drawer';
import BottomTab from './BottomTab';
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
            <Drawer.Screen name="test" component={Test}
                           options={{
                               drawerLabel: 'Test',
                               headerTitle: '',
                           }}/>
        </Drawer.Navigator>
    );
}

export default DrawerNavigation;