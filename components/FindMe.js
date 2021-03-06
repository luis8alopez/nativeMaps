import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

import Card from './Card';


const FindMe = props => {
    state = {
        location: null,
        errorMessage: null
    };
    const [location, setLocation] = useState('');


    findCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition(
            position => {
                const latitude = JSON.stringify(position.coords.latitude);
                const longitude = JSON.stringify(position.coords.longitude);

                this.setState({
                    latitude,
                    longitude
                });
            },
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    };

    findCurrentLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);

        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied'
            });
        }

        let location = await Location.getCurrentPositionAsync({
            accuracy: 6
        });
        setLocation({ location });
        props.onGetLoc(location);
    };


    let text = '';
    if (this.state.errorMessage) {
        text = location;
    } else if (location) {
        props.onGetLong(location.location.coords.longitude);
        props.onGetLat(location.location.coords.latitude);
        text = JSON.stringify(location);
        props.onVista(1);
    }
    return (
        <View style={styles.why}>
            <Card style={styles.card}>
                <Button style={styles.button} title="Localizar!!" onPress={this.findCurrentLocationAsync} />
            </Card>
            <Text>{text}</Text>
        </View>
    );

}

const styles = StyleSheet.create({
    why: {
        flex: 1,
        marginVertical: 220
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapStyle: {
        width: '90%',
        height: '80%',
    },
    card:{
        height: 200,
        width: 200,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#B4E1FF'
    },
    button: {
        color:'#F7ECE1'
    }
});



export default FindMe;
