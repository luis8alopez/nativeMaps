import React, { useState } from 'react';
import {
    ScrollView,
    View,
    KeyboardAvoidingView,
    StyleSheet,
    Button,
    TextInput,
    Text,
    AsyncStorage,
    TouchableOpacity
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Card from '../components/UI/Card';
import axios from 'axios';

const LoginScreen = props => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    signUpHandler = async (email, password) => {

        console.log("Lo que hay en email y password es: " + email + " " + password);

        const respuesta = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA4p-qk3jvIg6T5Uzm4AXWq4GVKA1-g1k8',
            {
                email: email,
                password: password,
                returnSecureToken: true
            })
            .catch((error) => {
                console.error(error);
            });
        console.log(JSON.stringify(respuesta.data.idToken));

        saveData = (token, userId, expiration) => {
            AsyncStorage.setItem('userData', JSON.stringify({
                token: token,
                userId: userId,
                expiration: expiration.toISOString()
            }))
        };

        const expiration = new Date(new Date().getTime() + parseInt(respuesta.data.expiresIn) * 1000); //Milisegundos
        saveData(respuesta.data.idToken, respuesta.data.localId, expiration);
        props.navigation.navigate("Find");
    }

    return (
        <KeyboardAvoidingView
            behavior="padding"
            keyboardVerticalOffset={50}
            style={styles.screen}
        >
            <LinearGradient colors={['#005AA7', '#FFFDE4']} style={styles.gradient}>
                <Card style={styles.authContainer}>
                    <ScrollView>

                        <Text>Email</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(email) => setEmail(email)}
                            value={email}
                        ></TextInput>

                        <Text>Password</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(password) => setPassword(password)}
                            value={password}
                        ></TextInput>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.boton} onPress={() => {
                                signUpHandler(email, password)
                            }} >
                                <Text style={styles.texto}>Login</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.boton}
                                onPress={() => { props.navigation.navigate("Auth") }}
                            >
                                <Text style={styles.texto}>Create Account</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </Card>
            </LinearGradient>
        </KeyboardAvoidingView>
    );
};

LoginScreen['navigationOptions'] = screenProps => ({
    title: 'Login with your credentials',
    headerStyle: {
      backgroundColor: '#e7ffff', //Ajustar color bonito
    }
  })

//Request post https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

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
        alignItems: 'center'
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
        width: 120,
        alignItems: 'center',
        height: 40,
        justifyContent: 'center'
    },
    texto: {
        color: 'white',
        fontSize: 15
    }
});

export default LoginScreen;