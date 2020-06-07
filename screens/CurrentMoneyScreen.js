import React, { useEffect, useState } from 'react';
import { Text, View, Image, StyleSheet, FlatList, Button, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import { Card } from 'react-native-shadow-cards';

import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace';

CurrenMoneyScreen = props => {
    let [current,setCurrent] = useState([]);

    goToProfile = () =>{
        props.navigation.navigate("Profile");
     };

    getCurrent = async () =>{
        const email = props.navigation.getParam('email');
        if (!email) {
            alert("There is no email");
            return;
        }
        return await axios(` https://refunding-backend.herokuapp.com/users/getTotal?email=${email}`)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
            });
    };

    parseCurrent = () =>{
        return (
                <View>
                    <Text>
                        Current Money in dolars
                    </Text>
                    <Text>
                        $
                        {current.dolar}
                    </Text>
                    <Text>
                        Current Money in pesos
                    </Text>
                    <Text>
                        $
                        {current.peso}
                    </Text>
                </View>
            )
    };

    useEffect(() => {
        const retorno = async () => {
            const ret = await getCurrent();
            setCurrent(ret);          
        }
        retorno();
    }, []);
    
    return (
            <LinearGradient colors={['#005AA7', '#FFFDE4']} style={styles.gradient}>           
                <View style={styles.why}>
                <Text style={{ fontSize: 20, fontWeight: "bold", color:'#e1f5fe' }}>
                    Current Money
                </Text>
                    <Card style={styles.authContainer}>
                        <View>
                            {parseCurrent()}
                        </View>
                    </Card>
                    <Button style={styles.boton} title="Finish" onPress={this.goToProfile} />
                </View>
            </LinearGradient>
    );
    
};

CurrenMoneyScreen['navigationOptions'] = screenProps => ({
    title: 'Current Money',
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
export default CurrenMoneyScreen;