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
        //Problema acá, no muestra los parámetros pasados por el nav
        console.log("A ver si pasan params: "+ props.navigation.state.params.latitude);
    };


    let text = '';
    if (this.state.errorMessage) {
        text = location;
    } else if (location) {
        () => {
            // props.onGetLong(location.location.coords.longitude);
            // props.onGetLat(location.location.coords.latitude);
        }
        
        text = JSON.stringify(location);
    }
    
    return (
        <View style={styles.why}>
            <Card style={styles.card}>
                <Button style={styles.button} title="Localízame en el mapa" onPress={this.findCurrentLocationAsync} />
                <Button style={styles.button} title="Vamos al mapa" onPress={() => {
                    props.navigation.navigate('Map')
                }} />
            </Card>
            <Text>{text}</Text>
        </View>
    );

}

const styles = StyleSheet.create({
    why: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'

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
        color:'#F7ECE1',
        paddingTop: 10
    }
});



export default FindMe;
