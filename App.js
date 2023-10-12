import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./app/screens/HomeScreen";
import MovieDetailsScreen from "./app/screens/MovieDetailsScreen";

const Stack = createStackNavigator(); // Define the Stack object

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="MovieDetailsScreen" component={MovieDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
