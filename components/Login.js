import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import * as GoogleSignIn from 'expo-google-sign-in';

import { AppAuth } from 'expo-app-auth';


// This value should contain your REVERSE_CLIENT_ID
//const { URLSchemes } = AppAuth;

class LoginScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            logged: ""
        }
        // SigninStart = async () => {
        //     try {
        //         await GoogleSignIn.initAsync({ clientId: '325384024446-vsr0ehu8in8b7h0ijfrhgjdkg4u67fk3.apps.googleusercontent.com' });
        //     } catch ({ message }) {
        //         alert('GoogleSignIn.initAsync(): ' + message);
        //     }
        // }
        // SigninStart();
    }


    signInAsync = async () => {
        try {
            await GoogleSignIn.askForPlayServicesAsync();
            const { type, user } = await GoogleSignIn.signInAsync();
            if (type === 'success') {
                console.log("Login succesful");
            }
        } catch ({ message }) {
            alert('login: Error:' + message);
        }
    };

    signOutAsync = async () => {
        try {
            await GoogleSignIn.signOutAsync();
            this.setState({ user: null });
        } catch ({ message }) {
            alert('signOutAsync: ' + message);
        }
    };

    async componentDidMount() {
        try {
            await GoogleSignIn.initAsync({
                isOfflineEnabled: false,
                isPromptEnabled: true,
                clientId:'325384024446-vsr0ehu8in8b7h0ijfrhgjdkg4u67fk3.apps.googleusercontent.com',
            });
            this._syncUserWithStateAsync();
        } catch ({ message }) {
            alert('GoogleSignIn.initAsync(): ' + message);
        }
    }

    render() {
        return (
            <View>
                <Button style={styles.container} title="Please press to log in with google" onPress={this.signInAsync} />
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default LoginScreen;