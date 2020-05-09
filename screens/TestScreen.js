import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Button, StyleSheet } from 'react-native'
import { Root, Popup } from 'popup-ui';
import Icon from 'react-native-vector-icons/EvilIcons'
import { OffCanvas3D } from 'react-native-off-canvas-menu'
import LoginScreen from './LoginScreen';
import AuthScreen from './AuthScreen';


export default class Profile extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            menuOpen: true
        }
    }

    static navigationOptions = ({ navigate, navigation }) => ({
        headerTitle: "Test",
        headerRight: () => <Button
            onPress={navigation.getParam('handle')}
            title="Nav"
            color="black"
        />
        ,
    });

    handleMenu() {
        const men = this.menuOpen;
        this.setState({menuOpen: !men});
    }

    componentDidMount() {
        this.props.navigation.setParams({ handle: this.handleMenu });
    }

    render() {

        return (
            <View style={{ flex: 1 }}>
                <OffCanvas3D
                    active={this.state.menuOpen}
                    onMenuPress={this.handleMenu.bind(this)}
                    backgroundColor={'#222222'}
                    menuTextStyles={{ color: 'white' }}
                    handleBackPress={true}
                    menuItems={[
                        {
                            title: 'Login',
                            icon: <Icon name="camera" size={35} color='#ffffff' />,
                            renderScene: <LoginScreen />
                        },
                        {
                            title: 'Auth',
                            icon: <Icon name="bell" size={35} color='#ffffff' />,
                            renderScene: <AuthScreen />
                        }
                    ]} />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    statusBar: {
        backgroundColor: '#000',
    },
    navBar: {
        backgroundColor: '#212121',
    },
    title: {
        color: '#fff',
    },
    buttonText: {
        color: '#b5b5b5',
    },
})