import { StyleSheet } from 'react-native';
import { View, Text } from 'react-native';
import { useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect } from 'expo-router';

export default function TabTwoScreen() {
  const [savedFacts, setSavedFacts] = useState<string[]>([]);

  useFocusEffect(
    useCallback(() => {
      loadFacts();
    }, [])
  );
  const loadFacts = async () => {
    try {
      const saved = await AsyncStorage.getItem("savedFacts");
      const facts = saved ? JSON.parse(saved) : [];
      if (facts) setSavedFacts(facts);
    } catch (error) {
      console.error("Erro ao carregar fatos:", error);
    }
  };
  useEffect(() => {
    loadFacts();
  }, []);
  return (
    <View style={styles.container}>
      <LinearGradient colors={["#FFF8F0", "#FEE2D0"]} style={styles.background}>
        <Text style={styles.title}>Galeria de fatos descobertos</Text>
        <FlatList
          style={[styles.list, savedFacts.length === 0 && {paddingTop: "50%"}]}
          data={savedFacts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Text style={styles.listText}>• {item}</Text>
          )}
          ListEmptyComponent={<Text style={styles.listText}>Nenhum fato descoberto... Ainda</Text>}
        />
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  background: {
    flex: 1,
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
  list: {
    padding: 20,
  },
  listText: {
    fontSize: 18,
    marginVertical: 10,
    textAlign: "justify"
  }

});
