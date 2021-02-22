import { StatusBar } from 'expo-status-bar';
import React,{useState,useContext} from 'react';
import { StyleSheet, Text, View,Image, Dimensions, TextInput, TouchableOpacity,KeyboardAvoidingView,Button } from 'react-native';
import {Colors} from '../assets/js/constants';
import { MaterialIcons,FontAwesome5 } from '@expo/vector-icons';

import {AuthContext} from '../components/context';

export const HomeScreen = ({navigation}) => {
    const {signOut}  = useContext(AuthContext);
  return (
    <View style={styles.container}>
        <Text>Home</Text>
        <Button title="Logout" onPress={signOut()}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  line:{
    borderBottomColor:"white",borderBottomWidth:StyleSheet.hairlineWidth,width:"80%",marginTop:"2%",
  },
  imageContainer:{
      
      flex:2,
      alignItems: 'center',
      justifyContent: 'flex-end',
      
  },
  image:{
    width:Math.round(Dimensions.get("window").width * 12 / 16),
    height:Math.round(Dimensions.get("window").width * 6 / 16)
  },
  inputView:{
    width:"80%",
    backgroundColor:Colors.TextInput,
    borderRadius:5,
    height:40,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"flex-start",
    marginBottom:20,
    padding:"2%",
    borderColor:"white",
    borderWidth:1
  },
  inputText:{
    height:40,
    color:"white",
    paddingLeft:10,
    width:"80%"
  },
  button:{
    width:"80%",
    backgroundColor:Colors.Button,
    borderRadius:5,
    height:40,
    alignItems:"center",
    justifyContent:"center",
    marginTop:"8%",
    borderColor:"white",
    borderWidth:1
    
  },
  loginText:{
    color:Colors.Primary,
    fontWeight:"bold"
  },
  forgot:{
    color:"white",
    marginTop:"8%",
  }
});
