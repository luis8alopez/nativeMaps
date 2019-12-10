import React, { useState } from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Marker } from 'react-native-maps';


const MapaScreen = props => {

    const [markers, setMarkers] = useState();

    //console.log(props.onLon);

    // let marker =
    // {
    //     latlng: {
    //         latitude: props.onLat,
    //         longitude: props.onLon,
    //     },
    //     title: 'Test',
    //     description: 'testing the map'
    // };

    markCurrentLocation = (event) => {

        let marker =
        {
            latlng: {
                latitude: event.latitude,
                longitude: event.longitude
            },
            title: 'new marker',
            description: 'new'
        };

        setMarkers(marker);

        console.log(marker);

    };

    return (
        <View style={styles.container}>
            <MapView style={styles.mapStyle}
                showsUserLocation
                onPress={e => markCurrentLocation(e.nativeEvent.coordinate)}
                initialRegion={{
                    latitude: props.onLat,
                    longitude: props.onLon,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }} >
                
                {
                /* {markers.map(marker => (
                    <Marker
                        coordinate={marker.latlng}
                        title={marker.title}
                        description={marker.description}
                    />
                ))} */}
            </MapView>

        </View>
    );

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