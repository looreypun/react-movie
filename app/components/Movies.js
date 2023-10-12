import React, { useState, useEffect, useCallback } from "react";
import { FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { fetchMovies } from "../services/movie.service";
import MovieGrid from "./MovieGrid";

const Movies = () => {
  const [movies, setMovies] = useState({
    popular: [],
    nowPlaying: [],
    topRated: [],
    upcoming: [],
  });

  const [loading, setLoading] = useState(true);

  const fetchMovieData = async () => {
    try {
      const [popularMovies, nowPlayingMovies, topRatedMovies, upcomingMovies] =
        await Promise.all([
          fetchMovies("popular"),
          fetchMovies("now_playing"),
          fetchMovies("top_rated"),
          fetchMovies("upcoming"),
        ]);

      setMovies({
        popular: popularMovies,
        nowPlaying: nowPlayingMovies,
        topRated: topRatedMovies,
        upcoming: upcomingMovies,
      });
    } catch (error) {
      console.error("Error fetching movie data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovieData();
  }, []);

  const handleLoadMore = useCallback(async (category) => {
    // Handle load more here
  }, []);

  return (
    <>
      {loading ? (
        <ActivityIndicator size="large" style={styles.loadingIndicator} />
      ) : (
        <FlatList
          data={[
            { title: "Popular Movies", data: movies.popular },
            { title: "Now Playing Movies", data: movies.nowPlaying },
            { title: "Top Rated Movies", data: movies.topRated },
            { title: "Upcoming Movies", data: movies.upcoming },
          ]}
          keyExtractor={(item) => item.title}
          renderItem={({ item }) => (
            <MovieGrid
              title={item.title}
              data={item.data}
              onLoadMore={() => handleLoadMore(item.title)}
            />
          )}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  loadingIndicator: {
    marginTop: 20,
  },
});

export default Movies;
