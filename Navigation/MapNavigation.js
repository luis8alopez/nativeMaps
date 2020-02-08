import { createStackNavigator, cre } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import MapaScreen from '../screens/MapaScreen';
import FindMe from '../components/FindMe';

const MapNavigator = createStackNavigator({
    Home: HomeScreen,
    Find: FindMe,
    Map: MapaScreen
});

export default createAppContainer(MapNavigator);