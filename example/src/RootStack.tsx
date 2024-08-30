import { View, Text, StyleSheet, Button } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation, type NavigationProp } from '@react-navigation/native';
import { useRef } from 'react';
import { useRefRegister } from 'usetiful-react-native';

type RootStackParamList = {
  Detail: undefined;
  Home: undefined;
};
function DetailsScreen() {
  const navitaion = useNavigation<NavigationProp<RootStackParamList>>();
  const viewRef = useRef<View>(null);
  const secondViewRef = useRef<View>(null);
  const nextViewRef = useRef<View>(null);

  useRefRegister(
    { key: 'Test1', ref: viewRef },
    { key: 'SecondView', ref: secondViewRef },
    { key: 'NextView', ref: nextViewRef }
  );
  return (
    <View style={styles.home}>
      <Text>Details Screen</Text>
      <Text>About</Text>
      <Text>Number One</Text>
      <Text>Number Two</Text>
      <View ref={viewRef}>
        <Text>First Pointer</Text>
      </View>
      <Text>Number four</Text>
      <View style={{ marginTop: 100 }} ref={secondViewRef}>
        <Text>Second Pointer</Text>
      </View>
      <View style={{ marginTop: 200 }} ref={nextViewRef}>
        <Text>Third Pointer</Text>
      </View>
      <Button
        title="Go to HomeScreen"
        onPress={() => navitaion.navigate('Home')}
      />
    </View>
  );
}
export const HomeScreen = () => {
  const navitaion = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.home}>
      <Text>Home Screen</Text>
      <Button
        title="Go to DetailsScreen"
        onPress={() => navitaion.navigate('Detail')}
      />
    </View>
  );
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Detail" component={DetailsScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  home: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    width: '100%',
  },
  detail: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    width: '100%',
  },
});
