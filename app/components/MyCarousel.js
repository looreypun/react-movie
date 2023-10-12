import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, Dimensions, ActivityIndicator } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { fetchMovies } from '../services/movie.service';

const { width } = Dimensions.get('window');

const MyCarousel = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const data = await fetchMovies('popular');
        setMovies(data);
      } catch (error) {
        console.error('Error fetching movie data:', error);
      }
    };
    fetchMovieData();
  }, []);

  const renderItem = ({ item }) => (
    <ImageBackground
      source={{ uri: `https://image.tmdb.org/t/p/original${item.backdrop_path}` }}
      style={styles.item}
      imageStyle={styles.itemBackground}
    >
      <Text style={styles.title}>{item.title}</Text>
    </ImageBackground>
  );

  return (
    <View style={styles.container}>
      <Carousel
        data={movies}
        renderItem={renderItem}
        sliderWidth={width}
        itemWidth={width - 40}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200
  },
  item: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 10,
  },
  itemBackground: {
    resizeMode: 'cover',
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 5,
    marginBottom: 15,
    borderRadius: 5,
  },
});

export default MyCarousel;