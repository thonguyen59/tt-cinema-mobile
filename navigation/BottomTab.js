import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ShowTimeScreen from '../screens/ShowTimeScreen';
import StoreScreen from '../screens/StoreScreen';
import PersonalScreen from '../screens/PersonalScreen';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHome, faFilm, faStore} from '@fortawesome/free-solid-svg-icons';
import {faUser} from '@fortawesome/free-regular-svg-icons';

const Tab = createBottomTabNavigator();

function BottomTab() {
    return (
        <Tab.Navigator initialRouteName="home" screenOptions={({route}) => ({
            headerShown: false,
            tabBarStyle: {
                height: 52,
                paddingHorizontal: 5,
                paddingTop: 4,
                paddingBottom: 5,
                backgroundColor: 'rgba(34,36,40,1)',
                borderTopWidth: 0,
            },
            tabBarActiveTintColor: 'green',
        })}>
            <Tab.Screen name="home" component={HomeScreen}
                        options={{
                            headerShown: false,
                            tabBarLabel: 'HOME',
                            tabBarIcon: () => (
                                <FontAwesomeIcon icon={faHome} size={26}/>
                            ),

                        }}
            />

            <Tab.Screen name="showtime" component={ShowTimeScreen}
                        options={{
                            headerShown: false,
                            tabBarLabel: 'SHOWTIME',
                            tabBarIcon: () => (
                                <FontAwesomeIcon icon={faFilm} size={26}/>
                            ),
                        }}/>

            <Tab.Screen name="store" component={StoreScreen}
                        options={{
                            headerShown: false,
                            tabBarLabel: 'STORE',
                            tabBarIcon: () => (
                                <FontAwesomeIcon icon={faStore} size={26}/>
                            ),
                        }}/>

            <Tab.Screen name="personal" component={PersonalScreen}
                        options={{
                            headerShown: false,
                            tabBarLabel: 'PERSONAL',
                            tabBarIcon: () => (
                                <FontAwesomeIcon icon={faUser} size={22}/>
                            ),
                        }}/>


        </Tab.Navigator>
    );
}

export default BottomTab;