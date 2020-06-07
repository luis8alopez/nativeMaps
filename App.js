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
import AuthScreen from './screens/AuthScreen';
import StartUpScreen from './screens/StartUpScreen';
import ResumeScreen from './screens/ResumeScreen';
import RefundScreen from './screens/RefundScreen';
import Profile from './screens/Profile';
import TestScreen from './screens/TestScreen';
import MoneyScreen from './screens/MoneyScreen';
import PayAccountScreen from './screens/PayAccountScreen';
import HistoryScreen from './screens/HistoryScreen';
import CurrenMoneyScreen from './screens/CurrentMoneyScreen';

const store = createStore(reducer);

const Stack = createStackNavigator({
  StartUp: StartUpScreen,
  Test: TestScreen,    
  Auth: AuthScreen,
  Refund: RefundScreen,   
  Login: LoginScreen,
  Profile: Profile,       
  Resume: ResumeScreen,  
  Map: MapaScreen,
  Home: HomeScreen,
  Find: FindMe,
  Money: MoneyScreen,
  Pay: PayAccountScreen,
  History: HistoryScreen,
  Current: CurrenMoneyScreen
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