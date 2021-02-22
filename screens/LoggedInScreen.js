import { StatusBar } from 'expo-status-bar';
import React,{useState,useContext, useEffect} from 'react';
import { StyleSheet, Text, View,Button,Image, Dimensions, TextInput, TouchableOpacity,KeyboardAvoidingView, MaskedViewBase } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {apiCall} from '../assets/js/apiCall';
import {HomeScreen} from './HomeScreen';
import {ProfileScreen} from './ProfileScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
export const LoggedInScreen = () => {
  
  
  const [user,setUser] = useState([]);
  const getUser = async()=>{
    let userToken;
    userToken = null;
    try {
    
    return await AsyncStorage.getItem('@userToken');
     
      } catch (error) {
      console.log(error);
    }
    
  }
  const userInformation = async()=>{
    
    setUser(await apiCall(`/user/${await getUser()}`));
    
  }


  useEffect(()=>{
    userInformation();
  },[])
  return (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen}/>
        <Tab.Screen name="Profile" children={()=><ProfileScreen user={user}/>} />
      </Tab.Navigator>
  )}