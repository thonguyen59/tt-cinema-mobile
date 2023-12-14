import {createDrawerNavigator} from '@react-navigation/drawer';
import BottomTab from './BottomTab';
import MovieDetailScreen from '../screens/MovieDetailScreen';
import React from 'react';

const Drawer = createDrawerNavigator();

function DrawerLayout() {
  return (
      <Drawer.Navigator initialRouteName={BottomTab} screenOptions={{headerTransparent: true}}>
        <Drawer.Screen name=" " component={BottomTab} options={{drawerLabel: 'Home'}}/>
      </Drawer.Navigator>
  );
}

export default DrawerLayout;