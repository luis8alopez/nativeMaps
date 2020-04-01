import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View, Button, Text, AsyncStorage } from 'react-native';
import { Marker } from 'react-native-maps';
import MapViewDirections from "react-native-maps-directions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import axios from 'axios';

let id = 0;
const GOOGLE_MAPS_APIKEY = 'AIzaSyA4p-qk3jvIg6T5Uzm4AXWq4GVKA1-g1k8';


function randomColor() {
    return `#${Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, 0)}`;
}

function deleteUser() {
    try {
        AsyncStorage.removeItem('userData');
        console.log("Done");
    } catch (error) {
        console.log(error.message);
    }
}


class MapaScreen extends React.Component {

    static navigationOptions = ({ navigate, navigation }) => ({
        headerTitle: "Map",
        headerRight: () => <Button
            onPress={() => {
                deleteUser();
                navigation.navigate("Login");
                //console.log("La devuelta es: ")
            }}
            title="Sign Out"
            color="black"
        />
        ,
    });



    constructor(props) {
        super(props);

        this.state = {

            markers: [],
            coordinates: [],
            origin: {},
            destination: { },
            show: false,
            distance: "Distance",
            price: "Price",
            refunds: []

        };
    }

    // From here
    onPlaces(location) {
        if (id <= 1) {
            let guardo = {
                latitude: location.lat,
                longitude: location.lng
            };
            if (this.state.markers.length == 0) {
                this.setState({ origin: guardo })
            } else {
                this.setState({ destination: guardo })
            }


            this.setState({

                markers: [
                    ...this.state.markers,
                    {
                        coordinate: guardo,
                        latitude: location.lat,
                        longitude: location.lng,
                        key: id++,
                        color: randomColor(),
                    },
                ],
            });

        } else {
            console.log("There is already two markers, we don't allow more");
        }
        console.log(location);
    }
    //To here

    onMapPress(e) {
        if (id <= 1) {
            this.setState({
                markers: [
                    ...this.state.markers,
                    {
                        coordinate: e.nativeEvent.coordinate,
                        latitude: e.nativeEvent.coordinate.latitude,
                        longitude: e.nativeEvent.coordinate.longitude,
                        key: id++,
                        color: randomColor(),
                    },
                ],
            });
            if (this.state.markers.length == 0) {
                this.setState({ origin: e.nativeEvent.coordinate })
            } else {
                this.setState({ destination: e.nativeEvent.coordinate })
            }
        } else {
            console.log("There is already two markers, we don't allow more");
        }
        console.log(e.nativeEvent.coordinate);
    }

    async getDistance(origin, destination) {
        if (!origin || !destination) {
            alert("Put two markers on the map to calculate");
            return;
        }
        console.log("Origen que entra: ", origin);
        await axios.get(`https://refunding-backend.herokuapp.com/api/getKm?origin=${origin}&destination=${destination}`)
            .then((response) => {
                console.log(response.data.data[0].legs[0].distance.text);
                this.getPrice(String(response.data.data[0].legs[0].distance.text));
                this.setState({ distance: response.data.data[0].legs[0].distance.text });
                console.log("El estado tiene: ", this.state.distance);
            })//Añadir a un state y mostrar en mapview
            .catch((error) => {
                console.error(error);
            });
    }

    getPrice(distance) {
        let aux = distance.toString();
        distance = aux.slice(0, 4);
        distance = parseFloat(distance);
        console.log("estoy imprimiendo lo que entra en axios: ", distance);
        axios.get(`https://refunding-backend.herokuapp.com/api/getPrice?kilometer=${distance}`) //Transformar string en number!
            .then((response) => {
                console.log(response.data);
                let dato = response.data.data;
                console.log("Response.data.data tiene: ", dato);
                //this.getRefund(String(response.data.data));
                this.setState({ price: response.data.data.toString() });
            })//Añadir a un state y mostrar en mapview
            .catch((error) => {
                console.error(error);
            });
    }

