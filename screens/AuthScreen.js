import React, { useState } from 'react';
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Button,
  TextInput,
  Text
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Card from '../components/UI/Card';
import axios from 'axios';

const AuthScreen = props => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  signUpHandler = async (email, password) => {

    const respuesta = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA4p-qk3jvIg6T5Uzm4AXWq4GVKA1-g1k8',
      {
        email: email,
        password: password,
        returnSecureToken: true
      });
    res = respuesta.data;
    console.log(JSON.stringify(respuesta.data.idToken));
  }

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView>

            <Text>Email</Text>
            <TextInput
              style={styles.input}
              onChangeText={(email) => setEmail(email)}
              value={email}
            ></TextInput>

            <Text>Password</Text>
            <TextInput
              style={styles.input}
              onChangeText={(password) => setPassword(password)}
              value={password}
            ></TextInput>

            <View style={styles.buttonContainer}>
              <Button title="Create Account" onPress={() => {
                signUpHandler(email, password)
              }} />
            </View>

            <View style={styles.buttonContainer}>
              <Button
                title="Switch to Login"
                onPress={() => { }}
              />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

// AuthScreen.navigationOptions = {
//   headerTitle: 'Authenticate'
// };

//Request post https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  authContainer: {
    width: '100%',
    maxWidth: 600,
    maxHeight: 400,
    padding: 20
  },
  buttonContainer: {
    marginTop: 10
  },
  input: {
    borderColor: 'gray',
    width: '100%',
    flex: 1,
    marginTop: 10,
    marginBottom: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  }
});

export default AuthScreen;