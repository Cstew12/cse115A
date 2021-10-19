import React from 'react';
import { StyleSheet, Text, View, Pressable, Image, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';

function LoginScreen(props) {
    return (
        <View style={styles.container}>
            <View style={styles.headerFlex}>
                <Image source={require('./../../assets/logo3.png')} style={styles.image1}/>
            </View>
            

            <View style={styles.loginFlex}>
                <TextInput
                    style={styles.textArea1}
                    placeholder="username"
                    placeholderTextColor="#dee3e0"
                    numberOfLines={1}
                    multiline={false}
                />

                <TextInput
                    style={styles.textArea2}
                    placeholder="password"
                    placeholderTextColor="#dee3e0"
                    numberOfLines={1}
                    multiline={false}
                />

                <Pressable style={styles.pressable1} onPress={()=> props.navigation.navigate('CreateHabit')}>
                    <Text style={styles.buttonText}>Login</Text>
                </Pressable>
            </View>

            <View style={styles.signupFlex}>
                <Text style={styles.smallText}>Don't have an account?</Text>

                <Pressable style={styles.pressable2} onPress={()=> props.navigation.navigate('Register')}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </Pressable>
            </View>

            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
      alignItems: 'center',
      justifyContent: 'center',
    },

    headerFlex: {
      flex: 2.3,
      backgroundColor: '#ffffff',
      justifyContent: 'flex-end',
    },

    loginFlex: {
      flex: 3,
      backgroundColor: '#ffffff',
      justifyContent: 'center',
    },

    signupFlex: {
      flex: 1,
      backgroundColor: '#ffffff',
      justifyContent: 'flex-start',
    },
  
    buttonText: {
      fontSize: 20,
      color: '#56d687',
      fontFamily: 'Al Nile',
      marginBottom: -1,
    },
  
    smallText: {
      fontSize: 12,
      color: 'black',
      fontFamily: 'Al Nile',
      marginLeft: 40,
    },
  
    pressable1: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 4,
      paddingHorizontal: 75,
      borderRadius: 4,
      backgroundColor: 'black',
      marginBottom: 25,
    },
  
    pressable2: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 0,
      paddingHorizontal: 65,
      borderRadius: 4,
      backgroundColor: 'black',
    },
  
    image1: {
      width: 400,
      height: 250,
    },
  
    textArea1: {
      height: 40,
      borderColor: 'grey',
      borderWidth: 1,
      width: 200,
      marginBottom: 5,
    },
  
    textArea2: {
      height: 40,
      borderColor: 'grey',
      borderWidth: 1,
      width: 200,
      marginBottom: 5,
    },
  
  });
  

export default LoginScreen;