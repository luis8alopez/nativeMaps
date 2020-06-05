import React, { useState } from 'react';
import {ScrollView, View, KeyboardAvoidingView, StyleSheet, Button, TextInput, Text, Platform,
    AsyncStorage, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Card from '../components/UI/Card';
import axios from 'axios';

let pay = {
    email:'',
    price: 0 
};

const PayAccountScreen = props => {

    pay.email = props.navigation.getParam('email');
    const [debt, setDebt] = useState('');

    sentAccount = async (account) => {

        if (!account.price) {
            alert("Please type a valid account");
            return;
        } 

        console.log("cuenta", pay.price);

        const respuesta = await axios.post(`https://refunding-backend.herokuapp.com/users/getRefund`,
            { 
                email: account.email,
                price: account.price
            })
            .catch((error) => {
                console.error(error);
            }); 
        console.log(JSON.stringify(account));
        props.navigation.navigate("Final",{
            email: pay.email
        })
        //props.navigation.navigate("Profile");
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            keyboardVerticalOffset={0}
            style={styles.screen}
        >
            <LinearGradient colors={['#005AA7', '#FFFDE4']} style={styles.gradient}>
                <Card style={styles.authContainer}>
                    <ScrollView>

                        <Text>Account</Text>
                        <TextInput
                            keyboardType="numeric"
                            style={styles.input}
                            onChangeText={(debt) => setDebt(debt)}
                            value={debt}
                        ></TextInput>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.boton} onPress={() => {
                                pay.price = Number(debt);
                                sentAccount(pay)
                            }} >
                                <Text style={styles.texto}>Pay</Text>
                            </TouchableOpacity>
                        </View>

                    </ScrollView>
                </Card>
            </LinearGradient>
        </KeyboardAvoidingView>
    );
    
};

PayAccountScreen['navigationOptions'] = screenProps => ({
    title: 'Enter the debt to pay',
    headerStyle: {
        backgroundColor: '#e7ffff', //Ajustar color bonito
    },
    headerLeft: () => null
})

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    authContainer: {
        width: '80%',
        maxWidth: 600,
        maxHeight: 400,
        padding: 20
    },
    buttonContainer: {
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        borderColor: 'gray',
        width: '100%',
        flex: 1,
        marginTop: 10,
        marginBottom: 10,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    },
    boton: {
        borderRadius: 50,
        backgroundColor: '#252073',
        width: 190,
        alignItems: 'center',
        height: 40,
        justifyContent: 'center'
    },
    texto: {
        color: 'white',
        fontSize: 15
    }
});

export default PayAccountScreen;