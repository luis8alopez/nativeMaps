import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, AsyncStorage } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';

import Card from '../components/Card';

//Vista para mostrar, usar y guardar la confirmación del viaje.

const ResumeScreen = props => {

    const [distance, setDistance] = useState('Distance');
    const [price, setPrice] = useState('Price');
    const [refund, setRefund] = useState('Refund');
    const [email,setEmail] = useState('');

    saveHistory = async (em,pre) => {
        console.log("estoy entrando acá hay", em);
        await axios.post('https://refunding-backend.herokuapp.com/users/saveHistory',
            {
                email: em,
                precio: pre,
            })
            .catch((error) => {
                console.error(error);
            });
    }

    useEffect(() => {
        retrieveData = async () => {
            try {
                const value = await AsyncStorage.getItem('userData');
                if (value !== null) {
                    // We have data!!
                    id = JSON.parse(value)
                    console.log("V: ", id);
                    setEmail(id.email);
                }
            } catch (error) {
                console.log(error);
            }
        };
        setDistance(props.navigation.getParam('distance'));
        setPrice(props.navigation.getParam('price'));
        retrieveData();
    }, []);

    return (
        <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
            <View style={styles.why}>
                <Card style={styles.card}>
                    {/* Añadir una vista bonita en la card para ver el resumen del viaje */}
                    <View style={styles.vista}>
                        <Button style={styles.but} title={distance} />
                    </View>

                    <View style={styles.vista}>
                        <Button style={styles.but} title={price} />
                    </View>

                    <View style={styles.vista}>
                        <Button style={styles.but} title="How to pay"
                            onPress={() => {
                                saveHistory(email,price);
                                retrieveData();
                                // props.navigation.navigate("Refund", {
                                //     price: price
                                // });
                            }} />
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
        marginBottom: 20,
        width: 140,
        marginTop: 10
    },
    vista: {
        padding: 10,
        width: 140
    }
});



export default ResumeScreen;