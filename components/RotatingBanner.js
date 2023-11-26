import {View, Text, Dimensions, StyleSheet, Image} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import AnimatedDotsCarousel from 'react-native-animated-dots-carousel';
import React, {useState} from 'react';

function RotatingBanner() {
    const [index, setIndex] = useState(0);
    const width = Dimensions.get('window').width;

    const handleIndex = (index) => {
        setIndex(index);
    };

    const data = [
        {
            image: require('../assets/banners/ip.png'),
        },
        {
            image: require('../assets/banners/visa.jpg'),
        },
        {
            image: require('../assets/banners/namlun.jpg'),
        },
        {
            image: require('../assets/banners/app.jpg'),
        },
        {
            image: require('../assets/banners/PN.jpeg'),
        },
    ];

    return (
        <View style={{flex: 1}}>
            <Carousel
                style={styles.carousel}
                loop
                width={width}
                height={width / 2.2}
                autoPlay={true}
                data={data}
                onSnapToItem={(index) => handleIndex(index)}
                scrollAnimationDuration={1000}
                renderItem={({index}) => (
                    <View style={styles.imageContainer}>
                        <Image source={data[index].image} style={styles.image}/>
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
        transform: [
            {translateX: 170},
            {translateY: 160},
        ],
    },
    imageContainer: {
        justifyContent: 'center',
    },
    image: {
        width: '100%',
        height: undefined,
        aspectRatio: 9/6,
        resizeMode: 'center',
    },
});

export default RotatingBanner;
