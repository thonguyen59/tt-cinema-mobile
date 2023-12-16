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

const MovieShowingCarousel = ({data, isShowing}) => {
    const scrollViewRef = useAnimatedRef(null);
    const interval = useRef();
    const [newData] = useState([
        {key: 'spacer-left'},
        ...data,
        {key: 'spacer-right'},
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

    const goToDetails = () => {
        navigation.navigate('movieDetail', {movieName: 'The Eras rour'});
    };

    const goBooking = () => {
        navigation.navigate('showTime');
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
                        return <View style={{width: SPACER}} key={index}/>;
                    }
                    return (
                        <View style={{width: SIZE}} key={index}>
                            <TouchableOpacity onPress={goToDetails}>
                                <Animated.View style={[styles.imageContainer, style]}>
                                    <Image source={item.image} style={styles.image}/>
                                </Animated.View>
                            </TouchableOpacity>
                        </View>
                    );
                })}
            </Animated.ScrollView>
            <View style={styles.title}>
                <TitleMovie title="Thor" time="90 minutes"/>
            </View>

            {isShowing &&
                <View>
                    <TouchableOpacity onPress={goBooking} style={styles.bookingBtn}>
                        <FontAwesomeIcon icon={faTicket} style={styles.bookingIcon}/>
                        <Text style={styles.bookingTxt}>Booking</Text>
                    </TouchableOpacity></View>}
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
        aspectRatio: 6 / 9,
    },
    title: {
        marginTop: 5
    },
    bookingBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: '#16cc3c',
        borderRadius: 10,
        marginTop: 10,
        paddingVertical: 7,
        width: '50%'
    },
    bookingTxt: {
        marginRight: 5,
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    },
    bookingIcon: {
        marginRight: 10,
        color: 'white',
    },
});