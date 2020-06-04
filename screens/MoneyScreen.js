import React, { useEffect, useState } from 'react';
import { Text, View, Image, StyleSheet, FlatList, Button, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import { Card } from 'react-native-shadow-cards';
import { Root, Popup } from 'popup-ui'

let coin = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let cash = {
    email: '',
    money: {
        50: 0,
        100: 0,
        200: 0,
        500: 0,
        1000: 0,
        2000: 0,
        5000: 0,
        10000: 0,
        20000: 0,
        50000: 0,
        100000: 0,
    }
};
let data = [
    {
        id: '100000',
        title: 'Cienmil',
        image: require('../assets/rsz_100000.jpg'),
        quantity: '0',
        identifier: 10
    },
    {
        id: '50000',
        title: 'Cincuentamil',
        image: require('../assets/rsz_50000.jpg'),
        quantity: '0',
        identifier: 9
    },
    {
        id: '20000',
        title: 'Veintemil',
        image: require('../assets/rsz_20000.png'),
        quantity: '0',
        identifier: 8
    },
    {
        id: '10000',
        title: 'Diezmil',
        image: require('../assets/rsz_110000.jpg'),
        quantity: '0',
        identifier: 7
    },
    {
        id: '5000',
        title: 'CincoMil',
        image: require('../assets/rsz_5000.jpg'),
        quantity: '0',
        identifier: 6
    },
    {
        id: '2000',
        title: 'Dosmil',
        image: require('../assets/rsz_2000.jpg'),
        quantity: '0',
        identifier: 5
    },
    {
        id: '1000',
        title: 'Mil',
        image: require('../assets/rsz_1000.jpg'),
        quantity: '0',
        identifier: 4
    },
    {
        id: '500',
        title: 'Quinientos',
        image: require('../assets/rsz_500.png'),
        quantity: '0',
        identifier: 3
    },
    {
        id: '200',
        title: 'Doscientos',
        image: require('../assets/rsz_200.png'),
        quantity: '0',
        identifier: 2
    },
    {
        id: '100',
        title: 'Cien',
        image: require('../assets/rsz_100.png'),
        quantity: '0',
        identifier: 1
    },
    {
        id: '50',
        title: 'Cincuenta',
        image: require('../assets/rsz_50.png'),
        quantity: '0',
        identifier: 0
    },
];

MoneyScreen = props => {

    cash.email = props.navigation.getParam('email');

    MoneyScreen['navigationOptions'] = screenProps => ({
        title: 'Home',
        headerTitle: "Charge Money",
        headerRight: () => <TouchableOpacity
            onPress={() => {
                organizeJson();
                console.log("cash en money", cash);
                sentMoney(cash);
                console.log("holiii");
            }}
            backgroundColor="black"
            title="Charge"
            style={styles.boton1}
        >

            <Text style={styles.texto}> Charge</Text>
        </TouchableOpacity>
    });

    const [quantity, setQuantity] = useState(0);
    const [force, setForce] = useState('');

    saveMoney = (item, key) => {
        coin[item] += 1;
        cash.money[key] = coin[item];
        console.log(cash.money);
        data[item].quantity = String(coin[item]);
        setQuantity(coin[item]);
        console.log("esto es data en money", coin);
        setForce('a');
    };

    sentMoney = async (fact) => {
        const total = coin.reduce((a, b) => a + b, 0);
        if (total == 0) {
            alert("Please type how much money do you have");
            return;
        }
        const respuesta = await axios.put(`https://refunding-backend.herokuapp.com/users/currentMoney`,
            {
                email: props.navigation.getParam('email'),
                money: fact.money
            })
            .catch((error) => {
                console.error(error);
            });

        console.log(JSON.stringify(fact));
        console.log("fact queda asi: ", fact);
        props.navigation.navigate("Profile");
    };

    return (
        <LinearGradient colors={['#005AA7', '#FFFDE4']} style={styles.gradient}>
            <FlatList
                data={data}
                extraData={quantity}
                keyExtractor={(item, index) => String(index)}
                renderItem={({ item, index }) => (
                    <View key={index} style={styles.container}>

                        {item.identifier >= 4 && (  //It renders from 1000 up
                            <Card style={{ padding: 5, margin: 5, width: '70%', justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity style={styles.imageContainer} onPress={() => {
                                    saveMoney(index, data[index].id);

                                }}>
                                    <Image
                                        source={item.image}
                                        style={styles.img}
                                    />
                                </TouchableOpacity>
                            </Card>
                        )}

                        {item.identifier < 4 && (
                            <Card style={{ padding: 5, margin: 5, width: '70%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#252073' }}>
                                <TouchableOpacity style={styles.imageContainer} onPress={() => {
                                    saveMoney(index, data[index].id);

                                }} >
                                    <Image
                                        source={item.image}
                                        style={styles.imgs}
                                    />
                                </TouchableOpacity>
                            </Card>)}

                        <View style={styles.subContainer}>
                            <TouchableOpacity style={styles.touchable} >
                                <Text style={styles.texto} > Quantity {item.quantity}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>)}
            />

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.boton1} onPress={() => {
                    console.log("cash en money", cash);
                    sentMoney(cash);
                    console.log("holiii");
                }} >
                    <Text style={styles.texto}>Ready</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        alignItems: 'center',
        flexDirection: 'row',
        padding: 10
    },
    img: {
        width: 240,
        height: 110, //Arreglar acá, así sea las imágenes de las monedas
        padding: 10,
        borderColor: 'black'
    },
    imgs: {
        width: 110,
        height: 110, //Arreglar acá, así sea las imágenes de las monedas
        borderRadius: 110 / 2,
        padding: 10
    },
    touchable: {
        width: 80,
        height: 40,
        backgroundColor: '#252073',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50
    },
    quantity: {
        backgroundColor: 'black',
        width: 50,
        height: 30,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    subContainer: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageContainer: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#252073'
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
        right: 10
    },
    texto: {
        color: 'white',
        fontSize: 15
    }
});

export default MoneyScreen;