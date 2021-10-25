import React from 'react';
import { StyleSheet, Text, View, Pressable, Image, TextInput } from 'react-native';
import { Button, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StatusBar } from 'expo-status-bar';

function LoginScreen(props) {
    return (
        <View style={styles.container}>

            <View style={styles.headerFlex}>
                <Text style={styles.header}>Register now!</Text>
            </View>

            <View style={styles.registerFlex}>
              <Input
                  placeholder='First Name'
                  placeholderTextColor='#9c9c9c'
                  placeholderColo
                  leftIcon={
                    <Icon
                      name='envelope'
                      size={14}
                      color='#9c9c9c'
                    />
                  }

                  inputStyle= {{
                    color: '#9c9c9c'
                  }}

                  inputContainerStyle= {{
                    width: 175,
                    marginTop: -20
                  }}
                />

              <Input
                  placeholder='Last Name'
                  placeholderTextColor='#9c9c9c'
                  placeholderColo
                  leftIcon={
                    <Icon
                      name='envelope'
                      size={14}
                      color='#9c9c9c'
                    />
                  }

                  inputStyle= {{
                    color: '#9c9c9c'
                  }}

                  inputContainerStyle= {{
                    width: 175,
                    marginTop: -20
                  }}
                />

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

                  inputStyle= {{
                    color: '#9c9c9c'
                  }}

                  inputContainerStyle= {{
                    width: 175,
                    marginTop: -20
                  }}
                />

                <Input
                  placeholder='Username'
                  placeholderTextColor='#9c9c9c'
                  placeholderColo
                  leftIcon={
                    <Icon
                      name='envelope'
                      size={14}
                      color='#9c9c9c'
                    />
                  }

                  inputStyle= {{
                    color: '#9c9c9c'
                  }}

                  inputContainerStyle= {{
                    width: 175,
                    marginTop: -20
                  }}
                />

                <Input
                  placeholder='Password'
                  placeholderTextColor='#9c9c9c'
                  placeholderColo
                  leftIcon={
                    <Icon
                      name='envelope'
                      size={14}
                      color='#9c9c9c'
                    />
                  }

                  inputStyle= {{
                    color: '#9c9c9c'
                  }}

                  inputContainerStyle= {{
                    width: 175,
                    marginTop: -20
                  }}
                />

                <Input
                  placeholder='Confirm Password'
                  placeholderTextColor='#9c9c9c'
                  placeholderColo
                  leftIcon={
                    <Icon
                      name='envelope'
                      size={14}
                      color='#9c9c9c'
                    />
                  }

                  inputStyle= {{
                    color: '#9c9c9c'
                  }}

                  inputContainerStyle= {{
                    width: 175,
                    marginTop: -20
                  }}
                />
            
            <Button
                  title="Register"
                  type= "solid"
                  raised = "true"
                  onPress={()=> props.navigation.navigate('Login')}
            
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
      flex: 0.5,
      backgroundColor: '#82f591',
      justifyContent: 'flex-end',
      alignItems: 'stretch',
    },

    registerFlex: {
      flex: 4,
      backgroundColor: '#2e2d2d',
      justifyContent: 'center',
      alignItems: 'center',
    },

    header: {
      fontFamily: 'AvenirNext-Bold',
      fontSize: 30,
      justifyContent: 'flex-end',
      alignSelf: 'center'
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