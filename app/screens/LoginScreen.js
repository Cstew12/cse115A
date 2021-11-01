import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Pressable, Image, TextInput } from 'react-native';
import { Button, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StatusBar } from 'expo-status-bar';
import { fonts } from 'react-native-elements/dist/config';
import { auth} from "../../firebase";
import {db} from "../../firebase";
import { useNavigation } from '@react-navigation/core';
// test branch


//testing git bot
const LoginScreen = () => {

  // Testing the retrival of test data from the database
  const userDocument =  db.collection('users').doc('OMz9VMjqzrg8p46zIDkH').get()
  console.log(userDocument)
  console.log("stuff")

  // Firebase user properties
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigation = useNavigation()  

  // Take us to the Create Habit page if someone is logged in
  // this is basically a listener on the Firebase server to check if a user had signed in 
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.navigate("CreateHabit")
      }
   
    })
    return unsubscribe
  }, [])

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email,password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Logged in with: ', user.email);
        navigation.navigate('CreateHabit')
      })
      .catch(error => alert(error.message)) // error handling upon failure
      console.log('Button pressed') // debug
  }


    return (
        <View style={styles.container}>
            <View style={styles.headerFlex}>

              <Image source={require('./../../assets/routeam-logo5.png')} style={styles.image1}/>

              <Text style={styles.titleText}>Routeam</Text>

              <Text style={styles.quoteText}>Building Habits With Friends!</Text>

            </View>
  
            <View style={styles.loginFlex}>
                <Input
                  placeholder='Email'
                  placeholderTextColor='#9c9c9c'
                  placeholderColo
                  leftIcon={
                    <Icon
                      name='envelope'
                      size={14}
                      color='#9c9c9c'
                    />
                  }

                  // on change of text -> set the email property of user
                  onChangeText={text => setEmail(text)}

                  inputStyle= {{
                    color: '#9c9c9c'
                  }}

                  inputContainerStyle= {{
                    width: 175,
                    marginTop: -30
                  }}
                />

                <Input
                  placeholder='Password'
                  placeholderTextColor='#9c9c9c'
                  leftIcon={
                    <Icon
                      name='lock'
                      size={18}
                      color='#9c9c9c'
                    />
                  }

                  // on change of text -> set the password property of user
                  onChangeText={text => setPassword(text)}

                  inputStyle= {{
                    color: '#9c9c9c'
                  }}

                  inputContainerStyle= {{
                    marginTop: -15,
                    marginBottom: -12,
                    width: 175
                  }}
                />

                <Button
                  title="Login"
                  type= "solid"
                  raised = "true"
                  
                  // Testing out registering of users using the login button
                  onPress={handleLogin}  
            
                  buttonStyle= {{
                    backgroundColor: '#9c9c9c',
                    //marginTop: -10,
                  }}

                  titleStyle= {{
                    color: '#82f591',
                    fontFamily: 'AvenirNext-Bold'
                  }}
                />   
                
            </View>

            <View style={styles.signupFlex}>
                <Text style={styles.smallText}>Don't have an account?</Text>

                <Button
                  title="Sign Up"
                  type= "solid"
                  raised = "true"
                  onPress={()=> navigation.navigate('Register')} // navigate to the Registration page
                  buttonStyle= {{
                    backgroundColor: '#9c9c9c'
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
      backgroundColor: '#2e2d2d',
      alignItems: 'center',
      justifyContent: 'center',
    },

    headerFlex: {
      flex: 3.4,
      backgroundColor: '#2e2d2d',
      justifyContent: 'flex-end',
      alignItems: 'center'
    },

    loginFlex: {
      flex: 3,
      backgroundColor: '#2e2d2d',
      justifyContent: 'center',
    },

    signupFlex: {
      flex: 1,
      backgroundColor: '#2e2d2d',
      justifyContent: 'flex-start',
    },
  
    smallText: {
      fontSize: 12,
      color: '#9c9c9c',
      fontFamily: 'Al Nile',
      marginLeft: 0,
    },

    titleText: {
      fontSize: 50,
      color: '#82f591',
      fontFamily: 'AvenirNext-Bold',
      marginBottom: -10
    },

    quoteText: {
      fontSize: 12,
      color: '#9c9c9c',
      fontFamily: 'AvenirNext-Bold',
      marginTop: 5
    },
  
    image1: {
      width: 160,
      height: 250,
      marginBottom: -20,
      marginLeft: -22
    },

  });
  

export default LoginScreen;