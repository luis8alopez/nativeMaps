import React, { useEffect, useState } from 'react';
import { Text, View, Image, StyleSheet, FlatList, Button, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import { Card } from 'react-native-shadow-cards';

let arr = [];
let hel = [];
let copy = [];
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

let dataOld =
{
    id: '100000',
    title: 'Cienmil',
    image: require('../assets/rsz_100000.jpg'),
    quantity: '0',
    identifier: 10
};

RefundScreen = props => {

    RefundScreen['navigationOptions'] = screenProps => ({
        title: 'Home',
        headerTitle: "Refund",
        headerRight: () => <TouchableOpacity
            onPress={() => {
                props.navigation.navigate("Profile");
            }}
            backgroundColor="black"
            title="Done"
            style={styles.boton1}
        >

            <Text style={styles.texto}> Done </Text>
        </TouchableOpacity>
    });

    const [refund, setRefund] = useState([]);
    const [flag, setFlag] = useState(false);

    cleanEverything = () => {
        data = copy[0];
    }

    callApi = async () => {

        let price = props.navigation.getParam('price');
        if (!price) {
            alert("There is no price");
            return;
        }
        return await axios(`https://refunding-backend.herokuapp.com/directions/getRefund?price=${price}`)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        const retorno = async () => {
            const reto = await callApi();
            if (!reto) {
                console.log("Something went wrong");
                alert("There is not enough money on your wallet");
                props.navigation.navigate("Profile");
                return;
            }
            console.log("Refund tiene", reto.data.refund);
            setRefund(String(reto.data.refund.refund));
            //Acá se puede hacer machetazo pa llamar función que cambie el array data para mostrar
            let num = ["100000", "50000", "20000", "10000", "5000", "2000", "1000", "500", "200", "100", "50"];

            for (let i = 0; i < 11; i++) {
                let help = num[i];
                if (reto.data.refund.refund[help]) {
                    arr = data.filter((obj) => {
                        return obj.id == help;
                    });
                    arr[0].quantity = String(reto.data.refund.refund[help]);
                    hel.push(arr[0]);
                    console.log("cada iteración", arr);
                }
            }
            console.log(hel);
            data = hel;
            setFlag(true);
        }
        retorno();
    }, []);

    return (
        <LinearGradient colors={['#005AA7', '#FFFDE4']} style={styles.gradient}>
            <FlatList
                data={data}
                keyExtractor={(item, index) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.container}>
                        {item.identifier >= 4 && (  //It renders from 1000 up
                            <Card style={{ padding: 5, margin: 5, width: '70%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#252073' }}>
                                <TouchableOpacity style={styles.imageContainer} >

                                    <Image
                                        source={item.image}
                                        style={styles.img}
                                    />
                                </TouchableOpacity>
                            </Card>
                        )}

                        {item.identifier < 4 && (
                            <Card style={{ padding: 5, margin: 5, width: '70%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#252073' }}>
                                <TouchableOpacity style={styles.imageContainer} >
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
    texto: {
        color: 'white',
        fontSize: 15
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
    }
});

export default RefundScreen;