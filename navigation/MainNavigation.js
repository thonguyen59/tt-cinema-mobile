import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DrawerNavigation from './DrawerNavigation';
import MovieDetailScreen from '../screens/MovieDetailScreen';
import BottomTab from './BottomTab';
import HomeScreen from '../screens/HomeScreen';
import ShowTimeScreen from "../screens/ShowTimeScreen";

const Stack = createNativeStackNavigator();

function MainNavigation() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="drawer" component={DrawerNavigation} options={{headerShown: false}}/>
            <Stack.Screen name="movieDetail" component={MovieDetailScreen}
                          options={{
                              headerTitle: null,
                              headerTransparent: true,
                              title: ''
                          }}/>
            <Stack.Screen name="showTime" component={ShowTimeScreen}
                          options={{
                              headerTitle: null,
                              headerTransparent: true,
                              title: ''
                          }}/>


        </Stack.Navigator>
    );
}

export default MainNavigation;