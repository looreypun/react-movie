import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { fetchVideoKey } from '../services/movie.service';
import { WebView } from 'react-native-webview';

const MovieDetailsScreen = ({ route }) => {
  const { movie } = route.params;
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    const fetchMovieInfo = async () => {
      try {
        const videoKey = await fetchVideoKey(movie.id);
        setVideoUrl(`https://www.youtube.com/watch?v=${videoKey}`);
        console.log(videoUrl);
      } catch (error) {
        console.error('Error fetching movie data:', error);
      }
    };

    fetchMovieInfo();
  }, [movie]);

  return (
    <ScrollView style={styles.container}>
      <WebView
        source={{ uri: videoUrl }}
        style={styles.videoContainer}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.tagline}>{movie.tagline}</Text>
        <Text style={styles.overview}>{movie.overview}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  videoContainer: {
    height: 450,
  },
  detailsContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  tagline: {
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 10,
  },
  overview: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default MovieDetailsScreen;
