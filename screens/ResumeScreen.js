import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';

import Card from '../components/Card';

//Vista para mostrar, usar y guardar la confirmación del viaje.

const ResumeScreen = props => {

    const [distance, setDistance] = useState('Distance');
    const [price, setPrice] = useState('Price');
    const [refund, setRefund] = useState('Refund');

    getRefund = (price) => {  //Hace falta implementar esto visualmente

        precio = parseInt(price);
        axios.get(`https://refunding-backend.herokuapp.com/api/getRefund?price=${precio}`)
            .then((response) => {
                console.log(response.data.refund);
                console.log("Llegó hasta aquí, funcionó?");
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
            <View style={styles.why}>
                <Card style={styles.card}>
                    <Button style={styles.button} title="Ver resumen"
                        onPress={async () => {
                            setDistance(props.navigation.getParam('distance'));
                            setPrice(props.navigation.getParam('price'));
                            // console.log(props.navigation.getParam('refund'));
                            // let ret = await getRefund(parseInt(props.navigation.getParam('price')));
                            // console.log(ret.refund.refund);
                        }}/>
                    {/* Añadir una vista bonita en la card para ver el resumen del viaje */}
                    <View style={styles.vista}>
                        <Button style={styles.but} title={distance} />
                    </View>

                    <View style={styles.vista}>
                        <Button style={styles.but} title={price} />
                    </View>
                </Card>
            </View>
        </LinearGradient>
    );

}

const styles = StyleSheet.create({
    why: {
        flex: 1,
        marginVertical: 220,
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapStyle: {
        width: '90%',
        height: '80%',
    },
    but: {
        paddingTop: 10,
        paddingLeft: 5,
        justifyContent: "space-between",
        position: 'absolute',
        paddingTop: 10
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    card: {
        height: 200,
        width: 200,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#B4E1FF'
    },
    button: {
        color: '#F7ECE1',
        marginBottom: 10
    },
    vista: {
        padding: 10
    }
});



export default ResumeScreen;