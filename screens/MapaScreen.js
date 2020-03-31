import React from 'react';
import MapView, { Polyline } from 'react-native-maps';
import { StyleSheet, View, Dimensions, Button, Text, LogoTitle } from 'react-native';
import { Marker } from 'react-native-maps';
import MapViewDirections from "react-native-maps-directions";
import PlacesScreen from './Places';
import Card from '../components/Card';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import axios from 'axios';

let id = 0;
let flag;
const GOOGLE_MAPS_APIKEY = 'AIzaSyA4p-qk3jvIg6T5Uzm4AXWq4GVKA1-g1k8';

//Fixed map coordinates
//const origin = { latitude: 6.305207886096956, longitude: -75.57984955608845 };
//const destination = { latitude: 6.297844385279165, longitude: -75.58064114302397 };

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = 0.0912;

// const homePlace = { description: 'Home', geometry: { location: { lat: 6.305207886096956, lng: -75.57984955608845 } }};
// const workPlace = { description: 'Work', geometry: { location: { lat: 6.297844385279165, lng: -75.58064114302397 } }};

function randomColor() {
    return `#${Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, 0)}`;
}

class MapaScreen extends React.Component {

    static navigationOptions = {
        headerTitle: "Map",
        headerRight: () => <Button
            onPress={() => alert('This is a button!')}
            title="Calculate"
            color="black" 
          />          
        ,
      };

    constructor(props) {
        super(props);

        this.state = {

            markers: [],
            coordinates: [],
            origin: { latitude: 6.305207886096956, longitude: -75.57984955608845 },
            destination: { latitude: 6.305207886096956, longitude: -75.57984955608845 },
            show: false,
            distance: "Distance",
            price: "Price"

        };
    }

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
        // distance = parseInt(aux);
        console.log("estoy imprimiendo lo que entra en axios: ", distance);
        axios.get(`https://refunding-backend.herokuapp.com/api/getPrice?kilometer=${distance}`) //Transformar string en number!
            .then((response) => {
                console.log(response.data);
                let dato = response.data.data;
                console.log("Response.data.data tiene: ", dato);
                this.setState({ price: response.data.data.toString() });
                console.log("El estado tiene: ", response);
            })//Añadir a un state y mostrar en mapview
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

                    {this.state.markers.length > 0 && (
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
                <View style={styles.horiz}>
                    <Button title={this.state.distance} />
                </View>
                <View style={styles.horizo}>
                    <Button style={styles.but} title={this.state.price} />
                </View>
                <View style={styles.horizon}>

                <Button onPress={async () => {
                    await this.getDistance(this.state.origin.latitude + "," + this.state.origin.longitude, this.state.destination.latitude + "," + this.state.destination.longitude);
                }} style={styles.but} title='Calculate' />

                </View>
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
        position: 'absolute', top: 20, left: 30
    },
    horizo: {
        flex: 1,
        flexDirection: "row",
        position: 'absolute', top: 20, left: 130
    },
    horizon: {
        flex: 1,
        flexDirection: "row",
        position: 'absolute', top: 20, left: 280
    }
});

export default MapaScreen;