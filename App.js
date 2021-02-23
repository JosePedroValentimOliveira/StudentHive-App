import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect,useMemo, useReducer } from 'react';
import { StyleSheet, Text, View,ActivityIndicator } from 'react-native';
import {LoggedInScreen} from './screens/LoggedInScreen';
import {LoggedOutScreen} from './screens/LoggedOutScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from './components/context';
import {apiPost} from './assets/js/apiPost'
const Stack = createStackNavigator();
export default function App() {
/*  const [isLoading,setIsLoading] =useState(true);
 const [userToken,setUserToken] = useState(null); */



 const sendToApi = async(email,password)=>{
  const user={
    email:email.toLowerCase(),password
  }
  
  
     const options={
      method:'POST',
      headers:{
          'Accept':'application/json',
          'Content-Type':'application/json'
      },
      body: JSON.stringify(user)
  };

  return await apiPost("login",options)
}

  const initialLoginState = {
    isLoading: true,
    userEmail:null,
    userToken: null
  }

  const loginReducer = (prevState,action)=>{
    switch (action.type) {
      case 'LOGIN':
        return {
          ...prevState,
          userEmail:action.email,
          userToken:action.token,
          isLoading: false,
        };
      
      case 'LOGOUT':
        return {
          ...prevState,
          userEmail:null,
          userToken:null,
          isLoading: false,
        };
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          token:action.token,
          isLoading: false,
        };
      
    }
  }

  const [loginState,dispatch] = useReducer(loginReducer,initialLoginState);

 

  const authContext = useMemo(() => ({
    signIn: async(email,password)=>{
      //api call hier voor echte authenticatie

      try {
        let userToken = await sendToApi(email,password);
        await AsyncStorage.setItem("@userToken",userToken);
        
      } catch (error) {
        
      }
      dispatch({type:"LOGIN",email:email,token:userToken})
    },
    signOut: async()=>{
      try {
        await AsyncStorage.removeItem("@userToken");
      } catch (error) {
        console.log(error);
      }
      dispatch({type:"LOGOUT"})
    }
  }),[])


  useEffect(()=>{
    setTimeout(async()=>{
      let userToken;
      userToken = null;
      try {
        await AsyncStorage.setItem('@userToken','601d4617b8aca92140636dcb');
        userToken = await AsyncStorage.getItem("@userToken");
        console.log('usertoken on start',loginState.userToken);
      } catch (error) {
        console.log(error);
      }
      dispatch({type:"RETRIEVE_TOKEN",token:userToken})
    },1000)
  },[])
  

  if(loginState.isLoading){
    return(
      <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
        <ActivityIndicator size="large"/>
      </View>
    )
  }
  return (
    <AuthContext.Provider value={authContext}>
    <NavigationContainer>
    <StatusBar style="auto"/>
      {loginState.userToken != null? <LoggedInScreen/>:<LoggedOutScreen/> }
      
      
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
