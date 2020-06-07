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
import { SocialIcon } from 'react-native-elements'


import Card from '../components/UI/Card';
import axios from 'axios';
import * as Google from "expo-google-app-auth";

const IOS_CLIENT_ID =
    "325384024446-vsr0ehu8in8b7h0ijfrhgjdkg4u67fk3.apps.googleusercontent.com";
const ANDROID_CLIENT_ID =
    "325384024446-8m3bmo46o8smilt1mcgoepevnb4vb8tg.apps.googleusercontent.com";

let iat;
let token;
let exp;
let expires;

const LoginScreen = props => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading,setLoading] = useState(false);

    signInWithGoogle = async () => {
        setLoading(true);
        saveData = (token, userId, expiration, email, photo, name) => {
            AsyncStorage.setItem('userData', JSON.stringify({
                token: token,
                userId: userId,
                expiration: expiration.toISOString(),
                email: email,
                photo: photo,
                name: name
            }))
        };

        retrieveData = async () => {
            try {
                const value = await AsyncStorage.getItem('userData');
                if (value !== null) {
                    id = JSON.parse(value)
                }
            } catch (error) {
                console.log(error);
            }
        };


        try {
            const result = await Google.logInAsync({
                iosClientId: IOS_CLIENT_ID,
                androidClientId: ANDROID_CLIENT_ID,
                scopes: ["profile", "email"]
            });

            if (result.type === "success") {
                await axios.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${result.idToken}`)
                    .then((response) => {
                        iat = response.data.iat;
                        exp = response.data.exp;
                    })

                const expires = parseInt(exp) - parseInt(iat);
                const expiration = new Date(new Date().getTime() + expires * 1000); //Milisegundos
                saveData(result.idToken, result.user.id, expiration, result.user.email, result.user.photoUrl, result.user.givenName);
                retrieveData();

                await axios.post('https://refunding-backend.herokuapp.com/users/save', {
                    name: result.user.name,
                    email: result.user.email,
                    password: result.user.id,
                    id: result.user.id,
                    photo: result.user.photoUrl
                })
                    .then(function (response) {
                        console.log(response + "R");
                        console.log("Flag has", response.data);
                    })
                    .catch(function (error) {
                        console.log(error + "Error en post");
                    });
                //
                //TEST
                props.navigation.navigate("Profile", {
                    username: result.user.givenName,
                    photo: result.user.photoUrl,
                    email: result.user.email
                }); 
                return result.accessToken;
            } else {
                return { cancelled: true };
            }
        } catch (e) {
            console.log('LoginScreen.js.js 30 | Error with login', e);
            return { error: true };
        }
    };

    signUpHandler = async (email, password) => {

        if (!email || !password) {
            alert("Please type a valid email or password");
            return
        }
        const respuesta = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA4p-qk3jvIg6T5Uzm4AXWq4GVKA1-g1k8',
            {
                email: email,
                password: password,
                returnSecureToken: true
            })
            .catch((error) => {
                console.error(error);
            });

        saveData = (token, userId, expiration, email) => {
            AsyncStorage.setItem('userData', JSON.stringify({
                token: token,
                userId: userId,
                expiration: expiration.toISOString(),
                email: email
            }))
        };

        const expiration = new Date(new Date().getTime() + parseInt(respuesta.data.expiresIn) * 1000); //Milisegundos
        saveData(respuesta.data.idToken, respuesta.data.localId, expiration, email);
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
                            vaSecondlue={email}
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

                        <View style={styles.buttonContainer}>
                            
                            <SocialIcon
                                    button
                                    raised={true}
                                    type='google'
                                    iconSize={20}
                                    title='Sign in with google     '
                                    onPress={() => {this.signInWithGoogle()}}
                                    loading={loading}
                                />
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

export default LoginScreen;