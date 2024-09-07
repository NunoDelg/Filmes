import React from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import { useFavorites } from "../(tabs)/contexts/FavoritesContext";

export default function FavoritesScreen() {
  const { favorites } = useFavorites();

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <Text style={styles.emptyMessage}>
          Nenhum filme favorito adicionado.
        </Text>
      ) : (
        <FlatList
          data={favorites}
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
  emptyMessage: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
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
});
