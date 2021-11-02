import React, {useState} from 'react';
import { StyleSheet, Text, View, Pressable, Image, TextInput } from 'react-native';
import { Button, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StatusBar } from 'expo-status-bar';
import { color } from 'react-native-elements/dist/helpers';
import { auth, db} from "../../firebase";
import { useNavigation } from '@react-navigation/core';

const LoginScreen = () => {

   // Firebase user properties
   const [email, setEmail] = useState('')
   const [firstName, setFirstName] = useState('')
   const [lastName, setLasttName] = useState('') 
   const [username, setUserName] = useState('')
   const [password, setPassword] = useState('')
   const [confirmpassword, setConfirmPassword] = useState('')
   const navigation = useNavigation()  // Broken navigation at the moment
 
   const handleSignUp = () => {
     auth  
         .createUserWithEmailAndPassword(email, password)
         .then(userCredentials => {
           const user = userCredentials.user;
           console.log('Registered with: ', user.email); // Debug
           console.log('Registered with: ', user.firstName); // Debug
           navigation.navigate('Login')
         })
         .catch(error => alert(error.message)) // error handling upon failure
   }
   
    return (
        <View style={styles.container}>

            <View style={styles.headerFlex}>cs
                <Image source={require('./../../assets/routeam-logo5.png')} style={styles.image1}/>

                <Text style={styles.header}>Register Today!</Text>
            </View>

            <View style={styles.registerFlex}>
              <Input
                  placeholder='First Name'
                  value={firstName}
                  onChangeText={text => setFirstName(text)} 
                  placeholderTextColor='#9c9c9c'
                  placeholderColo
                  leftIcon={
                    <Icon
                      name='user'
                      size={16}
                      color='#82f591'
                    />
                  }

                  inputStyle= {{
                    color: '#9c9c9c'
                  }}

                  inputContainerStyle= {{
                    alignSelf: 'center',
                    width: 215,
                    marginTop: 45
                  }}
                />

              <Input
                  placeholder='Last Name'
                  value = {lastName}
                  onChangeText={text => setLasttName(text)}
                  placeholderTextColor='#9c9c9c'
                  placeholderColo
                  leftIcon={
                    <Icon
                      name='user'
                      size={16}
                      color='#82f591'
                    />
                  }

                  inputStyle= {{
                    color: '#9c9c9c'
                  }}

                  inputContainerStyle= {{
                    width: 215,
                    alignSelf: 'center',
                    marginTop: -20
                  }}
                />

                <Input
                  placeholder='Email'
                  value={email}
                  onChangeText={text => setEmail(text)} 
                  placeholderTextColor='#9c9c9c'
                  placeholderColo
                  leftIcon={
                    <Icon
                      name='envelope'
                      size={14}
                      color='#82f591'
                    />
                  }

                  inputStyle= {{
                    color: '#9c9c9c'
                  }}

                  inputContainerStyle= {{
                    width: 215,
                    alignSelf: 'center',
                    marginTop: -20
                  }}
                />

                <Input
                  placeholder='Username'
                  value={username}
                  onChangeText={text => setUserName(text)} 
                  placeholderTextColor='#9c9c9c'
                  placeholderColo
                  leftIcon={
                    <Icon
                      name='user'
                      size={16}
                      color='#82f591'
                    />
                  }

                  inputStyle= {{
                    color: '#9c9c9c'
                  }}

                  inputContainerStyle= {{
                    width: 215,
                    alignSelf: 'center',
                    marginTop: -20
                  }}
                />

                <Input
                  placeholder='Password'
                  value={password}
                  onChangeText={text => setPassword(text)} 
                  secureTextEntry
                  placeholderTextColor='#9c9c9c'
                  placeholderColo
                  leftIcon={
                    <Icon
                      name='lock'
                      size={18}
                      color='#82f591'
                    />
                  }


                  inputStyle= {{
                    color: '#9c9c9c'
                  }}

                  inputContainerStyle= {{
                    width: 215,
                    alignSelf: 'center',
                    marginTop: -20
                  }}
                />

                {/* <Input
                  placeholder='Confirm Password'
                  value={confirmpassword}
                  onChangeText={text => setConfirmPassword(text)} 
                  placeholderTextColor='#9c9c9c'
                  placeholderColo
                  leftIcon={
                    <Icon
                      name='lock'
                      size={18}
                      color='#82f591'
                    />
                  }

                  inputStyle= {{
                    color: '#9c9c9c'
                  }}

                  inputContainerStyle= {{
                    width: 215,
                    alignSelf: 'center',
                    marginTop: -20
                  }}
                /> */}
            
            <Button
                  title="Register"
                  type= "solid"
                  raised = "true"
                  onPress={handleSignUp}
            
                  buttonStyle= {{
                    backgroundColor: '#9c9c9c',
                    width: 190,
                    marginBottom: -50
                  }}

                  titleStyle= {{
                    color: '#82f591',
                    fontFamily: 'AvenirNext-Bold'
                  }}
                />
            </View>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
      //alignItems: 'center',
      justifyContent: 'center',
    },

    headerFlex: {
      flex: 2,
      backgroundColor: '#2c2d2d',
      justifyContent: 'flex-end',
      alignItems: 'stretch',
    },

    registerFlex: {
      flex: 4,
      backgroundColor: '#2e2d2d',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },

    header: {
      fontFamily: 'AvenirNext-Bold',
      fontSize: 40,
      justifyContent: 'flex-end',
      alignSelf: 'center',
      color: '#82f591',
      marginTop: 30,
    },

    image1: {
      width: 65,
      height: 100,
      marginBottom: 0,
      marginLeft: 40
    },
  
  });
  

export default LoginScreen;