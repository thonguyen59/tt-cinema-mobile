import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';

function TicketScreen({route}) {
  const [ticket] = useState(route.params.ticket);

  useEffect(() => {
    console.log(ticket);
  }, []);

  return (
      <View style={styles.container}>
        <Text style={styles.header}>Item Ordered</Text>
        <View style={styles.ticket}>
          <View style={styles.qr}>
            <Image style={{width: 220, height: 220, borderColor: 'red', marginBottom: 20}}
                   source={{uri: `data:image/png;base64,${ticket.qrCode}`}}/>
          </View>
          <Text style={[styles.text, {fontWeight: 'bold', alignSelf: 'center', marginTop: 10}]}>Scan QR Code To
            Enter The Theatre</Text>

          <View style={styles.line}/>

          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.title}>{ticket.movieTitle}</Text>

              <Text style={styles.text}>{route.params.date}</Text>
              <Text style={styles.text}>{route.params.time}</Text>
              <Text style={styles.text}>{ticket.cinemaName}</Text>

              <Text style={[styles.title, {marginTop: 10, fontSize: 16}]}>Booking Number: {ticket.bookingNumber}</Text>
            </View>
            <View style={styles.column}>
              <View style={{alignItems:'center'}}>
                <Image source={{uri: ticket.posterURL}} style={styles.poster}/>
              </View>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.text}>Ghế</Text>
              <Text style={styles.title}>{ticket.seats}</Text>
            </View>
            <View style={styles.column}>
              <View style={{marginLeft: 'auto'}}>
                <Text style={styles.text}>Screen</Text>
                <Text style={styles.title}>{ticket.screen}</Text>
              </View>
            </View>
          </View>
          <View style={styles.line1}/>
          <View style={styles.row}>
            <Text style={styles.text}>Subtotal (including surcharges)</Text>
            <Text style={[styles.title, {marginTop: 5, fontSize: 16, marginLeft: 'auto'}]}>{ticket.subtotal.toLocaleString('en-US')} đ</Text>
          </View>
        </View>
      </View>
  );

}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    color: '#fff',
    fontSize: 20,
    marginTop: '25%',
    marginLeft: 15,
    fontWeight: 'bold',
  },
  text: {
    marginTop: 5,
    color: 'rgb(122,122,122)',
    fontSize: 16,
  },
  ticket: {
    marginTop: 15,
    marginHorizontal: 15,
    borderRadius: 15,
    height: '75%',
    backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  column: {
    flexDirection: 'column',
    width: '50%'
  },
  line: {
    marginVertical: 20,
    borderStyle: 'dashed',
    borderBottomWidth: StyleSheet.hairlineWidth * 6,
  },
  line1: {
    marginVertical: 20,
    borderBottomColor: 'rgb(75,75,75)',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  title: {
    color: 'rgb(75,75,75)',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  image: {
    height: '100%',
    aspectRatio: 6 / 6,
  },
  qr: {
    marginTop: 50,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    height: '25%',
  },
  poster: {
    aspectRatio: 6 / 9,
    height: 130,
  },
});

export default TicketScreen;
