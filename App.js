import {NavigationContainer} from "@react-navigation/native";
import MainNavigation from './navigation/MainNavigation';
import { LogBox } from 'react-native';

export default function App() {
    LogBox.ignoreAllLogs();//Ignore all log notifications
    return (
        <NavigationContainer>
            <MainNavigation/>
        </NavigationContainer>
    );
}