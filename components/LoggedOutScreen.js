import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {LoginScreen} from './LoginScreen';
import {RegisterScreen} from './RegisterScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();
export const LoggedOutScreen= () => {
  return (
    
    <Stack.Navigator  screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      
    </Stack.Navigator>
    
  );
}


