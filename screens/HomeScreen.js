import {View, Text} from 'react-native';
import RotatingBanner from '../components/RotatingBanner';
import MovieCarousel from '../components/MovieCarousel';

function HomeScreen() {
  return (
      <View>
        <RotatingBanner/>
        <MovieCarousel/>
      </View>
  );
}

export default HomeScreen;
