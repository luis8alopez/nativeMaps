import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import FindMe from './components/FindMe';

import Header from './components/Header';
import MapaScreen from './screens/MapaScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './components/Login';

import { withAuthenticator } from 'aws-amplify-react-native';
import Amplify from '@aws-amplify/core';
import config from './aws-exports';
Amplify.configure(config);

export default function App() {
  
  const [vista, setVista] = useState(0);
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

  const vistaHandler = vis =>{
    setVista(vis);
  }


  let ventana = <HomeScreen/>
  //let ventana = <LoginScreen/>

  if(vista===0){
    ventana = <HomeScreen onVista={vistaHandler}/>
  }
  if(vista === 1){
    ventana = <MapaScreen onLon={long} onLat={lat}/>
  }
  if(vista ===2){
    ventana = <FindMe onGetLoc={locationHandler} onGetLong={longHandler} onGetLat={latHandler} onVista={vistaHandler}/>
  }
  if(vista ===3){
    ventana = <LoginScreen onVista={vistaHandler}/>
  }
  
    return (
      <View style={styles.container}>
        <Header title="Native Maps"/>
        {ventana}
      </View>
    );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
  
