import React from "react";
import {
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  View
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const MovieGrid = React.memo(({ title, data, onLoadMore }) => {
  const navigation = useNavigation();

  const navigateToMovieScreen = (movie) => {
    navigation.navigate('MovieDetailsScreen', { movie }); // Pass movie details as navigation parameter
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.movieItem} onPress={() => navigateToMovieScreen(item)}>
      <ImageBackground
        source={{
          uri: `https://image.tmdb.org/t/p/original${item.poster_path}`,
        }}
        style={styles.movieImage}
      >
        <Text style={styles.title}>{item.title}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.type}>{title}</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        numColumns={3} // Number of columns in the grid
        removeClippedSubviews={true} // Enable lazy loading
      />
      <TouchableOpacity onPress={onLoadMore} style={styles.moreButton}>
        <Text>More</Text>
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  type: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
  },
  movieItem: {
    width: "30%",
    paddingTop: 5,
    margin: 5,
  },
  movieImage: {
    width: "100%",
    height: 100,
    backgroundColor: '#0553',
    justifyContent: "flex-end",
    alignItems: "center",
    borderRadius: 10,
    overflow: "hidden",
  },
  title: {
    fontSize: 10,
    fontWeight: "bold",
    color: "white",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: 5,
    textAlign: "center",
  },
  moreButton: {
    alignItems: "flex-end",
    marginTop: 10,
  },
});

export default MovieGrid;
