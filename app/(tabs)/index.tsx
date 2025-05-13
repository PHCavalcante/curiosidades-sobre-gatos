import { StyleSheet, View, Text } from 'react-native';
import { Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import FactCard from '@/components/FactCard';
import { useState } from 'react';

export default function Index() {
  const [factButtonPressed, setFactButtonPressed] = useState(false); 
  const [giveAnotherFact, setGiveAnotherFact] = useState(false);

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#FFF8F0", "#FEE2D0"]} style={styles.background}>
        <Text style={styles.title}> 🐱 Fatos sobre gatos</Text>
        <Image
          source={{ uri: "https://cataas.com/cat" }}
          style={styles.image}
        />
        <TouchableOpacity
          onPress={() => {
            setFactButtonPressed(true);
            setGiveAnotherFact(true);
          }}
          children={
            <Text style={styles.buttonText}>
              {factButtonPressed ? "Obter outro fato" : "Obter um fato"}
            </Text>
          }
          style={styles.button}
        ></TouchableOpacity>
        {
          <FactCard
            open={factButtonPressed}
            giveAnotherFact={giveAnotherFact}
            onFactFetched={() => setGiveAnotherFact(false)}
          />
        }
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "100%",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginTop: 20,
    borderWidth: 2,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  button: {
    backgroundColor: "#4C9EEB",
    padding: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
