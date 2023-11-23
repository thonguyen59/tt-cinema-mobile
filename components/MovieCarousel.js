import {View, Text, Dimensions, StyleSheet} from 'react-native';
import Carousel from 'react-native-snap-carousel';


const data = [
  {
    uri: 'https://picsum.photos/200/300',
    title: 'Image 1',
  },
  {
    uri: 'https://picsum.photos/200/300',
    title: 'Image 2',
  },
  {
    uri: 'https://picsum.photos/200/300',
    title: 'Image 3',
  },
];



function MovieCarousel() {
  const width = Dimensions.get('window').width;

  const renderItem = ({ item, index }, parallaxProps) => {
    return (
        <View style={styles.item}>
          <ParallaxImage
              source={{ uri: item.uri }}
              containerStyle={styles.imageContainer}
              style={styles.image}
              parallaxFactor={0.4} // Adjust this value for the parallax effect
              {...parallaxProps}
          />
          <Text style={styles.title}>{item.title}</Text>
        </View>
    );
  };

  return (
      <View style={styles.container}>
        <Carousel
            data={data}
            renderItem={renderItem}
            sliderWidth={width}
            itemWidth={width - 60}
            hasParallaxImages={true}
        />
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    width: width - 60, // Adjust the item width as needed
    height: 200,
    borderRadius: 8,
    overflow: 'hidden',
  },
  imageContainer: {
    flex: 1,
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  title: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default MovieCarousel;
