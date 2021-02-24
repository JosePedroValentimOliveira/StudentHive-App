import { StatusBar } from 'expo-status-bar';
import React, { useEffect,useMemo,useReducer,useState } from 'react';
import { StyleSheet, Text, View,ActivityIndicator } from 'react-native';
import {LoggedInScreen} from './screens/LoggedInScreen';
import {LoggedOutScreen} from './screens/LoggedOutScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import {AuthContext} from './components/context';
import AsyncStorage from '@react-native-community/async-storage'
import axios from 'axios';
import {apiUrl} from './assets/js/constants';
const Stack = createStackNavigator();
export default function App() {
 

  const initialLoginState={
    isLoading : true,
    userEmail: null,
    userToken: null
  }
  const loginReducer = (prevState,action)=>{
    switch (action.type) {
      case "LOGIN":
        return {
          ...prevState,
          userToken:action.token,
          userEmail:action.email,
          isLoading:false
        }
      case "LOGOUT":
        return {
          ...prevState,
          userToken:null,
          userEmail:null,
          isLoading:false
        }
      case "RETRIEVE_TOKEN":
        return {
          ...prevState,
          userToken:action.token,
          isLoading:false
        }
          
    
      default:
        break;
    }
  }

  const [loginState,dispatch] = useReducer(loginReducer,initialLoginState)
  
  const authContext = useMemo(() => ({
    signIn: async(email,password)=>{
      let userToken ;
      userToken =null;
      userToken = (await axios.post(`${apiUrl}/login`,{email:email.toLowerCase(),password:password})).data;
      await AsyncStorage.setItem('@userToken',userToken);
      dispatch({type:"LOGIN",userEmail:email,userToken:userToken});
    },
    signOut:async()=>{
      await AsyncStorage.removeItem('@userToken');
      dispatch({type:"LOGOUT"});
    }
  }))

  useEffect(()=>{
    setTimeout(async()=>{
      let userToken;
      userToken = await AsyncStorage.getItem("@userToken");
      dispatch({type:"RETRIEVE_TOKEN",token:userToken});
    },1000)
  },[])
 
  if(loginState.isLoading){
    return(
      <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
        <ActivityIndicator size="large"/>
      </View>
    )
  }
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
    <Stack.Navigator  screenOptions={{headerShown: false}}>
      {loginState.userToken !== null?
      <Stack.Screen name="LoggedIn"  component={LoggedInScreen} />:
      <Stack.Screen name="LoggedOut" component={LoggedOutScreen} />
      }
    </Stack.Navigator>
    </NavigationContainer>
    </AuthContext.Provider>
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
