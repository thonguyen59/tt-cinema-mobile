import {View, Text, Dimensions, StyleSheet} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import AnimatedDotsCarousel from 'react-native-animated-dots-carousel';
import {useState} from 'react';

function RotatingBanner() {
  const [index, setIndex] = useState(0);
  const width = Dimensions.get('window').width;

  const handleIndex = (index) => {
    setIndex(index);
  };

  return (
      <View style={{flex: 1}}>
        <Carousel
            style={styles.carousel}
            loop
            width={width}
            height={width / 2}
            autoPlay={true}
            data={[...new Array(4).keys()]}
            onSnapToItem={(index) => handleIndex(index)}
            scrollAnimationDuration={1000}
            renderItem={({index}) => (
                <View
                    style={{
                      flex: 1,
                      borderWidth: 1,
                      justifyContent: 'center',
                    }}
                >
                  <Text style={{textAlign: 'center', fontSize: 90}}>
                    {index}
                  </Text>
                </View>
            )}
            onProgressChange={(_, absoluteProgress) => {
              handleIndex(Math.round(absoluteProgress));
            }}
        />

        <View style={styles.dotsCarousel}>
          <AnimatedDotsCarousel
              length={4}
              currentIndex={index}
              maxIndicators={4}
              interpolateOpacityAndColor={false}
              activeIndicatorConfig={{
                color: '#a8a8a8',
                margin: 3,
                opacity: 1,
                size: 8,
              }}
              inactiveIndicatorConfig={{
                color: '#ffffff',
                margin: 3,
                opacity: 0.5,
                size: 8,
              }}
              decreasingDots={[
                {
                  config: {color: '#a8a8a8', margin: 3, opacity: 0.5, size: 6},
                  quantity: 1,
                },
                {
                  config: {color: '#a8a8a8', margin: 3, opacity: 0.5, size: 4},
                  quantity: 1,
                },
              ]}
          />
        </View>
      </View>
      // <View><Text>Rotating Banner</Text></View>
  );
}

const styles = StyleSheet.create({
  carousel: {
    position: 'absolute',
  },
  dotsCarousel: {
    position: 'absolute',
    textAlign: 'center',
    alignContent: 'center',
    top: '29%',
    left: '55%',
    transform: [
      {translateX: -50},
      {translateY: -50},
    ],
  },
});

export default RotatingBanner;