    getRefund(price) {  //Hace falta implementar esto visualmente

        precio = parseInt(price);
        axios.get(`https://refunding-backend.herokuapp.com/api/getRefund?price=${precio}`)
            .then((response) => {
                console.log(response.data);
                this.setState({ refunds: response.data.refund });
                console.log("Llegó hasta aquí, funcionó?");
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <MapView style={styles.mapStyle}
                    showsUserLocation
                    onPress={e => this.onMapPress(e)}
                    onLongPress={t => this.getDistance(this.state.origin.latitude + "," + this.state.origin.longitude, this.state.destination.latitude + "," + this.state.destination.longitude)}
                    initialRegion={{
                        latitude: this.props.navigation.getParam('latitude'),
                        longitude: this.props.navigation.getParam('longitude'),
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }} >

                    {/* Cómo hacer para evaluar que origin no esté vacío? */}
                    { this.state.markers.length > 0 && (
                        <Marker draggable
                            coordinate={this.state.origin}
                            onDragEnd={(e) => this.setState({ origin: e.nativeEvent.coordinate })}
                            pinColor={"black"}
                        />
                    )}

                    {/* destination */}
                    {this.state.markers.length > 1 && (
                        <Marker draggable
                            coordinate={this.state.destination}
                            onDragEnd={(e) => this.setState({ destination: e.nativeEvent.coordinate })}
                            pinColor={"black"}
                        />
                    )}

                    {this.state.markers.length >= 2 && (
                        <MapViewDirections
                            origin={this.state.origin}
                            destination={this.state.destination}
                            apikey={GOOGLE_MAPS_APIKEY}
                            strokeWidth={4}
                        />
                    )}

                </MapView>
                {/* Buttons that appear when there are two markers on the map */}
                <View style={styles.horiz}>
                    {this.state.markers.length >= 2 && (
                        <Button title={this.state.distance} />
                    )}
                </View>
                <View style={styles.horizo}>
                    {this.state.markers.length >= 2 && (
                        <Button style={styles.but} title={this.state.price} />
                    )}
                </View>
                <View style={styles.horizon}>

                    {this.state.markers.length >= 2 && (
                        <Button onPress={async () => {
                            await this.getDistance(this.state.origin.latitude + "," + this.state.origin.longitude, this.state.destination.latitude + "," + this.state.destination.longitude);
                        }} style={styles.but} title='Calculate' />
                    )}
                </View>

                {/* Desde */}
                <View style={styles.view}>
                    <GooglePlacesAutocomplete
                        placeholder='Search'
                        minLength={2} // minimum length of text to search
                        autoFocus={false}
                        returnKeyType={'search'}
                        listViewDisplayed={false}
                        fetchDetails={true}
                        onPress={(data, details = null) => {
                            console.log(details.geometry);
                            this.onPlaces(details.geometry.location);
                        }}
                        query={{
                            key: 'AIzaSyA4p-qk3jvIg6T5Uzm4AXWq4GVKA1-g1k8',
                            language: 'es', // language of the results
                        }}
                        styles={{
                            description: {
                                fontWeight: 'bold',
                                width: 220,
                            },
                            textInputContainer: {
                                backgroundColor: 'black',
                                width: '100%',
                            },
                            predefinedPlacesDescription: {
                                color: '#1faadb',
                                width: 220
                            },
                        }}
                        nearbyPlacesAPI='GooglePlacesSearch'
                        debounce={200}
                    />

                </View>
                {/* Hasta */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapStyle: {
        width: '100%',
        height: '100%',
        zIndex: -1
    },
    cont: {
        height: 200,
        padding: 95
    },
    but: {
        paddingTop: 10,
        paddingLeft: 5,
        justifyContent: "space-between",
        position: 'absolute'
    },
    horiz: {
        flex: 1,
        flexDirection: "row",
        position: 'absolute', bottom: 20, left: 30
    },
    horizo: {
        flex: 1,
        flexDirection: "row",
        position: 'absolute', bottom: 20, left: 130
    },
    horizon: {
        flex: 1,
        flexDirection: "row",
        position: 'absolute', bottom: 20, left: 280
    },
    view: {
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: 200,
        width: 260,
        position: 'absolute', top: 60
    }
});

export default MapaScreen;