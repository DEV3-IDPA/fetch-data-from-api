import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const MovieItem = props => {

  return (
    <TouchableOpacity activeOpacity={0.5} onPress={() => props.navigation.navigate('Details', { movieId: props.id })}>
      <View style={styles.listItem}>
        <Text>{props.title}</Text>
      </View>
    </TouchableOpacity >

  );
}

const styles = StyleSheet.create({
  listItem: {
    padding: 10,
    marginVertical: 5,
    borderColor: 'grey',
    borderStyle: 'dashed',
    borderWidth: 0.5,
  }
});
export default MovieItem;