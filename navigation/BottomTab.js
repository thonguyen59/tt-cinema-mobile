import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from "../screens/HomeScreen";

const Tab = createBottomTabNavigator()

function BottomTab() {
    return (
        <Tab.Navigator>
            <Tab.Screen name='HOME' component={HomeScreen}
                        options={{
                            headerShown: false,
                            tabBarLabel: 'Home',
                            // tabBarIcon: () => (<Entypo name="home" size={24} color="black"/>)
                        }}/>

            <Tab.Screen name='SHOWTIMES' component={HomeScreen}
                        options={{
                            headerShown: false,
                            tabBarLabel: 'Home',
                        }}/>

            <Tab.Screen name='STORE' component={HomeScreen}
                        options={{
                            headerShown: false,
                            tabBarLabel: 'Home',
                        }}/>

            <Tab.Screen name='PERSONAL' component={HomeScreen}
                        options={{
                            headerShown: false,
                            tabBarLabel: 'Home',
                        }}/>

        </Tab.Navigator>
    )
}

export default BottomTab;