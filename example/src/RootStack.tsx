import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function DetailsScreen() {
  return (
    <View style={styles.home}>
      <Text>Details Screen</Text>
    </View>
  );
}
export const HomeScreen = () => {
  return (
    <View style={styles.home}>
      <Text>Home Screen</Text>
    </View>
  );
};

const Stack = createNativeStackNavigator();

export const RootStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  home: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
    width: '100%',
  },
});
