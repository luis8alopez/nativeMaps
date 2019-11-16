import React from 'react';
import { View, StyleSheet } from 'react-native';

const Card = props => {
    return <View style={{...styles.card, ...props.style}}>{props.children}</View>
//... es spread, pasa todos los estilos a styles.card
//...props.style es para pasar estilos desde afuera y sobreescribir
};

const styles = StyleSheet.create({

    card: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 }, //Los shadows son para resaltar el sector
        shadowRadius: 6,                    //Tipo card y darle efectos
        shadowOpacity: 0.26,
        backgroundColor: 'white',   //Darle color blanco al backgroud del card para diferenciar del fondo 
        elevation: 8,
        padding: 20,
        borderRadius: 10 //redondear esquinas
    }
});

export default Card;