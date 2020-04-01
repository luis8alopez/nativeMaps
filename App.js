import React from 'react';
import FindMe from './components/FindMe';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reducer } from './Reducers/reducer';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation';

import MapaScreen from './screens/MapaScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import PlacesScreen from './screens/Places';
import AuthScreen from './screens/AuthScreen';
import StartUpScreen from './screens/StartUpScreen';
import ResumeScreen from './screens/ResumeScreen';

const store = createStore(reducer);

const Stack = createStackNavigator({
  StartUp: StartUpScreen,
  Login: LoginScreen,
  Auth: AuthScreen,
  Map: MapaScreen,
  Home: HomeScreen,
  Find: FindMe,
  Resume: ResumeScreen
});

const AppContainer = createAppContainer(Stack);


export default function App(props) {

  return (
    <NavigationContainer>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </NavigationContainer>
  );

}