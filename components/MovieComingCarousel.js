import {StyleSheet, View, Image, useWindowDimensions, Text, TouchableOpacity} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import Animated, {
    useSharedValue,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    interpolate,
    useAnimatedRef,
} from 'react-native-reanimated';
import TitleMovie from './TitleMovie';
import {useNavigation} from "@react-navigation/native";

const MovieComingCarousel = ({data}) => {
    const scrollViewRef = useAnimatedRef(null);
    const interval = useRef();
    const [newData] = useState([
        {key: 'spacer-left', posterURL: '', title: '', time: ''},
        ...data,
        {key: 'spacer-right', posterURL: '', title: '', time: ''},
    ]);
    const navigation = useNavigation();
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

    const goToDetails = (id) => {
        navigation.navigate('movieDetail', {id: id, enable: false});
    };

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
                    if (!item.posterURL) {
                        return <View style={{width: SPACER}} key={index}/>;
                    }
                    var time = item.time + " minutes"
                    return (
                        <View style={{width: SIZE}} key={index}>
                            <TouchableOpacity onPress={() => {goToDetails(item.id)}}>
                                <Animated.View style={[styles.imageContainer, style]}>
                                    <Image source={{uri: item.posterURL}} style={styles.image}/>
                                </Animated.View>
                            </TouchableOpacity>

                            <View style={styles.title}>
                                <TitleMovie title={item.title} time={time}/>
                            </View>
                        </View>
                    );
                })}
            </Animated.ScrollView>
        </View>
    );
};

export default MovieComingCarousel;

const styles = StyleSheet.create({
    imageContainer: {
        borderRadius: 10,
        overflow: 'hidden',
        width: '90%',
    },
    image: {
        width: '100%',
        height: undefined,
        aspectRatio: 6 / 9,
    },
    title: {
        marginTop: 5,
        width: '75%',
        alignSelf: 'center'
    },
    bookingBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: '#16cc3c',
        borderRadius: 10,
        marginTop: 10,
        paddingVertical: 10,
        width: '55%'
    },
    bookingTxt: {
        marginRight: 5,
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    },
    bookingIcon: {
        marginRight: 10,
        color: 'white',
    },
});