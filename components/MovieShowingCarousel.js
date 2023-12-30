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
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTicket} from '@fortawesome/free-solid-svg-icons';
import {useNavigation} from "@react-navigation/native";

const MovieShowingCarousel = ({data}) => {
    const scrollViewRef = useAnimatedRef(null);
    const interval = useRef();
    const [newData] = useState([
        {key: 'spacer-left', posterURL: '', posterHorizontalURL: '', title: '', time: ''},
        ...data,
        {key: 'spacer-right', posterURL: '', posterHorizontalURL: '', title: '', time: ''},
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
        navigation.navigate('movieDetail', {id: id, enable: true});
    };

    const goBooking = (index) => {
        navigation.navigate('showtime', {movie: data[index - 1]});
    };

    useEffect(() => {
        clearInterval(interval.current);
    }, [SIZE, SPACER, data.length, offSet.value, scrollViewRef]);

    return (
        <View>
            <View style={styles.container}>
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
                            <View style={[{width: SIZE}, styles.itemContainer]} key={index}>
                                <TouchableOpacity onPress={() => {
                                    goToDetails(item.id)
                                }}>
                                    <Animated.View style={[styles.imageContainer, style]}>
                                        <Image source={{uri: item.posterURL}} style={styles.image}/>
                                    </Animated.View>
                                </TouchableOpacity>

                                <View style={styles.title}>
                                    <TitleMovie title={item.title} time={time}/>
                                </View>

                                <View style={{height: 50}}></View>

                                <View style={styles.visible}>
                                    <TouchableOpacity onPress={() => goBooking(index)} style={styles.visibleBtn}>
                                        <Text> </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        );
                    })}
                </Animated.ScrollView>
            </View>
            <View style={styles.fluent}>
                <TouchableOpacity style={styles.bookingBtn}>
                    <FontAwesomeIcon icon={faTicket} style={styles.bookingIcon}/>
                    <Text style={styles.bookingTxt}>Booking</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default MovieShowingCarousel;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 500,
        position: 'absolute',
        zIndex: 2
    },
    imageContainer: {
        borderRadius: 10,
        overflow: 'hidden',
        width: '90%',
    },
    itemContainer: {
        zIndex: 2,
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
        paddingVertical: 10,
        paddingHorizontal: 40
    },
    bookingTxt: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    },
    bookingIcon: {
        marginRight: 10,
        color: 'white',
    },
    fluent: {
        position: 'absolute',
        transform: [
            {translateX: 115},
            {translateY: 450},
        ],
        zIndex: 1,
    },
    visibleBtn: {
        // backgroundColor: 'red',
        height: 42,
        paddingRight: 165,
    },
    visible: {
        transform: [
            {translateX: 43},
            {translateY: 450},
        ],
        position: 'absolute',
        zIndex: 2,
    },
});