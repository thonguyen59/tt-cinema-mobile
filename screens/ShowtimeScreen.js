import {
    StyleSheet, Text, View, Image, Button, ScrollView, TouchableOpacity, SectionList, FlatList, SafeAreaView,
} from 'react-native';
import React, {useState, useCallback, useRef, useEffect} from 'react';
import CinemaShowtimeDropdown from '../components/CinemaShowtimeDropdown';
import axios from 'axios';

function ShowtimeScreen({route}) {
    const [dateSelected, setDateSelected] = useState('');
    const [locationSelected, setLocationSelected] = useState(1);
    const [data, setData] = useState([]);
    const [dates, setDates] = useState([]);
    const [locations, setLocations] = useState([]);
    const [cinemas, setCinemas] = useState([]);
    const [showtimes, setShowtimes] = useState([]);

    const [seats, setSeats] = useState([]);
    const weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    useEffect(() => {
        createDatesAndLocations();
    }, [data]);

    useEffect(() => {
        getData();
    }, [route.params.movie.id]);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        let movieID = route.params.movie.id;
        var url = 'http://172.16.3.239:8080/showtime/movie/' + movieID;
        axios.get(url).then(function (response) {
            setData(response.data);
            // console.log('Call API get show times successfurl.');
        }).catch(function (error) {
            console.log(error.message);
        });
    };

    function getShowtimes(cinemaName) {
        let showtimes = [];
        data.forEach(e => {
            let date = new Date(e.startTime);
            let id = date.getDate().toString() + date.getMonth().toString();

            if (id === dateSelected && e.cinema.location === locationSelected && e.cinema.name === cinemaName) {
                e.time = (date.getHours() < 10 ? '0' : '') + date.getHours().toString() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes().toString();
                showtimes.push(e);
            }
        });
        return showtimes;
    }

    function createDatesAndLocations() {
        let datesTemp = [];
        let locationsTemp = [];

        data.forEach(e => {
            let date = new Date(e.startTime);
            let id = date.getDate().toString() + date.getMonth().toString();
            let dayOfWeek = weekday[date.getDay()];
            let dayOfMonth = date.getDate();
            locationsTemp.push({name: e.cinema.location});
            datesTemp.push({id: id, day: dayOfWeek, date: dayOfMonth});
        });

        const datesResult = [];
        const locationResult = [];

        datesTemp.forEach(e => {
            let check = true
            datesResult.forEach(d => {
                if (d.id === e.id) {
                    check = false
                }
            })
            if (check) {
                datesResult.push(e);
            }
        });

        locationsTemp.forEach(e => {
            let check = true
            locationResult.forEach(d => {
                if (d.name === e.name) {
                    check = false
                }
            })
            if (check) {
                locationResult.push(e);
            }
        });

        setDates(datesResult);
        setLocations(locationResult);

        handleDateSelection(dates[0]);
        handleLocationSelection(locations[0]);
    }

    useEffect(() => {
        getCinemas();
    }, [dateSelected, locationSelected]);

    function getCinemas() {
        let cinemaTemp = [];

        data.forEach(e => {
            let date = new Date(e.startTime);
            let id = date.getDate().toString() + date.getMonth().toString();

            if (id === dateSelected && e.cinema.location === locationSelected) {
                cinemaTemp.push({name: e.cinema.name});
            }
        });

        const cinemaResult = [];

        cinemaTemp.forEach(e => {
            const isFound = cinemaResult.some(element => {
                if (element.name === e.name) {
                    return true;
                }
                return false;
            });

            if (!isFound) {
                cinemaResult.push(e)
            }
        });

        setCinemas(cinemaResult);
    }

    const handleDateSelection = (date) => {
        if (date) {
            setDateSelected(date.id);
        }
    };

    const handleLocationSelection = (location) => {
        if (location) {
            setLocationSelected(location.name);
            getCinemas();
        }
    };

    const renderDates = ({item}) => {
        return (<View>
            <TouchableOpacity onPress={e => handleDateSelection(item)}
                              style={[styles.date, dateSelected === item.id && styles.dateSelected]}>
                <Text style={[styles.text, dateSelected === item.id && styles.textSelected]}>{item.date}</Text>
                <Text style={[styles.text, dateSelected === item.id && styles.textSelected, {fontSize: 19}]}>
                    {item.day}
                </Text>
            </TouchableOpacity>
        </View>);
    };

    const renderLocations = ({item}) => {
        return (<View style={[styles.location, locationSelected === item.name && styles.locationSelected]}>
            <TouchableOpacity onPress={e => handleLocationSelection(item)}>
                <Text style={[styles.text, locationSelected === item.name && styles.textSelected]}>{item.name}</Text>
            </TouchableOpacity>
        </View>);
    };

    const renderShowtime = ({item}) => (<View>
        <CinemaShowtimeDropdown movie={route.params.movie} title={item.name} showtime={getShowtimes(item.name)}/>
    </View>);

    return (<View style={styles.container}>
        <Image source={{uri: route.params.movie.posterHorizontalURL}} style={styles.poster}/>
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


        <View style={{width: '100%'}}>
            <FlatList
                data={cinemas}
                renderItem={renderShowtime}
                keyExtractor={(item) => item.name}
            />
        </View>

    </View>);
}

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: 'black', justifyContent: 'flex-start',
    }, bodyContainer: {
        marginHorizontal: 12,
    }, poster: {
        width: '100%', height: '25%',
    }, title: {
        color: 'white', fontSize: 25, fontWeight: 'bold', marginTop: 15,
    }, text: {
        color: 'rgba(255,255,255,0.67)', fontSize: 18,
    }, textSelected: {
        color: 'white', fontSize: 18, fontWeight: 'bold',
    }, date: {
        width: 50, height: 60, marginRight: 10, borderRadius: 5, justifyContent: 'center', alignItems: 'center',
    }, dateSelected: {
        width: 50,
        height: 60,
        marginRight: 10,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#6FAA35',
    }, location: {
        width: 'auto',
        height: 40,
        marginRight: 15,
        borderRadius: 5,
        paddingHorizontal: 15,
        justifyContent: 'center',
        borderColor: 'rgba(255,255,255,0.67)',
        borderWidth: 1,
    }, locationSelected: {
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
});

export default ShowtimeScreen;