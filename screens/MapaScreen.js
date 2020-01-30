import React from 'react';
import MapView, { Polyline } from 'react-native-maps';
import { StyleSheet, View, Dimensions, Button } from 'react-native';
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

    constructor(props) {
        super(props);

        this.state = {
            region: {
                latitude: this.props.onLat,
                longitude: this.props.onLon,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            },
            markers: [],
            coordinates: [],
            origin: { latitude: 6.305207886096956, longitude: -75.57984955608845 },
            destination: { latitude: 6.305207886096956, longitude: -75.57984955608845 },
            show: false
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

    async getPrice(origin, destination) {
        console.log("Origen que entra: ", origin);
            await axios.get(`https://refunding-backend.herokuapp.com/api/getKm?origin=${origin}&destination=${destination}`)
            .then((response) => console.log(response.data.data[0].legs[0].distance.text))//Añadir a un state y mostrar en mapview
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
                    onLongPress={t => this.getPrice(this.state.origin.latitude+","+this.state.origin.longitude, this.state.destination.latitude+","+this.state.destination.longitude)}
                    initialRegion={{
                        latitude: this.props.onLat,
                        longitude: this.props.onLon,
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
        height: '100%'//Dimensions.get('window').height,
    },
    cont: {
        height: 200,
        padding: 95
    }
});

export default MapaScreen;