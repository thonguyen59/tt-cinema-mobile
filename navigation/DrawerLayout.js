import {createDrawerNavigator} from '@react-navigation/drawer';
import BottomTab from './BottomTab';
import MovieDetailScreen from "../screens/MovieDetailScreen";
import React from "react";

const Drawer = createDrawerNavigator();

function DrawerLayout() {
  return (<Drawer.Navigator
          initialRouteName="Home"
          screenOptions={{
              headerTransparent: true
          }}>
          <Drawer.Screen name=' ' component={BottomTab} options={{drawerLabel: 'Home'}}/>
          <Drawer.Screen name="movieDetail"
                         component={MovieDetailScreen}
                         options={{
                             drawerLabel: () => null,
                             drawerItemStyle: { pointerEvents: 'none' },
                             headerShown: false,
                             gestureEnabled: false,
                         }}
          />
      </Drawer.Navigator>
  );
}

export default DrawerLayout;