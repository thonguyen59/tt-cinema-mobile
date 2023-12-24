import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DrawerNavigation from './DrawerNavigation';
import MovieDetailScreen from '../screens/MovieDetailScreen';

import ShowtimeScreen from "../screens/ShowtimeScreen";
import SeatsScreen from "../screens/SeatsScreen";
import PaymentScreen from "../screens/PaymentScreen";
import SignUpPage from "../screens/user/SignUpPage";
import SignInPage from "../screens/user/SignInPage";
import PaymentHistoryScreen from "../screens/PaymentHistoryScreen";
import PersonalScreen from "../screens/PersonalScreen";
import ticketScreen from "../screens/TicketScreen";
import TicketScreen from "../screens/TicketScreen";

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
            <Stack.Screen name="showtime" component={ShowtimeScreen}
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
            <Stack.Screen name="signIn" component={SignInPage}
                          options={{
                              headerTitle: null,
                              headerTransparent: true,
                              title: ''
                          }}/>
            <Stack.Screen name="history" component={PaymentHistoryScreen}
                          options={{
                              headerTitle: null,
                              headerTransparent: true,
                              title: ''
                          }}/>
            <Stack.Screen name="ticket" component={TicketScreen}
                          options={{
                              headerTitle: null,
                              headerTransparent: true,
                              title: ''
                          }}/>
        </Stack.Navigator>
    );
}

export default MainNavigation;