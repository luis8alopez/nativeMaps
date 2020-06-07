import React, { useState, useEffect } from 'react';
import {ScrollView, View, KeyboardAvoidingView, StyleSheet, TextInput, Text, Platform,TouchableOpacity
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Card from '../components/UI/Card';
import axios from 'axios';

let pay = {
    email: '',
    price: 0
};

const PayAccountScreen = props => {

    const [debt,setDebt] = useState('');

    useEffect(() => {
        pay.email = props.navigation.getParam('email');
    },[]);

    saveHistory = async (em, pre) => {
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

    pay.email = props.navigation.getParam('email');

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
                                saveHistory(pay.email,pay.price);
                                props.navigation.navigate("Refund",{
                                    price: pay.price,
                                    email: pay.email
                                })
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
        backgroundColor: '#e7ffff', 
    }
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