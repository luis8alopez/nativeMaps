import React, { useEffect, useState } from 'react';
import { ListView, Text, View, Image, StyleSheet, FlatList, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
    },
    img: {
        width: 240,
        height: 110,
        marginLeft: 20
    },
});
let arr = [];
let hel = [];
let data = [
    {
        id: '100000',
        title: 'Cienmil',
        image: require('../assets/rsz_100000.jpg')
    },
    {
        id: '50000',
        title: 'Cincuentamil',
        image: require('../assets/rsz_50000.jpg')
    },
    {
        id: '20000',
        title: 'Veintemil',
        image: require('../assets/rsz_20000.png')
    },
    {
        id: '10000',
        title: 'Diezmil',
        image: require('../assets/rsz_110000.jpg')
    },
    {
        id: '5000',
        title: 'CincoMil',
        image: require('../assets/rsz_5000.jpg')
    },
    {
        id: '2000',
        title: 'Dosmil',
        image: require('../assets/rsz_2000.jpg')
    },
    {
        id: '1000',
        title: 'mil',
        image: require('../assets/rsz_1000.jpg')
    },
];



RefundScreen = props => {

    const [refund, setRefund] = useState([]);
    const [flag, setFlag] = useState(false);

    callApi = async () => {
        //Cambiar price para que se reciba dinámicamente cuando el navigation de maps
        //Apunte a esta Screen --- Tal vez Redux?
        return await axios('https://refunding-backend.herokuapp.com/api/getRefund?price=18000')
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
            }
            setRefund(String(reto.data.refund.refund));
            //Acá se puede hacer machetazo pa llamar función que cambie el array data para mostrar
            let num = ["100000","50000","20000","10000","5000","2000","1000"];

            for(let i=0;i<7;i++){
                let help = num[i];
                if(reto.data.refund.refund[help]){
                    let jsonObj= {};
                    jsonObj["id"] = help;
                    jsonObj["quantity"] = reto.data.refund.refund[help];
                    arr = data.filter(( obj ) => {
                        return obj.id == help;
                    });
                    hel.push(arr[0]);
                    //En primera iteración, arr tiene 10.000 pero cuando llega 5.000 se borra el 10.000
                    console.log("cada iteración",arr);
                    //JsonObj o en su defecto --help-- tiene el id que se debería borrar en data[] para hacer el render
                    // cómo?
                }               
            }
            console.log(hel);
            data=hel;
            //console.log(data);
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
                        <Image
                            source={item.image}
                            style={styles.img}
                        />
                        <Text>{item.id}</Text>
                    </View>)}
            />
        </LinearGradient>
    );
}

export default RefundScreen;