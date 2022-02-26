import { View, Text, FlatList, StyleSheet, TextInput, } from 'react-native'
import React, { useEffect, useState } from 'react'
import CoinItem from './components/CoinItem';
import { StatusBar } from 'expo-status-bar';

const App = () => {

  const [coins, setCoins] = useState([])


  const loadData = async () => {

    const resp = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false');
    const data = await resp.json();
    setCoins(data)

  };

  useEffect(() => {

    loadData()
    console.log('Loaded')

  }, [])

  return (

    <View style={styles.container}>
      <StatusBar backgroundColor='#141414' />
      <View style={styles.header}>
        <Text style={styles.title}>CryptoValue</Text>
        <TextInput style={styles.searchInput} />
      </View>
      <FlatList
        style={styles.list}
        data={coins}
        renderItem={({ item }) => {
          return <CoinItem coin={item} />
        }}
        showsVerticallScrollIndicator={false} />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#242450',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    color: 'white',
    marginTop: 25,
    fontSize: 20
  },
  list: {
    width: '90%'
  },
  header: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 10
  },
  searchInput: {
    color: '#fff',
    borderBottomColor: '#4657CE', 
    borderBottomWidth: 1,
    width: '40%',
    textAlign: 'center'
  },
  text: {
    color: '#ffffff'
  },
})

export default App