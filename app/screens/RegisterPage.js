//Imports including React, React native elements, firebase, and self-made components
import React, {useState} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {auth, db} from "../../firebase";
import {useNavigation } from '@react-navigation/core';
import BackButton from './habitPageComponents/BackButton';
import RegisterInput from './registerPageComponents/RegisterInput';

const RegisterPage = () => {

   // Firebase user properties
   const [email, setEmail] = useState('')
   const [firstName, setFirstName] = useState('')
   const [lastName, setLastName] = useState('') 
   const [username, setUserName] = useState('')
   const [password, setPassword] = useState('')
  
   // Initializes navigation
   const navigation = useNavigation()  
    
   const handleSignUp = () => {
    const userProfile = {
      FirstName: firstName,
      lastName: lastName,
      username: username,
      password: password, 
    };
     auth  
        .createUserWithEmailAndPassword(email, password)
        .then(userCredentials => {
          const user = userCredentials.user;
          console.log('Registered with: ', user.email); // Debug
          console.log('Registered with: ', user.firstName); // Debug
          const currentUID = auth.currentUser.uid;
          db
            .collection(currentUID)
            .doc('user profile')
            .set(userProfile)
            .then(() => {
                console.log('collection added!');
                navigation.navigate('Login');
            db
              .collection('users')
              .doc(username)
              .set({uid: currentUID});
          });
        })
        .catch(error => alert(error.message)) // error handling upon failure
    }
   
    return (
        <View style={styles.container}>

            <View style={styles.headerFlex}>
              <BackButton
                destination='Login'
                iconColor='#82f591'
                backgroundColor='#9c9c9c'
                marginBottom={20}
                marginHorizontal={10}
              />

              <Image source={require('./../../assets/routeam-logo5.png')} style={styles.image1}/>

              <Text style={styles.header}>Register Today!</Text>

            </View>

            <View style={styles.registerFlex}>

            <RegisterInput
                  placeholder='First Name'
                  value={firstName}
                  onChangeText={text => setFirstName(text)}
                  marginTop={45}
                  icon={
                    <Icon
                      name='user'
                      size={16}
                      color='#82f591'
                    />
                  }
            />

            <RegisterInput
                  placeholder='Last Name'
                  value={lastName}
                  onChangeText={text => setLastName(text)}
                  marginTop={-20}
                  icon={
                    <Icon
                      name='user'
                      size={16}
                      color='#82f591'
                    />
                  }
            />

            <RegisterInput
                  placeholder='Email'
                  value={email}
                  onChangeText={text => setEmail(text)}
                  marginTop={-20}
                  icon={
                    <Icon
                      name='envelope'
                      size={14}
                      color='#82f591'
                    />
                  }
            />

            <RegisterInput
                  placeholder='Username'
                  value={username}
                  onChangeText={text => setUserName(text)}
                  marginTop={-20}
                  icon={
                    <Icon
                      name='user'
                      size={16}
                      color='#82f591'
                    />
                  }
            />

            <RegisterInput
                  placeholder='Password'
                  value={password}
                  onChangeText={text => setPassword(text)}
                  marginTop={-20}
                  icon={
                    <Icon
                      name='lock'
                      size={18}
                      color='#82f591'
                  />
                  }
            />

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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
      justifyContent: 'center',
    },

    headerFlex: {
      flex: 2.4,
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
      marginLeft: -10,
      alignSelf: 'center'
    },
  
  });
  

export default RegisterPage;