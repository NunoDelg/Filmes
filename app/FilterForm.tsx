import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { Picker as RNPicker } from "@react-native-picker/picker";

// Define o tipo das propriedades do FilterForm
interface FilterFormProps {
  onApplyFilters: (filters: {
    query: string;
    genre: string;
    releaseYear: string;
  }) => void;
}

// Define o componente FilterForm
const FilterForm: React.FC<FilterFormProps> = ({ onApplyFilters }) => {
  const [query, setQuery] = useState<string>("");
  const [genre, setGenre] = useState<string>("all");
  const [releaseYear, setReleaseYear] = useState<string>("");

  // Função chamada ao pressionar o botão de aplicar filtros
  const handleApplyFilters = () => {
    onApplyFilters({ query, genre, releaseYear });
  };

  return (
    <View style={styles.container}>
      <Text>Nome</Text>
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Digite o nome do filme"
        style={styles.input}
      />
      <Text>Gênero</Text>
      <RNPicker
        selectedValue={genre}
        onValueChange={(itemValue) => setGenre(itemValue)}
        style={styles.picker}
      >
        <RNPicker.Item label="Todos" value="all" />
        <RNPicker.Item label="Ação" value="28" />
        <RNPicker.Item label="Comédia" value="35" />
      </RNPicker>
      <Text>Ano de Lançamento</Text>
      <TextInput
        value={releaseYear}
        onChangeText={setReleaseYear}
        placeholder="Digite o ano de lançamento"
        keyboardType="numeric"
        style={styles.input}
      />
      <Button title="Aplicar Filtros" onPress={handleApplyFilters} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
  picker: {
    height: 50,
    width: "100%",
    marginBottom: 12,
  },
});

export default FilterForm;
