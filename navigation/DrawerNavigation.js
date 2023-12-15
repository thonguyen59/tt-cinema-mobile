import {createDrawerNavigator} from '@react-navigation/drawer';
import BottomTab from './BottomTab';
import MovieDetailScreen from '../screens/MovieDetailScreen';
import React from 'react';
import HomeScreen from '../screens/HomeScreen';

const Drawer = createDrawerNavigator();

function DrawerNavigation({navigation}) {
  return (
      <Drawer.Navigator initialRouteName="bottomTab" screenOptions={{headerTransparent: true}}>
        <Drawer.Screen name="bottomTab" component={BottomTab} navigationKey={} }
                       options={{
                         drawerLabel: 'Home',
                         headerTitle: '',
                       }}/>
      </Drawer.Navigator>
  );
}

export default DrawerNavigation;