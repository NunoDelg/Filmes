import React, { useState } from "react";
import {
  SafeAreaView,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  Text,
  View,
  Image,
} from "react-native";

const API_KEY = "1ef7a743667667402127014c842e67ed";

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchMovies = async () => {
    if (!searchQuery) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/550?api_key=${API_KEY}&query=${encodeURIComponent(
          searchQuery
        )}`
      );
      const data = await response.json();
      if (data.results) {
        setMovies(data.results);
      } else {
        setMovies([]);
      }
    } catch (err) {
      setError("Erro ao buscar filmes. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Pesquisar filmes..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <Button title="Pesquisar" onPress={searchMovies} />

      {loading && <Text>Carregando...</Text>}
      {error && <Text style={styles.error}>{error}</Text>}

      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.movieItem}>
            {item.poster_path ? (
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w200${item.poster_path}`,
                }}
                style={styles.poster}
              />
            ) : (
              <View style={styles.noPoster}>
                <Text style={styles.noPosterText}>Sem imagem</Text>
              </View>
            )}
            <View style={styles.movieDetails}>
              <Text style={styles.movieTitle}>{item.title}</Text>
              <Text style={styles.movieReleaseDate}>
                Lançamento: {item.release_date || "N/A"}
              </Text>
              <Text numberOfLines={3} style={styles.movieOverview}>
                {item.overview || "Sem descrição disponível"}
              </Text>
            </View>
          </View>
        )}
        ListEmptyComponent={
          !loading && <Text>Nenhum filme encontrado. Tente outra busca.</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  movieItem: {
    flexDirection: "row",
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  poster: {
    width: 100,
    height: 150,
    borderRadius: 8,
  },
  noPoster: {
    width: 100,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ddd",
    borderRadius: 8,
  },
  noPosterText: {
    textAlign: "center",
    color: "#666",
  },
  movieDetails: {
    flex: 1,
    marginLeft: 10,
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  movieReleaseDate: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  movieOverview: {
    fontSize: 14,
    color: "#333",
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});
