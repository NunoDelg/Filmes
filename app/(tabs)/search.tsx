import React, { useState, useContext } from "react";
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  Text,
  View,
  Image,
  Pressable,
} from "react-native";
import { FavoritesContext } from "../(tabs)/contexts/FavoritesContext";
import { MaterialIcons } from "@expo/vector-icons";
import FilterForm from "../FilterForm"; 

const API_KEY = "1ef7a743667667402127014c842e67ed";

interface Movie {
  id: number;
  title: string;
  release_date: string;
  overview: string;
  poster_path: string;
}

// Define the type for filter values
interface Filters {
  query: string;
  genre: string;
  releaseYear: string;
}

export default function SearchScreen() {
  const { addFavorite } = useContext(FavoritesContext);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Function to search movies based on filters
  const searchMovies = async (filters: Filters) => {
    const { query, genre, releaseYear } = filters;

    if (!query) return;

    setLoading(true);
    setError(null);

    try {
      let url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
        query
      )}`;

      if (genre !== "all") {
        url += `&with_genres=${genre}`;
      }

      if (releaseYear) {
        url += `&primary_release_year=${releaseYear}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (response.ok && data.results) {
        setMovies(data.results);
      } else {
        setMovies([]);
        setError("Nenhum filme encontrado.");
      }
    } catch (err) {
      setError("Erro ao buscar filmes. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddFavorite = (movie: Movie) => {
    console.log("Adicionando aos favoritos:", movie.title);
    addFavorite(movie);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FilterForm onApplyFilters={searchMovies} />
      {loading && <Text style={styles.loading}>Carregando...</Text>}
      {error && <Text style={styles.error}>{error}</Text>}
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }: { item: Movie }) => (
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
            <Pressable onPress={() => handleAddFavorite(item)}>
              <MaterialIcons name="favorite-border" size={24} color="black" />
            </Pressable>
          </View>
        )}
        ListEmptyComponent={() =>
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
  button: {
    marginBottom: 20,
    backgroundColor: "lime",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 4,
  },
  buttonText: {
    color: "black",
    fontWeight: "bold",
  },
  loading: {
    fontSize: 18,
    color: "blue",
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
