import React, { useState } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import FindMe from './components/FindMe';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reducer } from './Reducers/reducer';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from 'react-navigation-stack'
import {createAppContainer} from 'react-navigation';


import MapaScreen from './screens/MapaScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import PlacesScreen from './screens/Places';
import AuthScreen from './screens/AuthScreen';
import StartUpScreen from './screens/StartUpScreen';

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};


const store = createStore(reducer);
const Stack = createStackNavigator({
  StartUp: StartUpScreen,
  Auth: AuthScreen,
  Map: MapaScreen,
  Home: HomeScreen, 
  Login: LoginScreen,
  Find: FindMe
});

const AppContainer = createAppContainer(Stack);


export default function App() {



  const [fontLoaded, setFontLoaded] = useState(false);
  //const [vista, setVista] = useState(6);
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


  // if (vista === 0) {
  //   ventana = <HomeScreen onVista={vistaHandler} />
  // }
  // if (vista === 1) {
  //   ventana = <MapaScreen onLon={long} onLat={lat} />
  // }
  // if (vista === 2) {
  //   ventana = <FindMe onGetLoc={locationHandler} onGetLong={longHandler} onGetLat={latHandler} onVista={vistaHandler} />
  // }
  // if (vista === 3) {
  //   ventana = <LoginScreen onVista={vistaHandler} />
  // }
  // if (vista === 4) {
  //   ventana = <PlacesScreen />
  // }
  // if (vista === 5) {
  //   ventana = <AuthScreen />
  // }
  // if (vista === 6) {
  //   ventana = <StartUpScreen />
  // }
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
    <NavigationContainer>
      <Provider store={store}>
        
            {/* <Header title="Native Maps"/>  */}
            {/* {ventana} */}
            <AppContainer/>
        
      
      </Provider>
    </NavigationContainer>
  );

}

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Auth" component={AuthScreen} />
      <Stack.Screen name="Map" component={MapaScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="StartUp" component={StartUpScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

