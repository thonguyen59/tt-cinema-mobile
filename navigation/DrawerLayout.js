import {createDrawerNavigator} from "@react-navigation/drawer";
import HomeScreen from "../screens/HomeScreen";

const Drawer = createDrawerNavigator();
function DrawerLayout() {
    return(
        <Drawer.Navigator>
            <Drawer.Screen name='Home' component={HomeScreen} />
        </Drawer.Navigator>
    )
}

export default DrawerLayout