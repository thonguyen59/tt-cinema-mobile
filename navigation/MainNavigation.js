import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DrawerNavigation from './DrawerNavigation';
import MovieDetailScreen from '../screens/MovieDetailScreen';
import BottomTab from './BottomTab';
import HomeScreen from '../screens/HomeScreen';
import ShowTimeScreen from "../screens/ShowTimeScreen";
import SeatsScreen from "../screens/SeatsScreen";
import CinemaShowtimeDropdown from "../components/CinemaShowtimeDropdown";
import PaymentScreen from "../screens/PaymentScreen";

const Stack = createNativeStackNavigator();

function MainNavigation() {
    return (
        <Stack.Navigator screenOptions={{headerTintColor: 'rgba(255,255,255,0.67)'}}>
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
            <Stack.Screen name="bookingSeats" component={SeatsScreen}
                          options={{
                              headerTitleStyle:{color: 'rgba(255,255,255,0.67)'},
                              headerStyle:{backgroundColor:'black'},
                              title: 'Session Selection',
                          }}/>
            <Stack.Screen name="payment" component={PaymentScreen}
                          options={{
                              headerTitle: null,
                              headerTransparent: true,
                              title: ''
                          }}/>
        </Stack.Navigator>
    );
}

export default MainNavigation;