import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';

// Função para buscar filmes populares
const fetchPopularMovies = async () => {
  const API_KEY = "1ef7a743667667402127014c842e67ed"; 
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=pt-PT`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${data.status_message || "Desconhecido"}`);
    }

    return data.results; 
  } catch (error) {
    console.error("Erro ao buscar filmes populares:", error);
    throw error; 
  }
};

export default function HomeScreen() {
  const [topMovies, setTopMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const loadTopMovies = async () => {
      setLoading(true);
      try {
        const movies = await fetchPopularMovies();
        setTopMovies(movies.slice(0, 5)); 
      } catch (error) {
        console.error("Erro ao carregar filmes populares", error);
      } finally {
        setLoading(false);
      }
    };

    loadTopMovies();
  }, []);

  const handlePress = (movieId: number) => {
    navigation.navigate('movies', { movieId });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filmes Populares</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={topMovies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handlePress(item.id)} style={styles.movieItem}>
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w200${item.poster_path}`,
                }}
                style={styles.poster}
              />
              <View style={styles.movieDetails}>
                <Text style={styles.movieTitle}>{item.title}</Text>
                <Text>Lançamento: {item.release_date || "N/A"}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}

      <View style={styles.adContainer}>
        <Text style={styles.adText}>Publicidade</Text>
        <Image
          source={{ uri: "https://via.placeholder.com/300x100.png?text=Ad" }}
          style={styles.adImage}
        />
      </View>
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
  movieItem: {
    flexDirection: "row",
    marginBottom: 16,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  poster: {
    width: 100,
    height: 150,
    borderRadius: 8,
  },
  movieDetails: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  adContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  adText: {
    fontSize: 18,
    marginBottom: 10,
  },
  adImage: {
    width: 300,
    height: 100,
  },
});
