import React, { Component, useEffect } from "react";
import { Text, View, StyleSheet, Button, Image, AsyncStorage, TouchableOpacity, ActivityIndicator } from "react-native";
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { LinearGradient } from 'expo-linear-gradient';

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
            isLoading: false,
            email: 'hi'
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
                    name: id.name,
                    email: id.email
                });
                console.log(value);
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
            <LinearGradient colors={['#005AA7', '#FFFDE4']} style={styles.gradient}>
                <View style={styles.container}>
                    <Image
                        source={{ uri: this.state.photo }}
                        style={styles.img} />

                    <Text style={{ fontSize: 20, fontWeight: "bold", color:'white' }}>
                        Welcome, {this.state.name}
                    </Text>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.boton}
                            onPress={() => {
                                this.findCurrentLocationAsync();
                            }}
                        >
                            <Text style={styles.texto}>Go To Map</Text>
                        </TouchableOpacity>
                    </View>


                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.boton}
                            onPress={() => {
                                deleteUser();
                                this.props.navigation.navigate("Login")
                            }}
                        >
                            <Text style={styles.texto}>Sign Out</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.boton}
                            onPress={() => {
                                this.props.navigation.navigate("Money",{//Cambiar a money de nuevo
                                    email: this.state.email
                                })
                            }}
                        >
                            <Text style={styles.texto}>Charge Money To Wallet</Text>
                        </TouchableOpacity>
                    </View>        

                </View>
            </LinearGradient>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10
    },
    img: {
        width: 240,
        height: 260, 
        padding: 10,
        borderColor: 'white',
        borderWidth: 1
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonContainer: {
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    boton: {
        borderRadius: 50,
        backgroundColor: '#252073',
        width: 190,
        alignItems: 'center',
        height: 40,
        justifyContent: 'center'
    },
    texto: {
        color: 'white',
        fontSize: 15
    }
});