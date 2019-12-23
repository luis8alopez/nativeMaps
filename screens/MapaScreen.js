import React from 'react';
import MapView, { Polyline } from 'react-native-maps';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Marker } from 'react-native-maps';
import MapViewDirections from "react-native-maps-directions";
let id = 0;
let id2 = 0;
const GOOGLE_MAPS_APIKEY = 'AIzaSyA4p-qk3jvIg6T5Uzm4AXWq4GVKA1-g1k8';

const origin = { latitude: 6.305207886096956, longitude: -75.57984955608845 };
const destination = { latitude: 6.297844385279165, longitude: -75.58064114302397 };

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
                latitude: this.props.onLat,
                longitude: this.props.onLon,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            },
            markers: [],
            coordinates: [],
        };
    }

    onMapPress(e) {
        this.setState({
            markers: [
                ...this.state.markers,
                {
                    coordinate: e.nativeEvent.coordinate,
                    key: id++,
                    color: randomColor(),
                },
            ],
        });
        console.log(e.nativeEvent.coordinate);
        console.log(this.state.markers[0],"marker 0");
        // Error acá
        //Necesitamos solo 2 marcadores en el array para dibujar
        //EL primer marcador no se guarda en coordinates
        if (id2 <= 2) {
            this.setState({
                coordinates: [
                    ...this.state.coordinates,
                    {
                    latitude: e.nativeEvent.coordinate.latitude,
                    longitude: e.nativeEvent.coordinate.longitude,
                }]
            })
            console.log(this.state.coordinates.length);
            console.log(this.state.coordinates[0]);
        } else {
            console.log(this.state.coordinates.length);
            console.log("There is already two markers to draw");
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <MapView style={styles.mapStyle}
                    showsUserLocation
                    onPress={e => this.onMapPress(e)}
                    initialRegion={{
                        latitude: this.props.onLat,
                        longitude: this.props.onLon,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }} >

                    {this.state.markers.map(marker => (
                        <Marker
                            key={marker.key}
                            coordinate={marker.coordinate}
                            pinColor={marker.color}
                        />
                    ))}
                    {/* Manera de invocar esto con solo dos coordenadas */}


                    {this.state.coordinates.length >=2 && (
                        <MapViewDirections
                            origin={this.state.coordinates[0]}
                            destination={this.state.coordinates[1]}
                            apikey={GOOGLE_MAPS_APIKEY}
                            strokeWidth={4}
                        />
                    )}

                    {/* <MapViewDirections
                        origin={origin}
                        destination={destination}
                        apikey={GOOGLE_MAPS_APIKEY}
                        strokeWidth={4}
                    /> */}

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
        height: Dimensions.get('window').height,
    },
    screen: {
        flex: 1
    }
});

export default MapaScreen;