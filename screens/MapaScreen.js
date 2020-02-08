import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View, Dimensions, Button, Text } from 'react-native';
import { Marker } from 'react-native-maps';
import MapViewDirections from "react-native-maps-directions";
import PlacesScreen from './Places';
import Card from '../components/Card';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import axios from 'axios';

let id = 0;
let flag;
const GOOGLE_MAPS_APIKEY = 'AIzaSyA4p-qk3jvIg6T5Uzm4AXWq4GVKA1-g1k8';

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = 0.0912;

function randomColor() {
    return `#${Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, 0)}`;
}



class MapaScreen extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            region: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            },
            markers: [],
            coordinates: [],
            origin: { latitude: 6.305207886096956, longitude: -75.57984955608845 },
            destination: { latitude: 6.305207886096956, longitude: -75.57984955608845 },
            show: false,
            distance: "Distance",
            price: "Price",
            mapRegion: { latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }

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
        console.log("estoy imprimiendo lo que entra en axios: ",distance);
        axios.get(`https://refunding-backend.herokuapp.com/api/getPrice?kilometer=${distance}`) //Transformar string en number!
             .then((response) => {
                 console.log(response.data);
                 let dato = response.data.data;
                 console.log("Response.data.data tiene: ",dato);
                 this.setState({ price: response.data.data.toString() });
                 console.log("El estado tiene: ", response);
             })//Añadir a un state y mostrar en mapview
             .catch((error) => {
                 console.error(error);
             });
    }

    render() {
        const { navigation } = this.props;
        console.log("Nav tiene: "+ this.props.navigation.getParam('latitude'));
        return (
            <View style={styles.container}>
                <MapView style={styles.mapStyle}
                    showsUserLocation
                    onPress={e => this.onMapPress(e)}
                    onLongPress={t => this.getDistance(this.state.origin.latitude + "," + this.state.origin.longitude, this.state.destination.latitude + "," + this.state.destination.longitude)}
                    initialRegion={{
                        latitude: this.props.navigation.getParam('latitude'),
                        longitude: this.state.region.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}>

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
                    <Button onPress={o => this.getPrice(this.state.distance)} style={styles.but} title={this.state.price} />
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
        width: Dimensions.get('window').width,
        height: '95%'//Dimensions.get('window').height,
    },
    cont: {
        height: 200,
        padding: 95
    },
    but: {
        paddingTop: 10,
        paddingLeft: 5,
        justifyContent: "space-between"
    },
    horiz: {
        flex: 1,
        flexDirection: "row"
    }
});

export default MapaScreen;