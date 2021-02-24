import AsyncStorage from '@react-native-community/async-storage';
import { StatusBar } from 'expo-status-bar';
import React,{useState,useContext, useEffect} from 'react';
import { StyleSheet, Text, View,Image, Dimensions, TextInput, TouchableOpacity,KeyboardAvoidingView, MaskedViewBase,Button } from 'react-native';
import {AuthContext} from '../components/context';
import axios from 'axios';
import {apiUrl} from '../assets/js/constants';


export const LoggedInScreen =() => {
  const {signOut} = useContext(AuthContext);
  const [user,setUser] = useState({});
  const getUser = async()=>{
    return (await axios.get(`${apiUrl}/user/${await AsyncStorage.getItem('@userToken')}`)).data
  }
  useEffect(()=>{
    getUser().then(resp=>setUser(resp));
  },[])
  return (
      <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
        <Text>Hallo je bent nu ingelogd</Text>
        <Text>{user.firstName} {user.lastName}</Text>
        
        <Button title="Sign Out" onPress={ ()=>{signOut()}}/>
      </View>
  )}