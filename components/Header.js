import React from 'react';
import { View, Text, StyleSheet   } from 'react-native';

import Colors from '../constants/colors';

//Componente funcional
//props es como un pasador de parámetros
const Header = props => {
    return(
       <View style={styles.header}>
           <Text style={styles.title}>{props.title}</Text>
       </View> 
    );
};

//Stylesheet para todos los componentes
const styles = StyleSheet.create({
    header: {
        width: '100%',  //Para que tome el tamaño full del parent
        height: 80,
        paddingTop: 36,  //Para esquivar notch y barra de status
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        color: 'black',
        fontSize: 18
    }
});

//Algo como module para exportar el componente
export default Header;