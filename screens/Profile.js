import React, { Component } from "react";
import { Text, View, StyleSheet, Button, Image } from "react-native";

export default class Profile extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image
                    source={{ uri: this.props.navigation.getParam("photo") }}
                    style={styles.img} />

                <Text> Profile Screen </Text>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                    Welcome, {this.props.navigation.getParam("username")}
                </Text>

                <View style={{ paddingTop: 10 }}>
                    <Button
                        title="Sign out"
                        onPress={() => this.props.navigation.navigate("Login")}
                    />
                </View>

                <View style={{ paddingTop: 10 }}>
                    <Button
                        title="Go to Find my Location"
                        onPress={() => this.props.navigation.navigate("Find")}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        padding: 10
    },
    img: {
        width: 240,
        height: 260, //Arreglar acá, así sea las imágenes de las monedas
        padding: 10,
        borderColor: 'black'
    }
});