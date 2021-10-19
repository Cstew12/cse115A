import React from 'react';
import { StyleSheet, Text, View, Pressable, Image, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';

function LoginScreen(props) {
    return (
        <View style={styles.container}>

            <View style={styles.headerFlex}>
                <Text style={styles.header}>Register now!</Text>
            </View>

            <View style={styles.registerFlex}>
                <TextInput
                    style={styles.textArea1}
                    placeholder="First Name"
                    placeholderTextColor="#dee3e0"
                    numberOfLines={1}
                    multiline={false}
                />

                <TextInput
                    style={styles.textArea2}
                    placeholder="Last Name"
                    placeholderTextColor="#dee3e0"
                    numberOfLines={1}
                    multiline={false}
                />

                <TextInput
                    style={styles.textArea6}
                    placeholder="Email"
                    placeholderTextColor="#dee3e0"
                    numberOfLines={1}
                    multiline={false}
                />

                <TextInput
                    style={styles.textArea3}
                    placeholder="User Name"
                    placeholderTextColor="#dee3e0"
                    numberOfLines={1}
                    multiline={false}
                />
                <TextInput
                    style={styles.textArea4}
                    placeholder="Password"
                    placeholderTextColor="#dee3e0"
                    numberOfLines={1}
                    multiline={false}
                />
                <TextInput
                    style={styles.textArea5}
                    placeholder="Confirm Password"
                    placeholderTextColor="#dee3e0"
                    numberOfLines={1}
                    multiline={false}
                />

                <Pressable style={styles.pressable1}>
                    <Text style={styles.buttonText}>Create Account</Text>
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
      //alignItems: 'center',
      //justifyContent: 'center',
    },

    headerFlex: {
      flex: 1.3,
      backgroundColor: '#56d687',
      justifyContent: 'flex-end',
      alignItems: 'stretch',
    },

    registerFlex: {
      flex: 4,
      backgroundColor: '#ffffff',
      justifyContent: 'center',
      alignItems: 'center',
    },

    header: {
      fontFamily: 'AvenirNext-Bold',
      fontSize: 30,
      justifyContent: 'flex-end',
      marginLeft: 10,
    },
  
    buttonText: {
      fontSize: 20,
      color: '#56d687',
      fontFamily: 'Al Nile',
      marginBottom: -1,
    },

    pressable1: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 0,
      paddingHorizontal: 35,
      borderRadius: 4,
      backgroundColor: 'black',
      marginBottom: 10,
    },

    textArea1: {
      height: 40,
      borderColor: 'grey',
      borderWidth: 1,
      width: 200,
      marginBottom: 10,
      //marginTop: -300,
    },
  
    textArea2: {
      height: 40,
      borderColor: 'grey',
      borderWidth: 1,
      width: 200,
      marginBottom: 10,
    },

    textArea3: {
        height: 40,
        borderColor: 'grey',
        borderWidth: 1,
        width: 200,
        marginBottom: 10,
    },
    textArea4: {
        height: 40,
        borderColor: 'grey',
        borderWidth: 1,
        width: 200,
        marginBottom: 10,
    },
    textArea5: {
        height: 40,
        borderColor: 'grey',
        borderWidth: 1,
        width: 200,
        marginBottom: 10,
    },
    textArea6: {
        height: 40,
        borderColor: 'grey',
        borderWidth: 1,
        width: 200,
        marginBottom: 10,
    }
  
  });
  

export default LoginScreen;