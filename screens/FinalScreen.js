import React, { useEffect, useState } from 'react';
import { Text, View, Image, StyleSheet, FlatList, Button, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import { Card } from 'react-native-shadow-cards';

import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace';

FinalScreen = props => {

    goToProfile = () =>{
        props.navigation.navigate("Profile");
     };

    getHistory = async () =>{
        const email = props.navigation.getParam('email');
        if (!email) {
            alert("There is no price");
            return;
        }
        return await axios(`https://refunding-backend.herokuapp.com/users/getHistory?email=${email}`)
            .then((response) => {
                console.log(response)
                return response;
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        const retorno = async () => {
            const reto = await getHistory();
            console.log(reto);
        }
        retorno();
    }, []);
    
    return (
            <LinearGradient colors={['#005AA7', '#FFFDE4']} style={styles.gradient}>           
                <View style={styles.why}>
                    <Card style={styles.authContainer}>
                            <Text>Initial Money</Text>
                            <Text>Account</Text>
                            <Button style={styles.button} title="Finish" onPress={this.goToProfile} />

                    </Card>
                </View>
            </LinearGradient>
    );
    
};

FinalScreen['navigationOptions'] = screenProps => ({
    title: 'Resumen',
    headerStyle: {
        backgroundColor: '#e7ffff', //Ajustar color bonito
    },
    headerLeft: () => null
})

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    why: {
        flex: 1,
        marginVertical: 220,
        alignItems: 'center',
        justifyContent: 'center'
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
export default FinalScreen;