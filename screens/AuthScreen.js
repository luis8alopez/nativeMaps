import React, { useState } from 'react';
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Button,
  TextInput,
  Text,
  AsyncStorage,
  Image,
  TouchableOpacity
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import Card from '../components/UI/Card';
import axios from 'axios';

const AuthScreen = props => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [idToken, setIdToken] = useState('');
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState('');
  const [status, setStatus] = useState('');
  const [path, setPath] = useState('');
  const [data, setData] = useState('');
  const [uri, setUri] = useState('');

  signUpHandler = async (email, password, name, uri) => {

    if (!email || !password || !name) {
      alert("Please type a valid email, password or name");
      return
    }

    return await axios.post('https://refunding-backend.herokuapp.com/users/save', {
      firstName: name,
      email: email,
      password: password,
      photo: uri
    })
      .then(function (response) {
        console.log(response.data.flag);
        if (response.data.flag == 1) {
          alert("User Saved");
        }
        else {
          alert("Email already registered");
          return response.data.flag;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    setStatus("granted");
  }

  _getPhotoLibrary = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });
    if (!result.cancelled) {
      console.log('response', JSON.stringify(result));

      setPath(result);
      setData(result.data);
      setUri(result.uri);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <LinearGradient colors={['#005AA7', '#FFFDE4']} style={styles.gradient}>
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

            <Text>Name</Text>
            <TextInput
              style={styles.input}
              onChangeText={(name) => setName(name)}
              value={name}
            ></TextInput>

            <Text>Photo</Text>
            <Button title="Upload image" onPress={() => {
              componentDidMount();
              _getPhotoLibrary();
            }} />

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.boton} onPress={async () => {
                let flag = await signUpHandler(email, password, name, uri);
                console.log(flag + "Flag");
                if (flag == 0 || !flag) {
                  props.navigation.navigate("Auth");
                } else {
                  props.navigation.navigate("Profile", {
                    photo: uri
                  });
                }
              }} >
                <Text style={styles.texto}>Create Account</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.boton}
                onPress={() => { props.navigation.navigate("Login") }}
              >
                <Text style={styles.texto}>Login</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Card>
        {uri != '' && (
          <View style={styles.separator}>
            <Image
              source={{ uri: uri }}
              style={styles.images}
            />
          </View>
        )}
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

AuthScreen['navigationOptions'] = screenProps => ({
  title: 'Create a new account',
  headerStyle: {
    backgroundColor: '#e7ffff', //Ajustar color bonito
  },
  headerLeft: () => null
})

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
    width: '80%',
    maxWidth: 600,
    maxHeight: 480,
    padding: 20
  },
  buttonContainer: {
    marginTop: 10,
    alignItems: 'center'
  },
  input: {
    borderColor: 'gray',
    width: '100%',
    flex: 1,
    marginTop: 10,
    marginBottom: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  },
  boton: {
    borderRadius: 50,
    backgroundColor: '#252073',
    width: 120,
    alignItems: 'center',
    height: 40,
    justifyContent: 'center'
  },
  texto: {
    color: 'white',
    fontSize: 15
  },
  images: {
    padding: 10,
    width: 150,
    height: 150,
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 3
  },
  separator: {
    padding: 20
  }
});

export default AuthScreen;