import React, { useState } from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View, Dimensions } from 'react-native';
import {Marker} from 'react-native-maps';


const MapaScreen = props => {

    const longitude = parseInt(props.onLon);
    console.log(props.onLon);

    let markers =
    {
        latitude: props.onLat,
        longitude: props.onLon,
    };


    return (
        <View style={styles.container}>
            <MapView style={styles.mapStyle}
                initialRegion={{
                    latitude: props.onLat,
                    longitude: props.onLon,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }} annotations={markers} >

                <Marker coordinate={markers} />
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