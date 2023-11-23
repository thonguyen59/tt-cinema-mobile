import {createDrawerNavigator} from '@react-navigation/drawer';
import BottomTab from './BottomTab';

const Drawer = createDrawerNavigator();

function DrawerLayout() {
  return (
      <Drawer.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerTransparent: true
          }}>
        <Drawer.Screen name=' ' component={BottomTab} options={{drawerLabel: 'Home'}}/>
      </Drawer.Navigator>
  );
}

export default DrawerLayout;