import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import MovieDetailScreen from '../screens/MovieDetailScreen';

const Stack = createNativeStackNavigator()

function StackNavigation() {
  return (
      <Stack.Navigator initialRouteName={HomeScreen}>
        <Stack.Screen name="home1" component={HomeScreen}/>
        <Stack.Screen name="movieDetail" component={MovieDetailScreen}/>
      </Stack.Navigator>
  )
}

export default StackNavigation