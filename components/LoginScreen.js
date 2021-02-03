import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import { StyleSheet, Text, View,Image, Dimensions, TextInput, TouchableOpacity,KeyboardAvoidingView } from 'react-native';
import {Colors} from '../assets/js/constants';
import { MaterialIcons,FontAwesome5 } from '@expo/vector-icons';
import {apiPost} from '../assets/js/apiPost'
import bcrypt from 'react-native-bcrypt'
import Toast from 'react-native-toast-message';
export const LoginScreen = ({navigation}) => {
    const [email,setEmail] = useState();
    const [password,setPassword]= useState();

    const sendToApi = ()=>{
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
  
      apiPost("login",options).then(resp=>{
        if(resp != null){
          navigation.replace("LoggedIn")
            
        }
      })
      

      
      
    }
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
          <Image style={styles.image} source={require('../assets/images/studentHiveLogo.png')}/>
      </View>
      <KeyboardAvoidingView behavior="padding" style={{flex:4,width:"100%",alignItems:"center",justifyContent: 'center'}}>
            
        
      
      <View style={styles.inputView} >
        <MaterialIcons name="email" size={24} color={Colors.Icon} style={{paddingRight:10}} />
        <TextInput  
            style={styles.inputText}
            placeholder="Email" 
            placeholderTextColor="white"
            onChangeText={(text)=>{setEmail(text)}}
            keyboardType={"email-address"}
        />
        </View>

        <View style={styles.inputView} >
        <FontAwesome5 name="key" size={24} color={Colors.Icon} style={{paddingRight:10}}/>
        <TextInput  
            style={styles.inputText}
            placeholder="Wachtwoord" 
            placeholderTextColor="white"
            secureTextEntry={true}
            onChangeText={(text)=>{setPassword(text)}}
        />
        </View>

        <TouchableOpacity style={styles.button} onPress={()=>{sendToApi()}}>
          <Text style={styles.loginText}>Inloggen</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.forgot}>Wachtwoord vergeten?</Text>
        </TouchableOpacity>

        <View style={styles.line}/>
        <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate("Register")}}>
          <Text style={styles.loginText}>Nieuwe Account maken</Text>
        </TouchableOpacity>
        
      </KeyboardAvoidingView>
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
