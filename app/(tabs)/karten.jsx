import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const Karte = () => {
  const [umgedreht, setUmgedreht] = useState(false);
  const [versuche, setVersuche] = useState(0);
  const rotation = useSharedValue(0);

  const vorderseiteStyle = useAnimatedStyle(() => ({
    transform: [{ rotateY: `${rotation.value}deg` }],
    backfaceVisibility: 'hidden',
  }));

  const rueckseiteStyle = useAnimatedStyle(() => ({
    transform: [{ rotateX: `${rotation.value + 180}deg` }],
    backfaceVisibility: 'hidden',
  }));

  const flipKarte = () => {
    if (!umgedreht) {
      rotation.value = withTiming(180, { duration: 1000 });
      setVersuche((prev) => prev + 1); // Erhöhe die Anzahl der Versuche nur beim Umdrehen zur Rückseite
    } else {
      rotation.value = withTiming(0, { duration: 1000 });
    }
    setUmgedreht(!umgedreht);
  };
  

  const trys = () => {
    return versuche;
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={flipKarte}>
        <View>
          <Animated.View style={[styles.karte, vorderseiteStyle]}>
          <Image
              source={require('../KartenBilder/frage1.png')}  // Lokales Bild
              style={{ width: 300, height: 200 }}  // Setze die gewünschte Bildgröße
            />
          </Animated.View>
          <Animated.View style={[styles.karte, styles.rueckseite, rueckseiteStyle]}>
          <Image
              source={require('../KartenBilder/antwort1.png')}  // Lokales Bild
              style={{ width: 300, height: 200 }}  // Setze die gewünschte Bildgröße
            />
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
      <Text style={styles.versucheText}>Versuche: {trys()}</Text>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 250,
    alignItems: 'center',
  },
  karte: {
    display: 'flex',
    alignItems: 'center',
    width: '150%',
    height: 200,
    justifyContent: 'center',
    backgroundColor: '#fff',
    alignContent: 'space-around',
  },
  rueckseite: {
    position: 'absolute',
    width: '100%',
    height: 200,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    textAlign: 'auto',
  },
  versucheText: {
    marginTop: 210,
    fontSize: 16,
  },
});

export default Karte;
