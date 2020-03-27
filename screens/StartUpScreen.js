import React, {useEffect} from 'react';
import { View, ActivityIndicator, StyleSheet, AsyncStorage } from 'react-native';
import {useDispatch} from 'react-redux';




const StartUpScreen = props => {
    const dispatch = useDispatch();
    useEffect(() => {
        const tryLogin = async () => {
            const userData = await AsyncStorage.getItem('userData');
            if(!userData){
                props.navigation.navigate("Auth");
                return;
            }
            const data = JSON.parse(userData);

            const { token,userId,expiration } = data;

            console.log("Pude traer token de asyncStorage: ", token);
            const expirationDate = new Date(expiration);

            if(expirationDate <= new Date() || !token || !userId){
                props.navigation.navigate('Auth');
                return;
            }
            
            //Tengo que añadir la navigation
            props.navigation.navigate("Find");

            dispatch({type:"authenticate", payload: {token,userId,expirationDate}});

        };
        tryLogin();
        
    }, []);


    return (
        <View style={styles.screen}>
            <ActivityIndicator size="large"/>
        </View>
    )
};




const styles = StyleSheet.create({

});

export default StartUpScreen;