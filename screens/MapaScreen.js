import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View, Button, TouchableOpacity, AsyncStorage, Modal, Text } from 'react-native';
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
        headerRight: () => <TouchableOpacity
            onPress={() => {
                deleteUser();
                navigation.navigate("Login");
            }}
            backgroundColor="black"
            title="Sign Out"
            style={styles.boton1}
        >

            <Text style={styles.texto}> Sign Out</Text>
        </TouchableOpacity>
    });



    constructor(props) {
        super(props);

        this.state = {

            markers: [],
            coordinates: [],
            origin: {},
            destination: {},
            show: false,
            distance: "Distance",
            price: "Price",
            refunds: [],
            visible: false,
            vis: false,
            rd: 0

        };
    }

    clean(){
        id= 0;
    }

    // From here
    onPlaces(location) {
        if (this.state.rd <= 1) {
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
                        key: this.setState({rd: this.state.rd + 1}),
                        color: randomColor(),
                    },
                ],
            });

        } else {
            console.log("There is already two markers, we don't allow more", this.state.markers);
        }
        console.log(location);
    }
    //To here

    onMapPress(e) {
        if (this.state.rd <= 1) {
            this.setState({
                markers: [
                    ...this.state.markers,
                    {
                        coordinate: e.nativeEvent.coordinate,
                        latitude: e.nativeEvent.coordinate.latitude,
                        longitude: e.nativeEvent.coordinate.longitude,
                        key: this.setState({rd: this.state.rd + 1}),
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
            alert("There is already two markers, we don't allow more");
        }
        console.log(e.nativeEvent.coordinate);
    }

    async getDistance(origin, destination) {
        if (!origin || !destination) {
            alert("Put two markers on the map to calculate");
            return;
        }
        console.log("Origen que entra: ", origin);
        console.log("Destination que entra: ", destination);
        axios.get(`https://refunding-backend.herokuapp.com/directions/getKm?origin=${origin}&destination=${destination}`)
            .then((response) => {
                console.log("Response tiene ", response.data[0].legs[0].distance.text);
                this.getPrice(String(response.data[0].legs[0].distance.text));
                this.setState({ distance: response.data[0].legs[0].distance.text });
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
        axios.get(`https://refunding-backend.herokuapp.com/directions/getPrice?kilometer=${distance}`)
            .then((response) => {
                console.log(response.data);
                let dato = response.data;
                console.log("Response.data.data tiene: ", dato.price);
                //this.getRefund(String(response.data.data));
                this.setState({ price: response.data.price.toString() });
            })//Añadir a un state y mostrar en mapview
            .catch((error) => {
                console.error(error);
            });
    }

    setModal(flag) {
        this.setState({ visible: flag });
    }

    getRefund(price) {  //Hace falta implementar esto visualmente

        precio = parseInt(price);
        axios.get(`https://refunding-backend.herokuapp.com/directions/getRefund?price=${precio}`)
            .then((response) => {
                console.log(response.data);
                this.setState({ refunds: response.data.refund });
                console.log("Llegó hasta aquí, funcionó?");
            })
            .catch((error) => {
                console.error(error);
            });
    }

    switch() {
        this.props.navigation.navigate("Resume", { price: this.state.price });
    }

    render() {
        return (
            <View style={styles.container}>
                <MapView style={styles.mapStyle}
                    showsUserLocation
                    onPress={e => this.onMapPress(e)}
                    initialRegion={{
                        latitude: this.props.navigation.getParam('latitude'),
                        longitude: this.props.navigation.getParam('longitude'),
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }} >

                    {/* Cómo hacer para evaluar que origin no esté vacío? */}
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
                {/* Buttons that appear when there are two markers on the map */}
                <View style={styles.horizon}>

                    {this.state.markers.length >= 2 && (

                        <TouchableOpacity
                            style={styles.boton}
                            onPress={async () => {
                                await this.getDistance(this.state.origin.latitude + "," + this.state.origin.longitude, this.state.destination.latitude + "," + this.state.destination.longitude);
                                this.setModal(true);
                            }}
                        >
                            <Text style={styles.texto}>Calculate</Text>
                        </TouchableOpacity>

                    )}
                </View>
                {/*End of buttons that appear*/}
                {/* Desde */}
                <View style={styles.view}>
                    <GooglePlacesAutocomplete
                        placeholder='Search'
                        minLength={2} // minimum length of text to search
                        autoFocus={false}
                        returnKeyType={'search'}
                        listViewDisplayed={false}
                        enablePoweredByContainer={false}
                        listUnderlayColor="white"
                        fetchDetails={true}
                        onPress={(data, details = null) => {
                            console.log(details.geometry);
                            this.onPlaces(details.geometry.location);
                        }}
                        query={{
                            key: 'AIzaSyA4p-qk3jvIg6T5Uzm4AXWq4GVKA1-g1k8',
                            language: 'es', // language of the results
                            components: 'country:co'
                        }}
                        styles={{
                            description: {
                                fontWeight: 'bold',
                                width: 220,
                            },
                            textInputContainer: {
                                backgroundColor: '#252073',
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



                {/* Modal begins */}
                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={this.state.visible}
                    onRequestClose={() => {
                        setModal(false)
                    }
                    }>
                    <TouchableOpacity
                        style={styles.cont}
                        activeOpacity={1}
                        onPressOut={() => { this.setModal(false) }}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalButtonView}>

                            <TouchableOpacity style={styles.imageContainer} onPress={() =>this.setModal(false)}> 
                            <Text style={styles.texto}>{this.state.distance}</Text> 
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.imageContainer} onPress={() =>this.setModal(false)}> 
                            <Text style={styles.texto}>{this.state.price}</Text> 
                            </TouchableOpacity>

                                
                                {/* <Button style={styles.but} title={this.state.price} onPress={() => this.setModal(false)} /> */}
                            </View>

                            <View style={{ padding: 10, flexDirection: 'row', justifyContent: 'space-around' }}>

                            <TouchableOpacity style={styles.imageContainer} onPress={() => {
                                this.setModal(false);
                                this.clean();
                                this.props.navigation.navigate("Resume",
                                    {
                                        price: this.state.price,
                                        distance: this.state.distance
                                    })
                            }}> 
                            <Text style={styles.texto}>Confirm</Text> 
                            </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableOpacity>
                </Modal>
                {/* Modal Ends */}
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
    },
    modalContainer: {
        position: 'absolute',
        width: '100%',
        backgroundColor: 'white',
        bottom: 0
    },
    boton: {
        borderRadius: 50,
        backgroundColor: '#252073',
        width:80,
        height: 50,
        bottom: 5,
        left:5,
        justifyContent: 'center',
        alignItems:'center',
        position: 'absolute'
    },
    modalButtonView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    },
    cont: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    boton1: {
        bottom: 10,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#252073',
        borderRadius: 50,
        width: 80,
        height: 40,
    },
    texto: {
        color: 'white',
        fontSize: 15
    },
    imageContainer: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#252073'
    }
});

export default MapaScreen;