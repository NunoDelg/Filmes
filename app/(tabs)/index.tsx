import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Button,
  ActivityIndicator,
} from "react-native";
import { fetchMovies } from "../(tabs)/services/api"; 
import { FavoritesContext } from "../(tabs)/contexts/FavoritesContext"; 

export default function Movies() {
  const [movies, setMovies] = useState<any[]>([]);
  const [query, setQuery] = useState(""); 
  const [loading, setLoading] = useState(false); 

  const { favorites, addFavorite, removeFavorite } = useContext(FavoritesContext); 

  useEffect(() => {
    // Função para carregar os filmes iniciais (pode ser popular ou trending)
    const loadMovies = async () => {
      setLoading(true); 
      try {
        const data = await fetchMovies("popular");
        setMovies(data.results); 
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  const searchMovies = async () => {
    if (query.trim() === "") return;
    setLoading(true);
    try {
      const data = await fetchMovies(query); 
      setMovies(data.results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buscar Filmes</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome de um filme"
          value={query}
          onChangeText={setQuery}
        />
        <Button title="Pesquisar" onPress={searchMovies} />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.movieItem}>
              <Text style={styles.movieTitle}>{item.title}</Text>
              <Text>Lançamento: {item.release_date}</Text>
              <Button
                title={
                  favorites.some((fav) => fav.id === item.id)
                    ? "Remover dos Favoritos"
                    : "Adicionar aos Favoritos"
                }
                onPress={() =>
                  favorites.some((fav) => fav.id === item.id)
                    ? removeFavorite(item.id)
                    : addFavorite(item)
                }
              />
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginRight: 8,
    borderRadius: 4,
  },
  movieItem: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
