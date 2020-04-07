import React, { Component } from 'react'; 
import { ListView, Text, View, Image, StyleSheet, FlatList } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  img: {
    width: 240,
    height: 110,
    marginLeft:20
  },
});

const data = [
    {
        id: '1000',
        title: 'Mil',
        image: require('../assets/rsz_1000.jpg')
    },
    {
        id: '2000',
        title: 'Dos mil',
        image: require('../assets/rsz_2000.jpg')
    },
    {
        id: '5000',
        title: 'Cinco mil',
        image: require('../assets/rsz_5000.jpg')
    },
    {
      id: '10000',
      title: 'Diez mil',
      image: require('../assets/rsz_110000.jpg')
    },
    {
      id: '20000',
      title: 'Veinte Mil',
      image: require('../assets/rsz_20000.png')
    },
    {
      id: '50000',
      title: 'Cincuenta mil',
      image: require('../assets/rsz_50000.jpg')
    },
    {
      id: '100000',
      title: 'Cien mil',
      image: require('../assets/rsz_100000.jpg')
    },
  ];


class RefundScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  //Lógica acá que luego de llamar al Servicio de devuelta, coja el JSON
  // Y vea qué ids trajo y luego crear subArray de data para mostrar en el FlatList
  

  render() {
    return (
      <FlatList
        data={data}
        keyExtractor={(item, index) => item.id}
        renderItem={({item}) => (
          <View style={styles.container}>
            <Image
              source={item.image}
              style={styles.img}
            />
            <Text>{item.id}</Text>
          </View>)}
      />
    );
  }
}

export default RefundScreen;