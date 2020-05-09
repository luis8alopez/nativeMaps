import React, { Component, useEffect } from "react";
import { Text, View, StyleSheet, Button, Image, AsyncStorage } from "react-native";
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

function deleteUser() {
    try {
        AsyncStorage.removeItem('userData');
        console.log("Done");
    } catch (error) {
        console.log(error.message);
    }
}

export default class Profile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            photo: 'icon.png',
            name: 'Hi',
        };

        this.retrieveData();
    }

    retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('userData');
            if (value !== null) {
                // We have data!!
                id = JSON.parse(value)
                this.setState({
                    photo: id.photo,
                    name: id.name
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

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

        await this.props.navigation.navigate("Map", {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
        });
    };

    render() {

        return (
            <View style={styles.container}>
                <Image
                    source={{ uri: this.state.photo }}
                    style={styles.img} />

                <Text> Profile Screen </Text>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                    Welcome, {this.state.name}
                </Text>

                <View style={{ paddingTop: 10 }}>
                    <Button
                        title="Sign out"
                        onPress={() => {
                            deleteUser();
                            this.props.navigation.navigate("Login")
                        }}
                    />
                </View>

                <View style={{ paddingTop: 10 }}>
                    <Button
                        title="Go to Find my Location"
                        onPress={() => {
                            this.findCurrentLocationAsync();
                        }}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        padding: 10
    },
    img: {
        width: 240,
        height: 260, //Arreglar acá, así sea las imágenes de las monedas
        padding: 10,
        borderColor: 'black'
    }
});