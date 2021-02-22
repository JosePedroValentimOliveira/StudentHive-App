import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View,Image, Dimensions, TextInput, TouchableOpacity,TouchableWithoutFeedback,KeyboardAvoidingView, Platform, Keyboard,  } from 'react-native';
import {Colors} from '../assets/js/constants';
import { RadioButton } from 'react-native-paper';
import {apiPost} from '../assets/js/apiPost';
import { TextInputMask } from 'react-native-masked-text'
import Toast from 'react-native-toast-message';
import { format } from "date-fns";
const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

export const RegisterScreen = ({navigation}) => {
    const [keyboardVis,setKeyboardVis] = useState(false);
    const [gender,setGender]= useState();
    const [birthday,setBirthday]= useState();
    const [isValid,setIsValid]= useState(true);
    const [firstName,setFirstName] = useState();
    const [lastName,setLastName] = useState();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [password2,setPassword2] = useState();
    
    let datetimeField;
    
    const registerUser = () =>{

      
      if(!firstName,!lastName,!birthday,!gender,!email,!password,!password2){
        
        Toast.show({
          type:'error',
          text1: 'Gelieve alles in te vullen',
          
          visibilityTime: 5000
        });
      }
      else if(password != password2){
        Toast.show({
          type:'error',
          
          text1: 'Wachtwoorden komen niet overeen',
          visibilityTime: 5000
        });
      }
      else if(!isValid){
        Toast.show({
          type:'error',
          
          text1: 'Geboortedatum is niet correct',
          visibilityTime: 5000
        });
      }
      else{
        var dates = birthday.split('/');
        var date = new Date(dates[2],dates[1]-1,dates[0]);
        
       
        
        const user={
          firstName,lastName,birthday,gender,email,password
        }
        
        const options={
          method:'POST',
          headers:{
              'Accept':'application/json',
              'Content-Type':'application/json'
          },
          body: JSON.stringify(user)
      };
  
      apiPost("register",options).then(resp=>console.log(resp))
      } 
    };

    

    useEffect(() => {
      Keyboard.addListener("keyboardDidShow",()=>{setKeyboardVis(true)});
    Keyboard.addListener("keyboardDidHide",()=>{setKeyboardVis(false)});
    
    }, [])
    return (
      <DismissKeyboard>
    <View style={styles.container} >
      
      <Toast ref={(ref) => Toast.setRef(ref)} />
     
        <View style={styles.imageContainer}>
          
        {!keyboardVis ?  <Image style={styles.image} source={require('../assets/images/studentHiveLogo.png')}/>:
        <View></View>
      }
      
        </View>
      <KeyboardAvoidingView behavior="height" style={{flex:3,width:"100%",height:"80%",alignItems:"center",justifyContent: 'center'}}>
          
        
     
      <View style={styles.inputView} >
        <TextInput  
            style={styles.inputText}
            placeholder="Voornaam" 
            placeholderTextColor="white"
            onEndEditing={(event)=>{setFirstName(event.nativeEvent.text)}}
            
        />
        </View>
        
        <View style={styles.inputView} >
        <TextInput  
            style={styles.inputText}
            placeholder="Achternaam" 
            placeholderTextColor="white"
            onEndEditing={(event)=>{setLastName(event.nativeEvent.text)}}
        />
        </View>
        <View style={styles.inputView} >
        <TextInputMask
            style={styles.inputText}
            placeholder="GeboorteDatum DD/MM/YYYY " 
            placeholderTextColor="white"
            type={'datetime'}
            options={{format:'DD/MM/YYYY'}}
            value={birthday}
            onChangeText={text=>{setBirthday(text)}}
            ref={(ref)=> datetimeField = ref}
            onEndEditing={()=>{setIsValid(datetimeField.isValid());console.log(isValid);}}
            
        />
        
        </View>
        
        <Text style={{color:"white",width:"80%"}}>Geslacht</Text>
        <View style={{alignItems:"flex-start", justifyContent:"flex-start"}}>
           
            <View style={styles.radioContainer}>
            <RadioButton.Android
                
                color={Colors.CheckButton}
                value="Man"
                status={ gender === 'Man' ? 'checked' : 'unchecked' }
                onPress={() => setGender('Man')}
                uncheckedColor="white"
            
            />
            <Text style={{color:"white"}}>Man</Text>
            <RadioButton.Android
                color={Colors.CheckButton}
                value="Vrouw"
                status={ gender === 'Vrouw' ? 'checked' : 'unchecked' }
                onPress={() => setGender('Vrouw')}
                uncheckedColor="white"
            />
            
            <Text style={{color:"white"}}>Vrouw</Text>
            <RadioButton.Android
                color={Colors.CheckButton}
                value="Anders"
                status={ gender === 'Anders' ? 'checked' : 'unchecked' }
                onPress={() => setGender('Anders')}
                uncheckedColor="white"
            />
            <Text style={{color:"white"}}>Anders</Text>
            </View>
        </View>

        <View style={styles.inputView} >
        <TextInput  
            style={styles.inputText}
            placeholder="Email" 
            placeholderTextColor="white"
            onEndEditing={(event)=>{setEmail(event.nativeEvent.text.toLowerCase())}}
            keyboardType={"email-address"}
            
        />
        </View>
        <View style={styles.inputView} >
        <TextInput  
            style={styles.inputText}
            placeholder="Wachtwoord" 
            placeholderTextColor="white"
            secureTextEntry={true}
            onEndEditing={(event)=>{setPassword(event.nativeEvent.text)}}
        />
        </View>

        <View style={styles.inputView} >
        <TextInput  
            style={styles.inputText}
            placeholder="Herhaal wachtwoord" 
            placeholderTextColor="white"
            secureTextEntry={true}
            onEndEditing={(event)=>{setPassword2(event.nativeEvent.text)}}
        />
        </View>
        </KeyboardAvoidingView>
        
        <TouchableOpacity onPress={()=>{navigation.navigate('Login')}}>
          <Text style={styles.forgot}>Ik heb al een account</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={()=>{registerUser()}}>
          <Text style={styles.loginText}>Nieuwe Account maken</Text>
        </TouchableOpacity>
        
      
      
    </View>
    </DismissKeyboard>
   
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
      
      flex:1,
      alignItems: 'center',
      justifyContent: 'flex-end',
      
  },
  image:{
    backgroundColor:"red",
    width:Math.round(Dimensions.get("window").width * 12 / 16),
    height:Math.round(Dimensions.get("window").width * 6 / 16),
   
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
    marginTop:"4%",
    borderColor:"white",
    borderWidth:1
    
  },
  loginText:{
    color:Colors.Primary,
    fontWeight:"bold"
  },
  forgot:{
    color:"white",
    
  },
  radioContainer:{
 
    flexDirection:'row',
    alignItems:"center",
    justifyContent:"center",
    marginBottom:20,
},
});
