import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useRoute } from "@react-navigation/native";

const API_KEY = "1ef7a743667667402127014c842e67ed";

const fetchMovieDetails = async (movieId: number) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=pt-BR`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        `Erro na requisição: ${data.status_message || "Desconhecido"}`
      );
    }

    return data;
  } catch (error) {
    console.error("Erro ao buscar detalhes do filme:", error);
    throw error;
  }
};

export default function MovieDetailsScreen() {
  const route = useRoute();
  const { movieId } = route.params as { movieId: number };
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovieDetails = async () => {
      try {
        const data = await fetchMovieDetails(movieId);
        setMovie(data);
      } catch (error) {
        console.error("Erro ao carregar detalhes do filme", error);
      } finally {
        setLoading(false);
      }
    };

    loadMovieDetails();
  }, [movieId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!movie) {
    return <Text>Filme não encontrado.</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
        }}
        style={styles.backdrop}
      />
      <Text style={styles.title}>{movie.title}</Text>
      <Text style={styles.releaseDate}>
        Lançamento: {movie.release_date || "N/A"}
      </Text>
      <Text style={styles.overview}>
        {movie.overview || "Sem descrição disponível"}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  backdrop: {
    width: "100%",
    height: 200,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  releaseDate: {
    fontSize: 16,
    color: "#666",
    marginBottom: 16,
  },
  overview: {
    fontSize: 16,
    color: "#333",
  },
});
