import React, { useState } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import FindMe from './components/FindMe';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';


import MapaScreen from './screens/MapaScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './components/Login';
import PlacesScreen from './screens/Places';
import AuthScreen from './screens/AuthScreen';

import Amplify from '@aws-amplify/core';
import config from './aws-exports';
Amplify.configure(config);

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

export default function App() {

  const [fontLoaded, setFontLoaded] = useState(false);
  const [vista, setVista] = useState(5);
  const [loc, setLoc] = useState();
  const [long, setLong] = useState(0);
  const [lat, setLat] = useState(0);


  const locationHandler = locacion => {
    setLoc(locacion);
  };

  const longHandler = longitud => {
    setLong(longitud);
  };

  const latHandler = latitude => {
    setLat(latitude);
  };

  const vistaHandler = vis => {
    setVista(vis);
  }


  let ventana = <AuthScreen />


  if (vista === 0) {
    ventana = <HomeScreen onVista={vistaHandler} />
  }
  if (vista === 1) {
    ventana = <MapaScreen onLon={long} onLat={lat} />
  }
  if (vista === 2) {
    ventana = <FindMe onGetLoc={locationHandler} onGetLong={longHandler} onGetLat={latHandler} onVista={vistaHandler} />
  }
  if (vista === 3) {
    ventana = <LoginScreen onVista={vistaHandler} />
  }
  if (vista === 4) {
    ventana = <PlacesScreen />
  }
  if (vista === 5) {
    ventana = <AuthScreen />
  }
  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
      />
    );
  }

  return (
    <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
    <View style={styles.container}>
      {/* <Header title="Native Maps"/>  */}
      {ventana}
    </View>
    </LinearGradient>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

