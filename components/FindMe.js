import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { LinearGradient } from 'expo-linear-gradient';

import Card from './Card';

const FindMe = props => {

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
        console.log("Location tiene: ", location.coords.latitude);
        console.log("Location tiene: ", location.coords.longitude);

        await props.navigation.navigate("Map", {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
        });
    };

    return (
        <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
            <View style={styles.why}>
                <Card style={styles.card}>
                    <Button style={styles.button} title="Localizar!!" onPress={this.findCurrentLocationAsync} />
                </Card>
            </View>
        </LinearGradient>
    );

}

const styles = StyleSheet.create({
    why: {
        flex: 1,
        marginVertical: 220,
        alignItems: 'center',
        justifyContent: 'center'
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
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      },
    card: {
        height: 200,
        width: 200,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#B4E1FF'
    },
    button: {
        color: '#F7ECE1'
    }
});



export default FindMe;
