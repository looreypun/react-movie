import React from "react";
import { StyleSheet, SafeAreaView, View, Platform, StatusBar } from 'react-native';
import MyCarousel from '../components/MyCarousel';
import Movies from '../components/Movies';

const HomeScreen = () => {
  const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight : 0;

  if (Platform.OS === 'ios') {
    return (
      <SafeAreaView style={styles.container}>
        <MyCarousel />
        <Movies />
      </SafeAreaView>
    );
  }

  return (
    <View style={[styles.container, { marginTop: statusBarHeight }]}>
      <MyCarousel />
      <Movies />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // backgroundColor: 'black',
  }
});

export default HomeScreen;
