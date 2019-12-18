import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Marker } from 'react-native-maps';
let id = 0;

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