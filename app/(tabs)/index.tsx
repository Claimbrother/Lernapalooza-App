import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const karten = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.Text}>Lernkarten</Text>
      <Link href="/karten" style={{ color: 'blue'}}>Let's GO!!!</Link>
    </View>
  )
}

export default karten

const styles = StyleSheet.create({

    container: {
        display: 'flex',
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    Text: {
        fontSize:40,
        color: 'white'
    }
})