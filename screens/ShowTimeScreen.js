import {
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    ScrollView,
    TouchableOpacity,
    SectionList,
    FlatList,
    SafeAreaView,
} from 'react-native';
import React, {useState, useCallback, useRef, useEffect} from 'react';
import CinemaShowtimeDropdown from '../components/CinemaShowtimeDropdown';
import YoutubePlayer from 'react-native-youtube-iframe';
import axios from 'axios';

function ShowTimeScreen({route}) {
    const [dateSelected, setDateSelected] = useState("");
    const [locationSelected, setLocationSelected] = useState(1);
    const [showTimes, setShowTimes] = useState([]);
    const [seats, setSeats] = useState([]);
    const [dates, setDates] = useState([])
    const [locations, setLocations] = useState([])
    const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const data = [
        {id: '1', title: 'BHD Star Quang Trung', isShowing: false},
        {id: '2', title: 'BHD Start Bitexco', isShowing: false},
        {id: '3', title: 'BHD Star Lê Văn Việt', isShowing: false},
    ];

    const data2 = [
        {id: 4, time: '01:30'},
        {id: 5, time: '02:15'},
        {id: 6, time: '03:00'},
        {id: 7, time: '04:30'},
        {id: 8, time: '05:15'},
        {id: 9, time: '06:00'},
    ];

    useEffect(() => {
        createDatesAndLocations();
    }, [showTimes]);

    useEffect(() => {
        getShowTimes();
    }, [route.params.movie.id]);


    const getShowTimes = () => {
        let movieID = route.params.movie.id;
        console.log("ID: ", movieID)
        var url = 'http://192.168.1.10:8080/showtime/movie/' + 1;
        axios.get(url).then(function (response) {
            setShowTimes(response.data);
            console.log('Call API get show times successfurl.');
        }).catch(function (error) {
            console.log(error.message);
        });
    };

    function createDatesAndLocations() {
        let datesSet = new Set()
        let locationSet = new Set()

        showTimes.forEach(e => {
            let date = new Date(e.startTime)
            let dayOfWeek = weekday[date.getDay()]
            let dayOfMonth = date.getDate()
            locationSet.add({name: e.cinema.location})
            datesSet.add({id: dayOfWeek + dayOfMonth, day: dayOfWeek, date: dayOfMonth})
        })

        const dateArr = [...datesSet];
        setDates(dateArr)
        const locationArr = [...locationSet];
        setLocations(locationArr)

        // handleDateSelection(dates[0])
        handleLocationSelection(locations[0])
    }

    const getSeats = (showTimeID) => {
        var url = 'http://192.168.1.10:8080/seat/' + showTimeID;
        axios.get(url).then(function (response) {
            setSeats(response.data);
            console.log('Call API get seats successful.');
        }).catch(function (error) {
            console.log(error.message);
        });
    };

    const renderDates = ({item}) => {
        return (
            <View>
                <TouchableOpacity onPress={e => handleDateSelection(item)}
                                  style={[styles.date, dateSelected === item.id && styles.dateSelected]}>
                    <Text style={[styles.text, dateSelected === item.id && styles.textSelected]}>{item.date}</Text>
                    <Text style={[styles.text, dateSelected === item.id && styles.textSelected, {fontSize: 19}]}>
                        {item.day}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    };

    const renderLocations = ({location}) => {
        console.log("Ahuhu: ", location)
        return (
            <View style={[styles.location, locationSelected === location && styles.locationSelected]}>
                <TouchableOpacity>
                    <Text style={[styles.text, dateSelected === location && styles.textSelected]}>{location}</Text>
                </TouchableOpacity>
            </View>
        );
    };

    const handleDateSelection = (date) => {
        setDateSelected(date.id);
    };

    const handleLocationSelection = (location) => {
        setLocationSelected(location);
    };

    const renderShowTime = ({item}) => (
        <View>
            <CinemaShowtimeDropdown title={item.title} data={data2}/>
        </View>
    );

    return (
        <View style={styles.container}>
            <Image source={{uri: route.params.movie.posterURL}} style={styles.poster}/>
            <View style={styles.bodyContainer}>
                <Text style={styles.title}>{route.params.movie.title}</Text>
                <Text style={{color: 'rgba(255,255,255,0.67)', fontSize: 16}}>{route.params.movie.time} phút</Text>
            </View>

            <View>
                <View style={{marginTop: 15, marginLeft: 12}}>
                    <FlatList
                        data={dates}
                        renderItem={renderDates}
                        keyExtractor={item => item.id}
                        horizontal={true}
                    />
                </View>
            </View>

            <View>
                <View style={{marginTop: 20, marginLeft: 12}}>
                    <FlatList
                        data={locations}
                        renderItem={renderLocations}
                        horizontal={true}
                    />
                </View>
            </View>

            {/*<View>*/}
            {/*    <ScrollView horizontal={true} style={{marginTop: 20, marginLeft: 12}}>*/}
            {/*        <View style={[styles.location, locationSelected === 1 && styles.locationSelected]}>*/}
            {/*            <TouchableOpacity>*/}
            {/*                <Text style={[styles.text, dateSelected === 1 && styles.textSelected]}>TPHCM</Text>*/}
            {/*            </TouchableOpacity>*/}
            {/*        </View>*/}
            {/*    </ScrollView>*/}
            {/*</View>*/}


            <View style={{marginTop: 15}}>
                <FlatList
                    data={data}
                    renderItem={renderShowTime}
                />
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'flex-start',
    },
    bodyContainer: {
        marginHorizontal: 12,
    },
    poster: {
        width: '100%',
        height: '25%',
    },
    title: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 15,
    },
    text: {
        color: 'rgba(255,255,255,0.67)',
        fontSize: 18,
    },
    textSelected: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    date: {
        width: 50,
        height: 60,
        marginRight: 10,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dateSelected: {
        width: 50,
        height: 60,
        marginRight: 10,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#6FAA35',
    },
    location: {
        width: 'auto',
        height: 40,
        marginRight: 15,
        borderRadius: 5,
        paddingHorizontal: 15,
        justifyContent: 'center',
        borderColor: 'rgba(255,255,255,0.67)',
        borderWidth: 1,
    },
    locationSelected: {
        width: 'auto',
        height: 40,
        marginRight: 15,
        borderRadius: 5,
        paddingHorizontal: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0,
        backgroundColor: '#6FAA35',
    },
    cinema: {
        borderWidth: 1,
        marginLeft: -1,
        marginRight: -1,
        borderColor: 'rgba(255,255,255,0.67)',
        paddingStart: 10,
        paddingVertical: 10,
    },
    cinemaText: {
        color: 'white',
        fontSize: 20,
    },
});

export default ShowTimeScreen;