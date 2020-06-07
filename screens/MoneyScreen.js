import React, { useEffect, useState } from 'react';
import { Text, View, Image, StyleSheet, FlatList, Button, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import { Card } from 'react-native-shadow-cards';
import { Root, Popup } from 'popup-ui'

let money = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];


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

    let cash = {
        email: props.navigation.getParam('email'),
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

    MoneyScreen['navigationOptions'] = screenProps => ({
        title: 'Home',
        headerTitle: "Charge Money",
    });

    const [quantity, setQuantity] = useState(0);
    const [force, setForce] = useState('');

    saveMoney = (item) => {
        money[item] = money[item] + 1;
        data[item].quantity = String(money[item]);
        setQuantity(money[item]);
        console.log("esto es data en money", money);
        setForce('a');
    };

    organizeJson = () => {
        let dat = {};
        dat = money.reverse();
        cash.money[50] = dat[0];
        cash.money[100] = dat[1];
        cash.money[200] = dat[2];
        cash.money[500] = dat[3];
        cash.money[1000] = dat[4];
        cash.money[2000] = dat[5];
        cash.money[5000] = dat[6];
        cash.money[10000] = dat[7];
        cash.money[20000] = dat[8];
        cash.money[50000] = dat[9];
        cash.money[100000] = dat[10];
    };

    sentMoney = async (data) => {
        if (!money) {
            alert("Please type how much money do you have");
            return;
        }
        console.log("andrés es un hijueputa", data);
        const respuesta = await axios.put(`https://refunding-backend.herokuapp.com/users/currentMoney`,
            {
                email: props.navigation.getParam('email'),
                money: data.money
            })
            .catch((error) => {
                console.error(error);
            });

        console.log(JSON.stringify(data));
        console.log("data queda asi: ", data);
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
                                    saveMoney(index);

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
                                    //this._onPress(item)
                                    saveMoney(index);

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
                    organizeJson();
                    console.log("cash en money", cash);
                    sentMoney(cash);
                    console.log("holiii");
                    alert("The money has been charged to your account");
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