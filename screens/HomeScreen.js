import React from 'react';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

import { View, StyleSheet, TextInput, Button, Image } from 'react-native';

let lati;
let longi;
const HomeScreen = props => {

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
        console.log(location);
        const lat = parseFloat(location.coords.latitude);
        const long = parseFloat(location.coords.longitude);
        lati = lat;
        longi = long;       
        console.log("hay en lat y long: "+lati+" "+longi);
    };
    
    return (
        <View style={styles.screen}>

            <Image
                style={styles.stretch}
                source={require('../assets/money.png')}
            />

            <View style={styles.input}>
                <TextInput style={styles.text} underlineColorAndroid='grey' placeholder=' Enter user'></TextInput>
                <TextInput style={styles.text} underlineColorAndroid='grey' placeholder=' Enter pass'></TextInput>
                <Button style={styles.button} title="Log" onPress={()=> {
                    this.findCurrentLocationAsync();
                    props.navigation.navigate('Find',{
                        latitude: lati,
                        longitude: longi,
                    });
                }} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    log: {
        padding: 10,
        width: 200

    },
    input: {
        padding: 10,
        width: 200,
        justifyContent: 'center',
        flex: 1
    },
    text: {
        height: 40,
        borderWidth: 2,
        marginBottom: 10,
        borderRadius: 15,
        marginRight: 2
    },
    button: {
        borderRadius: 20,
        marginBottom: 10
    },
    stretch: {
        width: 50,
        height: 50,
        padding: 10
    },
    goo: {
        padding: 10,
        marginTop: 10
    }
});

export default HomeScreen;