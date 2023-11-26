import {StyleSheet, View, Image, useWindowDimensions} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import Animated, {
    useSharedValue,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    interpolate,
    useAnimatedRef,
} from 'react-native-reanimated';
// import Pagination from './Pagination';
const MovieShowingCarousel = ({data, pagination}) => {
    const scrollViewRef = useAnimatedRef(null);
    const interval = useRef();
    const [newData] = useState([
        {key: 'spacer-left'},
        ...data,
        {key: 'spacer-right'},
    ]);
    const {width} = useWindowDimensions();
    const SIZE = width * 0.7;
    const SPACER = (width - SIZE) / 1.7;
    const x = useSharedValue(0);
    const offSet = useSharedValue(0);

    const onScroll = useAnimatedScrollHandler({
        onScroll: event => {
            x.value = event.contentOffset.x;
        },
    });

    useEffect(() => {
            clearInterval(interval.current);
    }, [SIZE, SPACER, data.length, offSet.value, scrollViewRef]);

    return (
        <View>
            <Animated.ScrollView
                ref={scrollViewRef}
                onScroll={onScroll}
                onMomentumScrollEnd={e => {
                    offSet.value = e.nativeEvent.contentOffset.x;
                }}
                scrollEventThrottle={16}
                snapToInterval={SIZE}
                horizontal
                bounces={false}
                showsHorizontalScrollIndicator={false}>
                {newData.map((item, index) => {
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    const style = useAnimatedStyle(() => {
                        const scale = interpolate(
                            x.value,
                            [(index - 2) * SIZE, (index - 1) * SIZE, index * SIZE],
                            [0.95, 1, 0.95],
                        );
                        return {
                            transform: [{scale}],
                        };
                    });
                    if (!item.image) {
                        return <View style={{width: SPACER}} key={index} />;
                    }
                    return (
                        <View style={{width: SIZE}} key={index}>
                            <Animated.View style={[styles.imageContainer, style]}>
                                <Image source={item.image} style={styles.image} />
                            </Animated.View>
                        </View>
                    );
                })}
            </Animated.ScrollView>
            {/*{pagination && <Pagination data={data} x={x} size={SIZE} />}*/}
        </View>
    );
};

export default MovieShowingCarousel;

const styles = StyleSheet.create({
    imageContainer: {
        borderRadius: 10,
        overflow: 'hidden',
        width: '90%',
    },
    image: {
        width: '100%',
        height: undefined,
        aspectRatio: 6/9,
    },
});