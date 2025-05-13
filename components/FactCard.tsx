import { View, StyleSheet, Text } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

type FactCardProps = {
    open: boolean;
    giveAnotherFact: boolean;
    onFactFetched: () => void;
};

const saveFact = async (newFact: string) => {
  try {
    const existing = await AsyncStorage.getItem("savedFacts");
    const factsArray: string[] = existing ? JSON.parse(existing) : [];
    factsArray.unshift(newFact);
    await AsyncStorage.setItem("savedFacts", JSON.stringify(factsArray));
  } catch (error) {
    console.error("Erro ao salvar fato:", error);
  }
};

export default function FactCard({ open, giveAnotherFact, onFactFetched } : FactCardProps) {
    const [fact, setFact] = useState<string | null>(null);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://meowfacts.herokuapp.com/?lang=por-br"
        );
        setFact(response.data.data[0]);
        await saveFact(response.data.data[0]);
        onFactFetched?.();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    useEffect(() => {
        if (open) {
            fetchData();
        }
    }, []);
    useEffect(() => {
        if (giveAnotherFact) {
            fetchData();
        }
    }, [giveAnotherFact]);
    if (!open) {
      return null;
    }
    if (!fact) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Fato aleatório</Text>
                <Text style={styles.text}>Carregando...</Text>
            </View>
        );
    }
  return (
    <View style={styles.container}>
        <Text style={styles.title}>Fato aleatório</Text>
        <Text style={styles.text}>Você sabia que... {fact}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "80%",
    height: "auto",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF8F0",
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    elevation: 5,
    position: "relative",
    zIndex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    color: "#333",}
});