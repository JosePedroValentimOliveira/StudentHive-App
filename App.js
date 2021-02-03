import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {LoggedInScreen} from './components/LoggedInScreen';
import {LoggedOutScreen} from './components/LoggedOutScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();
export default function App() {
  const loggedIn = false;
  return (
    <NavigationContainer>
    <Stack.Navigator  screenOptions={{headerShown: false}}>
      {loggedIn?
      <Stack.Screen name="LoggedIn"  component={LoggedInScreen} />:
      <Stack.Screen name="LoggedOut" component={LoggedOutScreen} />
      }
    </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
