import React from 'react';

import { View, StyleSheet, TextInput, Button, Image } from 'react-native';

const HomeScreen = props => {

    change = () => {
        props.onVista(2);
    }

    return (
        <View style={styles.screen}>

            <Image
                style={styles.stretch}
                source={require('../assets/money.png')}
            />

            <View style={styles.input}>
                <TextInput style={styles.text} underlineColorAndroid='grey' placeholder=' Enter user'></TextInput>
                <TextInput style={styles.text} underlineColorAndroid='grey' placeholder=' Enter pass'></TextInput>
                <Button style={styles.button} title="Log" onPress={change} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    log: {
        padding: 10

    },
    input: {
        padding: 10,
        width: 200,
        justifyContent: 'center',
        flex: 1
    },
    text: {
        height: 40,
        borderWidth: 2,
        marginBottom: 10,
        borderRadius: 15,
        marginRight: 2
    },
    button: {
        borderRadius: 20
    },
    stretch: {
        width: 50,
        height: 50,
        padding: 10
    }
});

export default HomeScreen;