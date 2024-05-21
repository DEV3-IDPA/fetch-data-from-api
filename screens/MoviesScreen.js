import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput } from 'react-native';

import apiKey from '../apiKey';
import MovieItem from '../components/MovieItem';

const MoviesScreen = ({ navigation }) => {

  const [movies, setMovies] = useState([]);

  const getMoviesByRating = async () => {
    try {
      const response = await fetch("https://moviesminidatabase.p.rapidapi.com/movie/order/byRating/", {
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "moviesminidatabase.p.rapidapi.com",
          "x-rapidapi-key": apiKey
        }
      })
      const json = await response.json();
      console.log(json);
      setMovies(json.results);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getMoviesByRating();//load upcomming movies when the screen loads
  }, []);

  //load search results while typing in text input
  const getMoviesByTitleSearch = async (enteredText) => {//argument provided by onChangeText (TextInput)
    try {
      if (enteredText.length > 3) {
        const url = encodeURI("https://moviesminidatabase.p.rapidapi.com/movie/imdb_id/byTitle/" + enteredText + "/");
        console.log(url);
        const response = await fetch(url, {
          "method": "GET",
          "headers": {
            "x-rapidapi-host": "moviesminidatabase.p.rapidapi.com",
            "x-rapidapi-key": apiKey
          }
        })
        const json = await response.json();
        console.log(json);
        setMovies(json.results);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={styles.screen}>
      <TextInput
        placeholder="search movie"
        style={styles.input}
        onChangeText={getMoviesByTitleSearch}//provide argument to enteredText
      />
      <FlatList
        data={movies}
        keyExtractor={item => item.imdb_id}//use imdb_id as unique-key for each MovieItem in the FlatList
        renderItem={({ item }) => (
          <MovieItem
            id={item.imdb_id}
            title={item.title}
            navigation={navigation}
          />
        )}
      />
    </View >
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50,
  }
});
export default MoviesScreen;