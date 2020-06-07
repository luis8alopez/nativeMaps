import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import { Card } from 'react-native-shadow-cards';

HistoryScreen = props => {

    let [historia, setHistoria] = useState([]);

    goToProfile = () => {
        props.navigation.navigate("Profile");
    };

    getHistory = async () => {
        const email = props.navigation.getParam('email');
        if (!email) {
            alert("There is no price");
            return;
        }
        return await axios(`https://refunding-backend.herokuapp.com/users/getHistory?email=${email}`)
            .then((response) => {
                console.log(response.data[0].createdAt.substr(11, 11));
                return response.data;
            })
            .catch((error) => {
                console.log(error);
            });
    };

    parseData = () => {
        return historia.map((dato, i) => {
            return (

                <View style={{ padding: 10 }} key={i}>
                    <Card style={styles.authContainer} >
                        <Text>
                            {dato.createdAt.substr(11, 11).concat('--', dato.updatedAt.substr(0, 10))}
                        </Text>
                        <Text>
                            ${dato.precio}
                        </Text>

                        <Text> </Text>
                    </Card>
                </View>

            )
        })
    };

    useEffect(() => {
        const retorno = async () => {
            const reto = await getHistory();
            setHistoria(reto);
        }
        retorno();
    }, []);

    return (
        <ScrollView>
            <LinearGradient colors={['#005AA7', '#FFFDE4']} style={styles.gradient}>
                <View style={styles.why}>
                    <Text style={{ fontSize: 20, fontWeight: "bold", color: '#e1f5fe' }}>
                        My History    </Text>

                    {parseData()}

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.boton} onPress={this.goToProfile}>
                            <Text style={styles.texto}> Return </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </LinearGradient>
        </ScrollView>
    );

};

HistoryScreen['navigationOptions'] = screenProps => ({
    title: 'History',
    headerStyle: {
        backgroundColor: '#e7ffff', //Ajustar color bonito
    }
})

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    why: {
        marginVertical: 30,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    authContainer: {
        width: '80%',
        maxWidth: 600,
        alignItems: 'center',
        justifyContent: 'center'
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
    },
    cont: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonContainer: {
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
export default HistoryScreen;