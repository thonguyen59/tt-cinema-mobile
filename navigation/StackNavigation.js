import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import MovieDetailScreen from '../screens/MovieDetailScreen';
import BottomTab from './BottomTab';

const Stack = createNativeStackNavigator()

function StackNavigation() {
  return (
      <Stack.Navigator initialRouteName={HomeScreen}>
        <Stack.Screen name="homeDetail" component={HomeScreen} options={{headerShown: false}}/>
        <Stack.Screen name="movieDetail" component={MovieDetailScreen} options={{headerShown: false}}/>
        <Stack.Screen name="bottomTab1" component={BottomTab} options={{headerShown: false}}/>
      </Stack.Navigator>
  )
}

export default StackNavigation