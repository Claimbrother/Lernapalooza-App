import React, { useState } from 'react';
import { View, Image, Button, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

// Entfernen Sie die react-router-dom Importe
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Empfangen Sie das navigation Prop
const Karte = ({ navigation }) => {
  const [umgedreht, setUmgedreht] = useState(false);
  const [versuche, setVersuche] = useState(0);
  const rotation = useSharedValue(0);

  const vorderseiteStyle = useAnimatedStyle(() => ({
    transform: [{ rotateY: `${rotation.value}deg` }],
    backfaceVisibility: 'hidden',
  }));

  const rueckseiteStyle = useAnimatedStyle(() => ({
    transform: [{ rotateY: `${rotation.value + 180}deg` }],
    backfaceVisibility: 'hidden',
  }));

  const flipKarte = () => {
    if (!umgedreht) {
      rotation.value = withTiming(180, { duration: 1000 });
      setVersuche((prev) => prev + 1);
    } else {
      rotation.value = withTiming(0, { duration: 1000 });
    }
    setUmgedreht(!umgedreht);
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={flipKarte}>
        <View>
          <Animated.View style={[styles.karte, vorderseiteStyle]}>
            <Image
              source={require('../KartenBilder/frage1.png')}
              style={{ width: 400, height: 300 }}
            />
          </Animated.View>
          <Animated.View style={[styles.karte, styles.rueckseite, rueckseiteStyle]}>
            <Image
              source={require('../KartenBilder/antwort1.png')}
              style={{ width: 400, height: 300 }}
            />
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
      <Text style={styles.versucheText}>Versuche: {versuche}</Text>
      <Button
        title="Nächste Karte"
        onPress={() => navigation.navigate('nextCard')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  karte: {
    display: 'flex',
    justifyContent: 'center',
  },
  rueckseite: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  versucheText: {
    marginTop: 20,
    fontSize: 16,
  },
});

export default Karte;
