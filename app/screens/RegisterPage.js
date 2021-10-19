import React from 'react';
import { StyleSheet, Text, View, Pressable, Image, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';

function LoginScreen(props) {
    return (
        <View style={styles.container}>

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
                style={styles.textArea2}
                placeholder="Last Name"
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
                placeholder="Password"
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

            <Pressable style={styles.pressable1}>
                <Text style={styles.buttonText}>Create Account</Text>
            </Pressable>

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
  
    titleText: {
      fontSize: 40,
      color: 'white',
      fontFamily: 'Al Nile',
      marginBottom: '50%',
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
    },
  
  
    pressable1: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 0,
      paddingHorizontal: 65,
      borderRadius: 4,
      backgroundColor: 'black',
      marginBottom: 50,
    },

  
    textArea1: {
      height: 40,
      borderColor: 'grey',
      borderWidth: 1,
      width: 200,
      marginBottom: 10,
      marginTop: -300,
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